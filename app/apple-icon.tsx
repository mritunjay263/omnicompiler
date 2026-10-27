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
          fontSize: 108,
          background: 'linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 40,
          fontWeight: 900,
          fontFamily: 'monospace',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        Ω
      </div>
    ),
    {
      ...size,
    }
  );
}
