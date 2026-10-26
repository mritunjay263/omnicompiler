'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ArrowRight, Copy, Check, Terminal } from 'lucide-react';
import { LANGUAGES } from '@/lib/languages';

export default function CheatsheetsPage() {
  const [selectedLang, setSelectedLang] = useState('python');
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const lang = LANGUAGES[selectedLang] || LANGUAGES.python;

  const copySnippet = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white font-black text-lg shadow-md">
              &lt;/&gt;
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[var(--text-primary)]">
              OneCompiler Cheatsheets
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/${lang.id}`}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Open {lang.name} IDE</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full flex-1 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar: Language Picker */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] px-2 mb-3">
            Select Language
          </div>

          <div className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
            {Object.values(LANGUAGES).map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedLang(l.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 md:shrink ${
                  l.id === selectedLang
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{l.icon}</span>
                  <span>{l.name}</span>
                </div>
                <span className="text-[10px] opacity-75 font-mono">{l.extension}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content: Language Cheatsheet Details */}
        <div className="flex-1 space-y-8">
          <div className="p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{lang.icon}</span>
                <div>
                  <h1 className="text-2xl font-black text-[var(--text-primary)]">
                    {lang.name} Syntax Cheat Sheet
                  </h1>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Version {lang.version} • Quick reference syntax and standard operations
                  </p>
                </div>
              </div>

              <Link
                href={`/${lang.id}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold transition-all"
              >
                <span>Run in {lang.name} IDE</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{lang.overview}</p>
          </div>

          {/* Syntax Cards */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              <span>Core Language Concepts</span>
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {lang.syntaxHelp.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-indigo-300">{sec.title}</h3>
                    {sec.codeSnippet && (
                      <button
                        onClick={() => copySnippet(sec.codeSnippet!, idx)}
                        className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        {copiedIndex === idx ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{sec.content}</p>

                  {sec.codeSnippet && (
                    <pre className="p-3 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-color)] font-mono text-xs text-[var(--text-primary)] overflow-x-auto">
                      {sec.codeSnippet}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
