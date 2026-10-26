'use client';

import React, { useState } from 'react';
import { Sparkles, X, Lightbulb, Wrench, Zap, FlaskConical, Copy, Check } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
  lastError?: string;
}

export function AiAssistantModal({
  isOpen,
  onClose,
  code,
  language,
  lastError,
}: AiAssistantModalProps) {
  const [action, setAction] = useState<'explain' | 'fix' | 'optimize' | 'testcases'>('explain');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleAsk = async (selectedAction = action) => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: selectedAction,
          code,
          language,
          error: lastError,
        }),
      });
      const data = await res.json();
      setResponse(data.result || 'No analysis available.');
    } catch {
      setResponse('Failed to reach AI assistant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-2xl border border-purple-500/30 bg-[var(--bg-card)] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-color)] bg-gradient-to-r from-purple-900/30 via-[var(--bg-card)] to-indigo-900/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--text-primary)]">AI Code Copilot</div>
              <div className="text-[11px] text-[var(--text-secondary)]">
                Intelligent Assistant for {language.toUpperCase()}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Selectors */}
        <div className="grid grid-cols-4 border-b border-[var(--border-color)] bg-[var(--bg-panel)] text-xs">
          <button
            onClick={() => {
              setAction('explain');
              handleAsk('explain');
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 font-medium border-b-2 transition-all ${
              action === 'explain'
                ? 'border-purple-500 text-purple-400 bg-[var(--bg-card)] font-bold'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Explain</span>
          </button>

          <button
            onClick={() => {
              setAction('fix');
              handleAsk('fix');
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 font-medium border-b-2 transition-all ${
              action === 'fix'
                ? 'border-purple-500 text-purple-400 bg-[var(--bg-card)] font-bold'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Wrench className="h-3.5 w-3.5" />
            <span>Fix Bug</span>
          </button>

          <button
            onClick={() => {
              setAction('optimize');
              handleAsk('optimize');
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 font-medium border-b-2 transition-all ${
              action === 'optimize'
                ? 'border-purple-500 text-purple-400 bg-[var(--bg-card)] font-bold'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Optimize</span>
          </button>

          <button
            onClick={() => {
              setAction('testcases');
              handleAsk('testcases');
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 font-medium border-b-2 transition-all ${
              action === 'testcases'
                ? 'border-purple-500 text-purple-400 bg-[var(--bg-card)] font-bold'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <FlaskConical className="h-3.5 w-3.5" />
            <span>Testcases</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-5 overflow-y-auto font-sans text-xs leading-relaxed text-[var(--text-primary)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-3">
              <div className="h-8 w-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-purple-300 font-medium">Analyzing your code with AI...</div>
            </div>
          ) : response ? (
            <div className="space-y-3 whitespace-pre-wrap font-sans">{response}</div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center text-[var(--text-secondary)]">
              <Sparkles className="h-10 w-10 mb-3 text-purple-400 opacity-50" />
              <div className="font-semibold text-sm text-[var(--text-primary)]">Ready to Assist</div>
              <p className="max-w-xs mt-1">
                Select an option above to generate an instant explanation, fix runtime bugs, or optimize your code.
              </p>
              <button
                onClick={() => handleAsk()}
                className="mt-4 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-md shadow-purple-600/30"
              >
                Start Analysis
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {response && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-panel)]">
            <span className="text-[11px] text-[var(--text-secondary)]">
              AI recommendations may need validation.
            </span>
            <button
              onClick={copyResult}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-purple-500 text-xs font-medium text-[var(--text-primary)] transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Result'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
