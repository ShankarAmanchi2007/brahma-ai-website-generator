import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Lightbulb } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function AIChatPanel() {
  const { currentProject, messages, modifyWithPrompt, iterating } = useProject();
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Change the website to a high-contrast dark theme with magenta accents.',
    'Add a pricing section with 3 tiers.',
    'Make the hero section larger with dual CTA buttons.',
    'Add a customer reviews testimonial section.',
    'Add an interactive contact form with validation.'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, iterating]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!inputVal.trim() || iterating || !currentProject) return;

    const msg = inputVal.trim();
    setInputVal('');

    try {
      await modifyWithPrompt(currentProject._id || currentProject.id, msg);
    } catch (err) {
      console.error('Failed to iterate website:', err);
    }
  };

  const handleQuickPrompt = (promptText) => {
    setInputVal(promptText);
  };

  return (
    <div className="w-full md:w-80 lg:w-96 border-r border-[#1a1a1a] bg-[#070707] flex flex-col h-[calc(100vh-4rem)] shrink-0">
      {/* Chat Header */}
      <div className="p-4 border-b border-[#1a1a1a] bg-[#090909] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#141414] border border-[#262626] text-[#FF00A8] flex items-center justify-center text-xs font-mono font-bold">
            ⚡
          </div>
          <div>
            <h3 className="font-bold text-xs font-display text-white uppercase tracking-wider">BRAHMA Co-Pilot</h3>
            <p className="text-[10px] text-neutral-500 font-mono">Neural Web Architect</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#121212] text-neutral-400 border border-[#222222]">
          {messages.length} msgs
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg._id || idx}
              className={`flex gap-3 text-xs leading-relaxed ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-6 h-6 rounded-md bg-[#141414] text-[#FF00A8] border border-[#262626] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] ${
                  isUser
                    ? 'bg-[#FF00A8] text-white rounded-br-none shadow-md font-sans'
                    : 'bg-[#0f0f0f] border border-[#1f1f1f] text-neutral-200 rounded-bl-none shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.message}</p>
                <span className={`block text-[10px] mt-1.5 font-mono ${isUser ? 'text-pink-100 text-right' : 'text-neutral-500'}`}>
                  {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {isUser && (
                <div className="w-6 h-6 rounded-md bg-[#141414] text-neutral-300 border border-[#262626] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {iterating && (
          <div className="flex gap-3 text-xs items-center text-neutral-400 p-3 rounded-xl bg-[#0e0e0e] border border-[#1f1f1f] animate-pulse font-mono">
            <Loader2 className="w-4 h-4 animate-spin text-[#FF00A8] shrink-0" />
            <span>Refining layout, updating components & recompiling preview...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Suggestions */}
      <div className="px-3 pt-2 pb-1 border-t border-[#1a1a1a] bg-[#090909]">
        <div className="flex items-center gap-1 text-[10px] font-mono uppercase text-neutral-400 mb-1.5">
          <Lightbulb className="w-3 h-3 text-[#FF00A8]" />
          <span>SUGGESTED REFINEMENTS:</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.slice(0, 3).map((qp, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleQuickPrompt(qp)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[#121212] hover:bg-[#181818] border border-[#222222] text-neutral-300 hover:text-white shrink-0 transition"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#1a1a1a] bg-[#070707]">
        <div className="relative">
          <textarea
            rows={2}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Tell BRAHMA what to modify... (e.g. Change theme to carbon and magenta, add pricing)"
            disabled={iterating}
            className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#111111] border border-[#222222] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] transition resize-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || iterating}
            className="absolute right-2.5 bottom-3 p-1.5 rounded-lg bg-[#FF00A8] hover:bg-[#D9008F] text-white disabled:opacity-40 transition"
          >
            {iterating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          </button>
        </div>
        <p className="text-[10px] text-neutral-500 mt-1 text-center font-mono">
          Press <kbd className="px-1 bg-[#141414] border border-[#222222] rounded text-neutral-400">Enter</kbd> to iterate
        </p>
      </form>
    </div>
  );
}
