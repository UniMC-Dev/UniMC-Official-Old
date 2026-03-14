/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_EXPORT === 'true' ? 'export' : 'standalone',
  headers: async () => [
    {
      source: '/data/servers.json',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600' },
        { key: 'Content-Type', value: 'application/json' },
      ],
    },
    {
      source: '/avatar/:filename*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=86400, immutable' },
      ],
    },
    {
      source: '/:filename*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
}

export default nextConfig;
