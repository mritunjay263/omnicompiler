import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { BRAND } from '@/lib/brand';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `${BRAND.name} - Instant Cloud & Local Polyglot IDE | 110+ Compilers`,
  description: `${BRAND.description} Zero setup, sub-second latency, multi-file projects, and integrated AI copilot.`,
  keywords: [
    'online compiler',
    'polyglot ide',
    'python online compiler',
    'c++ online compiler',
    'javascript online runner',
    'java online compiler',
    'c# online ide',
    'rust online compiler',
    'go online compiler',
    'sql online runner',
    'free online ide',
  ],
  authors: [{ name: BRAND.name }],
  metadataBase: new URL(BRAND.url),
  openGraph: {
    title: `${BRAND.name} - Instant In-Browser Polyglot IDE`,
    description: BRAND.description,
    siteName: BRAND.name,
    type: 'website',
    url: BRAND.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} - Code, Compile & Run in Real Time`,
    description: BRAND.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
