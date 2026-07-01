"use client";
import { LetterSwapForward } from "@/app/components/animate-text";
import { Article as ArticleType } from "@/app/interface/article.interface";
import { Category } from "@/app/interface/category.interface";
import { articlesService } from "@/app/services/articles-service";
import { getImage } from "@/app/utils/getImage";
import { colors } from "@/lib/colors.stylex";
import { radius, spacing } from "@/lib/spacing.stylex";
import { fontSize, fontWeight } from "@/lib/typography.stylex";
import { breakpoints } from "@/lib/variables.stylex";
import * as stylex from "@stylexjs/stylex";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Article from "./article";
import { useGallery } from "./gallery";

const PAGE_SIZE = 12;

// LetterSwapForward splits labels into one flex box per character, which
// breaks CSS text-transform's word-boundary detection (every letter reads
// as its own word). Case the string here instead of via text-transform.
const toTitleCase = (value: string) =>
  value.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1));

const pulse = stylex.keyframes({
  "0%, 100%": { opacity: 0.2, transform: "scale(0.8)" },
  "50%": { opacity: 1, transform: "scale(1)" },
});

type FetchParams = { filter: string; page: number };

type Props = {
  initialCategories: Category[];
  initialArticles: ArticleType[];
  initialFilterCounts: Record<string, number>;
  initialHasMore: boolean;
};

