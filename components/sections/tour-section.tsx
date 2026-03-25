"use client"

import { MapPin } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const venues = [
  { date: "November 30, 2024", venue: "Werk 9", city: "Berlin" },
  { date: "December 13, 2024", venue: "ART Stalker", city: "Berlin" },
  { date: "January 19, 2025", venue: "Horns Erben", city: "Leipzig" },
  { date: "March 22, 2025", venue: "KAOS", city: "Berlin" },
  { date: "May 23, 2025", venue: "Zuckerzauber", city: "Berlin" },
  { date: "June 6, 2025", venue: "Kulturelle Landpartie", city: "Wendland" },
  { date: "June 21, 2025", venue: "Sommersonnenwende Festival", city: "Grasleben" },
  { date: "July 13, 2025", venue: "Mauerpark", city: "Berlin" },
  { date: "July 20, 2025", venue: "Privatclub", city: "Berlin" },
  { date: "July 27, 2025", venue: "Uebel & Gefährlich", city: "Hamburg" },
  { date: "August 22, 2025", venue: "Schnabeltierfestival", city: "Münster" },
  { date: "August 23, 2025", venue: "Waltweiser Festival", city: "Münster" },
]

export function TourSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section
      id="tour"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full min-h-screen overflow-hidden py-24"
    >
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Header */}
        <div 
          className={cn(
            "lg:w-1/3 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 lg:py-0 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}
        >
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-4">
            Live Venues
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
            2024-2025
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Catch us live at intimate club shows and vibrant festival stages across Germany.
          </p>
        </div>

        {/* Timeline */}
        <div 
          className={cn(
            "lg:w-2/3 px-8 md:px-16 lg:px-12 py-8 lg:py-0 transition-all duration-700 ease-out delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}
        >
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-0">
              {venues.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "group relative pl-8 py-4 hover:bg-card/50 transition-all duration-300 -ml-px border-l border-transparent hover:border-primary",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
                  )}
                  style={{ transitionDelay: isVisible ? `${300 + index * 50}ms` : "0ms" }}
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:scale-150 transition-all" />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                    <div>
                      <p className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.venue}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs tracking-wider">{item.city}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
