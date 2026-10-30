const getProductionBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return 'https://omnicompilerlabs.vercel.app';
};

export const BRAND = {
  name: 'OmniCompiler',
  legalName: 'OmniCompiler Cloud IDE',
  tagline: 'Universal In-Browser IDE & High-Performance Polyglot Runner',
  description:
    'Free online compiler, code runner, and cloud IDE. Write, compile, and execute Python, Java, C++, C, Rust, Go, Kotlin, Swift, React, and 30+ languages and frameworks instantly in your browser with interactive STDIN, dark mode, and zero setup.',
  domain: 'omnicompilerlabs.vercel.app',
  url: getProductionBaseUrl(),
  version: '2.5.0 Production',
  stats: {
    languages: '30+ Compilers & Frameworks',
    activeDevelopers: '100K+',
    dailyExecutions: '500K+',
    executionUptime: '99.99%',
    avgLatency: '1.2s',
  },
  links: {
    github: 'https://github.com/mritunjay263/omnicompiler',
    docs: '/cheatsheets',
  },
};
