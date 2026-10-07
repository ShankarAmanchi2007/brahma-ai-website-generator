import React, { useState } from 'react';
import { FileCode, FileJson, FileText, Copy, Check, Folder, ChevronDown } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function FileExplorer() {
  const { files, currentProject } = useProject();
  const [selectedFile, setSelectedFile] = useState(files[0] || null);
  const [copied, setCopied] = useState(false);

  const activeFile = selectedFile || files[0];

  const handleCopy = () => {
    if (!activeFile?.content) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFileIcon = (fileName = '') => {
    if (fileName.endsWith('.json')) return <FileJson className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    if (fileName.endsWith('.jsx') || fileName.endsWith('.js')) return <FileCode className="w-3.5 h-3.5 text-[#FF00A8] shrink-0" />;
    if (fileName.endsWith('.html')) return <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    return <FileText className="w-3.5 h-3.5 text-neutral-400 shrink-0" />;
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-[#050505] overflow-hidden font-mono text-xs">
      {/* File Tree Left Pane */}
      <div className="w-full md:w-64 border-r border-[#1a1a1a] bg-[#080808] p-4 flex flex-col shrink-0">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#1a1a1a] text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
          <Folder className="w-4 h-4 text-[#FF00A8]" />
          <span>PROJECT ARCHITECTURE</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1">
          <div className="text-[11px] font-semibold text-neutral-500 px-2 py-1 flex items-center gap-1.5">
            <ChevronDown className="w-3.5 h-3.5 text-neutral-600" />
            <span>{(currentProject?.projectName || 'project').toLowerCase().replace(/[^a-z0-9]/g, '-')}</span>
          </div>

          <div className="pl-4 space-y-1">
            {files.map((file) => {
              const isSelected = activeFile?.filePath === file.filePath;
              return (
                <button
                  key={file._id || file.filePath}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-left transition ${
                    isSelected
                      ? 'bg-[#181818] text-white border border-[#2a2a2a] font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-[#111111]'
                  }`}
                >
                  {getFileIcon(file.fileName || file.filePath)}
                  <span className="truncate">{file.filePath || file.fileName}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-[#1a1a1a] text-[10px] text-neutral-500 text-center uppercase tracking-wider">
          {files.length} compiled project files
        </div>
      </div>

      {/* Code Viewer Right Pane */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#060606] overflow-hidden">
        {activeFile ? (
          <>
            {/* Code Header */}
            <div className="h-11 border-b border-[#1a1a1a] bg-[#080808] px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs text-neutral-300 truncate">
                {getFileIcon(activeFile.fileName || activeFile.filePath)}
                <span className="font-semibold">{activeFile.filePath || activeFile.fileName}</span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#141414] hover:bg-[#1c1c1c] border border-[#262626] text-neutral-300 hover:text-white transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Body with Line Numbers */}
            <div className="flex-1 overflow-auto p-4 text-xs leading-relaxed bg-[#050505] flex select-text">
              {/* Line numbers */}
              <div className="pr-4 select-none text-neutral-600 text-right shrink-0 border-r border-[#1a1a1a] mr-4">
                {(activeFile.content || '').split('\n').map((_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code text */}
              <pre className="text-neutral-200 overflow-x-auto flex-1 leading-6">
                <code>{activeFile.content}</code>
              </pre>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-600 text-xs uppercase tracking-wider">
            Select a file to inspect source code.
          </div>
        )}
      </div>
    </div>
  );
}
