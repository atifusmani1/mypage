'use client'

import { useSyncExternalStore } from 'react'
import { ThermalText } from '@/components/thermal-text'

type ProjectVideoProps = {
  id: string
  title: string
}

const subscribeToHydration = () => () => {}
const getHydrated = () => true
const getServerHydrated = () => false

function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const getServerReducedMotion = () => false

/**
 * Mounts the privacy-enhanced YouTube player after hydration. Autoplay is
 * muted because browsers block audible autoplay; reduced motion loads the
 * player without starting it. Before hydration, and without JavaScript, the
 * fallback is a plain link to the video.
 */
export function ProjectVideo({ id, title }: ProjectVideoProps) {
  const hydrated = useSyncExternalStore(subscribeToHydration, getHydrated, getServerHydrated)
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, getServerReducedMotion)

  const src = hydrated
    ? `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0&autoplay=${reducedMotion ? '0' : '1'}${reducedMotion ? '' : '&mute=1'}`
    : undefined

  return (
    <div className="detail-video">
      {src ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <a className="detail-video-fallback thermal-link" href={`https://youtu.be/${id}`}>
          <ThermalText>{`Watch ${title} on YouTube`}</ThermalText>
        </a>
      )}
    </div>
  )
}
