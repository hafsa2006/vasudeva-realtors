"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  HeartPulse,
  Route,
  Plane,
  Clock,
  Navigation,
  type LucideIcon,
} from "lucide-react";

type Place = {
  name: string;
  category: string;
  time: string;
  distance: string;
  note: string;
  x: number;
  y: number;
};

// Coordinates live inside a 520 x 480 viewBox; the project hub sits at (260, 240).
const places: Place[] = [
  {
    name: "Financial District",
    category: "Business Hub",
    time: "8 min",
    distance: "5.2 km",
    note: "Hyderabad's premier corporate and banking address.",
    x: 150,
    y: 120,
  },
  {
    name: "Gachibowli",
    category: "IT & Sports City",
    time: "12 min",
    distance: "7.6 km",
    note: "Global technology campuses and international stadiums.",
    x: 400,
    y: 112,
  },
  {
    name: "Khajaguda",
    category: "Lifestyle & Nature",
    time: "10 min",
    distance: "6.1 km",
    note: "Scenic rock terrain framed by premium retail.",
    x: 462,
    y: 252,
  },
  {
    name: "Nanakramguda",
    category: "Financial Corridor",
    time: "9 min",
    distance: "5.8 km",
    note: "SEZ campuses and multinational headquarters.",
    x: 372,
    y: 398,
  },
  {
    name: "Kokapet",
    category: "Premium Real Estate",
    time: "6 min",
    distance: "3.9 km",
    note: "The city's fastest-rising luxury enclave.",
    x: 158,
    y: 404,
  },
  {
    name: "Tellapur",
    category: "Emerging Growth",
    time: "15 min",
    distance: "9.4 km",
    note: "Master-planned residential expansion zone.",
    x: 72,
    y: 256,
  },
];

const highlights: { label: string; icon: LucideIcon }[] = [
  { label: "IT Corridors", icon: Building2 },
  { label: "International Schools", icon: GraduationCap },
  { label: "Hospitals", icon: HeartPulse },
  { label: "ORR Connectivity", icon: Route },
  { label: "Airport Access", icon: Plane },
];

const HUB = { x: 260, y: 240 };

