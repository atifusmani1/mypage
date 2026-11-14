import Image from 'next/image'
import portrait from '../../content/aitf-usmani-portrait.png'

export function Portrait() {
  return (
    <div className="hero-portrait" aria-hidden="true">
      <Image src={portrait} alt=""
        sizes="(max-width: 760px) 224px, 450px" preload className="portrait-photo" />
    </div>
  )
}
