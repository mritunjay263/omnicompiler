import { NextResponse } from 'next/server';
import { BRAND } from '@/lib/brand';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: BRAND.name,
    version: BRAND.version,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
  });
}
