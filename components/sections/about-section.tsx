"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useScrollAnimation, useParallax } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: parallaxRef, offset } = useParallax(0.2)
  const [aboutText, setAboutText] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const text = localStorage.getItem("about-text")
    if (text) {
      setAboutText(text)
    } else {
      setAboutText(
        "Tales for the Tillerman is a contemporary music ensemble that redefines the boundaries of live performance through innovative arrangements and genuine artistic expression."
      )
    }

    const params = new URLSearchParams(window.location.search)
    if (params.get("edit") === "true") {
      setIsEditing(true)
    }
  }, [])

  const saveAbout = () => {
    localStorage.setItem("about-text", aboutText)
  }

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative w-full overflow-hidden"
    >
      <div className="min-h-[70vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          <div
            className={cn(
              "flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-24 order-2 lg:order-1",
              "transition-all duration-1000 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-4">
              About us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Musical Innovation
            </h2>

            {isEditing ? (
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                onBlur={saveAbout}
                data-editor-id="about-text"
                className="text-base md:text-lg text-muted-foreground leading-relaxed bg-card border border-border rounded p-4"
                rows={6}
              />
            ) : (
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed" data-editor-id="about-text">
                {aboutText}
              </p>
            )}
          </div>

          <div ref={parallaxRef as React.RefObject<HTMLDivElement>} className="relative order-1 lg:order-2">
            <Image
              src="/images/band-hero.jpg"
              alt="Band performing"
              width={600}
              height={600}
              className="w-full h-auto object-cover"
              style={{ transform: `translateY(${offset}px)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}
