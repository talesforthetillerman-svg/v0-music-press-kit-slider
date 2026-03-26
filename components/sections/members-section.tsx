"use client"

import { useEffect, useMemo, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const DEFAULT_MEMBERS = [
  { name: "Janosch Puhe", role: "Vocals & Songwriter" },
  { name: "Tarik Benatmane", role: "Bass & Backings" },
  { name: "Robií Crawford", role: "Guitar & Backings" },
  { name: "J.Ma Garcia Lopez", role: "Keyboards & Backings" },
  { name: "Otto Lorenz Contreras", role: "Drums & Backings" },
]

const MEMBERS_STORAGE_KEY = "t40-members"

export function MembersSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })
  const [members, setMembers] = useState(DEFAULT_MEMBERS)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    try {
      const stored = localStorage.getItem(MEMBERS_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMembers(parsed)
        }
      }
    } catch {
      setMembers(DEFAULT_MEMBERS)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members))
  }, [members])

  const addMember = () => {
    if (!name.trim() || !role.trim()) return
    setMembers((prev) => [...prev, { name: name.trim(), role: role.trim() }])
    setName("")
    setRole("")
  }

  const resetMembers = () => {
    setMembers(DEFAULT_MEMBERS)
    localStorage.removeItem(MEMBERS_STORAGE_KEY)
  }

  return (
    <section
      id="members"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-8 md:px-16 lg:px-20 py-24"
    >
      <div className="w-full max-w-6xl">
        <div 
          className={cn(
            "mb-12 md:mb-16 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-4">
            The Band
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Meet the Musicians
          </h2>
        </div>

        <div className="mb-8 flex flex-col gap-3 max-w-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              aria-label="Nombre del miembro"
              type="text"
              placeholder="Nombre del miembro"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border border-border px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              aria-label="Rol del miembro"
              type="text"
              placeholder="Rol del miembro"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded border border-border px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={addMember}
              className="rounded bg-primary px-4 py-2 text-xs text-primary-foreground font-semibold hover:bg-primary/90"
            >
              Agregar miembro
            </button>
            <button
              onClick={resetMembers}
              className="rounded border border-border px-4 py-2 text-xs hover:bg-muted/10"
            >
              Restaurar defaults
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {members.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className={cn(
                "group relative p-6 md:p-8 bg-card border border-border rounded-sm hover:border-primary/50 transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ 
                transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms"
              }}
            >
              <div className="absolute top-4 right-4 text-6xl md:text-7xl font-bold text-muted/30 select-none">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground tracking-wider">
                  {member.role}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
            </div>
          ))}

          {/* Six Nations Highlight */}
          <div 
            className={cn(
              "p-6 md:p-8 bg-primary/10 border border-primary/30 rounded-sm flex flex-col justify-center transition-all duration-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
          >
            <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-2">
              Diverse Origins
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Artists from diverse nationalities, united by their shared passion for music storytelling.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
