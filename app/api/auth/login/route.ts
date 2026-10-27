import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateUser, signSession, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const provider = body.provider || 'github';

    let name = body.name?.trim();
    let email = body.email?.trim();
    let username = body.username?.trim();
    let avatar = body.avatar?.trim();

    if (provider === 'guest') {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      name = name || `Guest Developer #${randomNum}`;
      username = username || `guest_${randomNum}`;
      email = email || `guest_${randomNum}@omnicompiler.local`;
    } else if (provider === 'github') {
      const defaultUser = 'developer_' + Math.floor(100 + Math.random() * 900);
      username = username || defaultUser;
      name = name || `GitHub Dev (@${username})`;
      email = email || `${username}@github.dev`;
      avatar = avatar || `https://avatars.githubusercontent.com/u/${Math.floor(1000000 + Math.random() * 9000000)}?v=4`;
    } else if (provider === 'google') {
      const defaultUser = 'engineer_' + Math.floor(100 + Math.random() * 900);
      username = username || defaultUser;
      name = name || `Cloud Developer`;
      email = email || `${username}@gmail.com`;
    }

    const user = createOrUpdateUser({
      name,
      email,
      username,
      provider,
      avatar,
    });

    const token = signSession(user);

    const response = NextResponse.json({
      success: true,
      user,
      token,
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
