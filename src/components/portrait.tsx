import Image from 'next/image'

export function Portrait() {
  return (
    <div className="hero-portrait" aria-hidden="true">
      <Image src="/images/atif-ascii.png" alt="" width={1400} height={1391}
        sizes="(max-width: 760px) 224px, 450px" preload className="ascii-portrait" />
    </div>
  )
}
