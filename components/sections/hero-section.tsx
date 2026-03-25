"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParallax } from "@/hooks/use-scroll-animation"

export function HeroSection() {
  const { ref, offset } = useParallax(0.3)

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <Image
          src="/images/band-hero.jpg"
          alt="Tales for the Tillerman performing live"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-4xl mx-auto">
        <p className="text-xs md:text-sm font-medium tracking-[0.3em] text-primary uppercase mb-4 md:mb-6 animate-fade-in-up">
          Press Kit
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-foreground mb-4 text-balance animate-fade-in-up animation-delay-100">
          Tales for the
          <br />
          Tillerman
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground tracking-wider mb-2 animate-fade-in-up animation-delay-200">
          (T40)
        </p>

        <p className="text-sm md:text-base text-muted-foreground max-w-md mt-4 leading-relaxed animate-fade-in-up animation-delay-300">
          An eclectic blend of jazz, pop, ska, reggae, soul, and rock from Berlin
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-12 animate-fade-in-up animation-delay-400">
          <Button
            size="lg"
            className="min-w-[160px] bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wider"
            asChild
          >
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen Now
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[160px] border-foreground/20 text-foreground hover:bg-foreground hover:text-background font-medium tracking-wider"
            onClick={scrollToAbout}
          >
            Press Kit
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to next section"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  )
}