const WorkGrid = ({
  initialCategories,
  initialArticles,
  initialFilterCounts,
  initialHasMore,
}: Props) => {
  const [articles, setArticles] = useState<ArticleType[]>(initialArticles);
  const [fetchParams, setFetchParams] = useState<FetchParams>({
    filter: "all",
    page: 1,
  });
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [filterCounts, setFilterCounts] =
    useState<Record<string, number>>(initialFilterCounts);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);
  const isInitialFetch = useRef(true);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  // Fetch articles whenever filter or page changes. The server already
  // fetched page 1 of the "all" filter, so skip the first run.
  useEffect(() => {
    if (isInitialFetch.current) {
      isInitialFetch.current = false;
      return;
    }

    let cancelled = false;

    const doFetch = async () => {
      setLoading(true);
      try {
        const { filter, page } = fetchParams;
        const { data, meta } = await articlesService.getArticles({
          pagination: { page, pageSize: PAGE_SIZE },
          ...(filter !== "all" && {
            filters: { categories: { slug: { $eq: filter } } },
          }),
        });

        if (!cancelled) {
          setArticles((prev) => (page === 1 ? data : [...prev, ...data]));
          setFilterCounts((prev) => ({
            ...prev,
            [filter]: meta.pagination?.total ?? 0,
          }));
          setHasMore(page < (meta.pagination?.pageCount ?? 1));
        }
      } catch {
        // noop
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    doFetch();
    return () => {
      cancelled = true;
    };
  }, [fetchParams]);

  const loadNextPage = useCallback(() => {
    setFetchParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, []);

  // Infinite scroll sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMoreRef.current &&
          !loadingRef.current
        ) {
          loadNextPage();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadNextPage]);

  const handleFilterChange = useCallback(
    (slug: string) => {
      if (slug === fetchParams.filter) return;
      setArticles([]);
      setHasMore(true);
      setFetchParams({ filter: slug, page: 1 });
    },
    [fetchParams.filter],
  );

  // Articles with "creative" category open in lightbox gallery
  const galleryArticles = useMemo(
    () =>
      articles.filter(
        (a) => a.thumbnail && a.categories.some((c) => c.slug === "creative"),
      ),
    [articles],
  );

  const galleryImages = useMemo(
    () =>
      galleryArticles.map((a) => ({
        src: getImage(a.thumbnail.url),
        width: a.thumbnail.width,
        height: a.thumbnail.height,
        alt: a.title,
      })),
    [galleryArticles],
  );

  const { openGallery } = useGallery(galleryImages);

  const allFilters = useMemo(
    () => [
      { slug: "all", label: "All work" },
      ...initialCategories.map((c) => ({
        slug: c.slug,
        label: toTitleCase(c.category_name),
      })),
    ],
    [initialCategories],
  );

  return (
    <section {...stylex.props(styles.section)}>
      {/* Header */}
      <div {...stylex.props(styles.header)}>
        <h2 {...stylex.props(styles.title)}>Selected work(s)</h2>
        <ul {...stylex.props(styles.filterList)}>
          {allFilters.map((filter) => {
            const isActive = fetchParams.filter === filter.slug;
            const count = filterCounts[filter.slug];
            return (
              <li key={filter.slug} {...stylex.props(styles.filterItem)}>
                <button
                  {...stylex.props(styles.filterItemButton(isActive))}
                  onClick={() => handleFilterChange(filter.slug)}
                >
                  <LetterSwapForward
                    {...stylex.props(styles.filterItemButtonLabel(isActive))}
                    label={filter.label.toUpperCase()}
                    staggerFrom="center"
                  />
                  {/* {count !== undefined && (
                  )} */}
                  <div
                    {...stylex.props(styles.filterItemButtonCount(isActive))}
                  >
                    {count}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Article grid */}
      <ul {...stylex.props(styles.list)}>
        {articles.map((article) => {
          const isCreative = article.categories.some(
            (c) => c.slug === "creative",
          );
          const galleryIndex = isCreative
            ? galleryArticles.findIndex((a) => a.id === article.id)
            : -1;
          const href = article.is_link
            ? (article.link ?? "#")
            : `/work/${article.slug}`;
          const thumbnailSrc = article.thumbnail
            ? getImage(article.thumbnail.url)
            : undefined;

          return (
            <li key={article.id} {...stylex.props(styles.listItem)}>
              <Article
                // isLink={!isCreative}
                // href={isCreative ? undefined : href}
                isLink={true}
                href={href}
                thumbnailSrc={thumbnailSrc}
                thumbnailAlt={article.title}
                title={article.title}
                description={article.short_description ?? ""}
                // onOpen={isCreative ? () => openGallery(galleryIndex) : undefined}
              />
            </li>
          );
        })}
      </ul>

      {/* Infinite scroll sentinel + loader */}
      <div ref={sentinelRef} {...stylex.props(styles.sentinel)}>
        {loading && (
          <div {...stylex.props(styles.loaderDots)}>
            <span {...stylex.props(styles.dot, styles.dot0)} />
            <span {...stylex.props(styles.dot, styles.dot1)} />
            <span {...stylex.props(styles.dot, styles.dot2)} />
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkGrid;

const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: spacing["4xl"],
  },
  title: {
    fontSize: {
      default: fontSize["5xl"],
      [breakpoints.mobile]: fontSize["3xl"],
    },
    color: colors.textMuted,
    textWrap: "nowrap",
    flexShrink: 0,
  },
  filterList: {
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
    color: active ? colors.white : colors.textPrimary,
  }),
  filterItemButtonCount: (active: boolean) => ({
    fontSize: fontSize.xs,
    height: "24px",
    minWidth: "24px",
    paddingLeft: "4px",
    paddingRight: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    aspectRatio: "1/1",
    borderRadius: radius.full,
    color: colors.textPrimary,
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
    gridTemplateColumns: {
      default: "repeat(auto-fill, minmax(442px, 1fr))",
      [breakpoints.mobile]: "1fr",
    },
    rowGap: spacing.xl,
    columnGap: spacing["2xl"],
    marginTop: "32px",
    listStyle: "none",
    paddingLeft: 0,
  },
  listItem: {
    width: "100%",
    height: "100%",
  },
  sentinel: {
    height: "1px",
    marginTop: spacing["2xl"],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderDots: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: radius.full,
    backgroundColor: colors.textMuted,
    animationName: pulse,
    animationDuration: "1.2s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  dot0: { animationDelay: "0s" },
  dot1: { animationDelay: "0.2s" },
  dot2: { animationDelay: "0.4s" },
});
