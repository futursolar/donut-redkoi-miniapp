/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/019aac00-d5f8-2f5f-4683-2d4f76a758c9',
        permanent: false,  // 307 Temporary Redirect (false = 307, true = 308 永久)
      },
    ];
  },
};

module.exports = nextConfig;
