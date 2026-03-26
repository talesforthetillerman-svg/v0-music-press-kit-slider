"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const members = [
  {
    id: 1,
    name: "Janosch Puhe",
    role: "Guitar & Vocals",
    color: "from-amber-500/20",
  },
  {
    id: 2,
    name: "J.M. Garcia Lopez",
    role: "Piano, Flute & Vocals",
    color: "from-teal-500/20",
  },
  {
    id: 3,
    name: "Otto Herrmann",
    role: "Bass",
    color: "from-indigo-500/20",
  },
  {
    id: 4,
    name: "Robi Schmidt",
    role: "Drums",
    color: "from-rose-500/20",
  },
  {
    id: 5,
    name: "Tarik Al-Saadi",
    role: "Percussion",
    color: "from-orange-500/20",
  },
]

export function BandMembersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="band"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            The Musicians
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
            Meet the Band
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Five musicians from diverse backgrounds, united by a passion for rhythm and groove.
          </p>
        </div>

        {/* Band Collage Image */}
        <div
          className={`mb-16 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative aspect-square md:aspect-[2/1] rounded-2xl overflow-hidden">
            <Image
              src="/images/band-collage.jpg"
              alt="Tales for the Tillerman band members"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`group relative transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className={`relative p-6 rounded-2xl bg-secondary/50 border border-border transition-all duration-300 ${
                  activeIndex === index
                    ? "scale-105 border-primary/50 shadow-lg shadow-primary/10"
                    : "hover:border-muted"
                }`}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.color} to-transparent opacity-0 transition-opacity duration-300 ${
                    activeIndex === index ? "opacity-100" : ""
                  }`}
                />

                {/* Content */}
                <div className="relative text-center">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-2xl md:text-3xl text-muted-foreground">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground text-sm md:text-base mb-1 line-clamp-1">
                    {member.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
