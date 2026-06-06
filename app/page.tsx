import * as stylex from "@stylexjs/stylex";
import { colors } from "../lib/colors.stylex";
import {
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  fontFamily,
} from "../lib/typography.stylex";
import { spacing, radius } from "../lib/spacing.stylex";

const styles = stylex.create({
  page: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    minHeight: "100dvh",
    fontFamily: fontFamily.primary
  },

  // ── Main scroll area ────────────────────────────────────────────────────
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: spacing["4xl"],
    paddingBottom: "120px",
  },

  // ── Section header ──────────────────────────────────────────────────────
  header: {
    paddingLeft: spacing.base,
    paddingRight: spacing.base,
    paddingBottom: spacing.xl,
  },
  heading: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight["2xl"],
    letterSpacing: letterSpacing.tight,
    color: colors.textMuted,
  },

  // ── Work card list ──────────────────────────────────────────────────────
  workList: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.base,
    paddingLeft: spacing.base,
    paddingRight: spacing.base,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
    cursor: "pointer",
  },
  cardImage: {
    width: "100%",
    aspectRatio: "343 / 249",
    backgroundColor: colors.surfaceDark,
    borderRadius: radius.md,
    position: "relative",
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.base,
    color: colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.sm,
    color: colors.textMuted,
  },

  // ── Floating bottom nav ─────────────────────────────────────────────────
  nav: {
    position: "fixed",
    bottom: spacing.xl,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.bgSecondary,
    borderRadius: radius.full,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    paddingLeft: spacing.xs,
    paddingRight: spacing.xs,
  },
  navBtnGhost: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    paddingLeft: spacing.base,
    paddingRight: spacing.base,
    borderRadius: radius.full,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.base,
    color: colors.textPrimary,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.overlaySubtle,
    },
    cursor: "pointer",
    borderWidth: 0,
  },
  navBtnPrimary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    paddingLeft: spacing.base,
    paddingRight: spacing.base,
    borderRadius: radius.full,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.base,
    color: colors.textInverse,
    backgroundColor: {
      default: colors.surfaceDarker,
      ":hover": colors.surfaceDark,
    },
    cursor: "pointer",
    borderWidth: 0,
  },
});


const WORK_ITEMS = [
  { title: "SkillPod", subtitle: "Marketplace for Trusted AI Skills" },
  { title: "Project 2", subtitle: "Product Design" },
  { title: "Project 3", subtitle: "UX / UI Design" },
];

export default function Home() {
  return (
    <div {...stylex.props(styles.page)}>
      <main {...stylex.props(styles.main)}>
        <header {...stylex.props(styles.header)}>
          <h2 {...stylex.props(styles.heading)}>Selected work(s)</h2>
        </header>

        <div {...stylex.props(styles.workList)}>
          {WORK_ITEMS.map((item) => (
            <div key={item.title} {...stylex.props(styles.card)}>
              <div {...stylex.props(styles.cardImage)} />
              <p {...stylex.props(styles.cardTitle)}>{item.title}</p>
              <p {...stylex.props(styles.cardSubtitle)}>{item.subtitle}</p>
            </div>
          ))}
        </div>
      </main>

      <nav {...stylex.props(styles.nav)}>
        <button {...stylex.props(styles.navBtnGhost)}>Work</button>
        <button {...stylex.props(styles.navBtnPrimary)}>Contact</button>
      </nav>
    </div>
  );
}
