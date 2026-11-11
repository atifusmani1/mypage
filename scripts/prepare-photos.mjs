// Converts the HEIC/JPG originals in content/image-panes/photos/ into
// upright, browser-ready JPEGs for the More Life gallery.
//
// The originals carry portrait rotation that sips ignores, so Quick Look
// renders each photo upright first and sips writes the JPEG. macOS only.
// Run: node scripts/prepare-photos.mjs
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'

const run = promisify(execFile)
const source = 'content/image-panes/photos'
const output = 'public/images/photos'

mkdirSync(output, { recursive: true })
const seen = new Set()
const files = readdirSync(source)
  .filter(file => /\.(heic|heif|jpe?g|png|webp)$/i.test(file))
  .filter(file => !/ copy\./i.test(file))
  .sort()

for (const file of files) {
  const hash = createHash('sha256').update(readFileSync(join(source, file))).digest('hex')
  if (seen.has(hash)) {
    console.log(`skip duplicate: ${file}`)
    continue
  }
  seen.add(hash)

  const name = file.slice(0, file.lastIndexOf('.'))
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const target = join(output, `${slug}.jpg`)
  const scratch = mkdtempSync(join(tmpdir(), 'photo-'))

  await run('qlmanage', ['-t', '-s', '1600', '-o', scratch, join(source, file)])
  await run('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', join(scratch, `${file}.png`), '--out', target])
  rmSync(scratch, { recursive: true, force: true })
  console.log(`${file} -> ${target}`)
}

console.log(`\n${seen.size} photos ready in ${output}.`)
