import Link from 'next/link';
import { ArrowLeft, Terminal, Search } from 'lucide-react';
import { BRAND } from '@/lib/brand';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-2xl mb-6">
        <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-slate-950 font-black text-2xl text-white">
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent font-mono">
            404
          </span>
        </div>
      </div>

      <h1 className="text-3xl font-black tracking-tight mb-2">Page or Compiler Not Found</h1>
      <p className="text-sm text-[var(--text-secondary)] max-w-md mb-8">
        The compiler, playground, or route you requested does not exist or has been relocated.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/python"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-indigo-500 text-xs font-semibold text-[var(--text-primary)] transition-all"
        >
          <Terminal className="h-4 w-4 text-indigo-400" />
          <span>Launch Python IDE</span>
        </Link>
      </div>
    </div>
  );
}
