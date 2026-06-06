import * as stylex from "@stylexjs/stylex";

export const fontFamily = stylex.defineConsts({
  primary: "var(--font-inter-tight), 'Inter Tight', sans-serif",
  secondary: "var(--font-inter), 'Inter', sans-serif",
});


export const fontSize = stylex.defineConsts({
  xs: "10px",
  sm: "12px",
  md: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "28px",
  "3xl": "36px",
  "4xl": "48px",
  "5xl": "80px",
});

export const fontWeight = stylex.defineConsts({
  regular: "400",
  medium: "500",
  semiBold: "600",
});

// Paired to fontSize scale — px values as authored in Figma
export const lineHeight = stylex.defineConsts({
  xs: "13px", // for fontSize.xs (10px)
  sm: "18px", // for fontSize.sm (12px)
  md: "23px", // for fontSize.md (14px)
  base: "24px", // for fontSize.base (16px)
  lg: "25px", // for fontSize.lg–xl (18–20px)
  xl: "34px", // for fontSize.2xl (28px)
  "2xl": "43px", // for fontSize.3xl (36px)
  "3xl": "58px", // for fontSize.4xl (48px)
  "4xl": "94px", // for fontSize.5xl (80px)
});

// Negative tracking for headings, neutral for body
export const letterSpacing = stylex.defineConsts({
  tightest: "-2.5px", // hero display (80px)
  tighter: "-1.5px", // large heading (48px)
  tight: "-1px", // medium heading (28–36px)
  normal: "0px", // body text
  wide: "0.1px", // small labels
});
