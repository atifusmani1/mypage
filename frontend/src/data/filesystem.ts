// Virtual filesystem — single source of truth for the explorer sidebar,
// the terminal (`ls`, `cat`, `cd`, `tree`) and the read-only file viewer.
// Add your real projects/info here later; everything updates automatically.

export interface FileNode {
  type: 'file'
  content: string
}

export interface DirNode {
  type: 'dir'
  children: Record<string, FSNode>
}

export type FSNode = FileNode | DirNode

export const WELCOME_SCRIPT = [
  '#!/bin/bash',
  "# welcome to Atif Usmani's page",
  '# type "ls" to see folders or chat in the box below',
  '# NOTE: You don\u2019t need to know how to code to view this page',
]

export const FILESYSTEM: DirNode = {
  type: 'dir',
  children: {
    'welcome.sh': {
      type: 'file',
      content: WELCOME_SCRIPT.join('\n'),
    },
    about: {
      type: 'dir',
      children: {
        'bio.md': {
          type: 'file',
          content: [
            '# about me',
            '',
            'Hi, I\u2019m Atif Usmani.',
            '',
            'This is a placeholder bio \u2014 replace me with the real thing.',
            'I build things, and this site is one of them: a personal page',
            'disguised as a terminal / IDE.',
          ].join('\n'),
        },
      },
    },
    projects: {
      type: 'dir',
      children: {},
    },
    contact: {
      type: 'dir',
      children: {
        'reach.md': {
          type: 'file',
          content: [
            '# reach me',
            '',
            '- email:    hello@atifusmani.dev',
            '- github:   github.com/atifusmani',
            '- linkedin: linkedin.com/in/atifusmani',
            '',
            '(placeholders \u2014 update with real links)',
          ].join('\n'),
        },
      },
    },
    'README.md': {
      type: 'file',
      content: [
        '# mypage',
        '',
        'A personal website that looks like a terminal / IDE.',
        '',
        '- Open files from the explorer, or `cat` them in the terminal.',
        '- Chat with the assistant in the panel below.',
        '',
        'Everything here is a placeholder \u2014 the real content comes later.',
      ].join('\n'),
    },
  },
}

/** Walk the tree along a path of segments; returns null if it doesn't exist. */
export function getNode(segments: string[]): FSNode | null {
  let node: FSNode = FILESYSTEM
  for (const seg of segments) {
    if (node.type !== 'dir') return null
    const next: FSNode | undefined = node.children[seg]
    if (!next) return null
    node = next
  }
  return node
}

/**
 * Resolve a user-supplied path argument against the current working directory.
 * Supports `~`, absolute-from-~ paths, `.`, `..` and plain relative paths.
 * Returns the resolved segments, or null if invalid.
 */
export function resolvePath(cwd: string[], arg: string | undefined): string[] | null {
  let target = arg?.trim() ?? ''
  if (target === '' || target === '~') return []
  if (target.startsWith('~/')) target = target.slice(2)
  if (target.startsWith('/')) target = target.slice(1)

  const segments = [...cwd]
  for (const part of target.split('/')) {
    if (part === '' || part === '.') continue
    if (part === '..') {
      segments.pop()
      continue
    }
    segments.push(part)
  }

  // every intermediate hop must exist
  for (let i = 1; i <= segments.length; i++) {
    const node = getNode(segments.slice(0, i))
    if (!node) return null
    if (i < segments.length && node.type === 'file') return null
  }
  return segments
}

/** Human display for a path: `~` or `~/projects/foo`. */
export function displayPath(segments: string[]): string {
  return segments.length === 0 ? '~' : `~/${segments.join('/')}`
}
