import React, { useState } from 'react';
import { ArrowRight, Wand2, Terminal } from 'lucide-react';

export default function Hero({ onGeneratePrompt, onGetStarted }) {
  const [prompt, setPrompt] = useState('');

  const samplePrompts = [
    "Create a modern portfolio website for a software engineering student with a dark theme, projects section, skills section, contact form and responsive design.",
    "Create a restaurant website with a premium dark theme, hero section, menu, about section, customer reviews and contact information.",
    "Build a high-conversion SaaS landing page for an AI automation platform with pricing tiers, live stats, and technical dark aesthetic.",
    "Design a boutique architectural studio website with minimalist editorial layout, project grid, and inquiry form."
  ];

  const handleSelectSample = (sample) => {
    setPrompt(sample);
  };

  const handleGenerateSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGeneratePrompt(prompt.trim());
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-[#050505]">
      {/* Subtle ambient magenta depth glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FF00A8]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-neutral-900/40 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#101010] border border-[#222222] text-neutral-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF00A8] animate-pulse"></span>
            BRAHMA 2.0 • AUTONOMOUS AI WEB ENGINE
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-[1.08] text-white">
            Turn Any Idea into a{' '}
            <span className="text-[#FF00A8]">
              Live Website
            </span>{' '}
            in Seconds.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Enter a natural-language description. BRAHMA synthesizes semantic layouts, bespoke Tailwind styling, full React components, and deploys it live with a single click.
          </p>

          {/* Prompt Demo Input Area */}
          <div id="demo" className="pt-6 max-w-3xl mx-auto">
            <form
              onSubmit={handleGenerateSubmit}
              className="p-2 sm:p-3 rounded-2xl bg-[#0c0c0c] border border-[#222222] shadow-2xl focus-within:border-[#FF00A8]/80 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-3.5 text-neutral-500">
                    <Wand2 className="w-5 h-5 text-[#FF00A8]" />
                  </div>
                  <textarea
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the website you want to build... (e.g., Create a modern portfolio for a software engineer with dark theme, projects, and contact form)"
                    className="w-full pl-12 pr-4 py-3 bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none resize-none font-sans"
                  />
                </div>
                <div className="flex sm:flex-col justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-xl shadow-[#FF00A8]/20 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Generate Website</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Inspiration Chips */}
            <div className="pt-4 text-left">
              <span className="text-xs font-mono font-semibold text-neutral-400 mr-2 block sm:inline mb-2 sm:mb-0">
                TRY A PROMPT TEMPLATE:
              </span>
              <div className="flex flex-wrap gap-2 mt-1 sm:mt-0">
                {samplePrompts.slice(0, 3).map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#101010] border border-[#222222] hover:border-[#FF00A8]/60 hover:bg-[#161616] text-neutral-300 transition text-left"
                  >
                    "{sample.slice(0, 48)}..."
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-[#1f1f1f]">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">100%</div>
              <div className="text-xs text-neutral-500 font-mono uppercase">Prompt-Driven</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#FF00A8]">&lt; 5s</div>
              <div className="text-xs text-neutral-500 font-mono uppercase">Synthesis Speed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">Zero</div>
              <div className="text-xs text-neutral-500 font-mono uppercase">Lock-In / Raw Code</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-400">1-Click</div>
              <div className="text-xs text-neutral-500 font-mono uppercase">Edge Deployment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