export default function Location() {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mapWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<SVGLineElement>(".route-line");
      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: len,
          strokeDashoffset: reduced ? 0 : len,
        });
      });

      if (reduced) return;

      // One timeline → one ScrollTrigger for the whole reveal sequence.
      gsap
        .timeline({
          scrollTrigger: { trigger: mapWrapRef.current, start: "top 78%" },
        })
        .to(lines, {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: "power2.inOut",
          stagger: 0.12,
        })
        .from(
          ".map-node",
          {
            scale: 0,
            opacity: 0,
            transformOrigin: "center",
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.12,
          },
          "-=0.9"
        )
        .from(
          ".node-label",
          { opacity: 0, duration: 0.6, stagger: 0.12 },
          "-=0.5"
        );

      // Slow living pulse on the project hub (no ScrollTrigger).
      gsap.to(".hub-pulse", {
        scale: 2.4,
        opacity: 0,
        duration: 2.8,
        ease: "power1.out",
        repeat: -1,
        transformOrigin: "center",
      });

      // Subtle parallax drift of the whole visualization.
      gsap.to(mapWrapRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activePlace = active !== null ? places[active] : null;

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative w-full overflow-hidden border-t border-line bg-gradient-to-b from-paper to-paper-soft py-20 text-ink sm:py-28"
    >
      {/* Ambient warmth */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(188,163,116,0.14),transparent_70%)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mb-6 inline-flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.34em] text-accent"
          >
            <span className="h-px w-10 bg-accent" />
            Strategic Connectivity
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.08 }}
            className="font-serif text-4xl font-light leading-[1.08] tracking-tight sm:text-[3.4rem]"
          >
            Moments from everything
            <br />
            <span className="text-accent italic">that defines the city.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted font-medium"
          >
            Positioned at the heart of Hyderabad&apos;s western growth corridor —
            within effortless reach of its most valuable business, education and
            lifestyle destinations.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          {/* Left — interactive destinations + highlights */}
          <div>
            <ul className="flex flex-col gap-2.5">
              {places.map((p, i) => {
                const isActive = active === i;
                return (
                  <li
                    key={p.name}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    className={`group flex cursor-default items-center justify-between rounded-2xl border px-5 py-4 backdrop-blur-sm transition-all duration-300 ${isActive
                        ? "-translate-y-0.5 border-accent/50 bg-white/80 shadow-[0_18px_40px_-24px_rgba(60,50,30,0.5)]"
                        : "border-line/70 bg-white/40 hover:border-accent/30 hover:bg-white/60"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-serif text-base tabular-nums transition-colors duration-300 ${isActive ? "text-accent" : "text-muted/50"
                          }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-lg font-semibold tracking-tight text-ink">
                          {p.name}
                        </p>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted/70">
                          {p.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`flex items-center justify-end gap-1.5 text-sm font-bold transition-colors duration-300 ${isActive ? "text-accent" : "text-ink-soft"
                          }`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        {p.time}
                      </p>
                      <p className="text-xs font-medium text-muted/70">
                        {p.distance}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 pl-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted/50">
              Indicative drive times via the Outer Ring Road
            </p>

            {/* Connectivity highlights */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {highlights.map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2.5 text-sm font-semibold text-ink-soft backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                >
                  <h.icon className="h-4 w-4 text-accent" />
                  {h.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — architectural connectivity visualization */}
          <div className="mx-auto w-full max-w-2xl">
            <div
              ref={mapWrapRef}
              className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-[#fbf8f1] via-[#f7f2e7] to-[#efe7d6] p-3 shadow-[0_24px_60px_-40px_rgba(60,50,30,0.5)]"
            >
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/60">
                <svg
                  viewBox="0 0 520 480"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Connectivity map of key destinations around the development"
                >
                  <defs>
                    <linearGradient id="routeBase" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#bca374" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#8a6f3e" stopOpacity="0.7" />
                    </linearGradient>
                    <radialGradient id="hubCore">
                      <stop offset="0%" stopColor="#cbb27e" />
                      <stop offset="100%" stopColor="#8a6f3e" />
                    </radialGradient>
                    <radialGradient id="hubHalo">
                      <stop offset="0%" stopColor="#bca374" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#bca374" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Faint compass guides (architectural, not radar) */}
                  <g stroke="#8a6f3e" strokeOpacity="0.08" strokeWidth="1">
                    <line x1={HUB.x} y1="40" x2={HUB.x} y2="440" />
                    <line x1="40" y1={HUB.y} x2="480" y2={HUB.y} />
                  </g>
                  <circle
                    cx={HUB.x}
                    cy={HUB.y}
                    r="150"
                    fill="none"
                    stroke="#8a6f3e"
                    strokeOpacity="0.07"
                    strokeDasharray="2 7"
                  />

                  {/* Routes */}
                  {places.map((p, i) => {
                    const isActive = active === i;
                    return (
                      <line
                        key={`line-${p.name}`}
                        className="route-line transition-[stroke,stroke-width] duration-300 ease-out"
                        x1={HUB.x}
                        y1={HUB.y}
                        x2={p.x}
                        y2={p.y}
                        stroke={isActive ? "#5c4a28" : "url(#routeBase)"}
                        strokeWidth={isActive ? 3 : 1.4}
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {/* Project hub */}
                  <circle
                    className="hub-pulse"
                    cx={HUB.x}
                    cy={HUB.y}
                    r="16"
                    fill="url(#hubHalo)"
                    style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
                  />
                  <circle cx={HUB.x} cy={HUB.y} r="40" fill="url(#hubHalo)" />
                  <circle
                    cx={HUB.x}
                    cy={HUB.y}
                    r="11"
                    fill="url(#hubCore)"
                    stroke="#fbf8f1"
                    strokeWidth="2.5"
                  />
                  <circle cx={HUB.x} cy={HUB.y} r="3.5" fill="#fbf8f1" />
                  <text
                    x={HUB.x}
                    y={HUB.y + 36}
                    textAnchor="middle"
                    className="fill-ink font-serif"
                    fontSize="15"
                    fontStyle="italic"
                  >
                    The Residence
                  </text>

                  {/* Destination markers */}
                  {places.map((p, i) => {
                    const isActive = active === i;
                    const anchor =
                      p.x < 180 ? "start" : p.x > 340 ? "end" : "middle";
                    const labelY = p.y < HUB.y ? p.y - 16 : p.y + 26;
                    return (
                      <g
                        key={`node-${p.name}`}
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => setActive(null)}
                        className="cursor-pointer"
                      >
                        <circle cx={p.x} cy={p.y} r="24" fill="transparent" />
                        <g className="map-node">
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={isActive ? 15 : 11}
                            fill="#bca374"
                            fillOpacity={isActive ? 0.22 : 0.12}
                            className="transition-all duration-300"
                          />
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={isActive ? 6 : 4.5}
                            fill={isActive ? "#5c4a28" : "#8a6f3e"}
                            stroke="#fbf8f1"
                            strokeWidth="2"
                            className="transition-all duration-300"
                          />
                        </g>
                        <text
                          x={p.x}
                          y={labelY}
                          textAnchor={anchor}
                          className={`node-label transition-colors duration-300 ${isActive ? "fill-ink" : "fill-muted"
                            }`}
                          fontSize="13"
                          fontWeight={isActive ? 700 : 500}
                        >
                          {p.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Contextual glass card — sits below the map so labels stay clear */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white/80 p-5 shadow-[0_20px_50px_-30px_rgba(60,50,30,0.5)] backdrop-blur-md sm:px-6">
              <AnimatePresence mode="wait">
                {activePlace ? (
                  <motion.div
                    key={activePlace.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent">
                        {activePlace.category}
                      </p>
                      <p className="mt-1 font-serif text-xl text-ink">
                        {activePlace.name}
                      </p>
                      <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted">
                        {activePlace.note}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-5">
                      <div className="text-right">
                        <p className="flex items-center justify-end gap-1.5 font-serif text-2xl text-ink">
                          <Clock className="h-4 w-4 text-accent" />
                          {activePlace.time}
                        </p>
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-muted/70">
                          Drive
                        </p>
                      </div>
                      <span className="h-9 w-px bg-line" />
                      <div className="text-right">
                        <p className="flex items-center justify-end gap-1.5 font-serif text-2xl text-ink">
                          <Navigation className="h-4 w-4 text-accent" />
                          {activePlace.distance}
                        </p>
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-muted/70">
                          Distance
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent">
                        Western Corridor
                      </p>
                      <p className="mt-1 font-serif text-xl text-ink">
                        A central address
                      </p>
                      <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted">
                        Six landmark destinations, each within a short drive.
                        Hover a location to trace its route and travel time.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
