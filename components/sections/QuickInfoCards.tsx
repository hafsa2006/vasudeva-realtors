"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Stat = { value: number; suffix: string; label: string };

const stats: Stat[] = [
  { value: 20, suffix: "+", label: "Years of Excellence" },
  { value: 170, suffix: "", label: "Luxury Villas Delivered" },
  { value: 17, suffix: "+", label: "Acres of Community Development" },
  { value: 59, suffix: "", label: "Premium Villas at Bloomfield Elation" },
];

const milestones = [
  "2003",
  "Bloomfield Communities",
  "Luxury Villa Developments",
  "Present",
];

export default function QuickInfoCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reduced motion: show final values, no animation/triggers.
      if (reduced) {
        stats.forEach((s, i) => {
          const el = numRefs.current[i];
          if (el) el.textContent = `${s.value}${s.suffix}`;
        });
        return;
      }

      // Editorial reveals (one ScrollTrigger)
      gsap.from(".legacy-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      // Count-up statistics — a single ScrollTrigger fires all counters.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          stats.forEach((s, i) => {
            const el = numRefs.current[i];
            if (!el) return;
            const counter = { v: 0 };
            gsap.to(counter, {
              v: s.value,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${Math.floor(counter.v)}${s.suffix}`;
              },
              onComplete: () => {
                el.textContent = `${s.value}${s.suffix}`;
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="communities"
      className="relative w-full overflow-hidden border-t border-line bg-paper py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
        {/* LEFT — narrative + watermark */}
        <div className="relative">
          {/* Oversized watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-1 -top-16 select-none font-serif text-[5.5rem] font-bold leading-none tracking-tight text-ink/[0.045] sm:text-[7.5rem]"
          >
            EST. 2003
          </span>

          <div className="relative">
            <span className="legacy-reveal mb-6 inline-flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.34em] text-accent">
              <span className="h-px w-10 bg-accent" />
              Our Legacy
            </span>

            <h2 className="legacy-reveal font-serif text-4xl font-medium leading-[1.06] tracking-tight text-ink sm:text-[3.4rem]">
              A Legacy of <span className="italic text-accent">Luxury Living</span>
            </h2>

            <p className="legacy-reveal mt-7 max-w-xl text-base leading-relaxed text-muted font-medium">
              For over two decades, Vasudeva Realtors has been shaping premium
              residential communities across Hyderabad, combining strategic
              locations, thoughtful planning and enduring construction quality.
            </p>

            {/* Thin milestone timeline */}
            <div className="legacy-reveal mt-12">
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                {/* connecting hairline (desktop) */}
                <span className="pointer-events-none absolute left-1 right-1 top-[5px] hidden h-px bg-gradient-to-r from-accent/60 via-line-strong to-accent/30 sm:block" />
                {milestones.map((m, i) => (
                  <div
                    key={m}
                    className="relative flex items-start gap-3 sm:max-w-[7.5rem] sm:flex-col sm:gap-3"
                  >
                    <span
                      className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${i === 0 || i === milestones.length - 1
                          ? "bg-accent"
                          : "bg-line-strong"
                        }`}
                    />
                    <span className="text-xs font-semibold leading-snug tracking-tight text-ink-soft sm:text-[0.72rem]">
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — animated statistics */}
        <div className="legacy-reveal">
          <div className="grid grid-cols-2 border-l border-t border-line">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="group relative border-b border-r border-line p-7 transition-colors duration-300 hover:bg-white sm:p-9"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-baseline">
                  <span
                    ref={(el) => {
                      numRefs.current[i] = el;
                    }}
                    className="font-serif text-5xl font-semibold leading-none tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-6xl"
                  >
                    0{s.suffix}
                  </span>
                </div>
                <p className="mt-4 text-[0.78rem] font-semibold uppercase leading-snug tracking-[0.12em] text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
