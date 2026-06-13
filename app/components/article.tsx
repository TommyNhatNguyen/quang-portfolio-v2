"use client";
import { colors } from "@/lib/colors.stylex";
import { fontSize, fontWeight } from "@/lib/typography.stylex";
import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import Link from "next/link";

type Props = {
  disabled?: boolean;
  isLink?: boolean;
  href?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  title?: string;
  description?: string;
  onOpen?: () => void;
};

const Article = ({
  disabled = false,
  isLink = true,
  href = "#",
  thumbnailSrc = "/avatar.jpg",
  thumbnailAlt = "work",
  title = "SkillPod",
  description = "Marketplace for Trusted AI Skills",
  onOpen,
}: Props) => {
  return (
    <article
      {...stylex.props(styles.article, disabled && styles.articleDisabled)}
    >
      {/* Thumbnail */}
      <div
        {...stylex.props(
          styles.articleThumbnailContainer,
          stylex.defaultMarker(),
        )}
      >
        {isLink ? (
          <Link
            target="_blank"
            href={href}
            {...stylex.props(styles.articleThumbnail)}
          >
            <Image
              {...stylex.props(styles.articleThumbnailImage)}
              src={thumbnailSrc}
              alt={thumbnailAlt}
              width={680}
              height={540}
            />
          </Link>
        ) : (
          <div
            {...stylex.props(
              styles.articleThumbnail,
              styles.articleThumbnailClickable,
            )}
            onClick={onOpen}
          >
            <Image
              {...stylex.props(styles.articleThumbnailImage)}
              src={thumbnailSrc}
              alt={thumbnailAlt}
              width={680}
              height={540}
            />
          </div>
        )}
        <div {...stylex.props(styles.articleThumbnailShadow)}></div>
      </div>
      {/* Title */}
      <div {...stylex.props(styles.articleTitleContainer)}>
        {isLink ? (
          <Link href={href} {...stylex.props(styles.articleTitle)}>
            {title}
          </Link>
        ) : (
          <span {...stylex.props(styles.articleTitle)}>{title}</span>
        )}
        <p {...stylex.props(styles.articleDescription)}>{description}</p>
      </div>
    </article>
  );
};

export default Article;

const styles = stylex.create({
  article: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "10px",
  },
  articleDisabled: {
    opacity: 0.2,
    pointerEvents: "none",
    transitionDuration: "300ms",
  },
  articleThumbnailContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: "12px",
    aspectRatio: "680 / 490",
    overflow: "hidden",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: colors.surfaceDark,
    boxShadow: `0px 0px 0px 1px ${colors.borderLight}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgPrimary,
  },
  articleThumbnail: {
    display: "block",
    borderRadius: "12px",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    maxHeight: "490px",
  },
  articleThumbnailClickable: {
    cursor: "pointer",
  },
  articleThumbnailShadow: {
    position: "absolute",
    backgroundColor: colors.overlaySubtle,
    width: "calc(100% + 12px)",
    height: "calc(100% + 12px)",
    borderRadius: "12px",
    boxShadow: `0px 6px 12px 0px ${colors.overlaySubtle}`,
    pointerEvents: "none",
    zIndex: -1,
  },
  articleThumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "center",
    borderRadius: "12px",
    transitionProperty: "transform",
    transitionDuration: "300ms",
    transform: {
      default: "scale(1)",
      [stylex.when.ancestor(":hover")]: "scale(1.05)",
    },
  },
  articleTitleContainer: {},
  articleTitle: {
    fontWeight: fontWeight.medium,
  },
  articleDescription: {
    fontSize: fontSize.md,
    color: colors.textTertiary,
  },
});
