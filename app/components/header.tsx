"use client";
import { colors } from "@/lib/colors.stylex";
import { radius } from "@/lib/spacing.stylex";
import { fontWeight } from "@/lib/typography.stylex";
import { variables } from "@/lib/variables.stylex";
import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LetterSwapForward } from "./animate-text";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";

type NavTab = (typeof NAV_TABS)[number]["key"];
const NAV_TABS = [
  { key: "about", label: "About me" },
  { key: "work", label: "Work" },
] as const;

const Header = () => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<NavTab>(
    pathname === "/" ? "about" : "work",
  );
  const [geometry, setGeometry] = useState({ width: 0, translateX: 0 });
  const [mounted, setMounted] = useState(false);
  const buttonRefs = useRef<Array<HTMLAnchorElement | null>>([]);

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
          <Link
            href={`/${key === "about" ? "" : "work"}`}
            key={key}
            ref={(el: HTMLAnchorElement | null) => {
              buttonRefs.current[i] = el;
            }}
            {...stylex.props(
              styles.navButton,
              activeTab === key && styles.navButtonActive,
            )}
            onClick={() => startTransition(() => setActiveTab(key))}
          >
            <LetterSwapForward label={label} staggerFrom="center" />
          </Link>
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

function getIndicatorGeometry(
  activeIndex: number,
  refs: Array<HTMLAnchorElement | null>,
): { width: number; translateX: number } {
  return {
    translateX: refs
      .slice(0, activeIndex)
      .reduce((sum, ref) => sum + (ref?.offsetWidth ?? 0), 0),
    width: refs[activeIndex]?.offsetWidth ?? 0,
  };
}

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
    marginRight: "auto",
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
