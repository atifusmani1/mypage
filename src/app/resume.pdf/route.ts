import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const dynamic = 'force-static'

export function GET() {
  const pdf = readFileSync(join(process.cwd(), 'content/Atif_Usmani_UCI_DS_AI_ML.pdf'))

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Atif_Usmani_Resume.pdf"',
    },
  })
}
