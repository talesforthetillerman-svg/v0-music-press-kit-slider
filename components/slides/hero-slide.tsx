"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSlideProps {
  onNext: () => void
}

export function HeroSlide({ onNext }: HeroSlideProps) {
  return (
    <section className="relative flex h-full w-full shrink-0 snap-start items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/band-hero.jpg"
          alt="Tales for the Tillerman performing live"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-4xl mx-auto">
        {/* Animated Banner */}
        <div className="mb-6 md:mb-10 w-full max-w-xl">
          <Image
            src="/images/banner.gif"
            alt="Tales for the Tillerman"
            width={800}
            height={300}
            className="w-full h-auto"
            unoptimized
          />
        </div>

        <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
          An eclectic blend of jazz, pop, ska, reggae, soul, and rock from Berlin
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-12">
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
            onClick={onNext}
          >
            Press Kit
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={onNext}
        className="absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to next slide"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  )
}
