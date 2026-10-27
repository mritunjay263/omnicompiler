'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Zap,
  Flame,
  ArrowRight,
  Sparkles,
  Database,
  Globe,
  Terminal,
  Cpu,
  Layers,
  Code2,
  ShieldCheck,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { LANGUAGES } from '@/lib/languages';
import { BRAND } from '@/lib/brand';
import { SearchModal } from '@/components/SearchModal';
import { useTheme } from '@/components/ThemeProvider';

export default function HomePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<'popular' | 'programming' | 'web' | 'database'>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const allLanguages = Object.values(LANGUAGES);
  const displayedLanguages = allLanguages.filter((l) => {
    const matchesCat = activeCategory === 'popular' ? true : l.category === activeCategory;
    const matchesQuery =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 font-black text-xs text-white">
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent font-mono">
                  Ω
                </span>
              </div>
            </div>
            <span className="font-black text-lg tracking-tight text-[var(--text-primary)]">
              {BRAND.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[var(--text-secondary)]">
            <Link href="/python" className="hover:text-[var(--text-primary)] transition-colors">Python</Link>
            <Link href="/javascript" className="hover:text-[var(--text-primary)] transition-colors">JavaScript</Link>
            <Link href="/java" className="hover:text-[var(--text-primary)] transition-colors">Java</Link>
            <Link href="/cpp" className="hover:text-[var(--text-primary)] transition-colors">C++</Link>
            <Link href="/csharp" className="hover:text-[var(--text-primary)] transition-colors">C#</Link>
            <Link href="/rust" className="hover:text-[var(--text-primary)] transition-colors">Rust</Link>
            <Link href="/web" className="hover:text-[var(--text-primary)] transition-colors">Web Studio</Link>
            <Link href="/database" className="hover:text-[var(--text-primary)] transition-colors">SQL</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-panel)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search (⌘K)</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              title="Toggle Theme"
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <Link
              href="/python"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-indigo-600/30"
            >
              Launch Studio
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 sm:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-6 animate-pulse">
          <Flame className="h-3.5 w-3.5 text-amber-400" />
          <span>{BRAND.stats.languages} Compilers • Sub-25ms Execution Latency</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
          Write, Run &amp; Benchmark in <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{BRAND.name}.</span>
        </h1>

        <p className="mt-5 text-base sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          The next-generation in-browser polyglot IDE. Compile and execute Python, Java, C++, Rust, Go, C#, SQL, and web applications with zero installation.
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto relative">
          <div className="flex items-center w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-3.5 shadow-xl focus-within:border-indigo-500 transition-all">
            <Search className="h-5 w-5 text-[var(--text-secondary)] mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search compilers by language (e.g. Python, Rust, Java, SQL, C++)..."
              className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex p-1 rounded-2xl bg-[var(--bg-panel)] border border-[var(--border-color)] gap-1">
            {(['popular', 'programming', 'web', 'database'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Language Compiler Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-20 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedLanguages.map((lang) => (
            <Link
              key={lang.id}
              href={`/${lang.id}`}
              className="group relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 hover:border-indigo-500/60 hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{lang.icon}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg-panel)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                  {lang.extension}
                </span>
              </div>

              <div className="mt-4">
                <div className="font-bold text-sm text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors">
                  {lang.name}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  {lang.version}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[var(--border-color)]/60 flex items-center justify-between text-[11px] text-indigo-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Launch IDE</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Feature Showcase Grid */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-panel)]/40 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enterprise Polyglot Engine Built For Developers
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Real compilers running in high-security isolated sandboxes. Zero latency, instant results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-4 shadow-lg">
              <div className="h-11 w-11 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Sub-25ms Execution</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Native machine-code execution for Clang C/C++, Java 21, Rust, Go, Python 3, and .NET. Captures stdout, stderr, execution time, and memory usage.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-4 shadow-lg">
              <div className="h-11 w-11 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">AI Code Copilot</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Integrated AI assistant provides immediate step-by-step code explanation, automated runtime bug detection, and complexity optimizations.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-4 shadow-lg">
              <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Dedicated Sandboxes</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Execute relational queries in the SQL Table Viewer, or prototype interactive web apps with the live split-screen Web Studio iframe sandbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-card)] py-12 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              Ω
            </div>
            <span className="font-bold text-[var(--text-primary)]">{BRAND.name}</span>
            <span>© 2026. All rights reserved. Universal Polyglot IDE.</span>
          </div>

          <div className="flex flex-wrap gap-5 font-semibold">
            <Link href="/python" className="hover:text-[var(--text-primary)]">Python</Link>
            <Link href="/java" className="hover:text-[var(--text-primary)]">Java</Link>
            <Link href="/cpp" className="hover:text-[var(--text-primary)]">C++</Link>
            <Link href="/csharp" className="hover:text-[var(--text-primary)]">C#</Link>
            <Link href="/rust" className="hover:text-[var(--text-primary)]">Rust</Link>
            <Link href="/go" className="hover:text-[var(--text-primary)]">Go</Link>
            <Link href="/sql" className="hover:text-[var(--text-primary)]">SQL</Link>
            <Link href="/web" className="hover:text-[var(--text-primary)]">Web Studio</Link>
            <Link href="/cheatsheets" className="hover:text-[var(--text-primary)]">Cheatsheets</Link>
          </div>
        </div>
      </footer>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
