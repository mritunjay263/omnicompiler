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
  FileCode,
  Check,
  HelpCircle,
  X,
  Keyboard,
  Columns,
  Rows,
} from 'lucide-react';
import { LANGUAGES, LanguageConfig } from '@/lib/languages';
import { BRAND } from '@/lib/brand';
import { useTheme } from './ThemeProvider';
import UserMenu from './UserMenu';
import Logo from './Logo';

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
  layoutOrientation?: 'horizontal' | 'vertical';
  onToggleLayout?: () => void;
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
  layoutOrientation = 'horizontal',
  onToggleLayout,
}: NavbarProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [langSearch, setLangSearch] = useState('');

  const handleDownload = () => {
    if (!activeFileContent) return;
    const blob = new Blob([activeFileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFileName || `main${currentLanguage.extension}`;
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
            <Logo size="md" />
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
                <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-2.5 shadow-2xl z-50 max-h-[420px] flex flex-col">
                  <div className="p-1 mb-1">
                    <input
                      type="text"
                      placeholder="Search 30+ compilers..."
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      autoFocus
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-[var(--bg-panel)] border border-[var(--border-color)] focus:outline-none focus:border-indigo-500 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                    />
                  </div>
                  <div className="overflow-y-auto flex-1 space-y-0.5 max-h-80">
                    {Object.values(LANGUAGES)
                      .filter(
                        (l) =>
                          l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
                          l.id.toLowerCase().includes(langSearch.toLowerCase()) ||
                          l.category.toLowerCase().includes(langSearch.toLowerCase())
                      )
                      .map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => {
                            setLangDropdownOpen(false);
                            setLangSearch('');
                            router.push(`/${lang.id}`);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors ${
                            lang.id === currentLanguage.id
                              ? 'bg-indigo-600/20 text-indigo-400 font-semibold'
                              : 'hover:bg-[var(--bg-panel)] text-[var(--text-primary)]'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{lang.icon}</span>
                            <span>{lang.name}</span>
                            {lang.badge && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                {lang.badge}
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] text-[var(--text-secondary)] font-mono">{lang.extension}</span>
                        </button>
                      ))}
                  </div>
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
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-2 shadow-2xl z-50">
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
                        className="w-full text-left p-2 rounded-xl hover:bg-[var(--bg-panel)] transition-colors group"
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-panel)] text-xs text-[var(--text-secondary)] hover:border-indigo-500/50 hover:text-[var(--text-primary)] transition-all w-52 justify-between"
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
              title="AI Code Copilot"
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
              title="Format Code (Shift+Alt+F)"
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
            <span className="hidden sm:inline">{copiedShare ? 'Copied Link!' : 'Share'}</span>
          </button>

          {/* Shortcuts Info */}
          <button
            onClick={() => setShortcutsModalOpen(true)}
            title="Keyboard Shortcuts"
            className="p-1.5 md:p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 transition-all hidden md:block"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>

          {/* Layout Split Toggle */}
          {onToggleLayout && (
            <button
              onClick={onToggleLayout}
              title={layoutOrientation === 'horizontal' ? 'Switch to Vertical Split (Stacked)' : 'Switch to Horizontal Split (Side-by-Side)'}
              className="p-1.5 md:p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 transition-all hidden md:flex items-center gap-1"
            >
              {layoutOrientation === 'horizontal' ? <Columns className="h-3.5 w-3.5" /> : <Rows className="h-3.5 w-3.5" />}
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Dark / Light Theme"
            className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 transition-all"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          {/* Developer SSO & User Menu */}
          <UserMenu />

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

      {/* Keyboard Shortcuts Modal */}
      {shortcutsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-primary)]">
                <Keyboard className="h-4 w-4 text-indigo-400" />
                <span>Keyboard Shortcuts</span>
              </div>
              <button
                onClick={() => setShortcutsModalOpen(false)}
                className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)]">Run Code</span>
                <kbd className="px-2 py-0.5 rounded bg-[var(--bg-panel)] font-mono text-[var(--text-primary)] border border-[var(--border-color)]">
                  ⌘ / Ctrl + Enter
                </kbd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)]">Search Compilers</span>
                <kbd className="px-2 py-0.5 rounded bg-[var(--bg-panel)] font-mono text-[var(--text-primary)] border border-[var(--border-color)]">
                  ⌘ / Ctrl + K
                </kbd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)]">Format Document</span>
                <kbd className="px-2 py-0.5 rounded bg-[var(--bg-panel)] font-mono text-[var(--text-primary)] border border-[var(--border-color)]">
                  Shift + Alt + F
                </kbd>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[var(--text-secondary)]">Close Dialogs</span>
                <kbd className="px-2 py-0.5 rounded bg-[var(--bg-panel)] font-mono text-[var(--text-primary)] border border-[var(--border-color)]">
                  Esc
                </kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
