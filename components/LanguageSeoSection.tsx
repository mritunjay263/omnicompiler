'use client';

import React from 'react';
import { LanguageConfig } from '@/lib/languages';
import { BRAND } from '@/lib/brand';
import { BookOpen, Terminal, CheckCircle2, HelpCircle, Cpu, Zap, ShieldAlert } from 'lucide-react';

interface LanguageSeoSectionProps {
  language: LanguageConfig;
}

export function LanguageSeoSection({ language }: LanguageSeoSectionProps) {
  return (
    <section className="w-full bg-[var(--bg-main)] border-t border-[var(--border-color)] py-14 px-4 md:px-12 text-[var(--text-primary)]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Main Title & Overview */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Zero-Setup In-Browser Runtime • Version {language.version}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] flex items-center gap-3">
            <span>{language.icon}</span>
            <span>{language.name} Online Compiler &amp; Interactive IDE</span>
          </h1>

          <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-4xl">
            {language.overview}
          </p>
        </div>

        {/* Taking inputs (stdin) */}
        <div className="p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-lg space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
              <Terminal className="h-5 w-5" />
              <span>Standard Input (STDIN) Stream in {language.name}</span>
            </h2>
            <span className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-panel)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
              Interactive Console
            </span>
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {language.stdinHelp}
          </p>

          <div className="p-4 rounded-2xl bg-[var(--bg-panel)] border border-[var(--border-color)] font-mono text-xs text-[var(--text-primary)] overflow-x-auto">
            {language.templates.find((t) => t.stdin)?.code || language.defaultCode}
          </div>
        </div>

        {/* Syntax Help & Tutorial */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-indigo-400" />
              <span>{language.name} Syntax Reference &amp; Core Patterns</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {language.syntaxHelp.map((sec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-md space-y-3"
              >
                <h3 className="text-base font-bold text-indigo-300">{sec.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {sec.content}
                </p>
                {sec.codeSnippet && (
                  <pre className="p-3.5 rounded-2xl bg-[var(--bg-panel)] border border-[var(--border-color)] font-mono text-[11px] text-[var(--text-primary)] overflow-x-auto">
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
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-400" />
              <span>Supported Standard Packages &amp; Ecosystem Modules</span>
            </h2>
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--bg-panel)] border-b border-[var(--border-color)]">
                  <tr>
                    <th className="p-4 font-bold text-[var(--text-primary)] w-48">Library / Package</th>
                    <th className="p-4 font-bold text-[var(--text-primary)]">Capabilities &amp; Primary Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {language.supportedLibraries.map((lib, i) => (
                    <tr key={i} className="hover:bg-[var(--bg-panel)]/50 transition-colors">
                      <td className="p-4 font-semibold text-indigo-400 font-mono">{lib.name}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{lib.description}</td>
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

          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Is {BRAND.name}&apos;s {language.name} online compiler completely free?
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Yes. You can write, compile, execute, test, and share {language.name} programs completely free with no software installation or registration required.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                How fast is the execution on {BRAND.name}?
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Code executes in high-performance isolated sandboxes with low compilation latency, outputting stdout and execution metrics in milliseconds.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Can I share my code and test cases with others?
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Yes. Click the Share button in the navigation bar to generate a persistent link that encapsulates your code, files, and STDIN inputs for seamless collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
