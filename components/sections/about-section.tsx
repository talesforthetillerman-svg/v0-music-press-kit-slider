"use client"

import Image from "next/image"
import { useScrollAnimation, useParallax } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: parallaxRef, offset } = useParallax(0.2)

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden"
    >
      {/* Full Width Banner at Top */}
      <div className="w-full">
        <Image
          src="/images/banner.gif"
          alt="Tales for the Tillerman"
          width={1920}
          height={400}
          className="w-full h-auto object-cover"
          unoptimized
        />
      </div>

      {/* Content Below Banner */}
      <div className="min-h-[70vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* Text Content */}
          <div 
            className={cn(
              "flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-24 order-2 lg:order-1",
              "transition-all duration-1000 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-4">
              About Us
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6 text-balance leading-tight">
              Navigating the currents of funky, pop, reggae, and ska
            </h2>

            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Tales for the Tillerman is an adventurous and vibrant band made up of artists from diverse nationalities. Their unique blend of jazz, pop, ska, reggae, soul, and rock creates an exotic and eclectic sound that takes listeners on a journey through different musical landscapes.
              </p>

              <p>
                The band came together in 2021 during weekly jam sessions at the Zuckerzauber Bar in Berlin, where six talented musicians connected over a shared artistic vision.
              </p>
            </div>

            <div className="flex items-center gap-6 md:gap-8 mt-8 pt-6 border-t border-border">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">2021</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">Founded</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">Berlin</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">Home Base</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">6</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">Members</p>
              </div>
            </div>
          </div>

          {/* Image with Parallax */}
          <div 
            ref={parallaxRef as React.RefObject<HTMLDivElement>}
            className="relative min-h-[300px] h-64 lg:h-[500px] order-1 lg:order-2 overflow-hidden"
          >
            <div 
              className="absolute inset-0 h-full w-full"
              style={{ transform: `translateY(${offset}px)` }}
            >
              <Image
                src="/images/band-hero.jpg"
                alt="Tales for the Tillerman band"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}
