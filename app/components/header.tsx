"use client";
import { colors } from "@/lib/colors.stylex";
import { radius } from "@/lib/spacing.stylex";
import { fontWeight } from "@/lib/typography.stylex";
import { variables } from "@/lib/variables.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const NAV_TABS = [
  { key: "about", label: "About me" },
  { key: "work", label: "Work" },
] as const;

type NavTab = (typeof NAV_TABS)[number]["key"];

function getIndicatorGeometry(
  activeIndex: number,
  refs: Array<HTMLButtonElement | null>,
): { width: number; translateX: number } {
  return {
    translateX: refs
      .slice(0, activeIndex)
      .reduce((sum, ref) => sum + (ref?.offsetWidth ?? 0), 0),
    width: refs[activeIndex]?.offsetWidth ?? 0,
  };
}

const Header = () => {
  const [activeTab, setActiveTab] = useState<NavTab>("about");
  const [geometry, setGeometry] = useState({ width: 0, translateX: 0 });
  const [mounted, setMounted] = useState(false);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useLayoutEffect(() => {
    const activeIndex = NAV_TABS.findIndex((t) => t.key === activeTab);
    setGeometry(getIndicatorGeometry(activeIndex, buttonRefs.current));
  }, [activeTab]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.navContainer)}>
        {NAV_TABS.map(({ key, label }, i) => (
          <button
            key={key}
            ref={(el) => {
              buttonRefs.current[i] = el;
            }}
            {...stylex.props(
              styles.navButton,
              activeTab === key && styles.navButtonActive,
            )}
            onClick={() => setActiveTab(key)}
          >
            <span>{label}</span>
          </button>
        ))}
        <div
          {...stylex.props(
            styles.navActiveIndicator(
              geometry.width,
              geometry.translateX,
              mounted,
            ),
          )}
        />
      </div>
    </header>
  );
};

export default Header;

const styles = stylex.create({
  header: {
    width: "100%",
    paddingTop: variables.headerPadding,
    paddingBottom: variables.headerPadding,
  },
  navContainer: {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    marginLeft: "auto",
    padding: "4px",
    backgroundColor: colors.bgSecondary,
    borderRadius: radius.lg,
    position: "relative",
  },
  navButton: {
    zIndex: 1,
    position: "relative",
    minHeight: "40px",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "12px",
    paddingRight: "12px",
    borderRadius: radius.lg,
    backgroundColor: "transparent",
    fontWeight: fontWeight.medium,
  },
  navButtonActive: {
    color: colors.white,
    transitionDuration: "300ms",
  },
  navActiveIndicator: (
    width: number,
    translateX: number,
    mounted: boolean,
  ) => ({
    zIndex: 0,
    position: "absolute",
    top: "50%",
    left: 0,
    height: "calc(100% - 8px)",
    marginLeft: "4px",
    backgroundColor: colors.surfaceDarker,
    borderRadius: radius.lg,
    width: width,
    transform: `translate(${translateX}px, -50%)`,
    opacity: mounted ? 1 : 0,
    transitionProperty: mounted ? "width, transform, opacity" : "opacity",
    transitionDuration: "300ms",
  }),
});
