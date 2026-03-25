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
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-5xl mx-auto">
        {/* Animated Banner GIF */}
        <div className="w-full max-w-3xl lg:max-w-4xl mb-6 animate-fade-in-up">
          <Image
            src="/images/banner.gif"
            alt="Tales for the Tillerman"
            width={1200}
            height={400}
            className="w-full h-auto"
            unoptimized
            priority
          />
        </div>

        <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed animate-fade-in-up animation-delay-100">
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
