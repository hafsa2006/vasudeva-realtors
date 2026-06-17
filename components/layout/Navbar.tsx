"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";

const links = [
  { label: "Projects", href: "#properties" },
  { label: "Communities", href: "#communities" },
  { label: "Location Advantage", href: "#location" },
  { label: "Legacy", href: "#legacy" },
  { label: "Gallery", href: "#living" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const navListRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkEls = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Entrance (GSAP)
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -90, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 },
    );
  }, []);

  // Frosted-on-scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // Trigger when a section crosses the upper-middle band of the viewport.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Slide the gold indicator under the active (or hovered) link
  const moveIndicator = (id: string | null) => {
    const ind = indicatorRef.current;
    const wrap = navListRef.current;
    if (!ind || !wrap) return;
    const el = id ? linkEls.current[id] : null;
    if (!el) {
      gsap.to(ind, { opacity: 0, duration: 0.3 });
      return;
    }
    gsap.to(ind, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    moveIndicator(activeId);
    const onResize = () => moveIndicator(activeId);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const linkColor = scrolled
    ? "text-ink-soft hover:text-ink"
    : "text-white/75 hover:text-white";

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-5"
    >
      <nav
        className={`mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 rounded-full px-5 transition-[background-color,box-shadow,border-color] duration-500 sm:px-7 ${scrolled
            ? "border border-white/60 bg-[#faf7f0]/85 shadow-[0_18px_50px_-24px_rgba(60,50,30,0.45)] backdrop-blur-[12px]"
            : "border border-transparent bg-transparent shadow-none"
          }`}
      >
        {/* Brand */}
        <a href="#top" className="shrink-0" aria-label="Vasudeva Realtors — home">
          <Logo scrolled={scrolled} className="hidden sm:inline-flex" />
          <Logo scrolled={scrolled} compact className="inline-flex sm:hidden" />
        </a>

        {/* Desktop nav */}
        <div
          ref={navListRef}
          className="relative hidden items-center gap-9 lg:flex"
          onMouseLeave={() => moveIndicator(activeId)}
        >
          {links.map((l) => {
            const id = l.href.slice(1);
            const isActive = activeId === id;
            return (
              <a
                key={l.href}
                href={l.href}
                ref={(el) => {
                  linkEls.current[id] = el;
                }}
                onMouseEnter={() => moveIndicator(id)}
                className={`relative whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${isActive
                    ? scrolled
                      ? "text-ink"
                      : "text-white"
                    : linkColor
                  }`}
              >
                {l.label}
              </a>
            );
          })}

          {/* Sliding active indicator */}
          <span
            ref={indicatorRef}
            className="pointer-events-none absolute -bottom-2 left-0 h-px bg-gradient-to-r from-accent/40 via-luxury-gold to-accent/40 opacity-0"
            style={{ width: 0 }}
          />
        </div>

        {/* Primary CTA */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className={`group inline-flex h-11 items-center gap-2 rounded-full px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${scrolled
                ? "bg-ink text-paper hover:bg-ink-soft"
                : "border border-white/45 bg-white/10 text-white backdrop-blur-md hover:border-white/80 hover:bg-white/15"
              }`}
          >
            Schedule Site Visit
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ${scrolled
              ? "border-line bg-white text-ink"
              : "border-white/30 bg-white/10 text-white backdrop-blur-md"
            }`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-3xl border border-white/60 bg-[#faf7f0]/95 p-3 shadow-[0_24px_60px_-30px_rgba(60,50,30,0.5)] backdrop-blur-[12px] lg:hidden"
          >
            <div className="flex flex-col">
              {links.map((l) => {
                const id = l.href.slice(1);
                const isActive = activeId === id;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] transition-colors ${isActive
                        ? "bg-accent-soft/30 text-ink"
                        : "text-ink-soft hover:bg-paper-soft hover:text-ink"
                      }`}
                  >
                    {l.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold uppercase tracking-[0.14em] text-paper"
              >
                Schedule Site Visit
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
