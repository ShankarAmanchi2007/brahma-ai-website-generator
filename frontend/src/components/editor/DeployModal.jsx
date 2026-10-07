import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useProject } from '../../context/ProjectContext';
import { Rocket, CheckCircle2, Loader2, Globe, ExternalLink, Copy, Check } from 'lucide-react';

export default function DeployModal({ isOpen, onClose }) {
  const { currentProject, deployWebsite, deploying, deployStatus } = useProject();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleStartDeploy = async () => {
    if (!currentProject) return;
    setError('');
    try {
      await deployWebsite(currentProject._id || currentProject.id);
    } catch (err) {
      setError(err.message || 'Deployment encountered an error');
    }
  };

  const handleCopyUrl = () => {
    if (!deployStatus?.url) return;
    navigator.clipboard.writeText(deployStatus.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { key: 'validating', label: 'Validating HTML structure & assets' },
    { key: 'building', label: 'Compiling optimized production bundle' },
    { key: 'uploading', label: 'Uploading files to global CDN edge' },
    { key: 'deploying', label: 'Generating secure SSL & public route' }
  ];

  const isLive = deployStatus?.step === 'live';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deploy Website with BRAHMA" maxWidth="max-w-lg">
      <div className="space-y-6">
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {!deploying && !isLive && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#141414] border border-[#222222] text-xs space-y-1">
              <h4 className="font-bold text-white text-sm">One-Click Instant Edge Hosting</h4>
              <p className="text-neutral-400">
                Publish "{currentProject?.projectName}" to a permanent public link accessible from any browser worldwide.
              </p>
            </div>

            <div className="space-y-2 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automatic global edge routing & static caching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Full responsive viewport support & interactive forms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Permanent live URL generated immediately</span>
              </div>
            </div>

            <button
              onClick={handleStartDeploy}
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-xl shadow-[#FF00A8]/20 transition flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>Launch Live Deployment</span>
            </button>
          </div>
        )}

        {deploying && (
          <div className="py-6 space-y-6 text-center">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-[#FF00A8]/20 border-t-[#FF00A8] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-[#FF00A8]">
                <Rocket className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider font-mono">Deploying Application</h3>
              <p className="text-xs text-neutral-400">Connecting to global edge infrastructure...</p>
            </div>

            {/* Stepper Status UI */}
            <div className="max-w-xs mx-auto space-y-2 text-left pt-2 font-mono">
              {steps.map((st, i) => {
                const currentIdx = steps.findIndex(s => s.key === deployStatus?.step);
                const isPassed = currentIdx > i;
                const isCurrent = currentIdx === i;

                return (
                  <div key={st.key} className="flex items-center gap-2.5 text-xs">
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-[#FF00A8] animate-spin shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-neutral-800 shrink-0 flex items-center justify-center text-[10px] text-neutral-600">
                        {i + 1}
                      </span>
                    )}
                    <span className={isCurrent ? 'text-white font-semibold' : isPassed ? 'text-emerald-300' : 'text-neutral-600'}>
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isLive && (
          <div className="py-4 space-y-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center mx-auto text-xl shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold font-display text-white">Your website is live!</h3>
              <p className="text-xs text-neutral-400">
                "{currentProject?.projectName}" is successfully deployed and accessible worldwide.
              </p>
            </div>

            {/* Public URL Box */}
            <div className="p-3.5 rounded-2xl bg-[#111111] border border-[#222222] flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5 min-w-0">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-neutral-200 truncate font-mono select-all">
                  {deployStatus.url}
                </span>
              </div>
              <button
                onClick={handleCopyUrl}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition shrink-0"
                title="Copy URL"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href={deployStatus.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition flex items-center gap-2"
              >
                <span>Open Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-[#141414] transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
