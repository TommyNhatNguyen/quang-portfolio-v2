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
      {isLink ? (
        <Link href={href} {...stylex.props(styles.thumbnailWrapper)}>
          <Image
            {...stylex.props(styles.thumbnailImage)}
            src={thumbnailSrc}
            alt={thumbnailAlt}
            width={670}
            height={480}
          />
        </Link>
      ) : (
        <div
          {...stylex.props(styles.thumbnailWrapper, styles.thumbnailClickable)}
          onClick={onOpen}
        >
          <Image
            {...stylex.props(styles.thumbnailImage)}
            src={thumbnailSrc}
            alt={thumbnailAlt}
            width={670}
            height={480}
          />
        </div>
      )}
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
    transitionDuration: "300ms",
  },
  articleDisabled: {
    opacity: 0.2,
    pointerEvents: "none",
  },
  thumbnailWrapper: {
    width: "100%",
    aspectRatio: "670 / 480.23",
    borderRadius: "12px",
    display: "block",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "#1f1f1f",
    boxShadow:
      "0px 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 6px 12px 0px rgba(0, 0, 0, 0.04)",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    overflow: "hidden",
    position: "relative",
  },
  thumbnailClickable: {
    cursor: "pointer",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
    objectPosition: "center",
    display: "block",
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
