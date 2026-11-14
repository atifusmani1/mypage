/* oxlint-disable react/only-export-components -- Next.js route exports. */
import type { Metadata } from 'next'
import { PhotoGallery } from '@/components/photo-gallery'

export const metadata: Metadata = { title: 'Gallery — Atif Usmani' }

export default function MoreLifePage() {
  return <PhotoGallery />
}
