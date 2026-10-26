import { Metadata } from 'next';
import { LANGUAGES } from '@/lib/languages';
import { Workspace } from '@/components/Workspace';
import { LanguageSeoSection } from '@/components/LanguageSeoSection';

export const metadata: Metadata = {
  title: 'Web Studio - HTML5, CSS3 & JavaScript Online Editor & Live Preview',
  description: 'Live interactive frontend web sandbox. Write HTML, CSS, and JavaScript with instant split-screen preview, device toggles, and console output.',
};

export default function WebStudioPage() {
  const config = LANGUAGES.html;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-main)]">
      <main className="w-full h-screen">
        <Workspace language={config} />
      </main>
      <LanguageSeoSection language={config} />
    </div>
  );
}
