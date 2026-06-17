import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "#properties" },
  { label: "Communities", href: "#communities" },
  { label: "Connected Living", href: "#location" },
  { label: "Legacy", href: "#legacy" },
  { label: "Gallery", href: "#living" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-ink text-paper"
    >


      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-10 sm:px-10">
        {/* Row 1 — brand + navigation */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-base font-semibold uppercase tracking-[0.26em] text-paper">
            Vasudeva<span className="text-luxury-gold"> Realtors</span>
          </span>

          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {navLinks.map((l, i) => (
              <span key={l.href} className="flex items-center gap-x-3">
                <a
                  href={l.href}
                  className="text-[0.78rem] font-medium tracking-wide text-paper/60 transition-colors hover:text-luxury-gold-light"
                >
                  {l.label}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-luxury-gold/50">•</span>
                )}
              </span>
            ))}
          </nav>
        </div>



        {/* Row 2 — tagline / contact + CTA */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="max-w-md text-sm leading-relaxed text-paper/55">
              Crafting landmark communities across Hyderabad since 2003.
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-paper/50">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-luxury-gold/70" />
                Hyderabad, Telangana
              </span>
              <a
                href="mailto:md@vasudevarealtors.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-luxury-gold-light"
              >
                <Mail className="h-3.5 w-3.5 text-luxury-gold/70" />
                md@vasudevarealtors.com
              </a>
              <a
                href="tel:+919100899899"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-luxury-gold-light"
              >
                <Phone className="h-3.5 w-3.5 text-luxury-gold/70" />
                +91 91008 99899
              </a>
            </p>
          </div>

          <div className="flex flex-col items-end gap-2.5">
            <p className="text-right text-[0.7rem] tracking-wide text-paper/35">
              © {new Date().getFullYear()} by Vasudeva Realtors. All Rights
              Reserved.
            </p>
            <a
              href="mailto:md@vasudevarealtors.com?subject=Consultation%20Request"
              className="group inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-luxury-gold-light transition-colors hover:text-luxury-gold"
            >
              Schedule Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Oversized brand wordmark — closing note */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-5 sm:px-10">
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 188"
          preserveAspectRatio="xMidYMax meet"
          className="pointer-events-none mt-1 block w-full select-none"
        >
          <text
            x="600"
            y="176"
            textAnchor="middle"
            textLength="1188"
            lengthAdjust="spacingAndGlyphs"
            fontSize="220"
            fontWeight="500"
            fill="#faf7f0"
            fillOpacity="0.07"
            className="font-sans uppercase"
          >
            VASUDEVA
          </text>
        </svg>
      </div>
    </footer>
  );
}
