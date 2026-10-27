import { NextRequest } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  provider: 'github' | 'google' | 'guest';
  avatar: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SECRET = process.env.SESSION_SECRET || 'omnicompiler_production_auth_key_2026';
export const SESSION_COOKIE_NAME = 'omnicompiler_session';

function ensureUsersFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]), 'utf-8');
  }
}

export function getAllUsers(): User[] {
  try {
    ensureUsersFile();
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]) {
  ensureUsersFile();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export function findUserById(id: string): User | null {
  const users = getAllUsers();
  return users.find((u) => u.id === id) || null;
}

export function createOrUpdateUser(userData: {
  id?: string;
  name: string;
  email: string;
  username: string;
  provider: 'github' | 'google' | 'guest';
  avatar?: string;
}): User {
  const users = getAllUsers();
  let existing = users.find((u) => u.email === userData.email && u.provider === userData.provider);

  if (!existing && userData.id) {
    existing = users.find((u) => u.id === userData.id);
  }

  if (existing) {
    existing.name = userData.name;
    if (userData.avatar) existing.avatar = userData.avatar;
    saveUsers(users);
    return existing;
  }

  const id = userData.id || `usr_${crypto.randomBytes(6).toString('hex')}`;
  const defaultAvatar =
    userData.provider === 'github'
      ? `https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=100&h=100&fit=crop`
      : userData.provider === 'google'
      ? `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop`
      : `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop`;

  const newUser: User = {
    id,
    name: userData.name,
    email: userData.email,
    username: userData.username,
    provider: userData.provider,
    avatar: userData.avatar || defaultAvatar,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

/**
 * Sign session payload with HMAC SHA256
 */
export function signSession(user: User): string {
  const payload = JSON.stringify({
    userId: user.id,
    email: user.email,
    provider: user.provider,
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  const encodedPayload = Buffer.from(payload).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET).update(encodedPayload).digest('base64url');
  return `${encodedPayload}.${signature}`;
}

/**
 * Verify signed session token
 */
export function verifySession(token: string): { userId: string; email: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedPayload, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', SECRET).update(encodedPayload).digest('base64url');

    if (signature !== expectedSig) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Extract active user from incoming NextRequest cookies or Authorization header
 */
export function getAuthenticatedUser(request: NextRequest): User | null {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const authHeader = request.headers.get('authorization')?.replace(/^Bearer\s+/, '');
  const token = cookie || authHeader;

  if (!token) return null;

  const payload = verifySession(token);
  if (!payload || !payload.userId) return null;

  return findUserById(payload.userId);
}
