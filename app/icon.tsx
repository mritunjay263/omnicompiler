import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090D16',
          borderRadius: 8,
          border: '1.5px solid #38BDF8',
          fontSize: 16,
          fontWeight: 900,
          color: '#38BDF8',
          fontFamily: 'monospace',
          letterSpacing: '-1px',
        }}
      >
        {'</>'}
      </div>
    ),
    {
      ...size,
    }
  );
}
