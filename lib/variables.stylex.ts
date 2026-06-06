import * as stylex from "@stylexjs/stylex";

export const mobile = "@media (max-width: 768px)";

export const variables = stylex.defineVars({
  containerPadding: "clamp(16px, 4vw, 64px)",
  containerMaxWidth: 1384,
  headerPadding: {
    default: "32px",
    [mobile]: "24px",
  },
});
