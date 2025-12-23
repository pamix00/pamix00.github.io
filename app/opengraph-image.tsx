import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Patryk Czech - Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {

  const primaryColor = '#00f0ff'
  const secondaryColor = '#bc13fe'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000101',
          backgroundImage: 'radial-gradient(circle at 50% 100%, #11111a 0%, #010101 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 150,
            fontWeight: 100,
            marginBottom: 40,
          }}
        >
          <span style={{ color: primaryColor, marginRight: 15 }}>&lt;</span>
          <span style={{ color: 'white' }}>PC</span>
          <span style={{ color: secondaryColor, marginLeft: 15, marginRight: 15 }}>_</span>
          <span style={{ color: primaryColor }}>/&gt;</span>
        </div>

        <div
          style={{
            fontSize: 70,
            color: 'white',
            letterSpacing: '-0.05em',
            marginBottom: 10,
          }}
        >
          Patryk Czech
        </div>

        <div style={{ 
            fontSize: 36,
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Web Developer
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}