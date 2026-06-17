"use client";

import { motion, type Variants } from "framer-motion";

const reveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pillars = [
  {
    title: "Strategic Locations",
    copy: "Communities placed within Hyderabad's most promising residential and commercial corridors.",
  },
  {
    title: "Long-Term Value",
    copy: "Developments crafted to hold meaning, and worth, well beyond the moment of purchase.",
  },
  {
    title: "Connectivity",
    copy: "Close to business districts, education, healthcare and key transit routes.",
  },
  {
    title: "Future Growth",
    copy: "Positioned alongside Hyderabad's emerging infrastructure and expansion.",
  },
];

export default function Investment() {
  return (
    <section
      id="investment"
      className="relative w-full border-t border-line bg-paper-soft py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <motion.span
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-8 inline-flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-accent"
          >
            <span className="h-[2px] w-9 bg-ink" />
            Investment
          </motion.span>

          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={1}
            className="text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl"
          >
            Designed for living.
            <br />
            <span className="text-accent">Positioned for growth.</span>
          </motion.h2>

          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={2}
            className="mt-7 text-lg leading-relaxed text-muted"
          >
            Strategically located communities in Hyderabad&apos;s emerging
            residential and commercial corridors offer long-term value and
            connectivity.
          </motion.p>
        </div>

        {/* Qualitative pillars */}
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="border-t border-line pt-6"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full border border-accent/40 bg-accent" />
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  {p.title}
                </h3>
              </div>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
                {p.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
