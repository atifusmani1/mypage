/* oxlint-disable react/only-export-components -- Next.js requires metadata exports in layout files. */
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Atif Usmani — Always building. Always learning.',
  description: 'The personal page of Atif Usmani. A place for projects, learning, and life beyond the screen.',
  robots: { index: false, follow: false }, // Keep the placeholder draft out of search results.
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
