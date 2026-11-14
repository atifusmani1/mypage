'use client'

import { useRef, useState, type MouseEvent } from 'react'
import { ThermalText } from './thermal-text'

const RESUME_URL = '/resume.pdf'

export function ResumePopup() {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLAnchorElement>(null)
  const [open, setOpen] = useState(false)

  function show(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    dialog.current?.showModal()
    document.documentElement.classList.remove('circle-cursor-active')
    setOpen(true)
  }

  function close() { dialog.current?.close() }

  return <>
    <a ref={trigger} className="thermal-link" href={RESUME_URL} aria-haspopup="dialog" onClick={show}><ThermalText>Resume</ThermalText></a>
    <dialog ref={dialog} className="resume-dialog" aria-labelledby="resume-dialog-title"
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close()
      }}
      onClose={() => { setOpen(false); trigger.current?.focus() }}>
      <div className="resume-dialog-header">
        <h2 id="resume-dialog-title">Resume</h2>
        <div className="resume-dialog-actions">
          <a href={RESUME_URL} download="Atif_Usmani_Resume.pdf">Download</a>
          <button type="button" onClick={close}>Close</button>
        </div>
      </div>
      {open && <iframe className="resume-preview" src={RESUME_URL} title="Atif Usmani resume PDF" />}
    </dialog>
  </>
}
