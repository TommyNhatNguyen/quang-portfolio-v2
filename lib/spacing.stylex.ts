import * as stylex from '@stylexjs/stylex';

// 4-based spacing scale drawn from Figma layout values
export const spacing = stylex.defineConsts({
  none: '0px',
  micro: '2px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
  '5xl': '64px',
});

export const radius = stylex.defineConsts({
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '200px',
});
