import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#050505] py-16 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black border border-[#2a2a2a] flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h8a4 4 0 0 1 0 8H6V3z" />
                  <path d="M6 11h9a4 4 0 0 1 0 8H6V11z" />
                  <circle cx="15" cy="11" r="1.5" fill="#FF00A8" stroke="none" />
                </svg>
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                BRAHMA
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#181818] border border-[#262626] text-[#FF00A8] font-bold">
                2.0
              </span>
            </div>
            <p className="text-xs max-w-sm text-neutral-400 leading-relaxed font-sans">
              Autonomous AI Website Creator synthesizing production-grade React components, Tailwind styling, and live previews from natural language requirements.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-200">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition">Capabilities</a></li>
              <li><a href="#demo" className="hover:text-white transition">Prompt Engine</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">Workflow</a></li>
              <li><a href="#benefits" className="hover:text-white transition">Architecture</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-200">Core Engine</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF00A8]"></span> PostgreSQL & NeonDB</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> React + Vite Architecture</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Modern Tailwind Styling</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Gemini & Neural Synthesis</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© 2025 BRAHMA. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Engineered for high-velocity software creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
