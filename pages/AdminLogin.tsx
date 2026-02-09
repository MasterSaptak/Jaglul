import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, AlertCircle, Check } from 'lucide-react';
import { Button } from '../components/Button';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [strength, setStrength] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Calculate password strength
  useEffect(() => {
    let score = 0;
    if (!password) {
        setStrength(0);
        return;
    }
    if (password.length > 4) score++;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    // Cap at 4 for UI simplicity
    setStrength(Math.min(score, 4));
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password, rememberMe)) {
      navigate('/');
    } else {
      setError('Invalid Access Code');
    }
  };

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-gray-200';
    if (strength < 2) return 'bg-red-500';
    if (strength < 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (!password) return '';
    if (strength < 2) return 'Weak';
    if (strength < 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-army-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden border border-army-green/10">
        <div className="bg-gradient-to-r from-army-olive to-army-green py-6 px-8 text-center">
          <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3 border border-army-gold/30">
             <Lock className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">Restricted Access</h2>
          <p className="text-green-200 text-sm mt-1">Authorized Staff Only</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-army-oliveDark">Access Password</label>
              <input 
                type="password" 
                className="mt-1 block w-full px-3 py-2 border border-army-green/30 rounded-md shadow-sm focus:outline-none focus:ring-army-green focus:border-army-green transition-colors"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                }}
                autoFocus
              />
              
              {/* Password Strength Indicator */}
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-army-olive/70">Password Strength</span>
                    <span className={`text-xs font-bold ${strength < 2 ? 'text-army-red' : strength < 3 ? 'text-yellow-600' : 'text-army-green'}`}>
                        {getStrengthLabel()}
                    </span>
                </div>
                <div className="flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((level) => (
                        <div 
                            key={level} 
                            className={`flex-1 rounded-full transition-all duration-300 ${level <= strength ? getStrengthColor() : 'bg-gray-200'}`}
                        ></div>
                    ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-army-red text-sm bg-red-50 p-3 rounded border border-army-red/20 animate-pulse">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-army-green focus:ring-army-green border-army-green/30 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-army-oliveDark cursor-pointer select-none">
                Remember me for 1 hour
              </label>
            </div>

            <Button type="submit" className="w-full justify-center">
              Authenticate
            </Button>
            
            <div className="text-center">
                <button type="button" onClick={() => navigate('/')} className="text-sm text-army-olive/70 hover:text-army-green transition-colors">
                    Return to Public Site
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};