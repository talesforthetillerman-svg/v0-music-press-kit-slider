"use client"

import { useState, useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const REVIEWS_STORAGE_KEY = "t40-reviews"

const DEFAULT_REVIEWS = [
  {
    quote: "Their live shows are absolutely electrifying.",
    source: "Berlin Music Weekly",
  },
  {
    quote: "A masterclass in contemporary arrangements and heartfelt storytelling.",
    source: "Münster Cultural Magazine",
  },
  {
    quote: "By constantly evolving their sound, the band shows a rare ability to stay authentic.",
    source: "Initiative Musik Blog",
  },
]

export function ReviewsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY)
    if (stored) {
      try {
        setReviews(JSON.parse(stored))
      } catch {
        setReviews(DEFAULT_REVIEWS)
      }
    }

    const params = new URLSearchParams(window.location.search)
    if (params.get("edit") === "true") {
      setIsEditing(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews))
  }, [reviews])

  const addReview = () => {
    setReviews([...reviews, { quote: "", source: "" }])
  }

  const updateReview = (index: number, field: string, value: string) => {
    const newReviews = [...reviews]
    newReviews[index] = { ...newReviews[index], [field]: value }
    setReviews(newReviews)
  }

  const removeReview = (index: number) => {
    setReviews(reviews.filter((_, i) => i !== index))
  }

  return (
    <section
      id="reviews"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-8 md:px-16 lg:px-20 py-24"
    >
      <div className="w-full max-w-6xl">
        <div
          className={cn(
            "mb-12 md:mb-16 text-center transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-4">
            Press
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            What People Say
          </h2>
          {isEditing && (
            <button
              onClick={addReview}
              className="mt-6 rounded bg-primary px-4 py-2 text-sm text-primary-foreground font-semibold hover:bg-primary/90"
            >
              Agregar Review
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col justify-between p-8 bg-card border border-border rounded-lg hover:border-primary/50 transition-all",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms" }}
            >
              {isEditing ? (
                <>
                  <textarea
                    value={review.quote}
                    onChange={(e) => updateReview(index, "quote", e.target.value)}
                    placeholder="Quote"
                    className="w-full px-3 py-2 border border-border rounded bg-background mb-3"
                    rows={3}
                  />
                  <input
                    type="text"
                    value={review.source}
                    onChange={(e) => updateReview(index, "source", e.target.value)}
                    placeholder="Source"
                    className="w-full px-3 py-2 border border-border rounded bg-background mb-3"
                  />
                  <button
                    onClick={() => removeReview(index)}
                    className="w-full rounded bg-destructive px-2 py-1 text-xs text-destructive-foreground hover:bg-destructive/90"
                  >
                    Eliminar
                  </button>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium text-foreground italic mb-4">"{review.quote}"</p>
                  <p className="text-sm text-muted-foreground">— {review.source}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
