
import React, { useState } from 'react';
import { UrbanAPIService } from '../services/api';

interface AuthPageProps {
  onLogin: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleAuth = () => {
    setError(null);
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await UrbanAPIService.signIn(formData.email, formData.password);
      } else {
        await UrbanAPIService.signUp(formData.name, formData.email, formData.password);
      }
      // Successful auth
      onLogin();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden font-inter">
      {/* Background blobs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200 rounded-full blur-[100px] opacity-30 transition-all duration-1000 ${isLogin ? 'translate-x-0' : 'translate-x-1/2'}`}></div>
      <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full blur-[100px] opacity-30 transition-all duration-1000 ${isLogin ? 'translate-x-0' : '-translate-x-1/2'}`}></div>

      <div className="w-full max-w-md px-6 relative z-10 animate-scale-in">
        <div className={`bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-indigo-200 mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-500 cursor-default">
                U
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center">UrbanAI</h1>
              <p className="text-slate-500 mt-2 font-medium text-center">
                {isLogin ? 'Authentication required' : 'Create your secure account'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-bold animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2 animate-slide-up">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    disabled={isLoading}
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 disabled:opacity-50"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              )}
              
              <div className="space-y-2 animate-slide-up delay-100">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  required
                  type="email"
                  disabled={isLoading}
                  placeholder="name@company.com"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 disabled:opacity-50"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2 animate-slide-up delay-200">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                </div>
                <input
                  required
                  type="password"
                  disabled={isLoading}
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 disabled:opacity-50"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 transition-all transform active:scale-95 mt-4 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 text-center animate-fade-in delay-300">
              <p className="text-slate-500 font-medium text-sm">
                {isLogin ? "New to UrbanAI?" : "Existing user?"}{' '}
                <button
                  type="button"
                  onClick={toggleAuth}
                  disabled={isLoading}
                  className="text-indigo-600 font-black hover:underline underline-offset-4 decoration-2 transition-all disabled:opacity-50"
                >
                  {isLogin ? 'Register now' : 'Log in here'}
                </button>
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">
          Secured by SQLite Database Persistence
        </p>
      </div>
    </div>
  );
};
