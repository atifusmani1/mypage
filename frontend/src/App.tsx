import { useCallback, useState } from 'react'
import TitleBar from './components/TitleBar'
import ActivityBar from './components/ActivityBar'
import Sidebar from './components/Sidebar'
import EditorArea, { type Tab } from './components/EditorArea'
import StatusBar from './components/StatusBar'
import { getNode } from './data/filesystem'

export default function App() {
  // 'terminal' is a permanent tab; files open as additional tabs
  const [tabs, setTabs] = useState<Tab[]>([{ kind: 'terminal', id: 'terminal', label: 'welcome.sh — bash' }])
  const [activeTab, setActiveTab] = useState('terminal')

  const openFile = useCallback(
    (path: string) => {
      const node = getNode(path.split('/'))
      if (!node || node.type !== 'file') return
      setTabs((prev) => {
        if (prev.some((t) => t.id === path)) return prev
        const label = path.split('/').pop() ?? path
        return [...prev, { kind: 'file', id: path, path, label }]
      })
      setActiveTab(path)
    },
    [],
  )

  const closeTab = useCallback(
    (id: string) => {
      if (id === 'terminal') return // the terminal tab cannot be closed
      setTabs((prev) => {
        const next = prev.filter((t) => t.id !== id)
        setActiveTab((active) => (active === id ? 'terminal' : active))
        return next
      })
    },
    [],
  )

  return (
    <div className="flex h-full flex-col">
      <TitleBar />
      <div className="flex min-h-0 flex-1">
        <ActivityBar />
        <Sidebar onOpenFile={openFile} activePath={activeTab} />
        <EditorArea tabs={tabs} activeTab={activeTab} onSelectTab={setActiveTab} onCloseTab={closeTab} onOpenFile={openFile} />
      </div>
      <StatusBar />
    </div>
  )
}
