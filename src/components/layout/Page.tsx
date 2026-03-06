import type { ReactNode } from "react"

type PageProps = {
  children: ReactNode
  centered?: boolean
  light?: boolean
}

export default function Page({ children, centered, light }: PageProps) {
  return (
    <section
      className={`page ${centered ? "centered" : ""} ${
        light ? "light" : ""
      }`}
    >
      <div className="content">{children}</div>
    </section>
  )
}