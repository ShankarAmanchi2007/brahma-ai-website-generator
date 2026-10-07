import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useProject } from '../../context/ProjectContext';
import { Wand2, Loader2, CheckCircle2 } from 'lucide-react';

export default function NewProjectModal({ isOpen, onClose, onProjectCreated }) {
  const { createProject, generating } = useProject();
  const [prompt, setPrompt] = useState('');
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [generationStep, setGenerationStep] = useState(0);

  const samplePrompts = [
    {
      title: 'Modern Developer Portfolio',
      text: 'Create a modern portfolio website for a software engineering student with a dark theme, projects section, skills section, contact form and responsive design.'
    },
    {
      title: 'Gourmet Bistro & Lounge',
      text: 'Create a restaurant website with a premium dark theme, hero section, menu, about section, customer reviews and contact information.'
    },
    {
      title: 'AI SaaS Landing Platform',
      text: 'Create a SaaS marketing website for an AI analytics platform with pricing table, interactive features, reviews, and dark carbon aesthetics with magenta accents.'
    },
    {
      title: 'Minimalist Boutique Store',
      text: 'Create a clean minimalist e-commerce store with product gallery, modern layout, customer reviews, and newsletter subscription.'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a website description prompt');
      return;
    }

    setError('');
    // Animate progress steps
    setGenerationStep(1);
    const stepInterval = setInterval(() => {
      setGenerationStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 850);

    try {
      const project = await createProject(prompt.trim(), projectName.trim());
      clearInterval(stepInterval);
      setGenerationStep(0);
      onClose();
      if (onProjectCreated) onProjectCreated(project);
    } catch (err) {
      clearInterval(stepInterval);
      setGenerationStep(0);
      setError(err.message || 'Generation failed. Please try again.');
    }
  };

  const stepsList = [
    'Synthesizing design architecture & color system...',
    'Generating semantic layout & responsive React markup...',
    'Styling with modern Tailwind CSS & typography...',
    'Compiling project files & isolated preview bundle...'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Website with BRAHMA" maxWidth="max-w-2xl">
      {generating ? (
        <div className="py-12 px-6 text-center space-y-6">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-[#FF00A8]/20 border-t-[#FF00A8] animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-neutral-700/30 border-b-white animate-spin" style={{ animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF00A8] animate-pulse"></span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold font-display text-white">Synthesizing Your Website</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              BRAHMA is structuring components, designing layouts, and compiling your preview in real time.
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="max-w-md mx-auto space-y-2 text-left pt-2 font-mono">
            {stepsList.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs">
                {generationStep > idx + 1 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : generationStep === idx + 1 ? (
                  <Loader2 className="w-4 h-4 text-[#FF00A8] animate-spin shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-neutral-800 shrink-0 flex items-center justify-center text-[10px] text-neutral-600">
                    {idx + 1}
                  </span>
                )}
                <span className={generationStep === idx + 1 ? 'text-white font-medium' : generationStep > idx + 1 ? 'text-emerald-300' : 'text-neutral-600'}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Project Name <span className="text-neutral-500">(Optional)</span>
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Acme Tech Portfolio or Gusto Bistro"
              className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Natural Language Prompt <span className="text-[#FF00A8]">*</span>
            </label>
            <div className="relative">
              <textarea
                rows={4}
                required
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the website you want to build... (e.g., Create a modern restaurant website with dark theme, hero, menu, customer reviews, and contact form)"
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] transition resize-none"
              />
            </div>
          </div>

          {/* Example prompt pills */}
          <div>
            <span className="text-xs font-mono font-semibold text-neutral-400 block mb-2">QUICK INSPIRATION TEMPLATES:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {samplePrompts.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPrompt(item.text);
                    setProjectName(item.title);
                  }}
                  className="p-3 rounded-xl bg-[#121212] border border-[#1f1f1f] hover:border-[#FF00A8]/50 hover:bg-[#161616] text-left transition text-xs text-neutral-300 group"
                >
                  <div className="font-bold text-white group-hover:text-[#FF00A8] transition flex items-center justify-between">
                    <span>{item.title}</span>
                    <Wand2 className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FF00A8]" />
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-1 mt-1 font-sans">{item.text}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#1a1a1a]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold text-neutral-300 hover:text-white hover:bg-[#141414] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-lg shadow-[#FF00A8]/20 transition flex items-center gap-2"
            >
              Generate Website
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
