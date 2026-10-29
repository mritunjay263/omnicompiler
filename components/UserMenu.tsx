'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User as UserIcon, LogOut, Code2, ChevronDown, Sparkles, Shield } from 'lucide-react';
import { GitHubIcon, GoogleIcon } from './Icons';
import AuthModal from './AuthModal';
import MySnippetsModal from './MySnippetsModal';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  provider: 'github' | 'google' | 'guest';
  avatar: string;
}

export default function UserMenu() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSnippetsOpen, setIsSnippetsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setUser(data.user);
          }
        }
      } catch (err) {
        console.error('Session check failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsDropdownOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const renderProviderIcon = (provider: string) => {
    switch (provider) {
      case 'github':
        return <GitHubIcon className="w-3 h-3 text-white" />;
      case 'google':
        return <GoogleIcon className="w-3 h-3" />;
      default:
        return <Shield className="w-3 h-3 text-cyan-400" />;
    }
  };

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse border border-white/10" />
    );
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {!user ? (
          <button
            onClick={() => setIsAuthOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-cyan-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sign In</span>
          </button>
        ) : (
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1 pl-2 bg-[#161b22] hover:bg-[#21262d] border border-white/10 hover:border-cyan-500/40 rounded-xl transition-all"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-slate-200 max-w-[90px] truncate hidden sm:inline-block">
                {user.name.split(' ')[0]}
              </span>
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-lg object-cover ring-1 ring-cyan-500/50"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#0d1117] ring-1 ring-white/10">
                  {renderProviderIcon(user.provider)}
                </span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
          </button>
        )}

        {/* Dropdown Menu */}
        {isDropdownOpen && user && (
          <div className="absolute right-0 mt-2 w-64 bg-[#161b22] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 text-slate-200 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* User Details */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{user.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-400 capitalize">
                {renderProviderIcon(user.provider)}
                <span>{user.provider} SSO</span>
              </div>
            </div>

            {/* Menu Links */}
            <div className="py-1">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  setIsSnippetsOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>My Cloud Snippets</span>
              </button>
            </div>

            {/* Logout */}
            <div className="pt-1 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(newUser) => setUser(newUser)}
      />

      <MySnippetsModal
        isOpen={isSnippetsOpen}
        onClose={() => setIsSnippetsOpen(false)}
      />
    </>
  );
}
