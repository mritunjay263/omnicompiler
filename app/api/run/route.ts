import { NextRequest, NextResponse } from 'next/server';
import { runLocally, RunOptions } from '@/lib/runner/localRunner';
import { runInCloud } from '@/lib/runner/cloudRunner';

export const maxDuration = 15; // Allow Vercel functions up to 15s for compilation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { language, files, stdin = '' } = body;

    if (!language || !files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: 'Missing language or files array in request body.' },
        { status: 400 }
      );
    }

    const runOptions: RunOptions = {
      language: language.toLowerCase(),
      files,
      stdin,
      timeoutMs: 8000,
    };

    const lang = runOptions.language;
    const isVercel = process.env.VERCEL === '1';

    // On Vercel, serverless containers do not have C++, Java, Rust, Python, Go installed.
    // For compiled/interpreted languages on Vercel, run directly in Cloud Runner for instant execution!
    const needsCloudOnVercel = isVercel && !['javascript', 'js', 'html', 'web'].includes(lang);

    if (needsCloudOnVercel) {
      const cloudResult = await runInCloud(runOptions);
      return NextResponse.json(cloudResult);
    }

    // Try local runner
    const localResult = await runLocally(runOptions);

    // If local runner failed due to missing binary (ENOENT), seamlessly fall back to Cloud Runner!
    const isMissingCompiler =
      localResult.status === 'error' &&
      (localResult.stderr.includes('ENOENT') ||
        localResult.stderr.includes('not found') ||
        localResult.stderr.includes('spawn'));

    if (isMissingCompiler) {
      const cloudFallback = await runInCloud(runOptions);
      return NextResponse.json(cloudFallback);
    }

    return NextResponse.json(localResult);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        stdout: '',
        stderr: `Server execution error: ${errorMessage}`,
        exitCode: 1,
        executionTime: 0,
        status: 'error',
        runner: 'error',
      },
      { status: 500 }
    );
  }
}
