import type { ReactNode } from "react"

type ModuleProps = {
  children: ReactNode
}

export default function Module({ children }: ModuleProps) {
  return (
    <div className="module">
      {children}
    </div>
  )
}