"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const members = [
  {
    id: 1,
    name: "Janosch",
    fullName: "Janosch Puhe",
    role: "Guitar & Vocals",
    image: "/images/members/janosch.jpg",
    color: "from-amber-500/30",
  },
  {
    id: 2,
    name: "J.Ma",
    fullName: "J.Ma Garcia Lopez",
    role: "Piano, Flute & Vocals",
    image: "/images/members/jma.jpg",
    color: "from-teal-500/30",
  },
  {
    id: 3,
    name: "Otto",
    fullName: "Otto Lorenz Contreras",
    role: "Bass",
    image: "/images/members/otto.jpg",
    color: "from-indigo-500/30",
  },
  {
    id: 4,
    name: "Robii",
    fullName: "Robii Crowford",
    role: "Drums",
    image: "/images/members/robii.jpg",
    color: "from-rose-500/30",
  },
  {
    id: 5,
    name: "Tarik",
    fullName: "Tarik Benatmane",
    role: "Percussion",
    image: "/images/members/tarik.jpg",
    color: "from-orange-500/30",
  },
]

export function BandMembersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
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
      className="py-28 md:py-40 bg-card relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            The Musicians
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
            Meet the Band
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Five musicians from diverse backgrounds, united by a passion for rhythm and groove.
          </p>
        </div>

        {/* Interactive Member Display */}
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start transition-all duration-700 delay-200 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Member Photo Display */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary order-2 lg:order-1">
            {members.map((member, index) => (
              <div
                key={member.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <Image
                  src={member.image}
                  alt={member.fullName}
                  fill
                  className="object-cover"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
                {/* Member info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-1">
                    {member.fullName}
                  </h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
            
            {/* Fallback when no image loads */}
            <div className="absolute inset-0 flex items-center justify-center bg-secondary -z-10">
              <span className="text-6xl text-muted-foreground/30">
                {members[activeIndex]?.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Member Names List - Interactive */}
          <div className="space-y-3 order-1 lg:order-2">
            {members.map((member, index) => (
              <button
                key={member.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`w-full text-left p-5 md:p-6 rounded-2xl border transition-all duration-300 group ${
                  activeIndex === index
                    ? "bg-secondary border-primary/50 shadow-lg"
                    : "bg-secondary/30 border-border hover:border-muted hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`font-serif text-xl md:text-2xl transition-colors ${
                        activeIndex === index
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`text-sm transition-colors ${
                        activeIndex === index
                          ? "text-muted-foreground"
                          : "text-muted-foreground/60"
                      }`}
                    >
                      {member.role}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      activeIndex === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        activeIndex === index ? "translate-x-0.5" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
