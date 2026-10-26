'use client';

import React, { useState } from 'react';
import { Plus, X, Settings2, FileText, Check } from 'lucide-react';

export interface EditorFile {
  name: string;
  content: string;
}

interface FileTabsProps {
  files: EditorFile[];
  activeFileIndex: number;
  onSelectFile: (index: number) => void;
  onAddFile: (name: string) => void;
  onRemoveFile: (index: number) => void;
  fontSize: number;
  onChangeFontSize: (size: number) => void;
  tabSize: number;
  onChangeTabSize: (size: number) => void;
}

export function FileTabs({
  files,
  activeFileIndex,
  onSelectFile,
  onAddFile,
  onRemoveFile,
  fontSize,
  onChangeFontSize,
  tabSize,
  onChangeTabSize,
}: FileTabsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFileName.trim()) {
      onAddFile(newFileName.trim());
      setNewFileName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-panel)] px-2 h-10 select-none">
      {/* Tab List */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 mr-2">
        {files.map((file, idx) => (
          <div
            key={idx}
            onClick={() => onSelectFile(idx)}
            className={`group flex items-center gap-2 px-3 py-1.5 rounded-t-md text-xs font-medium cursor-pointer transition-all border-t-2 ${
              idx === activeFileIndex
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border-indigo-500 shadow-sm'
                : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-card)]/50 hover:text-[var(--text-primary)]'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-indigo-400" />
            <span className="font-mono">{file.name}</span>

            {files.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFile(idx);
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-rose-500/20 hover:text-rose-400 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}

        {/* Add File Prompt */}
        {isAdding ? (
          <form onSubmit={handleCreate} className="flex items-center gap-1 pl-1">
            <input
              type="text"
              autoFocus
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="filename.ext"
              className="h-6 w-28 px-1.5 text-xs bg-[var(--bg-card)] border border-indigo-500 rounded text-[var(--text-primary)] outline-none font-mono"
            />
            <button
              type="submit"
              className="p-1 rounded bg-indigo-600 text-white hover:bg-indigo-500"
            >
              <Check className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <X className="h-3 w-3" />
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            title="Add File"
            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Editor Settings Gear */}
      <div className="relative">
        <button
          onClick={() => setShowSettings(!showSettings)}
          title="Editor Settings"
          className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
        >
          <Settings2 className="h-4 w-4" />
        </button>

        {showSettings && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3 shadow-2xl z-50 text-xs">
              <div className="font-semibold text-[var(--text-primary)] mb-2.5 pb-1 border-b border-[var(--border-color)]">
                Editor Preferences
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[var(--text-secondary)] mb-1">
                    <span>Font Size</span>
                    <span className="font-mono">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="22"
                    value={fontSize}
                    onChange={(e) => onChangeFontSize(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[var(--text-secondary)] mb-1">
                    <span>Tab Size</span>
                  </div>
                  <div className="flex gap-2">
                    {[2, 4].map((size) => (
                      <button
                        key={size}
                        onClick={() => onChangeTabSize(size)}
                        className={`flex-1 py-1 rounded border ${
                          tabSize === size
                            ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400 font-bold'
                            : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-panel)]'
                        }`}
                      >
                        {size} spaces
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
