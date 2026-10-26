'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '../ThemeProvider';
import { FileTabs, EditorFile } from './FileTabs';
import type { OnMount } from '@monaco-editor/react';

// Dynamic import with SSR disabled
const Monaco = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[var(--bg-card)] text-sm text-[var(--text-secondary)] font-mono">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span>Loading Editor Engine...</span>
      </div>
    </div>
  ),
});

interface CodeEditorProps {
  files: EditorFile[];
  activeFileIndex: number;
  onSelectFile: (index: number) => void;
  onAddFile: (name: string) => void;
  onRemoveFile: (index: number) => void;
  onChangeCode: (newCode: string) => void;
  monacoLang: string;
  onRun: () => void;
  fontSize: number;
  onChangeFontSize: (size: number) => void;
  tabSize: number;
  onChangeTabSize: (size: number) => void;
  editorRef?: React.MutableRefObject<any>;
}

export function CodeEditor({
  files,
  activeFileIndex,
  onSelectFile,
  onAddFile,
  onRemoveFile,
  onChangeCode,
  monacoLang,
  onRun,
  fontSize,
  onChangeFontSize,
  tabSize,
  onChangeTabSize,
  editorRef,
}: CodeEditorProps) {
  const { theme } = useTheme();
  const internalEditorRef = useRef<any>(null);

  const activeFile = files[activeFileIndex] || files[0] || { name: 'code', content: '' };

  const handleEditorMount: OnMount = (editor, monaco) => {
    internalEditorRef.current = editor;
    if (editorRef) {
      editorRef.current = editor;
    }

    // Bind Ctrl+Enter or Cmd+Enter to Run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun();
    });

    // Bind Shift+Alt+F to format document
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-card)] overflow-hidden">
      {/* File Tabs header */}
      <FileTabs
        files={files}
        activeFileIndex={activeFileIndex}
        onSelectFile={onSelectFile}
        onAddFile={onAddFile}
        onRemoveFile={onRemoveFile}
        fontSize={fontSize}
        onChangeFontSize={onChangeFontSize}
        tabSize={tabSize}
        onChangeTabSize={onChangeTabSize}
      />

      {/* Monaco Container */}
      <div className="flex-1 w-full min-h-0 relative">
        <Monaco
          height="100%"
          language={monacoLang}
          value={activeFile.content}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          onChange={(val) => onChangeCode(val || '')}
          onMount={handleEditorMount}
          options={{
            fontSize,
            tabSize,
            fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            lineNumbers: 'on',
            lineDecorationsWidth: 10,
            bracketPairColorization: { enabled: true },
            formatOnPaste: true,
            formatOnType: true,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
}
