import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  // ── Backgrounds (light) ────────────────────────────────────────────────
  bgPrimary: '#ffffff',
  bgSecondary: '#fafafa',

  // ── Dark surfaces ──────────────────────────────────────────────────────
  surfaceDark: '#1f1f1f',
  surfaceDarkAlt: '#1c1c1c',
  surfaceDarker: '#171717',
  surfaceDeepest: '#0a0a0a',

  // ── Text — on light backgrounds ────────────────────────────────────────
  textPrimary: 'rgba(0, 0, 0, 0.9)',
  textSecondary: '#4d4d4d',
  textTertiary: '#8f8f8f',
  textMuted: 'rgba(0, 0, 0, 0.3)',
  textDisabled: 'rgba(0, 0, 0, 0.12)',

  // ── Text — on dark backgrounds ─────────────────────────────────────────
  textInverse: 'rgba(255, 255, 255, 0.9)',
  textInverseSecondary: '#9f9f9f',
  textInverseMuted: 'rgba(255, 255, 255, 0.08)',

  // ── Accents ────────────────────────────────────────────────────────────
  accentRed: '#d92d20',
  accentBlue: '#004cff',

  // ── Overlays ───────────────────────────────────────────────────────────
  overlayHeavy: 'rgba(0, 0, 0, 0.9)',
  overlayMedium: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlaySubtle: 'rgba(0, 0, 0, 0.04)',
  overlayIconLight: 'rgba(250, 250, 250, 1)',

  // ── Borders ────────────────────────────────────────────────────────────
  borderLight: 'rgba(0, 0, 0, 0.12)',
  borderDark: 'rgba(255, 255, 255, 0.08)',
  borderGlass: 'rgba(255, 255, 255, 0.002)',

  // ── Primitives ─────────────────────────────────────────────────────────
  white: '#ffffff',
  black: '#000000',
});
