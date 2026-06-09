"use client";
import { colors } from "@/lib/colors.stylex";
import { radius, spacing } from "@/lib/spacing.stylex";
import { fontSize, fontWeight } from "@/lib/typography.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
type Props = {};

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

const Page = (props: Props) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
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
        <li {...stylex.props(styles.listItem)}>
          <article {...stylex.props(styles.article)}></article>
        </li>
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
  },
  filter: {
    overflowX: "auto",
    paddingBottom: spacing.base,
    scrollbarWidth: "none",
    display: "flex",
    alignItems: "center",
    gap: spacing.md,
  },
  filterItem: {
    cursor: "pointer",
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
    backgroundColor: {
      default: active ? colors.overlayHeavy : colors.overlaySubtle,
    },
    opacity: {
      ":hover": 0.8,
    },
  }),
  filterItemButtonLabel: (active: boolean) => ({
    fontWeight: fontWeight.medium,
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
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.base,
  },
  list: {},
  listItem: {},
  article: {},
});
