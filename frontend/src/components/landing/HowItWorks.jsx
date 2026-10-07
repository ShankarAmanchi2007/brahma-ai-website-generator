import React from 'react';
import { Terminal, Cpu, Sliders, Globe } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <Terminal className="w-5 h-5 text-[#FF00A8]" />,
      title: 'Prompt Your Vision',
      desc: 'Enter a natural language description specifying your website niche, colors, sections, and brand personality.'
    },
    {
      num: '02',
      icon: <Cpu className="w-5 h-5 text-neutral-300" />,
      title: 'Neural Code Synthesis',
      desc: 'The BRAHMA AI transforms your prompt into semantic components, Tailwind layouts, and responsive markup.'
    },
    {
      num: '03',
      icon: <Sliders className="w-5 h-5 text-neutral-300" />,
      title: 'Iterative Refinement',
      desc: 'Instruct the AI in real-time chat to change themes, add new sections, or tweak navigation effortlessly.'
    },
    {
      num: '04',
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      title: 'Deploy or Export',
      desc: 'Publish your website live with one click to a public URL or download clean ZIP source files to run locally.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 border-t border-[#1a1a1a] bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-300 bg-[#121212] border border-[#222222] px-3.5 py-1.5 rounded-full">
            WORKFLOW PIPELINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            From Natural Language to Production in Minutes
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            A frictionless development pipeline designed to turn conceptual ideas into reality without coding bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#0c0c0c] border border-[#1f1f1f] relative hover:border-[#FF00A8]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-mono font-extrabold text-neutral-700">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">{step.title}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
