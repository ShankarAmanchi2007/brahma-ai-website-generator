import React from 'react';
import { MessageSquareCode, Smartphone, FolderGit2, Download, Rocket, Code2 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Code2 className="w-5 h-5 text-[#FF00A8]" />,
      title: 'Prompt-to-Website Engine',
      description: 'Describe any vision in plain English. BRAHMA synthesizes semantic layouts, typography, bespoke color palettes, and interactive components in real time.'
    },
    {
      icon: <MessageSquareCode className="w-5 h-5 text-neutral-300" />,
      title: 'Iterative Conversational Co-Pilot',
      description: 'Refine in real time. Simply say "Add a pricing table" or "Switch to ocean blue", and BRAHMA modifies the existing architecture non-destructively.'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      title: 'Responsive Multi-Device Preview',
      description: 'Inspect live rendered websites in Desktop, Tablet, and Mobile viewport modes with real-time resizing and isolated internal navigation.'
    },
    {
      icon: <FolderGit2 className="w-5 h-5 text-emerald-400" />,
      title: 'Real Project File Architecture',
      description: 'Explore full project trees with package.json, React App.jsx, modular components, and README ready for git repository push.'
    },
    {
      icon: <Download className="w-5 h-5 text-amber-400" />,
      title: 'One-Click ZIP Code Export',
      description: 'Download the entire source bundle as a clean ZIP archive. Run locally with npm install and npm run dev with zero vendor friction.'
    },
    {
      icon: <Rocket className="w-5 h-5 text-[#FF00A8]" />,
      title: 'Instant Live Edge Deployment',
      description: 'Deploy your generated site to the web in one click. Receive a permanent public production link with SSL to share immediately.'
    }
  ];

  return (
    <section id="features" className="py-24 border-t border-[#1a1a1a] bg-[#070707] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF00A8] bg-[#141414] border border-[#262626] px-3.5 py-1.5 rounded-full">
            ARCHITECTURE & CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            Engineered for Modern Web Builders
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            No proprietary visual drag-and-drop constraints. Experience an intelligent developer-first workflow that outputs real, clean, production-grade code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#0c0c0c] border border-[#1f1f1f] hover:border-[#FF00A8]/40 transition-all duration-300 space-y-4 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center mb-5 group-hover:border-[#FF00A8]/40 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold font-display text-white">{feat.title}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-2">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
