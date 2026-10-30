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
  Terminal,
  Cpu,
  Layers,
  Code2,
  ShieldCheck,
  CheckCircle2,
  Share2,
  HelpCircle,
  ChevronDown,
  BookOpen,
  Laptop,
  Activity,
  Check,
} from 'lucide-react';
import { LANGUAGES } from '@/lib/languages';
import { BRAND } from '@/lib/brand';
import { SearchModal } from '@/components/SearchModal';
import { Hero3DTerminal } from '@/components/Hero3DTerminal';
import Logo from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';

export default function HomePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<'all' | 'popular' | 'programming' | 'web' | 'database' | 'scripting'>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const allLanguages = Object.values(LANGUAGES);
  const displayedLanguages = allLanguages.filter((l) => {
    const matchesCat =
      activeCategory === 'all'
        ? true
        : activeCategory === 'popular'
        ? l.category === 'popular' ||
          ['python', 'javascript', 'java', 'cpp', 'html', 'sql', 'typescript', 'rust', 'kotlin', 'react', 'go', 'swift'].includes(l.id)
        : l.category === activeCategory;
    const matchesQuery =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.includes(searchQuery.toLowerCase()) ||
      l.extension.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const faqs = [
    {
      q: 'How does code execution work on OmniCompiler?',
      a: 'OmniCompiler operates a hybrid architecture: web languages (HTML, React 19 JSX, Vue 3, Markdown) compile instantly in client-side WebAssembly and browser sandboxes, while compiled and backend languages (Python, Java, C++, Rust, Go, Swift, Kotlin, Assembly) execute inside isolated cloud microVMs with CPU and memory limits.',
    },
    {
      q: 'Is OmniCompiler completely free to use?',
      a: 'Yes. OmniCompiler is 100% free with no registration, credit card requirement, or mandatory login walls. You can write, run, benchmark, and share code immediately upon opening the site.',
    },
    {
      q: 'Does OmniCompiler support interactive input (STDIN)?',
      a: 'Yes. Every language playground includes a dedicated STDIN tab. You can supply custom test inputs for algorithms, command-line arguments, or user prompts (such as Scanner in Java, input() in Python, or cin in C++).',
    },
    {
      q: 'Which compiler and language versions are supported?',
      a: 'OmniCompiler supports modern runtimes including Python 3.12, Java 21 LTS, C++20 (GCC), C17, Rust 1.82, Go 1.23, .NET 8 (C#), Kotlin 1.9, Swift 5.9, React 19, and 20+ additional languages.',
    },
    {
      q: 'Is my code private and secure?',
      a: 'Yes. All cloud execution runs in ephemeral, read-only sandboxes that are immediately destroyed upon program termination. Your source code is never used for training or persisted without your explicit choice to create a shareable snippet.',
    },
    {
      q: 'Can I use OmniCompiler for LeetCode and competitive programming?',
      a: 'Absolutely. Each compiler page includes curated templates for common algorithms (Two Sum, Binary Search, Graph Traversals, Sorting) and fast standard I/O boilerplate designed specifically for competitive coding and technical interview prep.',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Logo size="md" />
          </Link>

          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-[var(--text-secondary)]">
            <Link href="/python" className="hover:text-[var(--text-primary)] transition-colors">Python</Link>
            <Link href="/java" className="hover:text-[var(--text-primary)] transition-colors">Java</Link>
            <Link href="/cpp" className="hover:text-[var(--text-primary)] transition-colors">C++</Link>
            <Link href="/rust" className="hover:text-[var(--text-primary)] transition-colors">Rust</Link>
            <Link href="/kotlin" className="hover:text-[var(--text-primary)] transition-colors">Kotlin</Link>
            <Link href="/swift" className="hover:text-[var(--text-primary)] transition-colors">Swift</Link>
            <Link href="/react" className="hover:text-[var(--text-primary)] transition-colors">React</Link>
            <Link href="/sql" className="hover:text-[var(--text-primary)] transition-colors">SQL</Link>
            <Link href="/cheatsheets" className="hover:text-[var(--text-primary)] transition-colors">Docs</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-panel)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 transition-all"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search (⌘K)</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 transition-all"
              title="Toggle Theme"
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <Link
              href="/python"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs transition-all shadow-md shadow-indigo-600/30 hover:scale-[1.02]"
            >
              Launch Studio
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-6 px-4 sm:px-8 text-center max-w-5xl mx-auto">
        {/* Dynamic Metric Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-6 shadow-sm">
          <Flame className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
          <span>33 Programming Languages &amp; Frameworks • Zero Toolchain Setup</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
          Universal Cloud Compiler &amp;{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            Multi-Language IDE.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Write, compile, and benchmark code instantly across Python, Java, C++, Rust, Go, Kotlin, Swift, React, and 30+ runtimes. Sub-second execution in isolated sandboxes with interactive STDIN.
        </p>

        {/* CTA Buttons */}
        <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/python"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Launch Python 3.12</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/java"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-indigo-500/50 text-[var(--text-primary)] font-bold text-sm transition-all"
          >
            <span>Run Java 21 LTS</span>
          </Link>
          <Link
            href="/react"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-cyan-500/50 text-[var(--text-primary)] font-bold text-sm transition-all"
          >
            <span>React 19 Sandbox</span>
          </Link>
        </div>

        {/* 3D Perspective Hero Terminal */}
        <Hero3DTerminal />
      </section>

      {/* Trust & Performance Metrics Bar */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-panel)]/40 py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">33+</div>
            <div className="text-xs text-[var(--text-secondary)] font-medium">Supported Languages</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">&lt; 1.2s</div>
            <div className="text-xs text-[var(--text-secondary)] font-medium">Average Cloud Latency</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">0s</div>
            <div className="text-xs text-[var(--text-secondary)] font-medium">Toolchain Installation</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-purple-400">100% Free</div>
            <div className="text-xs text-[var(--text-secondary)] font-medium">Zero Signup Required</div>
          </div>
        </div>
      </section>

      {/* Architecture & Feature Value Pillars */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Engineered for High-Performance Coding
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
            Everything you need to write algorithms, test libraries, and learn new programming languages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-3 hover:border-indigo-500/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--text-primary)]">Isolated Cloud MicroVMs</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Every execution runs in secure, resource-capped sandboxes with strict time and memory limits. Practice without risking host integrity.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-3 hover:border-cyan-500/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--text-primary)]">Interactive Standard Input</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Full interactive STDIN support for competitive programming puzzles, LeetCode algorithms, and programs using Scanner, cin, or input().
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-3 hover:border-emerald-500/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--text-primary)]">Pre-Loaded Algorithm Library</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Instant boilerplates for data structures, two-pointers, binary search, and dynamic programming across all 33 languages with one click.
            </p>
          </div>
        </div>
      </section>

      {/* Polyglot Language Matrix (Interactive Grid) */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full border-t border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Explore 33 Language Compilers
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              Select a language to launch its full-screen IDE workspace.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-72 relative">
            <div className="flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-2 text-xs focus-within:border-indigo-500 transition-colors">
              <Search className="w-4 h-4 text-[var(--text-secondary)] mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search compilers..."
                className="w-full bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-6">
          {(['all', 'popular', 'programming', 'web', 'database', 'scripting'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Compiler Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedLanguages.map((lang) => (
            <Link
              key={lang.id}
              href={`/${lang.id}`}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 hover:border-indigo-500/60 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{lang.icon}</span>
                <div className="flex items-center gap-1">
                  {lang.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {lang.badge}
                    </span>
                  )}
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                    {lang.extension}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <div className="font-bold text-sm text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors">
                  {lang.name}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-mono">
                  {lang.version}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[var(--border-color)]/50 flex items-center justify-between text-[11px] text-indigo-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Launch IDE</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benchmark Comparison Table */}
      <section className="py-16 px-4 sm:px-8 max-w-5xl mx-auto w-full border-t border-[var(--border-color)]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Why Developers Choose OmniCompiler
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
            How OmniCompiler compares to standard developer workflows.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)]">
                <th className="p-3.5 font-semibold">Feature</th>
                <th className="p-3.5 font-bold text-indigo-400">OmniCompiler</th>
                <th className="p-3.5 font-medium">Local IDE Setup</th>
                <th className="p-3.5 font-medium">Traditional Web Compilers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]/60 text-[var(--text-primary)]">
              <tr>
                <td className="p-3.5 font-medium">Setup Time</td>
                <td className="p-3.5 text-emerald-400 font-bold">0 Seconds (Instant)</td>
                <td className="p-3.5 text-slate-400">30–60 Minutes per language</td>
                <td className="p-3.5 text-slate-400">5–15 Seconds load</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Multi-Language Switching</td>
                <td className="p-3.5 text-emerald-400 font-bold">Instant (33+ Compilers)</td>
                <td className="p-3.5 text-slate-400">Requires separate toolchains</td>
                <td className="p-3.5 text-slate-400">Limited (5–10 languages)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Disk &amp; RAM Footprint</td>
                <td className="p-3.5 text-emerald-400 font-bold">Zero Local Disk Usage</td>
                <td className="p-3.5 text-slate-400">10GB+ per SDK/IDE</td>
                <td className="p-3.5 text-slate-400">Browser tab only</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Interactive STDIN &amp; Args</td>
                <td className="p-3.5 text-emerald-400 font-bold">Included in all languages</td>
                <td className="p-3.5 text-slate-400">Manual terminal setup</td>
                <td className="p-3.5 text-slate-400">Often paid or broken</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Cost &amp; Sign-in Requirement</td>
                <td className="p-3.5 text-emerald-400 font-bold">100% Free • No Sign-up</td>
                <td className="p-3.5 text-slate-400">Free, but complex</td>
                <td className="p-3.5 text-slate-400">Login walls or ad overlays</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Developer Workflows */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full border-t border-[var(--border-color)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
            <span className="text-2xl">🏆</span>
            <h3 className="font-bold text-sm text-[var(--text-primary)]">Competitive Programming</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Test edge cases with customized STDIN datasets for Codeforces, LeetCode, and HackerRank without spinning up local projects.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
            <span className="text-2xl">🚀</span>
            <h3 className="font-bold text-sm text-[var(--text-primary)]">Polyglot Prototyping</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Compare algorithm implementations side-by-side in Rust, Python, Go, and Kotlin to evaluate syntax and execution efficiency.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
            <span className="text-2xl">🎓</span>
            <h3 className="font-bold text-sm text-[var(--text-primary)]">Computer Science Education</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Teach programming in classrooms without spending the first two weeks troubleshooting OS-specific JDK and compiler installation errors.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto w-full border-t border-[var(--border-color)]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            Common questions regarding compilation, security, and supported languages.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-indigo-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 shrink-0 ml-2 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)]/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-panel)] py-12 px-4 sm:px-8 mt-auto text-xs text-[var(--text-secondary)]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 space-y-3">
            <Logo size="md" />
            <p className="max-w-sm text-xs text-[var(--text-secondary)] leading-relaxed">
              OmniCompiler is a free, high-performance in-browser IDE supporting 33+ programming languages and frameworks with instant execution and interactive STDIN.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Cloud Runner Systems Operational</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-[var(--text-primary)] uppercase text-[11px] tracking-wider">Compilers</div>
            <ul className="space-y-1.5">
              <li><Link href="/python" className="hover:text-[var(--text-primary)]">Python 3.12</Link></li>
              <li><Link href="/java" className="hover:text-[var(--text-primary)]">Java 21 LTS</Link></li>
              <li><Link href="/cpp" className="hover:text-[var(--text-primary)]">C++20 (GCC)</Link></li>
              <li><Link href="/c" className="hover:text-[var(--text-primary)]">C17</Link></li>
              <li><Link href="/rust" className="hover:text-[var(--text-primary)]">Rust 1.82</Link></li>
              <li><Link href="/go" className="hover:text-[var(--text-primary)]">Go 1.23</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-[var(--text-primary)] uppercase text-[11px] tracking-wider">Mobile &amp; Web</div>
            <ul className="space-y-1.5">
              <li><Link href="/kotlin" className="hover:text-[var(--text-primary)]">Kotlin 1.9</Link></li>
              <li><Link href="/swift" className="hover:text-[var(--text-primary)]">Swift 5.9</Link></li>
              <li><Link href="/react" className="hover:text-[var(--text-primary)]">React 19 JSX</Link></li>
              <li><Link href="/vue" className="hover:text-[var(--text-primary)]">Vue 3 SFC</Link></li>
              <li><Link href="/html" className="hover:text-[var(--text-primary)]">HTML5 / CSS3</Link></li>
              <li><Link href="/sql" className="hover:text-[var(--text-primary)]">SQL Database</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-[var(--text-primary)] uppercase text-[11px] tracking-wider">Platform</div>
            <ul className="space-y-1.5">
              <li><Link href="/cheatsheets" className="hover:text-[var(--text-primary)]">Documentation</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--text-primary)]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--text-primary)]">Terms of Service</Link></li>
              <li><a href="https://github.com/mritunjay263/omnicompiler" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">GitHub Repository</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[var(--border-color)]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div>
            © {new Date().getFullYear()} OmniCompiler. Built with precision for developers worldwide.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/sitemap.xml" className="hover:underline">Sitemap</Link>
          </div>
        </div>
      </footer>

      {/* Cmd+K Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
