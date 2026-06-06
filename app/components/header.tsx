"use client";
import { colors } from "@/lib/colors.stylex";
import { radius } from "@/lib/spacing.stylex";
import { fontWeight } from "@/lib/typography.stylex";
import { variables } from "@/lib/variables.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useEffectEvent, useRef, useState } from "react";

function calculateNavIndicatorWidth(
  activeTab: "about" | "work",
  aboutMeRef: HTMLButtonElement | null,
  workRef: HTMLButtonElement | null,
) {
  switch (activeTab) {
    case "about":
      return aboutMeRef?.offsetWidth ?? 0;
    case "work":
      return workRef?.offsetWidth ?? 0;
    default:
      return 0;
  }
}

function calculateNavIndicatorTranslateX(
  activeTab: "about" | "work",
  aboutMeRef: HTMLButtonElement | null,
) {
  switch (activeTab) {
    case "about":
      return 0;
    case "work":
      return aboutMeRef?.offsetWidth ?? 0;
    default:
      return 0;
  }
}

const Header = () => {
  const [navIndicatorTranslateX, setNavIndicatorTranslateX] = useState(0);
  const [navIndicatorWidth, setNavIndicatorWidth] = useState(0);
  const [activeTab, setActiveTab] = useState<"about" | "work">("about");
  const aboutMeRef = useRef<HTMLButtonElement>(null);
  const workRef = useRef<HTMLButtonElement>(null);

  const _handleNavChange = (tab: "about" | "work") => {
    setActiveTab(tab);
    const width = calculateNavIndicatorWidth(
      tab,
      aboutMeRef.current,
      workRef.current,
    );
    setNavIndicatorWidth(width);
    const translateX = calculateNavIndicatorTranslateX(tab, aboutMeRef.current);
    setNavIndicatorTranslateX(translateX);
  };

  const navIndicatorWidthChange = useEffectEvent(
    (activeTab: "about" | "work") => {
      const width = calculateNavIndicatorWidth(
        activeTab,
        aboutMeRef.current,
        workRef.current,
      );
      setNavIndicatorWidth(width);
      const translateX = calculateNavIndicatorTranslateX(
        activeTab,
        aboutMeRef.current,
      );
      setNavIndicatorTranslateX(translateX);
    },
  );

  useEffect(() => {
    navIndicatorWidthChange(activeTab);
  }, []);

  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.navContainer)}>
        <button
          ref={aboutMeRef}
          {...stylex.props(
            styles.navButton,
            activeTab === "about" && styles.navButtonActive,
          )}
          onClick={() => _handleNavChange("about")}
        >
          <span>About me</span>
        </button>
        <button
          ref={workRef}
          {...stylex.props(
            styles.navButton,
            activeTab === "work" && styles.navButtonActive,
          )}
          onClick={() => _handleNavChange("work")}
        >
          <span>Work</span>
        </button>
        <div
          {...stylex.props(
            styles.navActiveIndicator(
              navIndicatorWidth,
              navIndicatorTranslateX,
            ),
          )}
        ></div>
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
    paddingLeft: " 12px",
    paddingRight: "12px",
    borderRadius: radius.lg,
    backgroundColor: "transparent",
    fontWeight: fontWeight.medium,
  },
  navButtonActive: {
    color: colors.white,
    transitionDuration: "300ms",
  },
  navActiveIndicator: (width: number, translateX: number) => ({
    zIndex: 0,
    position: "absolute",
    top: "50%",
    transform: `translate(${translateX}px,-50%)`,
    left: 0,
    height: "calc(100% - 8px)",
    marginLeft: "4px",
    backgroundColor: colors.surfaceDarker,
    borderRadius: radius.lg,
    transitionDuration: "300ms",
    width: width,
  }),
});
