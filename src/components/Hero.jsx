import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   Pre-generate stable random scatter offsets for "Beyond"
   (called once, stored in a ref so they never change)
───────────────────────────────────────────────────────────── */
const seed = (i) => {
  // Deterministic-ish spread based on index so SSR is consistent
  const angle = (i * 137.5 * Math.PI) / 180; // golden-angle spiral
  const radius = 280 + i * 35;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius - 60,
    rotate: (i % 2 === 0 ? 1 : -1) * (15 + i * 8),
    scale: 0.25 + (i % 3) * 0.15,
  };
};

/* Individual letter component for "Beyond" (scattered → snap) */
const ScatterLetter = ({ char, index, revealed, offset }) => {
  const style = {
    display: "inline-block",
    /* spring overshoot: letters feel heavy snapping into place */
    transition: revealed
      ? `transform 0.85s cubic-bezier(0.34, 1.45, 0.64, 1) ${index * 0.07}s,
         opacity   0.5s ease                                ${index * 0.07}s`
      : "none",
    transform: revealed
      ? "translate(0,0) rotate(0deg) scale(1)"
      : `translate(${offset.x}px, ${offset.y}px) rotate(${offset.rotate}deg) scale(${offset.scale})`,
    opacity: revealed ? 1 : 0,
    willChange: "transform, opacity",
  };
  return <span style={style}>{char}</span>;
};

/* Individual letter component for "Bricks" (drop from above → thud) */
const BrickLetter = ({ char, index, revealed, totalBeyond }) => {
  const baseDelay = totalBeyond * 0.07 + 0.05; // starts after Beyond finishes
  const delay = baseDelay + index * 0.09;

  const style = {
    display: "inline-block",
    /* stiff spring for the "thud" feel */
    transition: revealed
      ? `transform 0.6s cubic-bezier(0.22, 1.8, 0.36, 1) ${delay}s,
         opacity   0.3s ease                               ${delay}s`
      : "none",
    transform: revealed ? "translateY(0) scaleY(1)" : "translateY(-180px) scaleY(0.6)",
    opacity: revealed ? 1 : 0,
    willChange: "transform, opacity",
    transformOrigin: "top center",
  };

  return (
    <span className="text-accent-gold" style={style}>
      {char}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════ */
const Hero = () => {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);

  /* Generate scatter offsets once */
  const beyondLetters = "Beyond".split("");
  const bricksLetters = "Bricks".split("");
  const offsets = useRef(beyondLetters.map((_, i) => seed(i)));

  /* Tiny delay so the page is painted before animation starts */
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  /* Subtitle + buttons appear after all bricks have landed */
  const allLetters = beyondLetters.length + bricksLetters.length;
  const totalAnimMs =
    (beyondLetters.length * 0.07 + bricksLetters.length * 0.09 + 0.8) * 1000;

  const [subRevealed, setSubRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSubRevealed(true), totalAnimMs + 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source
            src="https://res.cloudinary.com/dggeuuu1n/video/upload/v1761005613/AdobeStock_353539039_Video_4K_Preview_y1qzt4.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Floating gold orbs */}
      <div
        className="absolute top-1/4 left-10 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244,185,66,0.06) 0%, transparent 70%)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/3 right-16 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244,185,66,0.04) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite 2s",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Label pill — fades in before letters animate */}
        <div
          className="inline-flex items-center gap-2 mb-6"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.6s ease 0s, transform 0.6s ease 0s",
          }}>
          <span
            className="px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase border border-accent-gold/40 text-accent-gold"
            style={{ background: "rgba(244,185,66,0.08)", backdropFilter: "blur(4px)" }}>
            Lagos&apos; Premier Construction Company
          </span>
        </div>

        {/* ── ANIMATED TITLE ── */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-medium mb-4 text-white leading-tight"
          style={{ lineHeight: 1.1 }}>
          {/* "Beyond" — scattered bricks fly in */}
          {beyondLetters.map((char, i) => (
            <ScatterLetter
              key={i}
              char={char}
              index={i}
              revealed={revealed}
              offset={offsets.current[i]}
            />
          ))}

          {/* Space between words */}
          <span style={{ display: "inline-block", width: "0.3em" }} />

          {/* "Bricks" — letter-bricks drop in */}
          {bricksLetters.map((char, i) => (
            <BrickLetter
              key={i}
              char={char}
              index={i}
              revealed={revealed}
              totalBeyond={beyondLetters.length}
            />
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-200 font-light"
          style={{
            opacity: subRevealed ? 1 : 0,
            transform: subRevealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
          Building Excellence, One Project at a Time
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            opacity: subRevealed ? 1 : 0,
            transform: subRevealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}>

          {/* Primary — pulsing gold */}
          <div className="relative group">
            <span
              className="absolute inset-0 bg-accent-gold/30 pointer-events-none"
              style={{ animation: "pulseRing 2s ease-out infinite" }}
            />
            <span
              className="absolute inset-0 bg-accent-gold/20 pointer-events-none"
              style={{ animation: "pulseRing 2s ease-out infinite 0.6s" }}
            />
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
              className="btn-shimmer relative z-10 inline-flex items-center gap-2 bg-accent-gold text-primary-dark px-7 py-3.5 font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,185,66,0.5)]">
              Start Your Project
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={18} />
            </a>
          </div>

          {/* Secondary — ghost */}
          <a
            href="/projects"
            onClick={(e) => { e.preventDefault(); navigate("/projects"); }}
            className="relative inline-flex items-center gap-2 border border-white/40 text-white px-7 py-3.5 font-medium text-sm tracking-wide transition-all duration-300 hover:border-accent-gold hover:text-accent-gold hover:bg-accent-gold/5 group">
            View Our Work
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform duration-200 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0"
              size={18}
            />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: subRevealed ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}>
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-9 border border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div
            className="w-1 h-2.5 bg-accent-gold rounded-full"
            style={{ animation: "float 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
