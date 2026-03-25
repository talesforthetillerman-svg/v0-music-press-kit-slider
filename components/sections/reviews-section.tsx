"use client"

import { Quote } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const reviews = [
  {
    quote: "With their mix of soul, jazz and reggae, Tales for the Tillerman bring a refreshing sound to Berlin's independent scene.",
    source: "Ox-Fanzine",
  },
  {
    quote: "Their live shows are full of warmth and energy, making every concert a celebration where audiences can't help but dance.",
    source: "Rausgegangen.de",
  },
  {
    quote: "An eclectic band whose lyrics and arrangements mirror the diversity and creativity of the city.",
    source: "Tip Berlin",
  },
  {
    quote: "Tales for the Tillerman have proven their versatility, moving effortlessly from intimate club gigs to vibrant festival stages.",
    source: "Berlin Music Blog",
  },
  {
    quote: "By constantly evolving their sound, the band shows a rare ability to stay authentic while appealing to a wide audience.",
    source: "Initiative Musik Blog",
  },
  {
    quote: "With their appearances at the Schnabeltier and Waltweiser festivals, the band confirms its growing reach beyond Berlin.",
    source: "na dann Münster",
  },
]

export function ReviewsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })

  return (
    <section
      id="reviews"
      ref={ref as React.RefObject<HTMLElement>}
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
            Press & Reviews
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            What They Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={cn(
                "group relative p-6 md:p-8 bg-card border border-border rounded-sm hover:border-primary/30 transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms" }}
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />

              <blockquote className="text-sm md:text-base text-foreground leading-relaxed mb-6 italic">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              <cite className="not-italic">
                <span className="text-xs font-medium tracking-wider text-primary uppercase">
                  {review.source}
                </span>
              </cite>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
