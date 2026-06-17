"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const reveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stages = [
  {
    id: 1,
    label: "Empty Plot",
    description: "Surveyed and prepared residential plot, ready for construction.",
    image: "/images/construction/stage_1_empty_plot.png",
    progress: 0,
  },
  {
    id: 2,
    label: "Foundation",
    description: "Excavation, concrete footings, and reinforced foundation laid.",
    image: "/images/construction/stage_2_foundation.png",
    progress: 15,
  },
  {
    id: 3,
    label: "Structural Frame",
    description: "RCC columns, beams, and floor slabs erected across all stories.",
    image: "/images/construction/stage_3_frame.png",
    progress: 35,
  },
  {
    id: 4,
    label: "Walls & Masonry",
    description: "Brick and block walls constructed, window and door openings formed.",
    image: "/images/construction/stage_4_walls.png",
    progress: 55,
  },
  {
    id: 5,
    label: "Exterior Finishes",
    description: "Facade rendering, glazing, roofing, and painting nearing completion.",
    image: "/images/construction/stage_5_finishing.png",
    progress: 80,
  },
  {
    id: 6,
    label: "Completed Villa",
    description: "Fully finished luxury villa with landscaping and premium finishes.",
    image: "/images/construction/stage_6_completed.png",
    progress: 100,
  },
];

export default function ConstructionTimelapse() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    setActiveStage((prev) => (prev >= stages.length - 1 ? 0 : prev + 1));
  }, []);

  const goPrev = useCallback(() => {
    setActiveStage((prev) => Math.max(0, prev - 1));
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(goNext, 2500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, goNext]);

  const handlePlay = () => {
    setIsPlaying((v) => !v);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    setActiveStage(Number(e.target.value));
  };

  const current = stages[activeStage];

  return (
    <section className="relative w-full border-t border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.span
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-6 inline-flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-accent"
          >
            <span className="h-[2px] w-9 bg-accent" />
            Construction Journey
          </motion.span>

          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={1}
            className="text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl"
          >
            Watch your dream home{" "}
            <span className="text-accent">come to life.</span>
          </motion.h2>

          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={2}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          >
            Experience every stage of construction — from an empty plot of land
            to a finished luxury villa, built with precision and care.
          </motion.p>
        </div>

        {/* Timelapse Viewer */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          custom={3}
          className="mt-14"
        >
          {/* Main Image Container */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-xl border border-line">
            <div className="relative aspect-[16/9] w-full">
              {/* All images stacked, only active is visible */}
              {stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: idx === activeStage ? 1 : 0 }}
                >
                  <Image
                    src={stage.image}
                    alt={stage.label}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority={idx === 0}
                  />
                </div>
              ))}

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

              {/* Stage info overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="absolute bottom-6 left-6 sm:left-8 z-10"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/80 font-semibold border border-white/10">
                    Stage {current.id} of {stages.length}
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {current.label}
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-white/70 font-medium">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress percentage badge */}
              <div className="absolute top-6 right-6 z-10">
                <div className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-2 border border-white/10">
                  <span className="text-2xl font-bold text-white tabular-nums">
                    {current.progress}%
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.15em] text-white/60 font-semibold">
                    Complete
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goPrev}
                disabled={activeStage === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white border border-white/10 transition-all hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous stage"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                disabled={activeStage >= stages.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white border border-white/10 transition-all hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next stage"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            {/* Play/Pause */}
            <button
              onClick={handlePlay}
              className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-ink shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              aria-label={isPlaying ? "Pause timelapse" : "Play timelapse"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 translate-x-[1px]" />
              )}
            </button>

            {/* Slider */}
            <div className="flex flex-1 flex-col gap-2">
              <input
                type="range"
                min={0}
                max={stages.length - 1}
                step={1}
                value={activeStage}
                onChange={handleSliderChange}
                className="timelapse-slider w-full cursor-pointer"
                aria-label="Construction stage"
              />
              {/* Stage dots/labels */}
              <div className="flex justify-between px-0.5">
                {stages.map((stage, idx) => (
                  <button
                    key={stage.id}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStage(idx);
                    }}
                    className={`text-[0.6rem] sm:text-[0.65rem] font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                      idx === activeStage
                        ? "text-accent"
                        : idx < activeStage
                        ? "text-ink-soft"
                        : "text-muted/50"
                    }`}
                  >
                    <span className="hidden sm:inline">{stage.label}</span>
                    <span className="sm:hidden">{stage.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-1.5 w-full rounded-full bg-line/40 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent"
              animate={{ width: `${current.progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </div>

      {/* Custom slider styles */}
      <style jsx>{`
        .timelapse-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            var(--color-accent) 0%,
            var(--color-accent) ${(activeStage / (stages.length - 1)) * 100}%,
            var(--color-line) ${(activeStage / (stages.length - 1)) * 100}%,
            var(--color-line) 100%
          );
          outline: none;
          transition: background 0.3s ease;
        }
        .timelapse-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-accent);
          border: 3px solid var(--color-paper);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .timelapse-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .timelapse-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-accent);
          border: 3px solid var(--color-paper);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
      `}</style>
    </section>
  );
}
