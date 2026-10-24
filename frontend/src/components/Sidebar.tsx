import { useState } from 'react'
import { FILESYSTEM, getNode, type DirNode } from '../data/filesystem'

interface SidebarProps {
  onOpenFile: (path: string) => void
  activePath: string
}

// File explorer tree, mirroring the virtual filesystem.
// Styled like VS Code's side bar: Explorer header, indented tree,
// selected file highlighted with the accent color.
export default function Sidebar({ onOpenFile, activePath }: SidebarProps) {
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set())

  const toggleFolder = (path: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  const renderDir = (name: string, path: string, node: DirNode, depth: number) => {
    const open = openFolders.has(path)
    const entries = Object.entries(node.children)
    return (
      <div key={path}>
        <button
          onClick={() => toggleFolder(path)}
          className="flex w-full items-center gap-1.5 px-2 py-1 text-left text-[12px] text-ink hover:bg-white/5 focus-visible:ring-1 focus-visible:ring-cyan"
          style={{ paddingLeft: depth * 16 + 8 }}
        >
          <Chevron open={open} />
          <FolderIcon open={open} />
          {name}
        </button>
        {open && (
          <div>
            {entries.length === 0 && (
              <div className="px-3 py-1 text-[11px] text-dim/70 italic" style={{ paddingLeft: depth * 16 + 24 }}>
                empty — coming soon
              </div>
            )}
            {entries.map(([childName, childNode]) =>
              childNode.type === 'dir' ? (
                renderDir(childName, `${path}/${childName}`, childNode, depth + 1)
              ) : (
                <FileRow
                  key={childName}
                  name={childName}
                  path={`${path}/${childName}`}
                  depth={depth + 1}
                  onOpenFile={onOpenFile}
                  active={activePath === `${path}/${childName}`}
                />
              ),
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className="flex w-72 shrink-0 flex-col bg-panel border-r border-edge text-[12px]">
      <div className="flex h-9 shrink-0 items-center px-3 text-[11px] tracking-wider text-dim uppercase select-none">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain pb-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-wider text-dim uppercase select-none">
          <Chevron open /> mypage
        </div>
        {Object.entries(FILESYSTEM.children).map(([name, node]) =>
          node.type === 'dir' ? (
            renderDir(name, name, node, 1)
          ) : (
            <FileRow
              key={name}
              name={name}
              path={name}
              depth={1}
              onOpenFile={onOpenFile}
              active={activePath === name}
            />
          ),
        )}
      </div>
    </aside>
  )
}

function FileRow({
  name,
  path,
  depth,
  onOpenFile,
  active,
}: {
  name: string
  path: string
  depth: number
  onOpenFile: (path: string) => void
  active: boolean
}) {
  const exists = getNode(path.split('/'))?.type === 'file'
  return (
    <button
      onClick={() => exists && onOpenFile(path)}
      className={`flex w-full items-center gap-1.5 px-2 py-1 text-left text-[12px] ${
        active
          ? 'bg-accent/15 text-accent'
          : 'text-ink/90 hover:bg-white/5'
      } transition-colors`}
      style={{ paddingLeft: depth * 16 + 20 }}
    >
      <FileIcon name={name} />
      {name}
    </button>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-3 w-3 shrink-0 text-dim transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-accent/70" aria-hidden="true">
      {open ? (
        <path d="M3 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v1H5.5L3 17V7Zm0 10 2.5-7H21l-2.5 7H3Z" strokeLinejoin="round" />
      ) : (
        <path d="M4 6a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function FileIcon({ name }: { name: string }) {
  const ext = name.split('.').pop() ?? ''
  const color =
    ext === 'md' ? 'text-dim' : ext === 'sh' ? 'text-accent' : 'text-ink/70'
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 shrink-0 ${color}`} aria-hidden="true">
      <path d="M7 3h7l4 4v14H7V3Zm7 0v4h4" strokeLinejoin="round" />
    </svg>
  )
}
