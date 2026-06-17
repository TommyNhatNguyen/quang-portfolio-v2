"use client";

import { colors } from "@/lib/colors.stylex";
import { fontSize, fontWeight } from "@/lib/typography.stylex";
import { gsap, useGSAP } from "@/lib/gsap";
import * as stylex from "@stylexjs/stylex";
import { useRef, useState } from "react";

export const Loader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const counter = { value: 0 };

      gsap
        .timeline({ onComplete: () => setDone(true) })
        .to(counter, {
          value: 100,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (textRef.current) {
              textRef.current.textContent = `${Math.round(counter.value)}%`;
            }
          },
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power2.inOut",
        });
    },
    { scope: containerRef },
  );

  if (done) return null;

  return (
    <div ref={containerRef} {...stylex.props(styles.loader)}>
      <span ref={textRef} {...stylex.props(styles.loaderText)}>
        0%
      </span>
    </div>
  );
};

const styles = stylex.create({
  loader: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    zIndex: 1000,
  },
  loaderText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
});
