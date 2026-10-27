import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, EyeOff } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Privacy Policy - ${BRAND.name}`,
  description: `Privacy policy and data governance transparency for ${BRAND.name} developers.`,
  alternates: {
    canonical: `${BRAND.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-[#161b22] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Playground</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-400">Effective Date: October 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Our Privacy Philosophy</h2>
            <p>
              {BRAND.name} was built with developer privacy and minimalism as primary design principles. We do not sell your personal information, train public models on your private snippets, or inject invasive tracking scripts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Information We Process</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>
                <strong className="text-slate-200">Execution Code & Inputs:</strong> Source files and standard inputs (STDIN) transmitted to the compiler are processed in volatile temporary sandbox directories and discarded immediately following execution.
              </li>
              <li>
                <strong className="text-slate-200">Developer SSO Information:</strong> If you sign in via GitHub, Google, or Guest developer mode, we store your public display name, email, and avatar strictly for authenticating your cloud snippet ownership.
              </li>
              <li>
                <strong className="text-slate-200">Telemetry & Health Metrics:</strong> Anonymous server metrics (CPU usage, process duration) are collected to protect against resource abuse.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Storage & Cookies</h2>
            <p>
              We utilize a cryptographically signed HTTP-only cookie (<code className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-cyan-400">omnicompiler_session</code>) solely to maintain your active authentication session. No cross-site advertising or third-party marketing cookies are utilized.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Cloud Snippet Deletion Rights</h2>
            <p>
              You maintain total autonomy over your shared code snippets. Authenticated developers can instantly delete any snippet authored under their profile from the &quot;My Cloud Snippets&quot; dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Contact Us</h2>
            <p>
              If you have any questions or data removal requests regarding this Privacy Policy, please contact our engineering team at <span className="text-cyan-400">privacy@omnicompiler.io</span>.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
          <span>&copy; 2026 {BRAND.name}. All rights reserved.</span>
          <Link href="/terms" className="text-cyan-400 hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
