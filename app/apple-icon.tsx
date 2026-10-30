import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090D16',
          borderRadius: 40,
          border: '4px solid #38BDF8',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#38BDF8',
            fontFamily: 'monospace',
            letterSpacing: '-2px',
          }}
        >
          {'</>'}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: '#A5B4FC',
            fontFamily: 'sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginTop: 4,
          }}
        >
          Omni
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
