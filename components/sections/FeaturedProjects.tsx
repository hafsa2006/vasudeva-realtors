"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Check } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    name: "Bloomfield Arcadia",
    location: "Hafeezpet, Hyderabad",
    tag: "Luxury Residences",
    image: "/images/bloomfield_arcadia.png",
    description: "Ready-to-move-in premium apartments featuring modern structures, covered parking, and prime amenities.",
    highlights: ["Completed Project", "Hafeezpet Prime"],
  },
  {
    name: "Bloomfield Ecstasy",
    location: "Gopanpally, Hyderabad",
    tag: "Villa Community",
    image: "/images/bloomfield_ecstasy.png",
    description: "Exclusive ready villa community featuring spacious 4 BHK and 5 BHK layouts and curated lifestyle clubhouse facilities.",
    highlights: ["Luxury Villas", "Gated Security"],
  },
  {
    name: "Lalithanjali",
    location: "Punjagutta, Hyderabad",
    tag: "Apartment Community",
    image: "/images/lalithanjali_housing.jpg",
    description: "Bespoke residential development located in Hyderabad's premier central avenue, offering luxury 3 BHK layouts.",
    highlights: ["Central Address", "Punjagutta Prime"],
  },
];

export default function FeaturedProjects() {
  return (
    <section
      id="properties"
      className="relative w-full bg-paper py-20 sm:py-28 border-t border-line"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">

        {/* Section Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-light tracking-tight text-ink sm:text-[2.6rem]"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 max-w-md text-sm leading-relaxed text-muted font-sans font-medium"
            >
              Discover our portfolio of signature residential developments, built with premium craftsmanship.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="shrink-0"
          >
            <a
              href="#properties"
              className="group inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-paper px-6 text-xs font-bold text-ink shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              View All Developments
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* 3-Column Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative m-3 flex aspect-[16/10] overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-104"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-lg bg-white/95 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink backdrop-blur-sm shadow-sm">
                  {p.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col px-5 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-ink font-sans">
                      {p.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-muted">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      <span className="text-xs font-medium">{p.location}</span>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-accent">
                    Grade-A
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted font-sans font-medium flex-grow">
                  {p.description}
                </p>

                {/* Highlight Chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1 rounded-lg border border-line bg-paper px-2.5 py-1 text-[0.62rem] font-bold text-ink-soft"
                    >
                      <Check className="h-2.5 w-2.5 text-accent" />
                      {h}
                    </span>
                  ))}
                </div>

                {/* Action Link inside Card */}
                <div className="mt-5 border-t border-line pt-4 flex justify-between items-center">
                  <a
                    href="#contact"
                    className="group/cta inline-flex items-center gap-2 text-xs font-bold text-ink transition-colors hover:text-accent"
                  >
                    Request Details
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper text-ink transition-all group-hover/cta:bg-accent shadow-sm group-hover/cta:shadow-md">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
