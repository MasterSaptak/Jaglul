import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

type AuthResult = {
  error: string | null;
  isAdmin: boolean;
};

type LogoutResult = {
  error: string | null;
};

interface AuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<LogoutResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return fallback;
};

const signOutLocal = async () => {
  try {
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    if (error) console.error('Local sign-out failed:', error);
  } catch (error) {
    console.error('Local sign-out failed:', error);
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hydrateRunRef = useRef(0);
  const authStateRef = useRef({ user, session, isAdmin });

  // Update ref whenever state changes to keep hydrateAuth informed without re-rendering
  useEffect(() => {
    authStateRef.current = { user, session, isAdmin };
  }, [user, session, isAdmin]);

  const clearAuthState = useCallback(() => {
    hydrateRunRef.current += 1;
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setIsLoading(false);
  }, []);

  const hydrateAuth = useCallback(
    async (nextSession: Session | null): Promise<AuthResult> => {
      const runId = ++hydrateRunRef.current;
      
      // Only set loading if we don't already have an active user/session
      // This prevents the entire UI from unmounting during background token refreshes
      if (!authStateRef.current.user) {
        setIsLoading(true);
      }

      if (!nextSession?.user) {
        if (runId === hydrateRunRef.current) {
          setUser(null);
          setSession(null);
          setIsAdmin(false);
          setIsLoading(false);
        }

        return { error: null, isAdmin: false };
      }

      try {
        const { data: admin, error: rpcError } = await supabase.rpc('is_admin');
        
        if (runId !== hydrateRunRef.current) {
          return { error: null, isAdmin: false };
        }
        
        if (rpcError) {
          console.error('Admin check failed:', rpcError);
        }

        if (!admin) {
          clearAuthState();
          await signOutLocal();
          return { error: 'Unauthorized: admin access is required.', isAdmin: false };
        }

        setSession(nextSession);
        setUser(nextSession.user);
        setIsAdmin(true);
        setIsLoading(false);

        return { error: null, isAdmin: true };
      } catch (error) {
        if (runId === hydrateRunRef.current) {
          // If this was a background check and it failed (e.g. network error), 
          // don't immediately boot the user if they were already logged in
          if (!authStateRef.current.user) {
            clearAuthState();
            await signOutLocal();
          } else {
            setIsLoading(false);
          }
        }

        return {
          error: getErrorMessage(error, 'Unable to verify admin access.'),
          isAdmin: authStateRef.current.isAdmin,
        };
      }
    },
    [clearAuthState]
  );

  useEffect(() => {
    let mounted = true;

    const recoverSession = async () => {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error('Session recovery failed:', error);
        clearAuthState();
        return;
      }

      void hydrateAuth(currentSession);
    };

    void recoverSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === 'INITIAL_SESSION') return;
      void hydrateAuth(nextSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [clearAuthState, hydrateAuth]);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      setIsLoading(true);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.session) {
          setIsLoading(false);
          return {
            error: error?.message ?? 'Login failed.',
            isAdmin: false,
          };
        }

        return await hydrateAuth(data.session);
      } catch (error) {
        clearAuthState();
        return {
          error: getErrorMessage(error, 'An unexpected error occurred during authentication.'),
          isAdmin: false,
        };
      }
    },
    [clearAuthState, hydrateAuth]
  );

  const logout = useCallback(async (): Promise<LogoutResult> => {
    clearAuthState();

    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      return { error: error?.message ?? null };
    } catch (error) {
      return {
        error: getErrorMessage(error, 'Unable to fully sign out.'),
      };
    }
  }, [clearAuthState]);

  const value = useMemo(
    () => ({ isAdmin, isLoading, user, session, login, logout }),
    [isAdmin, isLoading, login, logout, session, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
