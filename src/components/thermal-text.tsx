export function ThermalText({ children }: { children: string }) {
  return (
    <span className="thermal-text">
      {children}
      <span className="thermal-label" aria-hidden="true">{children}</span>
    </span>
  )
}
