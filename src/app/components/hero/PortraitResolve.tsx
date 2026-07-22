import { useState } from "react";
import type { HeroMode } from "./useHeroSequence";

const WIREFRAME_SRC = `${import.meta.env.BASE_URL}hero/portrait-wireframe.png`;
const MIDFI_SRC = `${import.meta.env.BASE_URL}hero/portrait-midfi.png`;

interface PortraitResolveProps {
  mode: HeroMode;
  photoSrc: string;
  /**
   * Fallback path: skip the mid-fi layer and crossfade wireframe → photo
   * directly. Flip this on if portrait-midfi.png doesn't register cleanly.
   * Also engages automatically if the mid-fi asset fails to load.
   */
  twoStep?: boolean;
  /** Apply a subtle displacement filter if the wireframe SVG reads too clean. */
  roughen?: boolean;
  /** Fired when the wireframe has loaded (or failed) — safe to start the clock. */
  onWireSettled: () => void;
}

/**
 * The portrait through the "Paper to Product" sequence: construction-line
 * wireframe (ink-dark on paper, lifting to light as the canvas darkens)
 * → mid-fi grayscale → final photograph, driven by hero-sequence.css.
 * Layer order (bottom → top): photo, mid-fi, wireframe.
 * The ink filter lives on the wrapper so it never clashes with the
 * optional roughen filter on the image itself.
 */
export function PortraitResolve({
  mode,
  photoSrc,
  twoStep = false,
  roughen = false,
  onWireSettled,
}: PortraitResolveProps) {
  const [wireFailed, setWireFailed] = useState(false);
  const [midFailed, setMidFailed] = useState(false);

  const seq = mode === "sequence";
  const showWire = seq && !wireFailed;
  const showMid = seq && !wireFailed && !twoStep && !midFailed;

  const classes = [
    "hsResolve",
    "heroPortrait__frame",
    twoStep || midFailed ? "hsResolve--two" : "",
    wireFailed ? "hsResolve--noWire" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {showWire && roughen && (
        <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
          <filter id="hs-roughen">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.02"
              numOctaves="2"
              seed="7"
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale="2.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}

      <img
        src={photoSrc}
        alt="Damian Aaby Præsthus"
        width={1200}
        height={1600}
        loading="eager"
        decoding="async"
        className="hsResolve__photo heroPortrait__image w-full h-auto block object-contain max-h-[450px] lg:max-h-[500px]"
      />

      {showMid && (
        <img
          src={MIDFI_SRC}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="hsResolve__layer hsResolve__mid"
          onError={() => setMidFailed(true)}
        />
      )}

      {showWire && (
        <div className="hsResolve__layer hsResolve__wireWrap">
          <img
            src={WIREFRAME_SRC}
            alt=""
            aria-hidden="true"
            decoding="async"
            className={`hsResolve__wireImg${roughen ? " hsResolve__wireImg--rough" : ""}`}
            ref={(el) => {
              // Cached SVGs can complete before onLoad attaches.
              if (el?.complete) onWireSettled();
            }}
            onLoad={onWireSettled}
            onError={() => {
              setWireFailed(true);
              onWireSettled();
            }}
          />
        </div>
      )}
    </div>
  );
}
