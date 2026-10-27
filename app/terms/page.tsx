import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Terms of Service - ${BRAND.name}`,
  description: `Terms of service and platform acceptable use policy for ${BRAND.name} online polyglot compiler.`,
  alternates: {
    canonical: `${BRAND.url}/terms`,
  },
};

export default function TermsPage() {
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
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Terms of Service</h1>
            <p className="text-xs text-slate-400">Effective Date: October 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using {BRAND.name} (&quot;the Service&quot;), available at {BRAND.url}, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access or use our code compilation and execution runtime.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Acceptable Use Policy</h2>
            <p className="mb-2">
              {BRAND.name} provides an interactive polyglot development sandbox designed for education, software development, algorithmic testing, and rapid prototyping. You agree NOT to use the sandbox to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>Deploy malicious software, rootkits, viruses, or denial-of-service scripts.</li>
              <li>Perform cryptocurrency mining, network port scanning, or unauthorized proxying.</li>
              <li>Circumvent container isolation, process timeouts, or resource quotas.</li>
              <li>Host unlawful, abusive, or copyrighted intellectual property without authorization.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Sandboxed Execution & Resource Quotas</h2>
            <p>
              Programs executed on {BRAND.name} run in isolated execution environments subject to strict timeouts (e.g., 8-second hard CPU caps) and memory ceilings. The platform reserves the right to terminate any process that exceeds compute thresholds.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. User Intellectual Property</h2>
            <p>
              You retain all ownership rights to the code snippets and algorithms you write or import into {BRAND.name}. When you generate a shareable URL, you grant the platform a non-exclusive license to store and display your code snippet to anyone holding that link.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. {BRAND.name} does not warrant that code execution will be uninterrupted or error-free.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
          <span>&copy; 2026 {BRAND.name}. All rights reserved.</span>
          <Link href="/privacy" className="text-cyan-400 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
