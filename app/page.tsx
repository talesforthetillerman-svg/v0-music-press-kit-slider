"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { HeroSlide } from "@/components/slides/hero-slide"
import { AboutSlide } from "@/components/slides/about-slide"
import { MembersSlide } from "@/components/slides/members-slide"
import { TourSlide } from "@/components/slides/tour-slide"
import { ReviewsSlide } from "@/components/slides/reviews-slide"
import { ContactSlide } from "@/components/slides/contact-slide"
import { SlideNavigation } from "@/components/slide-navigation"

const slides = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "members", label: "Band" },
  { id: "tour", label: "Live" },
  { id: "reviews", label: "Press" },
  { id: "contact", label: "Contact" },
]

export default function PressKit() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  const scrollToSlide = useCallback((index: number) => {
    if (containerRef.current && !isScrolling.current) {
      isScrolling.current = true
      const slideWidth = containerRef.current.offsetWidth
      containerRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      })
      setCurrentSlide(index)
      setTimeout(() => {
        isScrolling.current = false
      }, 600)
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (containerRef.current && !isScrolling.current) {
      const slideWidth = containerRef.current.offsetWidth
      const scrollLeft = containerRef.current.scrollLeft
      const newSlide = Math.round(scrollLeft / slideWidth)
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide)
      }
    }
  }, [currentSlide])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  const goToNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      scrollToSlide(currentSlide + 1)
    }
  }, [currentSlide, scrollToSlide])

  const goToPrev = useCallback(() => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1)
    }
  }, [currentSlide, scrollToSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "ArrowLeft") goToPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev])

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <SlideNavigation
        slides={slides}
        currentSlide={currentSlide}
        onNavigate={scrollToSlide}
        onPrev={goToPrev}
        onNext={goToNext}
      />

      <div
        ref={containerRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <HeroSlide onNext={goToNext} />
        <AboutSlide />
        <MembersSlide />
        <TourSlide />
        <ReviewsSlide />
        <ContactSlide />
      </div>
    </main>
  )
}
