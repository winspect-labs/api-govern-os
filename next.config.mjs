import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: false,
  search: {
    codeblocks: false,
  },
})

import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
}

export default withNextra(nextConfig)
