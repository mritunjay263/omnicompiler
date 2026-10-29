'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Users,
  Eye,
  Globe,
  TrendingUp,
  ArrowLeft,
  RefreshCw,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  totalUniqueVisitors: number;
  todayUniqueVisitors: number;
  topPages: { path: string; views: number }[];
  topReferrers: { source: string; count: number }[];
  recentVisits: { path: string; referrer: string; timestamp: string }[];
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const stats = await res.json();
        setData(stats);
        setLastRefreshed(new Date());
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#161b22]/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Back to Playground"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                Ω
              </div>
              <div>
                <h1 className="text-base font-bold text-white flex items-center gap-2">
                  OmniCompiler Analytics
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Updated {lastRefreshed ? lastRefreshed.toLocaleTimeString() : "Just now"}
            </span>
            <button
              onClick={fetchStats}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#161b22] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Page Views</span>
              <Eye className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {data ? data.totalViews.toLocaleString() : '...'}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">All-time tracked page loads</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#161b22] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Today&apos;s Views</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">
              {data ? data.todayViews.toLocaleString() : '...'}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Page loads in the last 24 hours</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#161b22] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Unique Visitors</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {data ? data.totalUniqueVisitors.toLocaleString() : '...'}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Unique developer devices</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#161b22] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Today&apos;s Visitors</span>
              <Globe className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-purple-400">
              {data ? data.todayUniqueVisitors.toLocaleString() : '...'}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Distinct developers today</p>
          </div>
        </div>

        {/* Detailed Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages & Compilers */}
          <div className="p-6 rounded-2xl bg-[#161b22] border border-white/10 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white">Top Pages & Compilers Visited</h2>
              </div>
              <span className="text-xs text-slate-500">Views</span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {!data || data.topPages.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">No visits recorded yet.</div>
              ) : (
                data.topPages.map((page, idx) => {
                  const percentage = Math.round((page.views / (data.totalViews || 1)) * 100);
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-200 truncate max-w-[280px]">
                          {page.path}
                        </span>
                        <span className="font-semibold text-slate-300">
                          {page.views} <span className="text-[10px] text-slate-500">({percentage}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(percentage, 5)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Traffic Sources & Live Feed */}
          <div className="p-6 rounded-2xl bg-[#161b22] border border-white/10 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white">Traffic Sources & Referrers</h2>
              </div>
              <span className="text-xs text-slate-500">Visits</span>
            </div>

            <div className="space-y-2.5 mb-6">
              {!data || data.topReferrers.length === 0 ? (
                <div className="text-center py-4 text-xs text-slate-500">No referrers yet.</div>
              ) : (
                data.topReferrers.map((ref, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                    <span className="font-medium text-slate-300">{ref.source}</span>
                    <span className="font-bold text-cyan-400">{ref.count}</span>
                  </div>
                ))
              )}
            </div>

            {/* Live Feed Header */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-3 pt-4 border-t border-white/10">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Real-Time Visit Feed (Last 10)</span>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto max-h-[180px]">
              {!data || data.recentVisits.length === 0 ? (
                <div className="text-center py-4 text-xs text-slate-500">Awaiting live visits...</div>
              ) : (
                data.recentVisits.slice(0, 10).map((v, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-black/30 border border-white/5">
                    <span className="font-mono text-cyan-300 truncate max-w-[200px]">{v.path}</span>
                    <span className="text-slate-500">{new Date(v.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-black border border-cyan-500/30 flex items-start sm:items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <span className="font-bold text-white">Ad-Blocker Resistant & Privacy Preserving</span>
              <p className="text-slate-400 text-[11px] mt-0.5">
                This internal analytics engine operates directly on the same domain without third-party tracking scripts, ensuring 100% of your real visits are captured.
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="shrink-0 px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-semibold text-xs transition-colors"
          >
            Open IDE
          </Link>
        </div>
      </main>
    </div>
  );
}
