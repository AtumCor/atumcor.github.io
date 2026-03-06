import type { ReactNode } from "react"
import { useEffect, useRef } from "react"

type Props = {
  children: ReactNode
}

export default function ScrollContainer({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  // convert vertical wheel to horizontal scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      container.scrollLeft += e.deltaY
    }

    container.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      container.removeEventListener("wheel", handleWheel)
    }
  }, [])

  return (
    <div ref={containerRef} className="scroll-container">
      {children}
    </div>
  )
}