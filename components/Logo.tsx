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
      {/* Precision Geometric Polyglot Prism Glyph */}
      <div
        className={`relative ${iconSizes[size]} flex-shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300`}
      >
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 overflow-hidden relative">
          {/* Ambient Radial Sheen */}
          <div className="absolute inset-0 bg-radial-gradient from-indigo-500/20 via-transparent to-transparent opacity-80" />

          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[74%] h-[74%] relative z-10 drop-shadow-[0_2px_8px_rgba(99,102,241,0.5)]"
          >
            <defs>
              <linearGradient id="prism-left" x1="4" y1="6" x2="16" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
              <linearGradient id="prism-right" x1="16" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <linearGradient id="prism-core" x1="10" y1="10" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>

            {/* Left Compiler Chevron (Facet) */}
            <path
              d="M11 8L4 16L11 24"
              stroke="url(#prism-left)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Compiler Chevron (Facet) */}
            <path
              d="M21 8L28 16L21 24"
              stroke="url(#prism-right)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Center Dynamic Energy Beam */}
            <path
              d="M18 6L14 26"
              stroke="url(#prism-core)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Focal Compiler Sparkle */}
            <circle cx="16" cy="16" r="2.2" fill="#38BDF8" className="animate-pulse" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-tight ${textSizes[size]} text-[var(--text-primary)] font-sans`}>
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Omni
            </span>
            <span className="text-[var(--text-primary)] ml-0.5">Compiler</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
