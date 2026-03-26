"use client"

import { useState, useEffect, useRef } from "react"

interface SelectedElement {
  id: string
  element: HTMLElement
  rect: DOMRect
}

export function ElementInspector() {
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editValue, setEditValue] = useState("")
  const selectionBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("edit") === "true") {
      setIsEditMode(true)
    }
  }, [])

  useEffect(() => {
    if (!isEditMode) return

    const handleElementClick = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const target = e.target as HTMLElement

      // Don't select UI elements
      if (
        target.hasAttribute("data-ui-element") ||
        target.closest("[data-ui-element]") ||
        target.hasAttribute("data-editor-id") && target.tagName === "BUTTON"
      ) {
        return
      }

      // Find the closest editable element with data-editor-id or a section/div
      let element = target.closest("[data-editor-id]") as HTMLElement
      if (!element && (target.tagName === "P" || target.tagName === "H1" || target.tagName === "H2" || target.tagName === "H3")) {
        element = target
      }

      if (element) {
        const rect = element.getBoundingClientRect()
        const id = element.getAttribute("data-editor-id") || element.id || `element-${Date.now()}`

        setSelectedElement({
          id,
          element,
          rect
        })
        setEditValue(element.textContent || "")
      }
    }

    document.addEventListener("click", handleElementClick, true)
    return () => document.removeEventListener("click", handleElementClick, true)
  }, [isEditMode])

  // Update selection box position
  useEffect(() => {
    if (!selectedElement || !selectionBoxRef.current) return

    const updatePosition = () => {
      const rect = selectedElement.element.getBoundingClientRect()
      const box = selectionBoxRef.current

      if (box) {
        box.style.top = `${rect.top + window.scrollY}px`
        box.style.left = `${rect.left + window.scrollX}px`
        box.style.width = `${rect.width}px`
        box.style.height = `${rect.height}px`
        box.style.display = "block"
      }
    }

    updatePosition()
    window.addEventListener("scroll", updatePosition)
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("scroll", updatePosition)
      window.removeEventListener("resize", updatePosition)
    }
  }, [selectedElement])

  const handleSaveEdit = () => {
    if (selectedElement) {
      selectedElement.element.textContent = editValue
      localStorage.setItem(selectedElement.id, editValue)
      setSelectedElement(null)
    }
  }

  return (
    <>
      {/* Selection Box */}
      <div
        ref={selectionBoxRef}
        className="fixed z-40 border-2 border-blue-500 bg-blue-500/5 pointer-events-none rounded shadow-lg"
        style={{ display: "none" }}
      />

      {/* Edit Panel */}
      {isEditMode && selectedElement && (
        <div className="fixed bottom-4 right-4 z-50 bg-card border border-border rounded-lg p-4 shadow-xl max-w-xs">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Editando: {selectedElement.id}
            </p>
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded bg-background text-sm"
              rows={4}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="flex-1 rounded bg-primary px-3 py-2 text-xs text-primary-foreground font-semibold hover:bg-primary/90"
              >
                Guardar
              </button>
              <button
                onClick={() => setSelectedElement(null)}
                className="flex-1 rounded border border-border px-3 py-2 text-xs hover:bg-muted/20"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
