import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { LANGUAGES } from '@/lib/languages';
import { generateLanguageSchema } from '@/lib/seo';
import { Workspace } from '@/components/Workspace';
import { LanguageSeoSection } from '@/components/LanguageSeoSection';

import { BRAND } from '@/lib/brand';

interface PageProps {
  params: Promise<{ language: string }>;
}

export async function generateStaticParams() {
  return Object.keys(LANGUAGES).map((language) => ({
    language,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language } = await params;
  const config = LANGUAGES[language.toLowerCase()];

  if (!config) {
    return {
      title: `Compiler Not Found - ${BRAND.name}`,
    };
  }

  return {
    title: `${config.seo.title} | ${BRAND.name}`,
    description: config.seo.description,
    keywords: config.seo.keywords,
    openGraph: {
      title: `${config.seo.title} | ${BRAND.name}`,
      description: config.seo.description,
      type: 'website',
      url: `${BRAND.url}/${config.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${config.seo.title} | ${BRAND.name}`,
      description: config.seo.description,
    },
  };
}

export default async function LanguagePage({ params }: PageProps) {
  const { language } = await params;
  const config = LANGUAGES[language.toLowerCase()];

  if (!config) {
    notFound();
  }

  // Schema.org structured data for SEO ranking
  const { webAppSchema, faqSchema, breadcrumbSchema } = generateLanguageSchema(config);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-main)]">
      {/* Schema.org Structured Data for Google Ranking */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Main Interactive IDE Workspace */}
      <main className="w-full h-screen">
        <Suspense fallback={<div className="h-full w-full bg-[var(--bg-main)] flex items-center justify-center text-sm font-mono text-[var(--text-secondary)]">Loading {config.name} Workspace...</div>}>
          <Workspace language={config} />
        </Suspense>
      </main>

      {/* Rich Educational Tutorial & SEO Information */}
      <LanguageSeoSection language={config} />
    </div>
  );
}
