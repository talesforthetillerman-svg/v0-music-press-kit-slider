"use client"

import { useState, useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const [email, setEmail] = useState("contact@talesforthetillerman.de")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("contact-email")
    if (stored) {
      setEmail(stored)
    }

    const params = new URLSearchParams(window.location.search)
    if (params.get("edit") === "true") {
      setIsEditing(true)
    }
  }, [])

  const saveEmail = () => {
    localStorage.setItem("contact-email", email)
  }

  const socials = [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Spotify", href: "https://spotify.com" },
    { name: "YouTube", href: "https://youtube.com" },
    { name: "Linktree", href: "https://linktr.ee" },
  ]

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-8 md:px-16 lg:px-20 py-24"
    >
      <div
        className={cn(
          "w-full max-w-2xl text-center transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-4">
          Get in Touch
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
          Let's Connect
        </h2>

        {isEditing ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={saveEmail}
            className="mx-auto text-2xl font-medium text-primary mb-12 px-4 py-2 border border-border rounded bg-card w-full max-w-md"
          />
        ) : (
          <a
            href={`mailto:${email}`}
            className="text-2xl font-medium text-primary hover:text-primary/80 transition-colors mb-12 block"
            data-editor-id="contact-email"
          >
            {email}
          </a>
        )}

        <div className="flex justify-center gap-8 flex-wrap">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {social.name}
            </a>
          ))}
        </div>

        <div className="mt-16 text-sm text-muted-foreground">
          <p>© 2025 Tales for the Tillerman. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
