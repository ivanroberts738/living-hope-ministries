import React, { useState } from 'react';
import { AdminUser } from '../types';
import { loginAdmin } from '../lib/api';
import { OfficialLogo } from '../components/OfficialLogo';
import { Lock, Mail, KeyRound, ShieldAlert, ArrowLeft } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToWebsite: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onBackToWebsite
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginAdmin(email, password);
      onLoginSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Invalid administrator email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Back link */}
        <button
          onClick={onBackToWebsite}
          className="text-xs font-bold text-slate-500 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </button>

        {/* Login Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <OfficialLogo variant="icon" size={80} className="mx-auto" />
            <h1 className="text-xl font-bold font-serif text-slate-900">
              BUHUGU LIVING HOPE MINISTRIES
            </h1>
            <p className="text-xs text-red-600 font-extrabold uppercase tracking-wider">
              Authorized Administrator Portal
            </p>
            <p className="text-xs text-slate-500">
              Sironko–Bulambuli, Uganda • Everyday Activity Management
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin1@buhugu.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Log In to Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Initial Demo Credentials Reminder */}
          <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-3 text-[11px] text-blue-900 space-y-1">
            <strong className="block font-bold">Default Authorized Admin Accounts:</strong>
            <div>Primary Admin: <code className="bg-blue-100 px-1 rounded">admin1@buhugu.org</code></div>
            <div>Field Admin: <code className="bg-blue-100 px-1 rounded">admin2@buhugu.org</code></div>
            <div>Default Password: <code className="bg-blue-100 px-1 rounded">HopeForAll2026!</code></div>
          </div>
        </div>
      </div>
    </div>
  );
};
