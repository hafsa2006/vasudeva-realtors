type LogoProps = {
  /** When true (navbar frosted over light sections), the mark/wordmark use ink. */
  scrolled?: boolean;
  /** Monogram-only lockup for tight spaces (mobile). */
  compact?: boolean;
  className?: string;
};

const GOLD = "#B68D40";

// Soaring eagle, refined for a dark luxury palette — a monochrome adaptation
// of the Vasudeva emblem. One wing path, mirrored for perfect symmetry.
const WING =
  "M32 30 C 38 24, 46 20, 56 21 C 52 25, 49 27, 51 29 C 47 28, 44 29, 45 32 C 41 31, 38 32, 38 34 C 35 33, 33 33, 32 31 Z";
const BODY =
  "M32 23 C 35 25, 36 28, 35 31 L 36 41 L 32 47 L 28 41 L 29 31 C 28 28, 29 25, 32 23 Z";

export default function Logo({
  scrolled = false,
  compact = false,
  className = "",
}: LogoProps) {
  const primary = scrolled ? "#0C0C0B" : "#F7F5F2";

  return (
    <span className={`group/logo inline-flex items-center gap-3.5 ${className}`}>
      {/* Eagle emblem */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="h-11 w-11 shrink-0 transition-transform duration-500 ease-out group-hover/logo:scale-[1.06]"
      >
        {/* Architectural ring */}
        <circle cx="32" cy="32" r="29.5" stroke={GOLD} strokeWidth="1.4" />

        {/* Eagle */}
        <path d={WING} fill={primary} className="transition-[fill] duration-300" />
        <path
          d={WING}
          fill={primary}
          transform="matrix(-1 0 0 1 64 0)"
          className="transition-[fill] duration-300"
        />
        <path d={BODY} fill={primary} className="transition-[fill] duration-300" />
        <circle
          cx="32"
          cy="19"
          r="3.2"
          fill={primary}
          className="transition-[fill] duration-300"
        />

        {/* Three stars — a refined nod to the original emblem */}
        {[26.5, 32, 37.5].map((x) => (
          <path
            key={x}
            d={`M${x} 51 l0.9 1.8 l1.9 0.2 l-1.4 1.3 l0.4 1.9 l-1.8 -1 l-1.8 1 l0.4 -1.9 l-1.4 -1.3 l1.9 -0.2 Z`}
            fill={GOLD}
            transform={`translate(-1 -1)`}
          />
        ))}
      </svg>

      {/* Wordmark lockup */}
      {!compact && (
        <span className="flex flex-col leading-[1.08]">
          <span
            className={`text-[0.95rem] font-semibold uppercase tracking-[0.3em] transition-colors duration-300 group-hover/logo:tracking-[0.34em] ${
              scrolled ? "text-[#0C0C0B]" : "text-[#F7F5F2]"
            }`}
          >
            Vasudeva
          </span>
          <span
            className="text-[0.6rem] font-medium uppercase tracking-[0.42em]"
            style={{ color: GOLD }}
          >
            Realtors
          </span>
        </span>
      )}
    </span>
  );
}
