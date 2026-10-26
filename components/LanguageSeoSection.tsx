'use client';

import React from 'react';
import { LanguageConfig } from '@/lib/languages';
import { BookOpen, Terminal, CheckCircle2, HelpCircle } from 'lucide-react';

interface LanguageSeoSectionProps {
  language: LanguageConfig;
}

export function LanguageSeoSection({ language }: LanguageSeoSectionProps) {
  return (
    <section className="w-full bg-[var(--bg-main)] border-t border-[var(--border-color)] py-12 px-4 md:px-12 text-[var(--text-primary)]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Main Title & Overview */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] flex items-center gap-3">
            <span>{language.icon}</span>
            <span>{language.name} Online Compiler &amp; Interpreter</span>
          </h1>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            {language.overview}
          </p>
        </div>

        {/* Taking inputs (stdin) */}
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
            <Terminal className="h-5 w-5" />
            <span>Taking Inputs via STDIN in {language.name}</span>
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {language.stdinHelp}
          </p>
          <div className="p-4 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-color)] font-mono text-xs text-[var(--text-primary)] overflow-x-auto">
            {language.templates.find((t) => t.stdin)?.code || language.defaultCode}
          </div>
        </div>

        {/* Syntax Help & Tutorial */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-indigo-400" />
            <span>{language.name} Syntax Reference &amp; Tutorial</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {language.syntaxHelp.map((sec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-3"
              >
                <h3 className="text-base font-bold text-indigo-300">{sec.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {sec.content}
                </p>
                {sec.codeSnippet && (
                  <pre className="p-3 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-color)] font-mono text-[11px] text-[var(--text-primary)] overflow-x-auto">
                    {sec.codeSnippet}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Supported Libraries */}
        {language.supportedLibraries && language.supportedLibraries.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Supported Libraries &amp; Modules</h2>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--bg-panel)] border-b border-[var(--border-color)]">
                  <tr>
                    <th className="p-3.5 font-bold text-[var(--text-primary)] w-48">Library / Package</th>
                    <th className="p-3.5 font-bold text-[var(--text-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {language.supportedLibraries.map((lib, i) => (
                    <tr key={i} className="hover:bg-[var(--bg-panel)]/50 transition-colors">
                      <td className="p-3.5 font-semibold text-indigo-400 font-mono">{lib.name}</td>
                      <td className="p-3.5 text-[var(--text-secondary)]">{lib.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Frequently Asked Questions (FAQ) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-indigo-400" />
            <span>Frequently Asked Questions</span>
          </h2>

          <div className="space-y-3">
            <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Is OneCompiler&apos;s {language.name} online runner completely free?
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Yes, you can write, compile, execute, debug, and share {language.name} code completely free with no local installation required.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                How fast is the code execution?
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Programs execute in isolated sandboxed environments with low-latency compilation, returning output typically in under 50 milliseconds.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Can I share my code snippets with others?
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Yes! Click the &quot;Share&quot; button in the top navigation bar to generate a unique URL that preserves your code, files, and STDIN inputs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
