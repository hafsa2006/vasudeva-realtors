"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ParticleCanvas from "./ParticleCanvas";
import Image from "next/image";

const slides = [
  {
    src: "/images/bloomfield_arcadia.png",
    title: "Bloomfield Arcadia",
    location: "Hafeezpet, Hyderabad",
  },
  {
    src: "/images/lalithanjali_villas.png",
    title: "Lalithanjali Villas",
    location: "Punjagutta, Hyderabad",
  },
  {
    src: "/images/bloomfield_ecstasy.png",
    title: "Bloomfield Ecstasy",
    location: "Gopanpally, Hyderabad",
  },
];

export default function HeroSlideshowBackground() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Rotate slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Slide transition and Ken Burns animation trigger
  useEffect(() => {
    slides.forEach((_, index) => {
      const el = slideRefs.current[index];
      if (!el) return;

      const img = el.querySelector("img");
      if (!img) return;

      if (index === currentSlide) {
        // Fade in and start cinematic Ken Burns effect
        gsap.killTweensOf([el, img]);

        // Face active slide container in
        gsap.to(el, {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
          zIndex: 10,
        });

        // Slow Zoom & Pan (Ken Burns)
        gsap.fromTo(
          img,
          { scale: 1.05, xPercent: -2, yPercent: -1 },
          {
            scale: 1.15,
            xPercent: 2,
            yPercent: 1,
            duration: 8.5,
            ease: "none",
          }
        );
      } else {
        // Fade out inactive slides
        gsap.to(el, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
          zIndex: 0,
          onComplete: () => {
            gsap.set(img, { scale: 1.05, xPercent: 0, yPercent: 0 });
          },
        });
      }
    });
  }, [currentSlide]);

  // Mouse Parallax for image container
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Offset coords to range [-1, 1]
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;

      mouseRef.current = { x: nx, y: ny };

      // Apply light parallax to image wrapper for three-dimensional feeling
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          x: nx * 15, // max 15px shifting
          y: ny * 10, // max 10px shifting
          duration: 1.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-luxury-black">
      {/* Parallax Container */}
      <div ref={containerRef} className="absolute -inset-10 h-[calc(100%+80px)] w-[calc(100%+80px)] select-none">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            ref={(el) => {
              slideRefs.current[idx] = el;
            }}
            className="absolute inset-0 h-full w-full opacity-0"
            style={{ zIndex: idx === 0 ? 5 : 0 }}
          >
            {/* Slide Image */}
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="object-cover object-center pointer-events-none brightness-[0.85] contrast-[1.02] saturate-[1.05]"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Luxury Gradient Dark Overlays */}
      {/* 1. Global dark blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/15 via-transparent to-luxury-black/30 z-1" />
      {/* 2. Left side dark vignette for typography readable backing */}
      <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-luxury-black/20 via-luxury-black/5 to-transparent z-1" />

      {/* Floating Volumetric Particles & Ray canvas */}
      <ParticleCanvas />

      {/* Bottom-right Slide Info and Index */}
      <div className="absolute bottom-28 right-6 sm:right-10 z-30 flex flex-col items-end gap-1 pointer-events-none select-none text-right">
        <div className="flex items-center gap-3">
          <span className="text-[0.62rem] tracking-[0.25em] text-luxury-muted uppercase font-medium">
            Landmark 0{slides.length}
          </span>
          <span className="h-[1px] w-8 bg-luxury-gold/30" />
          <span className="text-[0.8rem] font-medium tracking-wider text-luxury-gold font-serif">
            0{currentSlide + 1}
          </span>
        </div>
        <div className="overflow-hidden h-6 flex items-center mt-1">
          <p className="text-sm font-semibold text-luxury-gold-light tracking-wide font-serif">
            {slides[currentSlide].title}
          </p>
        </div>
        <p className="text-xs text-luxury-muted font-sans font-normal">
          {slides[currentSlide].location}
        </p>
      </div>
    </div>
  );
}
