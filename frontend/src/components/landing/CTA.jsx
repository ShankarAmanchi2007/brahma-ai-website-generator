import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTA({ onGetStarted }) {
  return (
    <section className="py-24 border-t border-[#1a1a1a] bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF00A8]/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-[#222222] bg-[#0c0c0c] p-8 sm:p-16 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#141414] border border-[#262626] text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF00A8]"></span>
            START BUILDING TODAY
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white max-w-2xl mx-auto">
            Ready to Build Your Website with BRAHMA?
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of developers, founders, and designers who generate, iterate, and deploy modern web apps with BRAHMA AI.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-xl shadow-[#FF00A8]/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
