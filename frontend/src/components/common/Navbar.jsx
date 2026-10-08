import React, { useState } from 'react';
import { LayoutDashboard, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onOpenLogin, onOpenRegister, onNavigateDashboard }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#1f1f1f] bg-[#050505]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 rounded-lg bg-black border border-[#2a2a2a] flex items-center justify-center text-white shadow-md relative overflow-hidden group-hover:border-[#FF00A8] transition-colors">
            {/* Minimalist geometric Brahma glyph */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h8a4 4 0 0 1 0 8H6V3z" />
              <path d="M6 11h9a4 4 0 0 1 0 8H6V11z" />
              <circle cx="15" cy="11" r="1.5" fill="#FF00A8" stroke="none" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF00A8]/10 to-transparent pointer-events-none" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black tracking-[-0.04em] font-heading text-white">
              BRAHMA
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#181818] border border-[#262626] text-[#FF00A8] font-bold tracking-widest">
              AI
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-semibold text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#demo" className="hover:text-white transition-colors">Prompt Engine</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Pipeline</a>
          <a href="#benefits" className="hover:text-white transition-colors">Architecture</a>
        </div>

        {/* Auth / Action CTA */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <button
                onClick={onNavigateDashboard}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] hover:border-[#FF00A8]/50 text-white shadow-md transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#FF00A8]" />
                Workspace
              </button>
              <div className="flex items-center gap-3 pl-2 border-l border-[#222222]">
                <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-xs font-bold text-[#FF00A8]">
                  {user?.name ? user.name[0].toUpperCase() : <User className="w-4 h-4" />}
                </div>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-[#141414] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLogin}
                className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-[#141414] transition"
              >
                Sign In
              </button>
              <button
                onClick={onOpenRegister}
                className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-lg shadow-[#FF00A8]/20 transition-all hover:scale-[1.02]"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl border border-[#222222] text-neutral-300 hover:text-white bg-[#0e0e0e]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1f1f1f] bg-[#070707] px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-neutral-300 font-medium">Capabilities</a>
          <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-neutral-300 font-medium">Prompt Engine</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-neutral-300 font-medium">Pipeline</a>
          <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-neutral-300 font-medium">Architecture</a>

          <div className="pt-4 border-t border-[#1f1f1f] space-y-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateDashboard();
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF00A8] text-white text-center flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" /> Open Workspace
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2.5 rounded-xl text-rose-400 border border-rose-900/40 text-center text-xs font-semibold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 rounded-xl border border-[#222222] text-neutral-200 font-semibold text-xs uppercase tracking-wider"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#FF00A8] text-white font-bold text-xs uppercase tracking-wider"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
