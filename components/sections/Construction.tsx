"use client";

import { motion, type Variants } from "framer-motion";
import {
  Building2,
  Compass,
  Layers,
  ClipboardCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

const reveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const features: { label: string; icon: LucideIcon }[] = [
  { label: "Premium Construction Standards", icon: Building2 },
  { label: "Architectural Excellence", icon: Compass },
  { label: "Quality Materials", icon: Layers },
  { label: "Thoughtful Planning", icon: ClipboardCheck },
  { label: "Community-Centric Development", icon: Users },
];

export default function Construction() {
  return (
    <section
      id="construction"
      className="relative w-full border-t border-line bg-paper py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Left — copy */}
        <div className="flex flex-col items-start">
          <motion.span
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-8 inline-flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-accent"
          >
            <span className="h-[2px] w-9 bg-ink" />
            Construction Excellence
          </motion.span>

          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={1}
            className="text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl"
          >
            Built with precision.
            <br />
            <span className="text-accent">Delivered with trust.</span>
          </motion.h2>

          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={2}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            For over two decades, Vasudeva Realtors has focused on creating
            premium communities through quality construction, thoughtful
            planning and long-term value creation.
          </motion.p>
        </div>

        {/* Right — feature list */}
        <div className="flex flex-col">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="group flex items-center gap-5 border-b border-line py-6 transition-all last:border-b-0"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-white shadow-sm transition-all duration-300 group-hover:bg-accent group-hover:shadow-md">
                <f.icon className="h-5 w-5 text-ink" />
              </div>
              <span className="text-lg font-bold tracking-tight text-ink sm:text-xl">
                {f.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
