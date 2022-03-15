// const { GasPlugin } = require('esbuild-gas-plugin');

// require('esbuild').build({
//   entryPoints: ['src/index.ts'],
//   bundle: true,
//   outfile: 'dist/bundle.js',
//   plugins: [GasPlugin]
// }).catch(() => process.exit(1))

import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'esbuild'
import { GasPlugin } from 'esbuild-gas-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

try {
  await build({
    bundle: true,
    format: 'esm',
    target: 'ES2018',
    entryPoints: [path.join(__dirname, 'src', 'index.ts')],
    outfile: 'dist/bundle.js',
    outExtension: { '.js': '.mjs' },
    plugins: [GasPlugin]
  })
} catch {
  process.exitCode = 1
}
