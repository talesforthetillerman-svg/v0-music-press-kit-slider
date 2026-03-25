"use client"

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Spotify", href: "https://open.spotify.com" },
  { name: "YouTube", href: "https://youtube.com" },
  { name: "Linktree", href: "https://linktr.ee" },
]

export function ContactSlide() {
  return (
    <section className="relative flex h-full w-full shrink-0 snap-start items-center justify-center overflow-hidden px-8 md:px-16 lg:px-20">
      <div className="w-full max-w-2xl text-center">
        <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-4">
          Get in Touch
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
          Let&apos;s Work Together
        </h2>

        <p className="text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          Thank you for your interest in T40. We are looking forward to the opportunity of working together and sharing our music with you.
        </p>

        {/* Email */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wider gap-2"
            asChild
          >
            <a href="mailto:talesforthetillerman@gmail.com">
              <Mail className="h-4 w-4" />
              Book the Band
            </a>
          </Button>

          <a
            href="mailto:talesforthetillerman@gmail.com"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            talesforthetillerman@gmail.com
          </a>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-border">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium tracking-wider text-muted-foreground hover:text-primary uppercase transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground/50 mt-16">
          © {new Date().getFullYear()} Tales for the Tillerman. All rights reserved.
        </p>
      </div>
    </section>
  )
}
