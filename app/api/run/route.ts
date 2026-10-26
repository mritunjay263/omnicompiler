import { NextRequest, NextResponse } from 'next/server';
import { runLocally, RunOptions } from '@/lib/runner/localRunner';

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

    // 100% Local Self-Contained Execution with zero external dependency
    const result = await runLocally(runOptions);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        stdout: '',
        stderr: `Server error: ${errorMessage}`,
        exitCode: 1,
        executionTime: 0,
        status: 'error',
        runner: 'error',
      },
      { status: 500 }
    );
  }
}
