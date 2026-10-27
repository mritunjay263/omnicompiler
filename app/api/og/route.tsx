import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getLanguageConfig } from '@/lib/languages';
import { BRAND } from '@/lib/brand';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const langKey = searchParams.get('lang');
    const lang = langKey ? getLanguageConfig(langKey) : null;

    const title = lang
      ? `${lang.name} Online Compiler & Sandbox`
      : 'OmniCompiler — Universal Online Compiler & Polyglot IDE';

    const subtitle = lang
      ? `Compile, debug, and execute ${lang.name} code online in real time with high-performance native runners.`
      : 'Run Python, C++, Java, Rust, Go, Node.js, and SQL natively with zero latency and full isolation.';

    const version = lang?.version ? `v${lang.version}` : '2026 Edition';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px',
            backgroundColor: '#0d1117',
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)',
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: 900,
                }}
              >
                Ω
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
                  {BRAND.name}
                </span>
                <span style={{ fontSize: '14px', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Universal Polyglot Engine
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 20px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#38bdf8',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {version}
            </div>
          </div>

          {/* Main Title Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 'auto 0' }}>
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-1.5px',
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '22px',
                color: '#94a3b8',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '950px',
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Feature Badges Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', gap: '14px' }}>
              {['⚡ Sub-Millisecond Cold Starts', '🔒 Container Isolated', '🚀 Multi-File Support', '🧠 AI Copilot'].map(
                (badge, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#cbd5e1',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    {badge}
                  </div>
                )
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '15px' }}>
              omnicompiler.io
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : String(e);
    return new Response(`Failed to generate the image: ${errorMsg}`, {
      status: 500,
    });
  }
}
