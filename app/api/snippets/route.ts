import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAuthenticatedUser } from '@/lib/auth';

export interface Snippet {
  id: string;
  title: string;
  language: string;
  files: { name: string; content: string }[];
  stdin?: string;
  createdAt: string;
  userId?: string;
  author?: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'snippets.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf-8');
  }
}

function getSnippets(): Snippet[] {
  try {
    ensureDataFile();
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch {
    return [];
  }
}

function saveSnippets(snippets: Snippet[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(snippets, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);
    const { title = 'Untitled Snippet', language, files, stdin = '' } = await request.json();

    if (!language || !files || files.length === 0) {
      return NextResponse.json({ error: 'Language and files are required.' }, { status: 400 });
    }

    const snippets = getSnippets();
    const id = Math.random().toString(36).substring(2, 9);
    const newSnippet: Snippet = {
      id,
      title,
      language,
      files,
      stdin,
      createdAt: new Date().toISOString(),
      userId: user?.id,
      author: user?.name || 'Anonymous Developer',
    };

    snippets.unshift(newSnippet);
    // Keep max 2000 snippets
    if (snippets.length > 2000) snippets.pop();
    saveSnippets(snippets);

    return NextResponse.json({
      success: true,
      snippet: newSnippet,
      url: `/${language}?snippetId=${id}`,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const mine = searchParams.get('mine');
  const user = getAuthenticatedUser(request);

  const snippets = getSnippets();

  if (id) {
    const snippet = snippets.find((s) => s.id === id);
    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }
    return NextResponse.json(snippet);
  }

  if (mine === 'true') {
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userSnippets = snippets.filter((s) => s.userId === user.id);
    return NextResponse.json(userSnippets);
  }

  // Return recent snippets
  return NextResponse.json(snippets.slice(0, 25));
}

export async function DELETE(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Snippet ID is required' }, { status: 400 });
    }

    let snippets = getSnippets();
    const snippet = snippets.find((s) => s.id === id);

    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    // Only allow deletion if user owns it or is admin/guest author
    if (user && snippet.userId && snippet.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    snippets = snippets.filter((s) => s.id !== id);
    saveSnippets(snippets);

    return NextResponse.json({ success: true, message: 'Snippet deleted' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
