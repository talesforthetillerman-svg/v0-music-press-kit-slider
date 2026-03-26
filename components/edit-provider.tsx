"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "t40-editor-state"

function loadState() {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, string>) : {}
  } catch {
    return {}
  }
}

function saveState(data: Record<string, string>) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.warn("EditProvider: no se pudo guardar en localStorage", error)
  }
}

export function EditProvider() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deploying, setDeploying] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const edit = params.get("edit") === "true"
    console.info("EditProvider: edit mode", edit, "query", window.location.search)
    setIsEditMode(edit)

    if (!edit) return

    // Auto apply saved state for edit mode as well
    const current = loadState()
    Object.entries(current).forEach(([id, value]) => {
      const el = document.querySelector(`[data-editor-id=\"${id}\"]`) as HTMLElement | null
      if (el) {
        el.textContent = value
      }
    })
  }, [])

  // Auto-save every 5 minutes
  useEffect(() => {
    if (!isEditMode) return

    const autoSaveInterval = setInterval(() => {
      const obj: Record<string, string> = {}
      document.querySelectorAll("[data-editor-id]").forEach((el) => {
        const element = el as HTMLElement
        const key = element.getAttribute("data-editor-id")
        if (key) obj[key] = element.textContent || ""
      })
      saveState(obj)
      console.info("EditProvider: auto-saved state")
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(autoSaveInterval)
  }, [isEditMode])

  useEffect(() => {
    if (!isEditMode) return

    const collectState = () => {
      const obj: Record<string, string> = {}
      document.querySelectorAll("[data-editor-id]").forEach((el) => {
        const element = el as HTMLElement
        const key = element.getAttribute("data-editor-id")
        if (key) obj[key] = element.textContent || ""
      })
      return obj
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault()
        const state = collectState()
        saveState(state)
        setSaved(true)
        window.setTimeout(() => setSaved(false), 1500)
        console.info("EditProvider: saved state", state)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isEditMode])

  if (!isEditMode) return null

  const handleSaveAndDeploy = async () => {
    // First, save local changes
    const obj: Record<string, string> = {}
    document.querySelectorAll("[data-editor-id]").forEach((el) => {
      const element = el as HTMLElement
      const key = element.getAttribute("data-editor-id")
      if (key) obj[key] = element.textContent || ""
    })
    saveState(obj)
    setSaved(true)

    // Then deploy
    setDeploying(true)
    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: obj })
      })

      if (response.ok) {
        alert("¡Despliegue completado exitosamente!")
      } else {
        alert("Error en el despliegue. Verifica los logs.")
      }
    } catch (error) {
      console.error("Deploy error:", error)
      alert("Error en el despliegue: " + (error as Error).message)
    } finally {
      setDeploying(false)
      window.setTimeout(() => setSaved(false), 1500)
    }
  }

  const handleClear = () => {
    if (confirm("¿Estás seguro que quieres restaurar todos los cambios por defecto?")) {
      localStorage.removeItem(STORAGE_KEY)
      window.location.reload()
    }
  }

  return (
    <>
      {/* Save & Deploy Button (top-left) */}
      <button
        onClick={handleSaveAndDeploy}
        disabled={deploying}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-primary-foreground shadow-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        title="Guardar y Desplegar (Ctrl+S luego 5 min para auto-deploy)"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-2 16H7v-2h8v2zm2-4H7v-2h10v2zm0-4H7V7h10v4z" />
        </svg>
        {deploying ? "Desplegando..." : "Guardar & Desplegar"}
      </button>

      {/* Status & Controls (top-right) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-foreground/90 px-3 py-2 text-xs text-background shadow-lg backdrop-blur-md border border-background/30">
        <span className="font-semibold">Edit mode</span>
        <button
          onClick={handleClear}
          className="rounded border border-rose-300 px-2 py-1 text-rose-200 text-[11px] hover:bg-rose-400/20"
        >
          Restaurar
        </button>
        {saved && <span className="text-emerald-300">✓ Guardado</span>}
      </div>
    </>
  )
}
