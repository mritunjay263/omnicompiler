import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* High-End Vector SVG Polyglot Mark */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300`}>
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 overflow-hidden relative">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:6px_6px] opacity-20" />
          
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[72%] h-[72%] relative z-10"
          >
            <defs>
              <linearGradient id="omni-grad-primary" x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="omni-grad-accent" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>

            {/* Stylized Interlocking Hexagonal Code Loop */}
            <path
              d="M10 9L4 16L10 23"
              stroke="url(#omni-grad-primary)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 9L28 16L22 23"
              stroke="url(#omni-grad-primary)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Center Dynamic Compiler Pulse / Core */}
            <path
              d="M18 7L14 25"
              stroke="url(#omni-grad-accent)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="2" fill="#38BDF8" className="animate-pulse" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight ${textSizes[size]} text-[var(--text-primary)] font-sans`}>
              <span className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Omni
              </span>
              <span className="text-[var(--text-primary)] ml-0.5">Compiler</span>
            </span>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20">
              v2.0
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logo;
