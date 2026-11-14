/* oxlint-disable react/only-export-components -- Next.js requires metadata exports in layout files. */
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Atif Usmani',
  description: 'The personal page of Atif Usmani. A place for projects, learning, and life beyond the screen.',
  robots: { index: false, follow: false }, // Keep the placeholder draft out of search results.
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080a0c',
  viewportFit: 'cover',
}

// Runs before the page paints so the one-time intro never flashes final content.
// It also fails open: if the client never finishes, the attribute clears itself.
const introBootstrap = `
try {
  var seen = false;
  try { seen = sessionStorage.getItem('intro-seen') === '1'; } catch (error) {}
  if (location.pathname === '/' && !seen && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.dataset.intro = 'run';
    window.setTimeout(function () {
      if (document.documentElement.dataset.intro === 'run') {
        document.documentElement.dataset.intro = 'static';
      }
    }, 12000);
  }
} catch (error) {}
`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The bootstrap intentionally sets data-intro before hydration. Accept only
    // this element's attribute differences; descendants still hydrate normally.
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
        {children}
      </body>
    </html>
  )
}
