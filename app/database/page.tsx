import { Metadata } from 'next';
import { LANGUAGES } from '@/lib/languages';
import { Workspace } from '@/components/Workspace';
import { LanguageSeoSection } from '@/components/LanguageSeoSection';

export const metadata: Metadata = {
  title: 'Database Playground - SQL Online Compiler & Query Runner',
  description: 'Execute SQL queries, test schemas, JOINs, aggregations, and inspect interactive visual table results online.',
};

export default function DatabasePage() {
  const config = LANGUAGES.sql;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-main)]">
      <main className="w-full h-screen">
        <Workspace language={config} />
      </main>
      <LanguageSeoSection language={config} />
    </div>
  );
}
