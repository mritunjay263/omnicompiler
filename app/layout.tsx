import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { BRAND } from '@/lib/brand';
import { generateWebsiteSchema } from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gscToken = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const cfToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — Free Online Compiler & Cloud IDE (15+ Languages)`,
    template: `%s | ${BRAND.name}`,
  },
  description: `${BRAND.description} Write, compile, and execute Python, Java, C++, C, Rust, Go, and 15+ languages instantly with interactive STDIN and zero setup.`,
  keywords: [
    'online compiler',
    'free online compiler',
    'online code runner',
    'cloud ide',
    'polyglot ide',
    'python online compiler',
    'java online compiler',
    'c++ online compiler',
    'c online compiler',
    'c# online ide',
    'rust online compiler',
    'go online compiler',
    'javascript online runner',
    'sql online runner',
    'free online ide',
    'omnicompiler',
    'omni compiler',
    'omnicompilerlabs',
  ],
  authors: [{ name: 'Mritunjay Pandey', url: 'https://github.com/mritunjay263' }],
  creator: 'Mritunjay Pandey',
  publisher: BRAND.name,
  metadataBase: new URL(BRAND.url),
  openGraph: {
    title: `${BRAND.name} — Free Online Compiler & Cloud IDE`,
    description: BRAND.description,
    siteName: BRAND.name,
    type: 'website',
    url: BRAND.url,
    locale: 'en_US',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: `${BRAND.name} Universal Polyglot Engine`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — Code, Compile & Run in Real Time`,
    description: BRAND.description,
    images: ['/api/og'],
  },
  alternates: {
    canonical: BRAND.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: gscToken || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Google Analytics 4 (GA4) Live Traffic Tracking */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {/* Cloudflare Privacy-First Web Analytics */}
        {cfToken && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${cfToken}"}`}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
        {/* Vercel Web Analytics & Speed Insights for native Vercel dashboard metrics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
