"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "members", label: "Band" },
  { id: "tour", label: "Live" },
  { id: "reviews", label: "Press" },
  { id: "contact", label: "Contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = navLinks.map(link => document.getElementById(link.id))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/90 backdrop-blur-md border-b border-border/50 py-3" 
          : "bg-gradient-to-b from-background/80 to-transparent py-4"
      )}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/logo.jpg"
            alt="Tales for the Tillerman Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="hidden sm:block text-sm font-medium tracking-widest text-foreground uppercase">
            T40
          </span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={cn(
                "text-xs font-medium tracking-wider uppercase transition-colors",
                activeSection === link.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile: Current Section */}
        <div className="md:hidden text-xs font-medium tracking-wider text-primary uppercase">
          {navLinks.find(link => link.id === activeSection)?.label}
        </div>
      </nav>
    </header>
  )
}
