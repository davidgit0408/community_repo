const dayjs = require('dayjs')
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/page/1',
        destination: '/',
        permanent: false,
      },
    ]
  },
  env: {
    UPDATED_DATE: dayjs().format('YYYY-MM-DDTHH:mm:ssZZ'),
    _DEV_: process.env.NODE_ENV !== 'production',
    BLOG: {
      title: 'Hea的web博客',
      site: 'https://masrk.github.io',
    },
  },
}
module.exports = nextConfig
