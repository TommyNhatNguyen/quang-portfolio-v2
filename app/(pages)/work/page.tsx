"use client";
import Article from "@/app/components/article";
import { colors } from "@/lib/colors.stylex";
import { radius, spacing } from "@/lib/spacing.stylex";
import { fontSize, fontWeight } from "@/lib/typography.stylex";
import { breakpoints } from "@/lib/variables.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { useGallery } from "./gallery";

const filters = [
  {
    key: "all",
    label: "All work",
    count: 14,
  },
  {
    key: "web",
    label: "Product",
    count: 10,
  },
  {
    key: "design",
    label: "Creative",
    count: 4,
  },
];

const Page = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { openGallery } = useGallery();
  return (
    <section {...stylex.props(styles.section)}>
      {/* Header */}
      <div {...stylex.props(styles.header)}>
        <h2 {...stylex.props(styles.title)}>Selected work(s)</h2>
        <ul {...stylex.props(styles.filter)}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <li key={filter.key} {...stylex.props(styles.filterItem)}>
                <button
                  {...stylex.props(styles.filterItemButton(isActive))}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  <span
                    {...stylex.props(styles.filterItemButtonLabel(isActive))}
                  >
                    {filter.label}
                  </span>
                  <div
                    {...stylex.props(styles.filterItemButtonCount(isActive))}
                  >
                    {filter.count}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/* List */}
      <ul {...stylex.props(styles.list)}>
        {Array.from({ length: 10 }).map((_, index) => {
          const isDiabled = index == 1;
          return (
            <li key={index} {...stylex.props(styles.listItem)}>
              <Article
                disabled={isDiabled}
                isLink={false}
                onOpen={() =>
                  openGallery([
                    { src: "/avatar.jpg", width: 680, height: 540 },
                  ])
                }
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Page;

const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: fontSize["5xl"],
    color: colors.textMuted,
    textWrap: "nowrap",
    flexShrink: 0,
  },
  filter: {
    display: "flex",
    alignItems: "center",
    gap: spacing.md,
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
    width: {
      default: "auto",
      [breakpoints.mobile]: "100%",
    },
    maxWidth: "100%",
    minWidth: 0,
    flexShrink: 1,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  filterItem: {
    cursor: "pointer",
    flexShrink: 0,
  },
  filterItemButton: (active: boolean) => ({
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: radius.full,
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "12px",
    paddingRight: "8px",
    transitionDuration: "300ms",
    flexShrink: 0,
    backgroundColor: {
      default: active ? colors.overlayHeavy : colors.overlaySubtle,
    },
    opacity: {
      ":hover": 0.8,
    },
  }),
  filterItemButtonLabel: (active: boolean) => ({
    fontWeight: fontWeight.medium,
    textWrap: "nowrap",
    color: {
      default: active ? colors.white : colors.textPrimary,
    },
  }),
  filterItemButtonCount: (active: boolean) => ({
    fontSize: fontSize.xs,
    height: "24px",
    width: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: {
      default: active ? colors.white : colors.overlaySubtle,
    },
  }),
  header: {
    display: "flex",
    flexDirection: {
      default: "row",
      [breakpoints.mobile]: "column",
    },
    alignItems: {
      default: "center",
      [breakpoints.mobile]: "start",
    },
    justifyContent: "space-between",
    gap: {
      default: spacing.base,
      [breakpoints.mobile]: spacing.md,
    },
    width: "100%",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(442px, 1fr))",
    rowGap: spacing.xl,
    columnGap: spacing["2xl"],
    marginTop: "32px",
  },
  listItem: {
    width: "100%",
    height: "100%",
  },
});
