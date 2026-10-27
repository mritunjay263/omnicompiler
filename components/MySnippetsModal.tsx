'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, Code2, Trash2, ExternalLink, Copy, Check, Clock, FileCode } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Snippet {
  id: string;
  title: string;
  language: string;
  files: { name: string; content: string }[];
  createdAt: string;
  author?: string;
}

interface MySnippetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MySnippetsModal({ isOpen, onClose }: MySnippetsModalProps) {
  const router = useRouter();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/snippets?mine=true');
      if (res.ok) {
        const data = await res.json();
        setSnippets(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching snippets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSnippets();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredSnippets = snippets.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.language.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyLink = (snippet: Snippet) => {
    const url = `${window.location.origin}/${snippet.language}?snippetId=${snippet.id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this cloud snippet?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/snippets?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSnippets((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Error deleting snippet:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpen = (snippet: Snippet) => {
    router.push(`/${snippet.language}?snippetId=${snippet.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#161b22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">My Cloud Snippets</h2>
              <p className="text-xs text-slate-400">
                {snippets.length} saved snippet{snippets.length === 1 ? '' : 's'} across all compilers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/10 bg-[#0d1117]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search your snippets by title or language (e.g. Python, QuickSort)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#161b22] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {loading ? (
            <div className="py-12 text-center text-sm text-slate-400 flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <span>Loading your cloud workspace...</span>
            </div>
          ) : filteredSnippets.length === 0 ? (
            <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-3">
              <FileCode className="w-12 h-12 text-slate-600" />
              <div>
                <p className="text-sm font-medium text-slate-300">No snippets found</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click the <strong className="text-cyan-400">Share</strong> button in the editor toolbar to save your active code to the cloud.
                </p>
              </div>
            </div>
          ) : (
            filteredSnippets.map((snippet) => (
              <div
                key={snippet.id}
                className="flex items-center justify-between p-3.5 bg-[#0d1117] hover:bg-[#1f242c] border border-white/5 hover:border-cyan-500/30 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center font-mono font-bold text-xs uppercase text-cyan-400 border border-white/5">
                    {snippet.language.slice(0, 3)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-100 truncate group-hover:text-cyan-300 transition-colors">
                      {snippet.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="capitalize">{snippet.language}</span>
                      <span>•</span>
                      <span>{snippet.files?.length || 1} file{snippet.files?.length === 1 ? '' : 's'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(snippet.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopyLink(snippet)}
                    title="Copy share link"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedId === snippet.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleOpen(snippet)}
                    title="Open in Playground"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-medium transition-colors"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    disabled={deletingId === snippet.id}
                    onClick={() => handleDelete(snippet.id)}
                    title="Delete Snippet"
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
