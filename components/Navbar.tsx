'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Play,
  Share2,
  Download,
  AlignLeft,
  Trash2,
  Sun,
  Moon,
  Search,
  Sparkles,
  ChevronDown,
  Code2,
  Database,
  Globe,
  FileCode,
  Check,
  Terminal,
} from 'lucide-react';
import { LANGUAGES, LanguageConfig } from '@/lib/languages';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  currentLanguage: LanguageConfig;
  onRun: () => void;
  isRunning: boolean;
  onFormat?: () => void;
  onClearConsole?: () => void;
  onOpenAi?: () => void;
  onOpenSearch?: () => void;
  onSelectTemplate?: (code: string, stdin?: string) => void;
  activeFileName?: string;
  activeFileContent?: string;
  onShare?: () => void;
}

export function Navbar({
  currentLanguage,
  onRun,
  isRunning,
  onFormat,
  onClearConsole,
  onOpenAi,
  onOpenSearch,
  onSelectTemplate,
  activeFileName,
  activeFileContent,
  onShare,
}: NavbarProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleDownload = () => {
    if (!activeFileContent) return;
    const blob = new Blob([activeFileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFileName || `code${currentLanguage.extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareClick = () => {
    if (onShare) {
      onShare();
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-card)]/90 backdrop-blur-md transition-colors">
      <div className="flex h-14 items-center justify-between px-3 md:px-5 gap-2">
        {/* Left: Brand & Language Picker */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-extrabold tracking-tight text-lg text-[var(--text-primary)] flex items-center gap-1.5">
                OneCompiler
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  v2.0
                </span>
              </span>
            </div>
          </Link>

          <div className="h-5 w-px bg-[var(--border-color)] mx-1 hidden sm:block" />

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] hover:border-indigo-500/50 text-sm font-medium transition-all text-[var(--text-primary)]"
            >
              <span className="text-base">{currentLanguage.icon}</span>
              <span className="font-semibold">{currentLanguage.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-64 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-2 shadow-2xl z-50 max-h-96 overflow-y-auto">
                  <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Popular Compilers
                  </div>
                  {Object.values(LANGUAGES).map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        setLangDropdownOpen(false);
                        router.push(`/${lang.id}`);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm text-left transition-colors ${
                        lang.id === currentLanguage.id
                          ? 'bg-indigo-600/20 text-indigo-400 font-semibold'
                          : 'hover:bg-[var(--bg-panel)] text-[var(--text-primary)]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.icon}</span>
                        <span>{lang.name}</span>
                      </span>
                      <span className="text-xs text-[var(--text-secondary)]">{lang.extension}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Templates Dropdown */}
          {currentLanguage.templates.length > 0 && onSelectTemplate && (
            <div className="relative hidden md:block">
              <button
                onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] hover:border-indigo-500/50 text-xs font-medium transition-all text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <FileCode className="h-3.5 w-3.5" />
                <span>Templates</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {templateDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setTemplateDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-72 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-2 shadow-2xl z-50">
                    <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Code Boilerplates
                    </div>
                    {currentLanguage.templates.map((tpl, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          onSelectTemplate(tpl.code, tpl.stdin);
                          setTemplateDropdownOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-[var(--bg-panel)] transition-colors group"
                      >
                        <div className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-indigo-400">
                          {tpl.name}
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                          {tpl.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Center: Search Launcher */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-xs text-[var(--text-secondary)] hover:border-indigo-500/50 hover:text-[var(--text-primary)] transition-all w-52 justify-between"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span>Search compiler...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)] text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions Toolbar & Run Button */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* AI Assistant Button */}
          {onOpenAi && (
            <button
              onClick={onOpenAi}
              title="AI Code Assistant (Explain, Fix, Optimize)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs font-semibold transition-all"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          )}

          {/* Format Code */}
          {onFormat && (
            <button
              onClick={onFormat}
              title="Format Code (Alt+Shift+F)"
              className="p-1.5 md:px-2 md:py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 text-xs transition-all flex items-center gap-1"
            >
              <AlignLeft className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Format</span>
            </button>
          )}

          {/* Download */}
          <button
            onClick={handleDownload}
            title="Download Code File"
            className="p-1.5 md:px-2 md:py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 text-xs transition-all flex items-center gap-1"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Download</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShareClick}
            title="Share or Save Snippet"
            className={`p-1.5 md:px-2 md:py-1.5 rounded-lg border border-[var(--border-color)] text-xs transition-all flex items-center gap-1 ${
              copiedShare
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                : 'bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50'
            }`}
          >
            {copiedShare ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copiedShare ? 'Copied!' : 'Share'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Dark / Light Theme"
            className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 transition-all"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          {/* Core RUN Button */}
          <button
            onClick={onRun}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-sm shadow-md transition-all ${
              isRunning
                ? 'bg-indigo-600/70 text-white cursor-wait animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isRunning ? (
              <>
                <div className="h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Run</span>
                <kbd className="hidden md:inline-block ml-1 px-1 py-0.2 rounded bg-emerald-600/30 text-[10px] font-mono text-slate-950">
                  ⌘↵
                </kbd>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
