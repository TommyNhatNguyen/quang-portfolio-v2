"use client";
import "@/app/styles/work-detail.css";
import RichTextRenderer from "@/app/components/blocks-renderer";
import { Article } from "@/app/interface/article.interface";
import { articlesService } from "@/app/services/articles-service";
import { colors } from "@/lib/colors.stylex";
import { radius, spacing } from "@/lib/spacing.stylex";
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "@/lib/typography.stylex";
import { breakpoints } from "@/lib/variables.stylex";
import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    articlesService.getArticleBySlug(slug).then(({ data }) => {
      setArticle(data[0] ?? null);
    });
  }, [slug]);

  if (!article) return null;

  return (
    <article className="work-detail">
      <div className="work-detail__container">
        <header {...stylex.props(styles.hero)}>
          <Link href="/work" {...stylex.props(styles.backButton)}>
            <button {...stylex.props(styles.backButtonIcon)}>
              <Image
                src="/icons/arrow-back-icon.svg"
                alt=""
                width={32}
                height={32}
              />
            </button>
            <span {...stylex.props(styles.backButtonLabel)}>Back to Work</span>
          </Link>

          <div {...stylex.props(styles.heroContent)}>
            <h1 {...stylex.props(styles.heroH1)}>{article.title}</h1>
          </div>
        </header>

        <div className="work-detail__content">
          {article.short_description && (
            <aside>
              <h2>Summary</h2>
              <p>{article.short_description}</p>
            </aside>
          )}
          <RichTextRenderer content={article.content} />
        </div>
      </div>
    </article>
  );
}

const styles = stylex.create({
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
    maxWidth: "652px",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    minWidth: "64px",
    minHeight: "64px",
    maxHeight: "64px",
    padding: spacing.base,
    borderRadius: radius.lg,
    backgroundColor: "transparent",
    textDecoration: "none",
    flexShrink: 0,
    opacity: {
      ":hover": 0.8,
    },
    transitionDuration: "300ms",
  },
  backButtonIcon: {
    width: "32px",
    height: "32px",
    flexShrink: 0,
    color: colors.textPrimary,
  },
  backButtonLabel: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    color: colors.textPrimary,
    whiteSpace: "nowrap",
    marginBottom: "3px",
  },
  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingTop: {
      default: spacing["4xl"],
      [breakpoints.mobile]: spacing["2xl"],
    },
    paddingBottom: {
      default: spacing["4xl"],
      [breakpoints.mobile]: spacing["2xl"],
    },
  },
  heroH1: {
    fontSize: {
      default: fontSize["4xl"],
      [breakpoints.mobile]: fontSize["3xl"],
    },
    fontWeight: fontWeight.regular,
    lineHeight: {
      default: lineHeight["3xl"],
      [breakpoints.mobile]: lineHeight["2xl"],
    },
    letterSpacing: letterSpacing.tighter,
    color: colors.textPrimary,
    textAlign: "center",
    width: "100%",
    margin: 0,
  },
});
