import React, { useState } from 'react';
import Modal from '../common/Modal';
import { api } from '../../services/api';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    try {
      const res = await api.forgotPassword(email.trim().toLowerCase());
      setStatus({
        type: 'success',
        message: res.message || 'Reset link sent! Please check your inbox.'
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to submit reset request.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset BRAHMA Password">
      <form onSubmit={handleSubmit} className="space-y-4">
        {status.message && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              status.type === 'success'
                ? 'bg-emerald-950/40 border border-emerald-800/50 text-emerald-300'
                : 'bg-rose-950/40 border border-rose-800/50 text-rose-300'
            }`}
          >
            {status.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
            {status.message}
          </div>
        )}

        <p className="text-xs text-neutral-400">
          Enter your registered email address and we'll send instructions to restore your BRAHMA access.
        </p>

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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-sm bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-lg shadow-[#FF00A8]/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
        </button>

        <p className="text-center text-xs text-neutral-400 pt-3">
          Remembered your password?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#FF00A8] hover:text-[#FF66B2] font-semibold transition"
          >
            Return to sign in
          </button>
        </p>
      </form>
    </Modal>
  );
}
