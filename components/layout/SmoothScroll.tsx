"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Premium global scroll engine.
 *
 * Lenis provides interpolated (weighty, inertial) smooth scrolling, while GSAP's
 * ticker drives Lenis' RAF loop so scroll position and every ScrollTrigger
 * animation update on the SAME frame — no double RAF, no drift, no jank.
 *
 *  - Scroll easing + interpolation : Lenis `lerp` (Apple-like weight)
 *  - Inertia / momentum            : Lenis virtual scroll + syncTouch
 *  - RAF loop                      : gsap.ticker (single, optimized loop)
 *  - Hardware acceleration         : transforms only on animated layers
 *  - Accessibility                 : honors prefers-reduced-motion
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Always land at the hero (top) on refresh — never restore prior position.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Respect reduced-motion: keep native scrolling, skip all smoothing.
    if (reduced) {
      // Defer once so the browser's own restore (if any) is overridden.
      requestAnimationFrame(() => window.scrollTo(0, 0));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      // Interpolation factor — lower = heavier, more cinematic glide.
      lerp: 0.085,
      wheelMultiplier: 1,
      // Smooth, momentum-based touch on mobile / trackpads.
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchMultiplier: 1.4,
      gestureOrientation: "vertical",
    });

    // Force the hero into view immediately (no smooth animation on load).
    lenis.scrollTo(0, { immediate: true, force: true });
    // And again on the next frame, after layout/restore settles.
    requestAnimationFrame(() => lenis.scrollTo(0, { immediate: true, force: true }));

    // Keep ScrollTrigger perfectly in sync with every Lenis frame.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (one shared RAF loop).
    const onTick = (time: number) => {
      // gsap ticker time is in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Smooth, eased in-page anchor navigation (navbar, footer, CTAs).
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, {
          offset: -80,
          duration: 1.4,
          easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic (Apple-like)
        });
      }
    };
    document.addEventListener("click", onClick);

    // Recalculate triggers once everything (fonts/images) settles.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP default
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
