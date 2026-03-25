"use client"

import Image from "next/image"

export function AboutSlide() {
  return (
    <section className="relative flex h-full w-full shrink-0 snap-start items-center overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
        {/* Text Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 order-2 lg:order-1">
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-6">
            About Us
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8 text-balance leading-tight">
            Navigating the currents of funky, pop, reggae, and ska
          </h2>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Tales for the Tillerman is an adventurous and vibrant band made up of artists from diverse nationalities. Their unique blend of jazz, pop, ska, reggae, soul, and rock creates an exotic and eclectic sound that takes listeners on a journey through different musical landscapes.
            </p>

            <p>
              The band came together in 2021 during weekly jam sessions at the Zuckerzauber Bar in Berlin, where six talented musicians connected over a shared artistic vision.
            </p>

            <p>
              It was during a late-night talk about the true meaning of music that the band&apos;s name was inspired. Like sailors on a small paper boat, they decided to navigate the currents of funky, pop, reggae, and ska, fearlessly exploring new musical waters.
            </p>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">2021</p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">Founded</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">Berlin</p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">Home Base</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">6</p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">Members</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-64 lg:h-full order-1 lg:order-2">
          <Image
            src="/images/band-hero.jpg"
            alt="Tales for the Tillerman band"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  )
}
