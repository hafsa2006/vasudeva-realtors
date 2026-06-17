"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, Layers, ShieldCheck, Compass } from "lucide-react";
import Hero3DBackground from "./Hero3DBackground";
import HeroSlideshowBackground from "./HeroSlideshowBackground";

export default function Hero() {
  const [bgMode, setBgMode] = useState<"3d" | "slideshow">("slideshow");
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".bg-wrapper", { opacity: 1, duration: 1.5 });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power4.out" },
        "-=1.0"
      );

      tl.fromTo(
        '[data-animate="tagline"]',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.9"
      );

      // Headline: translateY 80px -> 0
      tl.fromTo(
        '[data-animate="heading"]',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" },
        "-=0.7"
      );

      tl.fromTo(
        '[data-animate="subheadline"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.7"
      );

      tl.fromTo(
        '[data-animate="cta"]',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-meta-element",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Scroll-synced cinematics: layered parallax + cinematic zoom + fade.
  // Driven by ScrollTrigger, which is kept in sync with Lenis (see SmoothScroll).
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Single scrubbed timeline drives both parallax layers (one ScrollTrigger).
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1, // weighty catch-up synced to scroll velocity
          },
        })
        // Background (~20% parallax) + cinematic zoom 1 -> 1.08
        .fromTo(
          ".bg-wrapper",
          { yPercent: 0, scale: 1 },
          { yPercent: 20, scale: 1.08, ease: "none" },
          0
        )
        // Foreground content rises faster and fades out
        .fromTo(
          contentRef.current,
          { yPercent: 0, autoAlpha: 1 },
          { yPercent: -14, autoAlpha: 0, ease: "none" },
          0
        );

      // Floating controls fade away early
      gsap.to(".hero-control", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "30% top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax for the content card (subtle 3D depth)
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const xTo = gsap.quickTo(cardRef.current, "x", {
      duration: 1,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cardRef.current, "y", {
      duration: 1,
      ease: "power3.out",
    });
    const rotY = gsap.quickTo(cardRef.current, "rotationY", {
      duration: 1,
      ease: "power3.out",
    });
    const rotX = gsap.quickTo(cardRef.current, "rotationX", {
      duration: 1,
      ease: "power3.out",
    });

    const handleMouseMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      xTo(-nx * 12);
      yTo(-ny * 8);
      rotY(-nx * 1.5);
      rotX(ny * 1.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[650px] overflow-hidden bg-luxury-black flex items-center justify-start px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20"
      style={{ perspective: "1000px" }}
    >
      {/* --- Dynamic Background Layers with Cross-Fade --- */}
      {/* 3D WebGL Background Wrapper */}
      <div
        className={`bg-wrapper absolute inset-0 w-full h-full will-change-transform transition-opacity duration-1000 ease-in-out ${bgMode === "3d" ? "opacity-100 z-0" : "opacity-0 z-0 pointer-events-none"
          }`}
      >
        <Hero3DBackground />
        {/* Soft dark overlays for 3D mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/60 via-luxury-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-luxury-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Cinematic Slideshow Background Wrapper */}
      <div
        className={`bg-wrapper absolute inset-0 w-full h-full will-change-transform transition-opacity duration-1000 ease-in-out ${bgMode === "slideshow" ? "opacity-100 z-0" : "opacity-0 z-0 pointer-events-none"
          }`}
      >
        <HeroSlideshowBackground />
        {/* Soft bottom blend to section below */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-luxury-black/80 to-transparent pointer-events-none" />
      </div>

      {/* --- Main Content Overlay (Glassmorphism Card) --- */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-start pointer-events-none will-change-transform"
      >
        <div
          ref={cardRef}
          className="luxury-glass pointer-events-auto w-full max-w-lg rounded-2xl p-6 sm:p-8 md:p-9 border border-white/10 shadow-2xl flex flex-col gap-4 md:gap-5 will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Tagline */}
          <div
            data-animate="tagline"
            className="flex items-center gap-2 text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.25em] text-luxury-gold font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Vasudeva Realtors Landmark</span>
          </div>

          {/* Heading */}
          <h1
            data-animate="heading"
            className="text-[2.5rem] sm:text-[3.6rem] md:text-[4.2rem] leading-[1.02] tracking-tight font-display text-luxury-gold-light font-light"
          >
            Modern Living <br />
            <span className="luxury-gradient-text italic font-normal tracking-wide">Starts Here.</span>
          </h1>

          {/* Subheadline */}
          <p
            data-animate="subheadline"
            className="text-sm sm:text-base leading-relaxed text-luxury-muted max-w-md font-sans font-light"
          >
            Discover premium new residential communities designed for contemporary living.
            Curating the finest architectural residences across Hyderabad.
          </p>

          {/* CTAs */}
          <div
            data-animate="cta"
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <a
              href="#properties"
              className="bg-accent text-ink group inline-flex h-13 items-center gap-2 rounded-xl px-8 text-sm font-bold tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              View Properties
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="bg-white text-ink group inline-flex h-13 items-center gap-2 rounded-xl px-8 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Request Info
            </a>
          </div>

          {/* Inner details row inside the glass card */}
          <div
            data-animate="cta"
            className="grid grid-cols-2 gap-4 pt-6 border-t border-luxury-gold/10 mt-2"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[0.62rem] uppercase tracking-[0.18em] text-luxury-gold/60 font-semibold">
                Investment Class
              </span>
              <span className="text-xs font-medium text-luxury-gold-light flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-luxury-gold" /> Grade-A Residential
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[0.62rem] uppercase tracking-[0.18em] text-luxury-gold/60 font-semibold">
                Location Focus
              </span>
              <span className="text-xs font-medium text-luxury-gold-light flex items-center gap-1">
                <Compass className="h-3.5 w-3.5 text-luxury-gold" /> Hyderabad Prime
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Floating Bottom Controls --- */}
      {/* Mode Switcher capsule */}
      <div className="hero-control hero-meta-element absolute bottom-12 right-6 sm:right-10 z-30 flex items-center gap-2 bg-luxury-black/90 border-[2px] border-white/20 p-1.5 rounded-full backdrop-blur-md shadow-lg">
        <button
          onClick={() => setBgMode("3d")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.68rem] tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer ${bgMode === "3d"
              ? "bg-luxury-gold text-luxury-black"
              : "text-luxury-muted hover:text-luxury-gold-light"
            }`}
        >
          <Layers className="h-3.5 w-3.5" />
          Interactive 3D
        </button>
        <button
          onClick={() => setBgMode("slideshow")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.68rem] tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer ${bgMode === "slideshow"
              ? "bg-luxury-gold text-luxury-black"
              : "text-luxury-muted hover:text-luxury-gold-light"
            }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Showcase Film
        </button>
      </div>

      {/* Scroll indicator overlay */}
      <div className="hero-control hero-meta-element absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2 pointer-events-none hidden sm:flex">
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-luxury-muted/80">
          Scroll to Explore
        </span>
        <div className="h-9 w-5 rounded-full border border-luxury-muted/40 p-1 flex items-start justify-center">
          <div className="h-2 w-1 rounded-full bg-luxury-gold animate-[bounce_1.8s_infinite]" />
        </div>
      </div>
    </section>
  );
}
