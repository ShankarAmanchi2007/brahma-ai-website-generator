import React from 'react';
import { Zap, Code, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: '100x Faster Time-to-Market',
      text: 'Eliminate weeks of wireframing, boilerplate setup, and styling overhead. Build full landing pages and websites in seconds.'
    },
    {
      icon: <Code className="w-5 h-5 text-cyan-400" />,
      title: 'Real, Portable React Code',
      text: 'No proprietary runtime or vendor traps. You receive pure HTML5, modern Tailwind CSS, and standard React files that run anywhere.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Production-Grade Quality',
      text: 'Semantic HTML, responsive breakpoints, accessible buttons, and high-performance assets curated for modern web standards.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#FF00A8]" />,
      title: 'Context-Aware AI Co-Pilot',
      text: 'Our AI engine preserves your existing site elements across iterations so your edits remain coherent, precise, and non-destructive.'
    }
  ];

  return (
    <section id="benefits" className="py-24 border-t border-[#1a1a1a] bg-[#070707]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF00A8] bg-[#141414] border border-[#262626] px-3.5 py-1.5 rounded-full">
              WHY CREATORS CHOOSE BRAHMA
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              A Website Generator Built for the Modern Web
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Traditional site builders lock you into slow proprietary visual editors. BRAHMA gives you the best of both worlds: instant AI creation with clean, exportable code.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0c0c0c] border border-[#1f1f1f] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center">
                  {b.icon}
                </div>
                <h4 className="text-base font-bold text-white font-display">{b.title}</h4>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
