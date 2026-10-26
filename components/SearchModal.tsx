'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Code2, ArrowRight } from 'lucide-react';
import { LANGUAGES, LanguageConfig } from '@/lib/languages';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allLangs = Object.values(LANGUAGES);
  const filtered = allLangs.filter((lang) => {
    const matchesCat = selectedCategory === 'all' || lang.category === selectedCategory;
    const matchesQuery =
      lang.name.toLowerCase().includes(query.toLowerCase()) ||
      lang.id.toLowerCase().includes(query.toLowerCase()) ||
      lang.extension.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSelect = (lang: LanguageConfig) => {
    onClose();
    router.push(`/${lang.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-[var(--border-color)]">
          <Search className="h-5 w-5 text-indigo-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search compilers by language (e.g. Python, SQL, C++)..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[var(--border-color)] bg-[var(--bg-panel)] overflow-x-auto text-xs">
          {['all', 'popular', 'programming', 'web', 'database', 'scripting'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-2.5 py-1 rounded-full capitalize font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--text-secondary)]">
              No compilers found matching &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((lang, idx) => (
              <div
                key={lang.id}
                onClick={() => handleSelect(lang)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                  idx === selectedIndex
                    ? 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 font-semibold'
                    : 'hover:bg-[var(--bg-panel)] text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.icon}</span>
                  <div>
                    <div className="text-sm font-semibold">{lang.name}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">
                      {lang.extension} • {lang.version}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 opacity-50" />
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border-color)] bg-[var(--bg-panel)] text-[11px] text-[var(--text-secondary)]">
          <span>Navigate with <b>↑</b> <b>↓</b></span>
          <span>Select with <b>↵ Enter</b></span>
          <span>Close with <b>ESC</b></span>
        </div>
      </div>
    </div>
  );
}
