"use client"

import { MapPin } from "lucide-react"

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

export function TourSlide() {
  return (
    <section className="relative flex h-full w-full shrink-0 snap-start overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Header */}
        <div className="lg:w-1/3 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 lg:py-0">
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-4">
            Live Venues
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
            2024–2025
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Catch us live at intimate club shows and vibrant festival stages across Germany.
          </p>
        </div>

        {/* Timeline */}
        <div className="lg:w-2/3 overflow-y-auto px-8 md:px-16 lg:px-12 py-8 lg:py-20">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-0">
              {venues.map((item, index) => (
                <div
                  key={index}
                  className="group relative pl-8 py-4 hover:bg-card/50 transition-colors -ml-px border-l border-transparent hover:border-primary"
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
