'use client';

import React, { useState } from 'react';
import { Database, ArrowUpDown, Rows } from 'lucide-react';

interface TableViewerProps {
  rawOutput: string;
}

interface TableData {
  headers: string[];
  rows: string[][];
}

export function TableViewer({ rawOutput }: TableViewerProps) {
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Parse common SQLite/MySQL formatted output or construct table
  const tableData = parseSqlOutput(rawOutput);

  if (!tableData || tableData.rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-[var(--text-secondary)]">
        <Database className="h-10 w-10 mb-3 text-indigo-400 opacity-60" />
        <div className="font-semibold text-sm text-[var(--text-primary)]">No Tabular Query Results</div>
        <p className="text-xs max-w-sm mt-1">
          Execute a `SELECT` query in your SQL script to display the results in an interactive data table.
        </p>
      </div>
    );
  }

  const sortedRows = [...tableData.rows].sort((a, b) => {
    if (sortCol === null) return 0;
    const valA = a[sortCol] || '';
    const valB = b[sortCol] || '';
    const numA = Number(valA);
    const numB = Number(valB);

    if (!isNaN(numA) && !isNaN(numB)) {
      return sortAsc ? numA - numB : numB - numA;
    }
    return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const handleSort = (idx: number) => {
    if (sortCol === idx) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(idx);
      setSortAsc(true);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-card)] overflow-hidden">
      {/* Table Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border-color)] bg-[var(--bg-panel)] text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-2">
          <Rows className="h-3.5 w-3.5 text-indigo-400" />
          <span className="font-semibold text-[var(--text-primary)]">{tableData.rows.length} rows returned</span>
        </div>
        <div>
          <span>Click any column header to sort</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 bg-[var(--bg-panel)] border-b border-[var(--border-color)] z-10">
            <tr>
              <th className="p-2.5 w-10 text-[var(--text-secondary)] font-mono text-center border-r border-[var(--border-color)]">#</th>
              {tableData.headers.map((h, i) => (
                <th
                  key={i}
                  onClick={() => handleSort(i)}
                  className="p-2.5 font-bold text-[var(--text-primary)] cursor-pointer hover:bg-indigo-500/10 transition-colors select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{h}</span>
                    <ArrowUpDown className="h-3 w-3 text-[var(--text-secondary)]" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)] font-mono">
            {sortedRows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-[var(--bg-panel)]/50 transition-colors">
                <td className="p-2 text-center text-[var(--text-secondary)] border-r border-[var(--border-color)]">{rIdx + 1}</td>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-2 text-[var(--text-primary)] truncate max-w-xs">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function parseSqlOutput(text: string): TableData | null {
  if (!text || !text.trim()) return null;
  const lines = text.trim().split('\n').map((l) => l.trim()).filter(Boolean);

  // Check if pipe-separated output exists (e.g. "col1|col2|col3")
  const pipeLines = lines.filter((l) => l.includes('|'));
  if (pipeLines.length >= 2) {
    const headers = pipeLines[0].split('|').map((s) => s.trim());
    const rows = pipeLines.slice(1).map((line) => line.split('|').map((s) => s.trim()));
    return { headers, rows };
  }

  // Fallback: Check tab-separated or space-aligned columns
  const firstLine = lines[0];
  if (lines.length >= 2) {
    const parts = firstLine.split(/\s{2,}|\t/);
    if (parts.length > 1) {
      const headers = parts.map((s) => s.trim());
      const rows = lines.slice(1).map((line) => line.split(/\s{2,}|\t/).map((s) => s.trim()));
      return { headers, rows };
    }
  }

  return null;
}
