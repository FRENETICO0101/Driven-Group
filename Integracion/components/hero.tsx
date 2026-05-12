"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown, Play, Pause } from "lucide-react"

export function Hero() {
  const [isDaytime, setIsDaytime] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkTime = () => {
      const miamiTime = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
      const hours = new Date(miamiTime).getHours()
      // Daytime: 6 AM to 7 PM
      setIsDaytime(hours >= 6 && hours < 19)
    }

    checkTime()
    const interval = setInterval(checkTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Check for dark mode preference
  useEffect(() => {
    if (!mounted) return
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsDaytime(false)
      } else {
        // Re-check actual time when switching to light mode
        const miamiTime = new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
        })
        const hours = new Date(miamiTime).getHours()
        setIsDaytime(hours >= 6 && hours < 19)
      }
    }

    // Initial check
    if (mediaQuery.matches) {
      setIsDaytime(false)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [mounted])

  const toggleVideo = () => {
    const video = document.getElementById("hero-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Day video: Miami sunrise/morning aerial
  // Night video: Miami city skyline at night
  const dayVideo = "https://cdn.pixabay.com/video/2020/05/25/40130-424930941_large.mp4"
  const nightVideo = "https://cdn.pixabay.com/video/2019/06/22/24855-344364838_large.mp4"
  const videoSrc = isDaytime ? dayVideo : nightVideo

  // Fallback image while video loads
  const posterImage = isDaytime
    ? "/images/hero-luxury.jpg"
    : "/images/hero-luxury.jpg"

  return (
    <section className="relative h-screen min-h-[700px]">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden bg-charcoal">
        {mounted && (
          <video
            id="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster={posterImage}
            className="h-full w-full object-cover transition-opacity duration-1000"
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
      </div>

      {/* Video Control */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-8 right-8 z-20 flex h-12 w-12 items-center justify-center border border-cream/30 text-cream/70 transition-all duration-500 hover:border-cream hover:text-cream"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* Day/Night Indicator */}
      <div className="absolute bottom-8 left-8 z-20">
        <span className="text-[10px] tracking-[0.2em] text-cream/50 uppercase">
          {isDaytime ? "Miami Day" : "Miami Night"}
        </span>
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end pb-32 md:pb-40">
        <div className="mx-auto w-full max-w-[1800px] px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[11px] tracking-[0.3em] text-cream/60 uppercase mb-6">
              Miami Real Estate
            </p>
            <h1 className="heading-aman-light text-balance">
              Where Luxury
              <br />
              Meets Lifestyle
            </h1>
            <p className="mt-8 max-w-xl text-base leading-[1.8] text-cream/70 md:text-lg">
              Discover the most exclusive properties in Miami. From waterfront 
              estates to skyline penthouses, we curate extraordinary living.
            </p>
            
            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Link href="#properties" className="btn-aman-light">
                Explore Properties
              </Link>
              <Link 
                href="#contact" 
                className="text-[11px] tracking-[0.2em] text-cream/60 uppercase py-4 transition-colors duration-500 hover:text-cream"
              >
                Schedule a Viewing
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.25em] text-cream/40 uppercase">Scroll</span>
          <ChevronDown size={18} className="text-cream/40 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
