import type { CSSProperties } from "react";

/** Pencil + accent palette for the paper phase. */
const PENCIL = "#3A3D46";
const ACCENT = "#E0801A";

interface StrokeProps {
  d: string;
  delay: number;
  w?: number;
  o?: number;
  c?: string;
}

/** A hand-drawn stroke that draws itself in at `delay` ms on the master clock. */
function Stroke({ d, delay, w = 1.5, o = 0.35, c = PENCIL }: StrokeProps) {
  return (
    <path
      d={d}
      pathLength={1}
      className="hsSketch__stroke"
      fill="none"
      stroke={c}
      strokeWidth={w}
      opacity={o}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    />
  );
}

/** Straight hairline grid — what the rough grid "aligns" into. */
function StraightGrid({ cols, width, height, top, bottom }: {
  cols: number; width: number; height: number; top: number; bottom: number;
}) {
  const step = width / cols;
  return (
    <g className="hsSketch__straight" stroke={PENCIL} strokeWidth={1} opacity={0}>
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={i} x1={i * step} y1={top} x2={i * step} y2={bottom} opacity={0.28} />
      ))}
      <line x1={16} y1={top} x2={width - 16} y2={top} opacity={0.28} />
      <line x1={16} y1={bottom} x2={width - 16} y2={bottom} opacity={0.28} />
    </g>
  );
}

/**
 * Phase 1–3 of "Paper to Product": warm paper, a hand-drawn layout grid
 * that aligns into a straight one, portrait construction frame, and loose
 * greeked interface blocks where the real headline/subhead/CTAs will land.
 * The whole layer lifts at 1500ms (hsPaperLift) and never returns.
 * Rendered only in sequence mode; pointer-events pass straight through.
 */
export function SketchLayer() {
  return (
    <div className="hsSketch" aria-hidden="true">
      <div className="hsSketch__inner px-8 md:px-12 lg:px-16">

        {/* ── Desktop composition ── */}
        <svg
          className="hsSketch__svg hidden md:block"
          viewBox="0 0 1200 640"
          preserveAspectRatio="xMidYMin meet"
        >
          {/* Rough pencil grid — wobbly, slightly rotated; aligns at 1000ms */}
          <g className="hsSketch__rough">
            {[0, 150, 300, 450, 600, 750, 900, 1050, 1200].map((x, i) => (
              <Stroke
                key={x}
                d={`M${x} 46 C ${x + (i % 2 ? 3 : -3)} 200, ${x + (i % 2 ? -4 : 4)} 420, ${x + (i % 2 ? 2 : -1.5)} 604`}
                delay={100 + i * 60}
                w={1}
                o={0.3}
              />
            ))}
            <Stroke d="M20 60 C 380 57, 820 63, 1180 59" delay={520} w={1} o={0.3} />
            <Stroke d="M20 600 C 400 603, 840 597, 1180 601" delay={580} w={1} o={0.3} />
          </g>
          <StraightGrid cols={8} width={1200} height={640} top={46} bottom={604} />

          {/* Nav placeholder scribble */}
          <Stroke d="M64 36 L128 34" delay={150} w={10} o={0.12} />
          <Stroke d="M134 37 L139 37" delay={220} w={6} o={0.7} c={ACCENT} />

          {/* Light bounding marks around the portrait column — the real
              hand-drawn wireframe (rendered above the paper) is the figure;
              these are just registration ticks, not a second portrait. */}
          <Stroke d="M40 150 L64 150" delay={250} o={0.4} />
          <Stroke d="M40 150 L40 174" delay={270} o={0.4} />
          <Stroke d="M432 150 L456 150" delay={300} o={0.4} />
          <Stroke d="M456 150 L456 174" delay={320} o={0.4} />
          <Stroke d="M40 596 L64 596" delay={350} o={0.4} />
          <Stroke d="M40 572 L40 596" delay={370} o={0.4} />

          {/* Loose interface blocks — where the real content will land */}
          <Stroke d="M622 176 L926 174" delay={400} o={0.35} />
          <Stroke d="M618 208 L1152 212 L1148 396 L622 392 Z" delay={460} o={0.5} />
          <Stroke d="M640 260 L1080 258" delay={520} w={26} o={0.1} />
          <Stroke d="M640 320 L1010 322" delay={580} w={26} o={0.1} />
          <Stroke d="M640 372 L900 370" delay={640} w={26} o={0.1} />
          <Stroke d="M622 452 L1096 450" delay={700} o={0.3} />
          <Stroke d="M622 478 L1062 480" delay={760} o={0.3} />
          <Stroke d="M622 504 L928 502" delay={820} o={0.3} />
          <Stroke d="M645 538 h122 a23 23 0 0 1 0 46 h-122 a23 23 0 0 1 0 -46 z" delay={880} o={0.45} />
          <Stroke d="M835 538 h74 a23 23 0 0 1 0 46 h-74 a23 23 0 0 1 0 -46 z" delay={940} o={0.45} />
          {/* the accent exists from the first sketch */}
          <Stroke d="M640 418 L804 421" delay={900} w={3} o={0.8} c={ACCENT} />
        </svg>

        {/* ── Mobile composition — same story, fewer marks ── */}
        <svg
          className="hsSketch__svg md:hidden"
          viewBox="0 0 375 680"
          preserveAspectRatio="xMidYMin meet"
        >
          <g className="hsSketch__rough">
            {[0, 94, 188, 282, 375].map((x, i) => (
              <Stroke
                key={x}
                d={`M${x} 40 C ${x + (i % 2 ? 2 : -2)} 260, ${x + (i % 2 ? -3 : 3)} 480, ${x + (i % 2 ? 1.5 : -1)} 644`}
                delay={100 + i * 70}
                w={1}
                o={0.3}
              />
            ))}
            <Stroke d="M10 52 C 130 50, 260 54, 366 51" delay={480} w={1} o={0.3} />
            <Stroke d="M10 640 C 140 643, 250 638, 366 641" delay={540} w={1} o={0.3} />
          </g>
          <StraightGrid cols={4} width={375} height={680} top={40} bottom={644} />

          <Stroke d="M28 30 L78 28" delay={150} w={8} o={0.12} />
          <Stroke d="M84 30 L88 30" delay={220} w={5} o={0.7} c={ACCENT} />

          <Stroke d="M26 296 L350 300 L346 470 L30 466 Z" delay={380} o={0.5} />
          <Stroke d="M46 344 L330 342" delay={460} w={20} o={0.1} />
          <Stroke d="M46 390 L296 392" delay={520} w={20} o={0.1} />
          <Stroke d="M46 436 L240 434" delay={580} w={20} o={0.1} />
          <Stroke d="M28 502 L344 500" delay={660} o={0.3} />
          <Stroke d="M28 526 L318 528" delay={720} o={0.3} />
          <Stroke d="M28 550 L232 548" delay={780} o={0.3} />
          <Stroke d="M46 590 h104 a21 21 0 0 1 0 42 h-104 a21 21 0 0 1 0 -42 z" delay={840} o={0.45} />
          <Stroke d="M208 590 h64 a21 21 0 0 1 0 42 h-64 a21 21 0 0 1 0 -42 z" delay={900} o={0.45} />
          <Stroke d="M46 486 L168 489" delay={860} w={3} o={0.8} c={ACCENT} />
        </svg>
      </div>
    </div>
  );
}
