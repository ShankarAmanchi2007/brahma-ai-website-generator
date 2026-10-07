import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Loader2, Sparkles } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onSwitchToRegister, onSwitchToForgot, onSuccess }) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email.trim().toLowerCase(), password);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    const demoEmail = 'creator@brahma.ai';
    const demoPass = 'password123';

    try {
      try {
        await login(demoEmail, demoPass);
      } catch {
        // If demo user does not exist yet, auto-register
        await register('Brahma Creator', demoEmail, demoPass);
      }
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign in to BRAHMA">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141414] border border-[#222222] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] transition"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-neutral-300">Password</label>
            <button
              type="button"
              onClick={onSwitchToForgot}
              className="text-xs text-[#FF00A8] hover:text-[#FF66B2] transition"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141414] border border-[#222222] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-sm bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-lg shadow-[#FF00A8]/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
        </button>

        {/* Instant Demo Quick-Access */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-xs font-semibold border border-[#FF00A8]/30 bg-[#FF00A8]/10 hover:bg-[#FF00A8]/20 text-[#FF66B2] transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF00A8]" />
            One-Click Demo Login
          </button>
        </div>

        <p className="text-center text-xs text-neutral-400 pt-3">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-[#FF00A8] hover:text-[#FF66B2] font-semibold transition"
          >
            Create account
          </button>
        </p>
      </form>
    </Modal>
  );
}
