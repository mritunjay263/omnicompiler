import { NextRequest, NextResponse } from 'next/server';
import { runLocally, RunOptions } from '@/lib/runner/localRunner';
import { runInCloud } from '@/lib/runner/cloudRunner';

export const maxDuration = 15; // Allow Vercel serverless up to 15s for compilation

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

    // Detect cloud or serverless environment (Vercel, AWS Lambda, Render, Fly, production)
    const isServerlessOrCloud = Boolean(
      process.env.VERCEL ||
      process.env.VERCEL_ENV ||
      process.env.VERCEL_URL ||
      process.env.NEXT_PUBLIC_VERCEL_ENV ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.RENDER ||
      process.env.FLY_APP_NAME ||
      process.env.NODE_ENV === 'production'
    );

    // Node.js runtime handles JS and HTML web sandbox locally without native toolchains.
    // In serverless / cloud hosts (Vercel, AWS, etc.), compiled languages (Java, C++, Rust, Go, Python, C#, etc.)
    // do not have compiler binaries (javac, g++, rustc) installed in the microVM.
    // Route them directly to Cloud Runner for instant execution without binary missing errors!
    const isNodeNative = ['javascript', 'js', 'html', 'web'].includes(lang);

    if (isServerlessOrCloud && !isNodeNative) {
      const cloudResult = await runInCloud(runOptions);
      return NextResponse.json(cloudResult);
    }

    // In local development, try local native runner first
    const localResult = await runLocally(runOptions);

    // If local compiler is missing (ENOENT, spawn error, command not found), fall back to Cloud Runner!
    const isMissingCompiler =
      localResult.status === 'error' &&
      (localResult.stderr.includes('ENOENT') ||
        localResult.stderr.includes('not found') ||
        localResult.stderr.includes('spawn') ||
        localResult.stderr.includes('cannot find') ||
        localResult.stderr.includes('command not found'));

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
