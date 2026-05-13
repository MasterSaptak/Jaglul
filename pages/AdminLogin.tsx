import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const { login, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already admin
  useEffect(() => {
    if (!isLoading && isAdmin) {
      navigate('/admin/studio');
    }
  }, [isAdmin, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await login(email, password);
      if (authError) {
        setError(authError);
      } else {
        navigate('/admin/studio');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1b25] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      
      <div className="relative w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-army-gold/10 border border-army-gold/30 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-army-gold/10">
            <Lock size={24} className="text-army-gold" />
          </div>
          <h1 className="text-2xl font-serif font-black text-white tracking-wide">Studio Access</h1>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Authorized Personnel Only</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoFocus
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-army-gold/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-army-gold/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 text-red-400 text-xs bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-army-gold text-army-navy font-black text-sm uppercase tracking-widest py-3.5 rounded-xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-army-gold/20"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Authenticating…</>
              ) : (
                'Access Studio'
              )}
            </button>

            <div className="text-center space-y-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="block w-full text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                ← Return to Public Site
              </button>
              
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }}
                className="text-[10px] text-white/10 hover:text-white/40 transition-colors uppercase tracking-[0.2em]"
              >
                Trouble signing in? Clear Session
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-6 font-bold">
          Jaglul Studio · Restricted Area
        </p>
      </div>
    </div>
  );
};