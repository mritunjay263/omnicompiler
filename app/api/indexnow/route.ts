import { NextRequest, NextResponse } from 'next/server';
import { LANGUAGES } from '@/lib/languages';

const INDEXNOW_KEY = '8f3b9c7e1a2d4e6f8b0c2a4e6f8b0c2a';

export async function POST(request: NextRequest) {
  try {
    const host = request.headers.get('host') || 'omnicompiler.io';
    const baseUrl = `https://${host}`;

    const urlList = [
      `${baseUrl}/`,
      `${baseUrl}/web`,
      `${baseUrl}/database`,
      `${baseUrl}/cheatsheets`,
      `${baseUrl}/terms`,
      `${baseUrl}/privacy`,
      ...Object.keys(LANGUAGES).map((id) => `${baseUrl}/${id}`),
    ];

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: true,
      status: res.status,
      submittedUrls: urlList.length,
      message: 'Instant search engine indexing notification dispatched successfully.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
