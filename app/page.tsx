'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Terminal,
  Zap,
  Globe,
  Database,
  Code2,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Flame,
  Layers,
  Cpu,
  BookOpen,
  Share2,
} from 'lucide-react';
import { LANGUAGES, POPULAR_LANGUAGE_IDS } from '@/lib/languages';
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
    const matchesQuery = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.id.includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

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
              OneCompiler
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
            <Link href="/python" className="hover:text-[var(--text-primary)] transition-colors">Python</Link>
            <Link href="/javascript" className="hover:text-[var(--text-primary)] transition-colors">JavaScript</Link>
            <Link href="/cpp" className="hover:text-[var(--text-primary)] transition-colors">C++</Link>
            <Link href="/html" className="hover:text-[var(--text-primary)] transition-colors">Web Studio</Link>
            <Link href="/sql" className="hover:text-[var(--text-primary)] transition-colors">Database</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search (⌘K)</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              title="Toggle Theme"
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <Link
              href="/python"
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20"
            >
              Launch IDE
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 sm:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-6 animate-pulse">
          <Flame className="h-3.5 w-3.5 text-amber-400" />
          <span>Over 110+ Compilers &amp; 12.8 Million Developers</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
          Code online with <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 bg-clip-text text-transparent">OneCompiler.</span>
        </h1>

        <p className="mt-4 text-base sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Write, compile, run, and share code in 110+ programming languages, web stacks, and databases with zero setup and instant execution.
        </p>

        {/* Global Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto relative">
          <div className="flex items-center w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-3 shadow-xl focus-within:border-indigo-500 transition-all">
            <Search className="h-5 w-5 text-[var(--text-secondary)] mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Language (e.g. Python, C++, Java, SQLite, HTML)..."
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
          <div className="inline-flex p-1 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-color)] gap-1">
            {(['popular', 'programming', 'web', 'database'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
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
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 hover:border-indigo-500/50 hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{lang.icon}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-secondary)]">
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
                <span>Open IDE</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trusted By Banner */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-panel)]/40 py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Developers from world&apos;s leading tech teams and universities code here
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all text-sm font-bold tracking-wider text-[var(--text-secondary)]">
            <span>GOOGLE</span>
            <span>MICROSOFT</span>
            <span>META</span>
            <span>NVIDIA</span>
            <span>STRIPE</span>
            <span>AMAZON</span>
            <span>HARVARD</span>
            <span>MIT</span>
            <span>STANFORD</span>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Built for Developers, Students &amp; Enterprise Teams
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Zero installation, instant compiler execution, stdin capture, and powerful multi-language tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg">Sub-Second Code Execution</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Compile and run programs in isolated sandboxes with low latency. Outputs, execution time, and memory metrics are returned instantly.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-3">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg">AI Code Assistant</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Integrated AI copilot explains complex algorithms, pinpoints bugs with line-by-line recommendations, and optimizes time complexity.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg">Database &amp; Web Sandboxes</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Execute SQL queries with interactive sortable table views, or write HTML/CSS/JS with live sandboxed browser previews.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-card)] py-12 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              &lt;/&gt;
            </div>
            <span className="font-bold text-[var(--text-primary)]">OneCompiler</span>
            <span>© 2026. Write, run and share code online.</span>
          </div>

          <div className="flex flex-wrap gap-4 font-medium">
            <Link href="/python" className="hover:text-[var(--text-primary)]">Python Compiler</Link>
            <Link href="/javascript" className="hover:text-[var(--text-primary)]">JavaScript Runner</Link>
            <Link href="/cpp" className="hover:text-[var(--text-primary)]">C++ Compiler</Link>
            <Link href="/java" className="hover:text-[var(--text-primary)]">Java IDE</Link>
            <Link href="/sql" className="hover:text-[var(--text-primary)]">SQL Playground</Link>
            <Link href="/html" className="hover:text-[var(--text-primary)]">Web Studio</Link>
          </div>
        </div>
      </footer>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
