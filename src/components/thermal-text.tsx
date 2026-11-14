export function ThermalText({ children }: { children: string }) {
  return (
    <span className="thermal-text">
      <span className="thermal-copy">{children}</span>
      <span className="thermal-label" aria-hidden="true">{children}</span>
    </span>
  )
}
