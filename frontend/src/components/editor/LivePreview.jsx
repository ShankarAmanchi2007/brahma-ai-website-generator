import React, { useState, useRef, useMemo } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

/**
 * Injects isolation policies, <base target="_self">, and link interceptors into the preview HTML
 * to ensure that all clicks, section jumps, and navigation events stay strictly within the preview iframe.
 * Never allows child navigation to bubble to or hijack the parent application window.
 */
function prepareIsolatedPreviewHtml(rawHtml) {
  if (!rawHtml) return '';

  const isolationScript = `
  <base target="_self">
  <script>
    (function() {
      // Prevent generated scripts from modifying top or parent window navigation
      try {
        Object.defineProperty(window, 'top', { get: function() { return window; } });
        Object.defineProperty(window, 'parent', { get: function() { return window; } });
      } catch (err) {}

      // Intercept all link clicks in capture phase to guarantee they stay inside the preview
      document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (!link) return;

        var href = link.getAttribute('href');
        if (!href) return;

        // Stop propagation so top-level browser history/hash is never touched
        e.preventDefault();
        e.stopPropagation();

        // 1. In-page Hash anchor (e.g., #about, #menu, #projects, #contact, #)
        if (href.startsWith('#')) {
          var targetId = href.slice(1);
          if (!targetId || targetId === '' || targetId === '!' || targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            var targetEl = document.getElementById(targetId) || document.querySelector(href);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
          return false;
        }

        // 2. Relative path navigation (e.g., /, /about, /contact, /menu, /pricing)
        if (href.startsWith('/')) {
          var sectionName = href.replace(/^\\/+/, '');
          if (!sectionName) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            var el = document.getElementById(sectionName);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
          return false;
        }

        // 3. External links
        if (href.startsWith('http://') || href.startsWith('https://')) {
          window.open(href, '_blank', 'noopener,noreferrer');
          return false;
        }

        // 4. Default fallback: search for matching element by id
        var fallbackEl = document.getElementById(href);
        if (fallbackEl) {
          fallbackEl.scrollIntoView({ behavior: 'smooth' });
        }
        return false;
      }, true); // true = Capture phase ensures it runs before any other listener
    })();
  </script>
  `;

  // Inject right before </head>, or at beginning of <body>, or prepend
  if (rawHtml.includes('</head>')) {
    return rawHtml.replace('</head>', isolationScript + '</head>');
  } else if (rawHtml.includes('<body>')) {
    return rawHtml.replace('<body>', '<body>' + isolationScript);
  }
  return isolationScript + rawHtml;
}

export default function LivePreview() {
  const { previewHtml, deviceMode, iterating, generating } = useProject();
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef(null);

  const isolatedHtml = useMemo(() => {
    return prepareIsolatedPreviewHtml(previewHtml);
  }, [previewHtml]);

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  const viewportSizes = {
    desktop: { width: '100%', height: '100%', label: '100% Responsive' },
    tablet: { width: '768px', height: '94%', label: 'Tablet 768px' },
    mobile: { width: '375px', height: '90%', label: 'Mobile 375px' }
  };

  const currentSize = viewportSizes[deviceMode] || viewportSizes.desktop;

  return (
    <div className="flex-1 bg-[#050505] flex flex-col h-[calc(100vh-4rem)] overflow-hidden relative">
      {/* Top Preview Status Bar */}
      <div className="h-10 border-b border-[#1a1a1a] bg-[#070707] px-4 flex items-center justify-between text-xs text-neutral-400 shrink-0 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="uppercase text-[11px] tracking-wider">BRAHMA Live Viewport</span>
          <span className="text-neutral-700">•</span>
          <span className="text-[11px] text-neutral-400">{currentSize.label}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-1 hover:text-white rounded transition hover:bg-[#141414]"
            title="Reload Preview Frame"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-6 bg-[#040404] relative">
        {/* Loading overlay during iterative update */}
        {(iterating || generating) && (
          <div className="absolute inset-0 z-30 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#FF00A8] animate-spin" />
            <p className="text-xs font-mono tracking-wider uppercase text-white font-semibold">Synthesizing changes in real-time...</p>
          </div>
        )}

        {previewHtml ? (
          <div
            style={{ width: currentSize.width, height: currentSize.height }}
            className={`transition-all duration-300 relative flex flex-col ${
              deviceMode !== 'desktop'
                ? 'rounded-[2.5rem] border-[10px] border-[#141414] shadow-2xl bg-black overflow-hidden ring-1 ring-[#262626]'
                : 'w-full h-full rounded-xl border border-[#1a1a1a] overflow-hidden shadow-2xl'
            }`}
          >
            {/* Mobile Notch simulation */}
            {deviceMode === 'mobile' && (
              <div className="h-6 bg-black flex items-center justify-center relative shrink-0">
                <div className="w-24 h-4 bg-[#141414] rounded-b-xl flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#222222]"></div>
                </div>
              </div>
            )}

            {/* Tablet Camera simulation */}
            {deviceMode === 'tablet' && (
              <div className="h-5 bg-black flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#1c1c1c]"></div>
              </div>
            )}

            {/* Live Isolated Interactive Iframe */}
            <iframe
              key={iframeKey}
              ref={iframeRef}
              srcDoc={isolatedHtml}
              title="Website Live Preview"
              sandbox="allow-scripts allow-forms allow-modals"
              className="w-full flex-1 border-0 bg-white"
            />

            {/* Mobile Home Bar simulation */}
            {deviceMode === 'mobile' && (
              <div className="h-4 bg-black flex items-center justify-center shrink-0">
                <div className="w-28 h-1 bg-[#2a2a2a] rounded-full"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8 text-neutral-500 space-y-2 font-mono text-xs">
            <p>No preview content available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
