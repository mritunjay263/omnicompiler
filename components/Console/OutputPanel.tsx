'use client';

import React, { useState } from 'react';
import {
  Terminal,
  FileText,
  Copy,
  Trash2,
  Check,
  Zap,
  HardDrive,
  Eye,
  Database,
  BookOpen,
} from 'lucide-react';
import { WebPreview } from './WebPreview';
import { TableViewer } from './TableViewer';
import { LanguageConfig } from '@/lib/languages';

export interface ConsoleOutput {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  memory?: string;
  status: 'idle' | 'running' | 'success' | 'error' | 'timeout';
  runner?: string;
}

interface OutputPanelProps {
  output: ConsoleOutput;
  stdin: string;
  onChangeStdin: (val: string) => void;
  onClear: () => void;
  language: LanguageConfig;
  activeHtmlCode?: string;
}

export function OutputPanel({
  output,
  stdin,
  onChangeStdin,
  onClear,
  language,
  activeHtmlCode = '',
}: OutputPanelProps) {
  const isWeb = language.id === 'html';
  const isSql = language.id === 'sql';

  const [activeTab, setActiveTab] = useState<'output' | 'stdin' | 'preview' | 'table' | 'cheatsheet'>(
    isWeb ? 'preview' : isSql ? 'table' : 'output'
  );
  const [copied, setCopied] = useState(false);

  // Automatically switch tab when executing or receiving output
  React.useEffect(() => {
    if (output.status === 'running' || output.status === 'success' || output.status === 'error') {
      if (isSql && output.status === 'success') {
        setActiveTab('table');
      } else if (!isWeb) {
        setActiveTab('output');
      }
    }
  }, [output.status, isWeb, isSql]);

  const handleCopy = () => {
    const text = [output.stdout, output.stderr].filter(Boolean).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-card)] overflow-hidden border-t md:border-t-0 md:border-l border-[var(--border-color)]">
      {/* Console Tab Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-panel)] px-2 h-10 select-none">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('output')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs font-semibold transition-all border-t-2 ${
              activeTab === 'output'
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border-indigo-500 shadow-sm'
                : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            <span>Output</span>
            {output.status === 'running' && (
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('stdin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs font-semibold transition-all border-t-2 ${
              activeTab === 'stdin'
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border-indigo-500 shadow-sm'
                : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-emerald-400" />
            <span>STDIN</span>
            {stdin.trim() && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            )}
          </button>

          {isWeb && (
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs font-semibold transition-all border-t-2 ${
                activeTab === 'preview'
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border-indigo-500 shadow-sm'
                  : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
              }`}
            >
              <Eye className="h-3.5 w-3.5 text-cyan-400" />
              <span>Preview</span>
            </button>
          )}

          {isSql && (
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs font-semibold transition-all border-t-2 ${
                activeTab === 'table'
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border-indigo-500 shadow-sm'
                  : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
              }`}
            >
              <Database className="h-3.5 w-3.5 text-purple-400" />
              <span>Table View</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs font-semibold transition-all border-t-2 ${
              activeTab === 'cheatsheet'
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border-indigo-500 shadow-sm'
                : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-400" />
            <span>Cheatsheet</span>
          </button>
        </div>

        {/* Output Action Buttons */}
        <div className="flex items-center gap-1">
          {activeTab === 'output' && (
            <>
              <button
                onClick={handleCopy}
                title="Copy Output"
                className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={onClear}
                title="Clear Output"
                className="p-1.5 rounded text-[var(--text-secondary)] hover:text-rose-400 hover:bg-[var(--bg-card)] transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Output Status Banner */}
      {output.status !== 'idle' && (
        <div className="flex items-center justify-between px-3 py-1 bg-[var(--bg-panel)]/60 border-b border-[var(--border-color)] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                output.status === 'success'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : output.status === 'error'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : output.status === 'timeout'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
              }`}
            >
              {output.status}
            </span>
            {output.runner && (
              <span className="text-[var(--text-secondary)]">({output.runner})</span>
            )}
          </div>

          <div className="flex items-center gap-3 text-[var(--text-secondary)]">
            {output.executionTime > 0 && (
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-amber-400" />
                <span>{output.executionTime}ms</span>
              </span>
            )}
            {output.memory && (
              <span className="flex items-center gap-1">
                <HardDrive className="h-3 w-3 text-cyan-400" />
                <span>{output.memory}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Tab Panels */}
      <div className="flex-1 overflow-auto relative">
        {/* OUTPUT TAB */}
        {activeTab === 'output' && (
          <div className="p-3 font-mono text-xs leading-relaxed select-text min-h-full">
            {output.status === 'idle' && !output.stdout && !output.stderr && (
              <div className="flex flex-col items-center justify-center h-48 text-[var(--text-secondary)]">
                <Terminal className="h-8 w-8 mb-2 opacity-40 text-indigo-400" />
                <span>Click &quot;Run&quot; or press ⌘↵ to execute code.</span>
              </div>
            )}

            {output.status === 'running' && (
              <div className="flex items-center gap-2 text-indigo-400">
                <div className="h-3.5 w-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                <span>Executing program...</span>
              </div>
            )}

            {output.stdout && (
              <pre className="text-[var(--text-primary)] whitespace-pre-wrap break-words">
                {output.stdout}
              </pre>
            )}

            {output.stderr && (
              <pre className="text-rose-400 whitespace-pre-wrap break-words mt-2 p-2 rounded bg-rose-500/10 border border-rose-500/20">
                {output.stderr}
              </pre>
            )}
          </div>
        )}

        {/* STDIN TAB */}
        {activeTab === 'stdin' && (
          <div className="flex flex-col h-full p-3">
            <div className="text-xs text-[var(--text-secondary)] mb-2">
              Supply inputs below for interactive prompts (e.g. `input()`, `cin`, `Scanner`):
            </div>
            <textarea
              value={stdin}
              onChange={(e) => onChangeStdin(e.target.value)}
              placeholder="Enter inputs here (one per line)..."
              className="flex-1 w-full bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-lg p-3 text-xs font-mono text-[var(--text-primary)] outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>
        )}

        {/* WEB PREVIEW TAB */}
        {activeTab === 'preview' && <WebPreview htmlCode={activeHtmlCode} />}

        {/* SQL TABLE VIEW TAB */}
        {activeTab === 'table' && <TableViewer rawOutput={output.stdout} />}

        {/* CHEATSHEET TAB */}
        {activeTab === 'cheatsheet' && (
          <div className="p-4 space-y-4 text-xs text-[var(--text-primary)]">
            <div className="font-bold text-sm text-indigo-400 flex items-center gap-1.5">
              <span>{language.icon}</span>
              <span>{language.name} Quick Reference</span>
            </div>

            <p className="text-[var(--text-secondary)] leading-relaxed">{language.overview}</p>

            <div className="space-y-3">
              {language.syntaxHelp.map((sec, i) => (
                <div key={i} className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)]">
                  <div className="font-semibold text-indigo-300 mb-1">{sec.title}</div>
                  <p className="text-[var(--text-secondary)] mb-2">{sec.content}</p>
                  {sec.codeSnippet && (
                    <pre className="p-2 rounded bg-[var(--bg-card)] font-mono text-[11px] text-[var(--text-primary)] overflow-x-auto border border-[var(--border-color)]">
                      {sec.codeSnippet}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
