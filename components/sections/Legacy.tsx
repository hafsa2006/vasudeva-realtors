"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

export default function Legacy() {
  return (
    <section
      id="legacy"
      className="relative w-full border-t border-line bg-paper py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20">

        {/* Left Column — Text & Copy */}
        <div className="flex flex-col items-start justify-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-accent"
          >
            <span className="h-[2px] w-8 bg-ink" />
            About Vasudeva
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-serif font-light leading-[1.12] tracking-tight text-ink sm:text-[2.6rem]"
          >
            Two decades of trust, <br />
            crafted into <span className="italic font-normal text-accent">every address</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-muted font-sans font-medium"
          >
            Vasudeva Realtors creates vibrant residential communities, based on modern design,
            luxury living, and prime locations. We don&apos;t merely build properties — we steward legacies,
            pairing architectural excellence with an unwavering commitment to the families who call our
            communities home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 w-full border-t border-line pt-6"
          >
            {/* Bullet Point 1 */}
            <div className="flex items-start gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft/20 text-ink">
                <Check className="h-3 w-3" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-ink">Trusted Experience</h4>
                <p className="mt-1 text-xs text-muted leading-relaxed font-medium">
                  Over 20 years of crafting premium, structurally superior residential communities in Hyderabad.
                </p>
              </div>
            </div>

            {/* Bullet Point 2 */}
            <div className="flex items-start gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft/20 text-ink">
                <Check className="h-3 w-3" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-ink">Premium Quality</h4>
                <p className="mt-1 text-xs text-muted leading-relaxed font-medium">
                  Uncompromising standards of construction materials, architectural details, and modern finishes.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <a
              href="#contact"
              className="bg-accent text-ink inline-flex h-12 items-center justify-center rounded-xl px-8 text-sm font-bold tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Learn More About Us
            </a>
          </motion.div>
        </div>

        {/* Right Column — Large Modern Architecture Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-full min-h-[400px] overflow-hidden rounded-2xl border border-line bg-gray-100 shadow-xl"
        >
          <Image
            src="/images/bloomfield_elation_housing.jpg"
            alt="About Vasudeva Realtors Luxury Villa"
            fill
            className="object-cover object-center hover:scale-104 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

      </div>
    </section>
  );
}
