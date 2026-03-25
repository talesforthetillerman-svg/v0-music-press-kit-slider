"use client"

import Image from "next/image"

export function AboutSlide() {
  return (
    <section className="relative flex h-full w-full shrink-0 snap-start flex-col overflow-hidden">
      {/* Full Width Banner at Top */}
      <div className="w-full shrink-0">
        <Image
          src="/images/banner.gif"
          alt="Tales for the Tillerman"
          width={1920}
          height={400}
          className="w-full h-auto object-cover"
          unoptimized
          priority
        />
      </div>

      {/* Content Below Banner */}
      <div className="flex-1 flex items-center overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
          {/* Text Content */}
          <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-8 lg:py-12 order-2 lg:order-1">
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

          {/* Image */}
          <div className="relative h-48 lg:h-full order-1 lg:order-2">
            <Image
              src="/images/band-hero.jpg"
              alt="Tales for the Tillerman band"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}
