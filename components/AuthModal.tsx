'use client';

import React, { useState } from 'react';
import { X, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { GitHubIcon, GoogleIcon } from './Icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'sso' | 'custom'>('sso');
  const [customHandle, setCustomHandle] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (provider: 'github' | 'google' | 'guest', customData?: { username?: string; email?: string }) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          username: customData?.username || undefined,
          email: customData?.email || undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        onSuccess(data.user);
        onClose();
      }
    } catch (err) {
      console.error('SSO Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#161b22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 mb-3 shadow-lg shadow-cyan-500/20">
            <span className="text-2xl font-black text-white">Ω</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">Developer Single Sign-On</h2>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to sync your code snippets, custom runners, and team forks across environments.
          </p>
        </div>

        {/* Quick Tabs */}
        <div className="flex border-b border-white/10 mb-5">
          <button
            onClick={() => setActiveTab('sso')}
            className={`flex-1 pb-2 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'sso'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            One-Click SSO
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 pb-2 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'custom'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Custom Developer ID
          </button>
        </div>

        {activeTab === 'sso' ? (
          <div className="space-y-3">
            {/* GitHub SSO */}
            <button
              disabled={loading}
              onClick={() => handleLogin('github')}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#21262d] hover:bg-[#30363d] border border-white/10 rounded-xl font-medium text-sm transition-all shadow-md group disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <GitHubIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-slate-200 group-hover:text-white">Continue with GitHub</span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded text-slate-300">Fast Dev</span>
            </button>

            {/* Google SSO */}
            <button
              disabled={loading}
              onClick={() => handleLogin('google')}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#21262d] hover:bg-[#30363d] border border-white/10 rounded-xl font-medium text-sm transition-all shadow-md group disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <GoogleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-slate-200 group-hover:text-white">Continue with Google</span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded text-slate-300">SSO</span>
            </button>

            {/* Guest Developer */}
            <button
              disabled={loading}
              onClick={() => handleLogin('guest')}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl font-medium text-sm transition-all text-slate-300 hover:text-white group disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Instant Guest Session</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Zero Setup</span>
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin('github', { username: customHandle, email: customEmail });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Developer Handle / Username</label>
              <input
                type="text"
                placeholder="e.g. torvalds or dev_coder"
                value={customHandle}
                onChange={(e) => setCustomHandle(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="dev@example.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {loading ? 'Creating Session...' : 'Authenticate Profile'}
            </button>
          </form>
        )}

        {/* Benefits footer */}
        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Persistent Snippets</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Isolated Cloud Keys</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>AI Copilot Unlocked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Zero Tracking Ads</span>
          </div>
        </div>
      </div>
    </div>
  );
}
