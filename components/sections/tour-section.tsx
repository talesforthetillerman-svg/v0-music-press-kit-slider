"use client"

import { useState, useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const TOUR_STORAGE_KEY = "t40-tour"

const DEFAULT_TOUR = [
  { date: "April 12, 2025", venue: "Kreuzberg Festival", city: "Berlin" },
  { date: "May 3, 2025", venue: "Jazz Contemporary", city: "Frankfurt" },
  { date: "May 17, 2025", venue: "Club Passage", city: "Hamburg" },
  { date: "June 8, 2025", venue: "Kulturelle Landpartie", city: "Wendland" },
  { date: "June 21, 2025", venue: "Sommersonnenwende Festival", city: "Grasleben" },
  { date: "July 13, 2025", venue: "Mauerpark", city: "Berlin" },
  { date: "July 20, 2025", venue: "Privatclub", city: "Berlin" },
]

export function TourSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const [tours, setTours] = useState(DEFAULT_TOUR)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(TOUR_STORAGE_KEY)
    if (stored) {
      try {
        setTours(JSON.parse(stored))
      } catch {
        setTours(DEFAULT_TOUR)
      }
    }

    const params = new URLSearchParams(window.location.search)
    if (params.get("edit") === "true") {
      setIsEditing(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(tours))
  }, [tours])

  const addTour = () => {
    setTours([...tours, { date: "", venue: "", city: "" }])
  }

  const updateTour = (index: number, field: string, value: string) => {
    const newTours = [...tours]
    newTours[index] = { ...newTours[index], [field]: value }
    setTours(newTours)
  }

  const removeTour = (index: number) => {
    setTours(tours.filter((_, i) => i !== index))
  }

  return (
    <section
      id="tour"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative w-full min-h-screen overflow-hidden py-24"
    >
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div
          className={cn(
            "lg:w-1/3 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 lg:py-0 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}
        >
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-4">
            Live
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Upcoming Tours
          </h2>
          <p className="text-muted-foreground mt-6">
            Join us at upcoming festivals and venues across Germany and beyond.
          </p>
          {isEditing && (
            <button
              onClick={addTour}
              className="mt-6 rounded bg-primary px-4 py-2 text-sm text-primary-foreground font-semibold hover:bg-primary/90"
            >
              Agregar Tour
            </button>
          )}
        </div>

        <div className="lg:w-2/3 flex flex-col px-8 md:px-16 lg:px-20 py-12 lg:py-24 gap-4 overflow-y-auto max-h-screen">
          {tours.map((tour, index) => (
            <div key={index} className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={tour.date}
                    onChange={(e) => updateTour(index, "date", e.target.value)}
                    placeholder="Date"
                    className="w-full px-3 py-2 border border-border rounded bg-background"
                  />
                  <input
                    type="text"
                    value={tour.venue}
                    onChange={(e) => updateTour(index, "venue", e.target.value)}
                    placeholder="Venue"
                    className="w-full px-3 py-2 border border-border rounded bg-background"
                  />
                  <input
                    type="text"
                    value={tour.city}
                    onChange={(e) => updateTour(index, "city", e.target.value)}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-border rounded bg-background"
                  />
                  <button
                    onClick={() => removeTour(index)}
                    className="w-full rounded bg-destructive px-2 py-1 text-xs text-destructive-foreground hover:bg-destructive/90"
                  >
                    Eliminar
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm font-semibold text-primary">{tour.date}</p>
                  <p className="text-lg font-bold text-foreground">{tour.venue}</p>
                  <p className="text-sm text-muted-foreground">{tour.city}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
