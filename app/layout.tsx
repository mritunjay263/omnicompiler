import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'OneCompiler - Write, run and share code online | Free online compiler with 110+ languages',
  description:
    'Free online compiler and editor with 110+ programming languages and databases. Write, compile, interpret, debug, and share code online with stdin support and instant execution.',
  keywords: [
    'online compiler',
    'online code runner',
    'python online compiler',
    'c++ online compiler',
    'javascript online compiler',
    'java online compiler',
    'sql online playground',
    'free code runner',
  ],
  authors: [{ name: 'OneCompiler' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'OneCompiler - Write, run and share code online',
    description: 'Free online compiler and editor with 110+ programming languages and databases.',
    siteName: 'OneCompiler',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
