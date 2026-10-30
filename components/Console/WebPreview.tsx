'use client';

import React, { useState, useMemo } from 'react';
import { Monitor, Tablet, Smartphone, RotateCcw } from 'lucide-react';

interface WebPreviewProps {
  htmlCode: string;
  language?: string;
}

export function WebPreview({ htmlCode, language = 'html' }: WebPreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  const reload = () => setKey((k) => k + 1);

  const getWidth = () => {
    if (device === 'mobile') return '375px';
    if (device === 'tablet') return '768px';
    return '100%';
  };

  const processedDoc = useMemo(() => {
    if (language === 'react') {
      // Clean import statements and mount App
      let cleaned = htmlCode
        .replace(/import\s+React\s*,\s*\{[^}]*\}\s*from\s*['"]react['"];?/g, '')
        .replace(/import\s+React\s+from\s*['"]react['"];?/g, '')
        .replace(/import\s+.*?;/g, '')
        .replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)/g, 'function $1');

      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { margin: 0; background: #ffffff; color: #0f172a; font-family: system-ui, sans-serif; }</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect, useRef, useMemo, useCallback } = React;
    ${cleaned}
    
    try {
      const TargetComponent = typeof App !== 'undefined' ? App : (typeof Counter !== 'undefined' ? Counter : null);
      if (TargetComponent) {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(TargetComponent));
      } else {
        document.getElementById('root').innerHTML = '<div style="padding: 20px; color: #dc2626; font-family: monospace;">Please define a default component named App</div>';
      }
    } catch(err) {
      document.getElementById('root').innerHTML = '<div style="padding: 20px; color: #dc2626; font-family: monospace;">React Render Error: ' + err.message + '</div>';
    }
  </script>
</body>
</html>`;
    }

    if (language === 'markdown') {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css">
  <style>
    body { margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; color: #1e293b; }
    .markdown-body { box-sizing: border-box; min-width: 200px; max-width: 860px; margin: 0 auto; }
  </style>
</head>
<body class="markdown-body">
  <div id="content"></div>
  <script>
    const raw = ${JSON.stringify(htmlCode)};
    document.getElementById('content').innerHTML = marked.parse(raw);
  </script>
</body>
</html>`;
    }

    return htmlCode;
  }, [htmlCode, language]);

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
            srcDoc={processedDoc}
            title="Interactive Preview"
            sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
