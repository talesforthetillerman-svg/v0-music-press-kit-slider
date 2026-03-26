"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useScrollAnimation, useParallax } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const { ref, offset } = useParallax(0.3)
  const [heroTitle, setHeroTitle] = useState("Tales for the Tillerman")
  const [heroSubtitle, setHeroSubtitle] = useState("Contemporary Music for Modern Times")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const title = localStorage.getItem("hero-title")
    const subtitle = localStorage.getItem("hero-subtitle")
    if (title) setHeroTitle(title)
    if (subtitle) setHeroSubtitle(subtitle)

    const params = new URLSearchParams(window.location.search)
    if (params.get("edit") === "true") {
      setIsEditing(true)
    }
  }, [])

  const saveHero = () => {
    localStorage.setItem("hero-title", heroTitle)
    localStorage.setItem("hero-subtitle", heroSubtitle)
  }

  return (
    <section
      id="hero"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/band-hero.jpg"
          alt="Band Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        className="relative z-10 text-center max-w-4xl px-4 md:px-8"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {isEditing ? (
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            onBlur={saveHero}
            data-editor-id="hero-title"
            className="text-5xl md:text-7xl font-bold text-white mb-6 w-full bg-black/50 rounded p-2"
          />
        ) : (
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" data-editor-id="hero-title">
            {heroTitle}
          </h1>
        )}

        {isEditing ? (
          <input
            type="text"
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            onBlur={saveHero}
            data-editor-id="hero-subtitle"
            className="text-lg md:text-2xl text-gray-200 mb-8 w-full bg-black/50 rounded p-2"
          />
        ) : (
          <p className="text-lg md:text-2xl text-gray-200 mb-8" data-editor-id="hero-subtitle">
            {heroSubtitle}
          </p>
        )}

        <a
          href="#about"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Scroll to next section"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="h-5 w-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
