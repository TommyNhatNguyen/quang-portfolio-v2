import * as stylex from "@stylexjs/stylex";

export const mobile = "@media (max-width: 768px)";

export const variables = stylex.defineVars({
  padding: {
    default: "clamp(16px, 4vw, 64px)",
  },
});
