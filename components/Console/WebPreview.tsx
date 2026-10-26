'use client';

import React, { useState, useEffect } from 'react';
import { Monitor, Tablet, Smartphone, RotateCcw, ExternalLink } from 'lucide-react';

interface WebPreviewProps {
  htmlCode: string;
}

export function WebPreview({ htmlCode }: WebPreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  const reload = () => setKey((k) => k + 1);

  const getWidth = () => {
    if (device === 'mobile') return '375px';
    if (device === 'tablet') return '768px';
    return '100%';
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-card)]">
      {/* Device Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border-color)] bg-[var(--bg-panel)] text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded ${device === 'desktop' ? 'bg-indigo-600/20 text-indigo-400 font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            title="Desktop View (100%)"
          >
            <Monitor className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded ${device === 'tablet' ? 'bg-indigo-600/20 text-indigo-400 font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            title="Tablet View (768px)"
          >
            <Tablet className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded ${device === 'mobile' ? 'bg-indigo-600/20 text-indigo-400 font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            title="Mobile View (375px)"
          >
            <Smartphone className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={reload}
            title="Reload Preview"
            className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reload</span>
          </button>
        </div>
      </div>

      {/* Sandboxed Iframe Container */}
      <div className="flex-1 flex items-center justify-center p-2 overflow-auto bg-slate-950/40">
        <div
          style={{ width: getWidth(), height: '100%' }}
          className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 border border-slate-700/50"
        >
          <iframe
            key={key}
            srcDoc={htmlCode}
            title="Interactive Preview"
            sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
