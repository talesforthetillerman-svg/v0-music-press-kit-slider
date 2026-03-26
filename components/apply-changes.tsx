"use client"

import { useEffect } from "react"

const STORAGE_KEY = "t40-editor-state"

export function ApplyChanges() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const edit = params.get("edit") === "true"
    if (edit) {
      // Do not override while editing
      return
    }

    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return

    try {
      const data = JSON.parse(raw) as Record<string, string>
      console.info("ApplyChanges: applying saved text", data)

      Object.entries(data).forEach(([key, value]) => {
        const el = document.querySelector(`[data-editor-id=\"${key}\"]`) as HTMLElement | null
        if (el) {
          el.textContent = value
        }
      })
    } catch (error) {
      console.warn("ApplyChanges: failed to parse saved state", error)
    }
  }, [])

  return null
}
