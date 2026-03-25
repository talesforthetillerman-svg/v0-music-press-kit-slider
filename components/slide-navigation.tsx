"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SlideNavigationProps {
  slides: { id: string; label: string }[]
  currentSlide: number
  onNavigate: (index: number) => void
  onPrev: () => void
  onNext: () => void
}

export function SlideNavigation({
  slides,
  currentSlide,
  onNavigate,
  onPrev,
  onNext,
}: SlideNavigationProps) {
  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12">
        <div className="text-sm font-medium tracking-widest text-foreground uppercase">
          T40
        </div>

        <div className="hidden md:flex items-center gap-8">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => onNavigate(index)}
              className={cn(
                "text-xs font-medium tracking-wider uppercase transition-colors duration-300",
                currentSlide === index
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {slide.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-muted-foreground tracking-wider">
          {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </nav>

      {/* Arrow Navigation */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all duration-300",
            currentSlide === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-primary hover:border-primary hover:text-primary-foreground"
          )}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={onNext}
          disabled={currentSlide === slides.length - 1}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all duration-300",
            currentSlide === slides.length - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-primary hover:border-primary hover:text-primary-foreground"
          )}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Slide Indicators - Mobile */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 md:hidden">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => onNavigate(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              currentSlide === index
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"
            )}
            aria-label={`Go to ${slide.label}`}
          />
        ))}
      </div>
    </>
  )
}
