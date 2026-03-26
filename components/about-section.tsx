"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15, rootMargin: "-50px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 md:py-40 bg-card relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_1px,_transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image - shifted slightly left */}
          <div
            className={`relative transition-all duration-1000 ease-out lg:-ml-8 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
            }`}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden img-hover-zoom shadow-2xl">
              <Image
                src="/images/about-section.jpg"
                alt="Tales for the Tillerman live performance"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
            }`}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              About the Band
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 text-balance">
              A Journey Through Sound
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Tales for the Tillerman is a Berlin-based collective that weaves together 
                world music, funk, soul, and reggae into a vibrant tapestry of sound. 
                With roots spanning across continents, the band brings a unique fusion 
                that transcends borders and speaks to the universal language of rhythm.
              </p>
              <p>
                From intimate club shows to open-air festivals, the five-piece ensemble 
                delivers electrifying performances that move both body and soul. Their 
                music is a celebration of diversity, unity, and the timeless power of 
                live music.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-border">
              <div>
                <div className="font-serif text-3xl md:text-4xl text-primary">5</div>
                <div className="text-sm text-muted-foreground mt-1">Musicians</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-primary">Berlin</div>
                <div className="text-sm text-muted-foreground mt-1">Based</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-primary">Live</div>
                <div className="text-sm text-muted-foreground mt-1">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
