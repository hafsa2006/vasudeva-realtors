"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

type Feature = {
  index: string;
  title: string;
  copy: string;
  image: string;
};

const features: Feature[] = [
  {
    index: "01",
    title: "Natural Light",
    copy: "Sun-traced interiors that breathe and shift gently with the day.",
    image: "/images/luxury_living_light.png",
  },
  {
    index: "02",
    title: "Premium Finishes",
    copy: "Hand-selected stone, timber and metal, detailed without compromise.",
    image: "/images/luxury_living_finishes.png",
  },
  {
    index: "03",
    title: "Thoughtful Layouts",
    copy: "Proportions tuned for effortless flow, privacy and quiet calm.",
    image: "/images/luxury_living_layouts.png",
  },
  {
    index: "04",
    title: "Contemporary Design",
    copy: "An architectural language that reads as timeless, never trend-bound.",
    image: "/images/luxury_living_design.png",
  },
  {
    index: "05",
    title: "Indoor Outdoor Harmony",
    copy: "Thresholds dissolve as living spaces open into landscaped air.",
    image: "/images/luxury_living_harmony.png",
  },
  {
    index: "06",
    title: "Community Living",
    copy: "Shared sanctuaries curated for connection, leisure and belonging.",
    image: "/images/luxury_living_community.png",
  },
];

export default function LuxuryLiving() {
  return (
    <section
      id="living"
      className="relative w-full border-t border-line bg-paper py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial header */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20">
          <div>
            <motion.span
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mb-8 inline-flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-accent"
            >
              <span className="h-[2px] w-9 bg-ink" />
              Luxury Living Experience
            </motion.span>

            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={1}
              className="text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl"
            >
              Every detail considered.
              <br />
              <span className="text-accent">
                Every space designed to inspire.
              </span>
            </motion.h2>
          </div>

          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={2}
            className="max-w-md text-lg leading-relaxed text-muted font-medium"
          >
            Luxury is not only about architecture. It is about how every space
            feels — the light, the silence, the way a room receives you.
          </motion.p>
        </div>

        {/* Editorial feature grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="group flex flex-col border border-line bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-cover object-center transition-transform duration-[1000ms] group-hover:scale-104"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply z-1" />
              </div>

              {/* Title + copy */}
              <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">
                {f.title}
              </h3>
              <span className="mt-3 block h-[3px] w-20 origin-left scale-x-50 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
              <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-muted font-medium">
                {f.copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
