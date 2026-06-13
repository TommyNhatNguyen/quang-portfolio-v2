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

const Page = () => {
  return (
    <article {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.container)}>
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

          <div
            data-work-hero
            {...stylex.props(styles.heroContent, stylex.defaultMarker())}
          >
            <h1 {...stylex.props(contentStyles.h1)}>
              Crafting Digital Experiences
              <br />
              That Matter
            </h1>
            <p {...stylex.props(contentStyles.p)}>
              In an age of infinite scroll and fleeting attention, creating
              meaningful digital experiences has become both an art and a
              science.
            </p>
          </div>
        </header>

        <div {...stylex.props(styles.richText)}>
          <aside
            data-work-aside
            {...stylex.props(contentStyles.aside, stylex.defaultMarker())}
          >
            <h2 {...stylex.props(contentStyles.h2)}>Summary of the article</h2>
            <p {...stylex.props(contentStyles.p)}>
              Successful digital experience design requires a blend of deep user
              research, simplification thinking, and a commitment to putting
              people at the center of every decision. When done right, digital
              products not only solve problems but also create emotional
              connections with users.
            </p>
          </aside>

          <p {...stylex.props(contentStyles.p)}>
            Digital experience design is not just about creating a visually
            appealing interface. It is a journey of understanding users,
            anticipating their needs, and turning each interaction into a
            meaningful moment.
          </p>

          <h2 {...stylex.props(contentStyles.h2)}>
            Understand users before designing
          </h2>
          <p {...stylex.props(contentStyles.p)}>
            With a professional design process, I start each project by
            listening. Listening not only to what clients say but also to what
            they don&apos;t say - the hidden pain points, the unspoken
            expectations, and the subconscious behaviors when they interact with
            digital products.
          </p>

          <figure {...stylex.props(contentStyles.figure)}>
            <img
              {...stylex.props(contentStyles.img)}
              src="/meta-image.jpg"
              alt="Illustration of the user research process"
            />
            <figcaption {...stylex.props(contentStyles.figcaption)}>
              Illustration of the user research process
            </figcaption>
          </figure>

          <blockquote
            data-work-blockquote
            {...stylex.props(contentStyles.blockquote, stylex.defaultMarker())}
          >
            <p {...stylex.props(contentStyles.p)}>
              &ldquo;The best design is the one you don&apos;t realize exists.
              It feels as natural as breathing, guiding you to the right place
              without you having to think about it.&rdquo;
            </p>
            <footer {...stylex.props(contentStyles.footer)}>
              — Minh Tran, UX Director
            </footer>
          </blockquote>

          <p {...stylex.props(contentStyles.p)}>
            In today&apos;s digital world, users are no longer patient with
            disjointed experiences or complex interfaces. They expect
            seamlessness - from the moment they open the app to when they
            achieve their goals. Every second of waiting, every unnecessary
            click is an opportunity for them to leave.
          </p>

          <h2 {...stylex.props(contentStyles.h2)}>
            Human-centered design principles
          </h2>
          <p {...stylex.props(contentStyles.p)}>
            We believe that technology should serve people, not the other way
            around. This means sometimes rejecting &ldquo;cool&rdquo; features
            to keep the product simple and user-friendly. Less is more, but
            better.
          </p>

          <figure {...stylex.props(contentStyles.figure)}>
            <img
              {...stylex.props(contentStyles.img)}
              src="/meta-image.jpg"
              alt="Illustration of the user research process"
            />
            <figcaption {...stylex.props(contentStyles.figcaption)}>
              Illustration of the user research process
            </figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
};

export default Page;

/** Tag-based styles for dynamic rich text — apply via stylex.props(contentStyles[tag]) */
export const contentStyles = stylex.create({
  h1: {
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
  h2: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.xl,
    letterSpacing: letterSpacing.normal,
    color: colors.textPrimary,
    width: "100%",
    margin: 0,
    marginBottom: {
      default: spacing.lg,
      [stylex.when.ancestor("[data-work-aside]")]: 0,
    },
  },
  h3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    color: colors.textPrimary,
    width: "100%",
    margin: 0,
    marginBottom: spacing.lg,
  },
  p: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.base,
    letterSpacing: letterSpacing.normal,
    color: {
      default: colors.textPrimary,
      [stylex.when.ancestor("[data-work-blockquote]")]: colors.textSecondary,
    },
    width: "100%",
    margin: 0,
    textAlign: {
      default: "left",
      [stylex.when.ancestor("[data-work-hero]")]: "center",
    },
    marginTop: {
      default: 0,
      [stylex.when.ancestor("[data-work-hero]")]: spacing.lg,
    },
    marginBottom: {
      default: spacing["2xl"],
      [stylex.when.ancestor("[data-work-hero]")]: 0,
      [stylex.when.ancestor("[data-work-aside]")]: 0,
      [stylex.when.ancestor("[data-work-blockquote]")]: 0,
    },
    paddingTop: {
      default: 0,
      [stylex.when.ancestor("[data-work-blockquote]")]: spacing.sm,
    },
    paddingBottom: {
      default: 0,
      [stylex.when.ancestor("[data-work-blockquote]")]: spacing.sm,
    },
  },
  aside: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: spacing.lg,
    width: "100%",
    padding: spacing["2xl"],
    borderRadius: radius.xs,
    backgroundColor: colors.bgSecondary,
    marginBottom: spacing["2xl"],
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: spacing.base,
    width: "100%",
    margin: 0,
    marginTop: spacing["2xl"],
    marginBottom: spacing["2xl"],
    borderRadius: radius.lg,
    // backgroundColor: colors.surfaceDark,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    aspectRatio: "670 / 480.23",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: radius.lg,
    display: "block",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: colors.surfaceDark,
    boxShadow: `0px 0px 0px 1px ${colors.borderLight}, 0px 6px 12px 0px ${colors.overlaySubtle}`,
  },
  figcaption: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.base,
    letterSpacing: letterSpacing.normal,
    color: colors.textPrimary,
    width: "100%",
    margin: 0,
  },
  blockquote: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
    margin: 0,
    marginTop: spacing["2xl"],
    marginBottom: spacing["2xl"],
    paddingLeft: spacing.xl,
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
    borderLeftColor: colors.borderLight,
  },
  footer: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    color: colors.textPrimary,
    width: "100%",
    margin: 0,
    marginTop: spacing.base,
  },
  a: {
    color: colors.textPrimary,
    textDecoration: {
      default: "underline",
      ":hover": "none",
    },
  },
  ul: {
    width: "100%",
    margin: 0,
    marginBottom: spacing["2xl"],
    paddingLeft: spacing.xl,
  },
  ol: {
    width: "100%",
    margin: 0,
    marginBottom: spacing["2xl"],
    paddingLeft: spacing.xl,
  },
  li: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.base,
    letterSpacing: letterSpacing.normal,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
});

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.bgPrimary,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1232px",
    paddingLeft: {
      default: spacing["4xl"],
      [breakpoints.mobile]: spacing.xl,
    },
    paddingRight: {
      default: spacing["4xl"],
      [breakpoints.mobile]: spacing.xl,
    },
    paddingBottom: spacing["2xl"],
    borderRadius: radius.xl,
    backgroundColor: colors.bgPrimary,
  },
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
  richText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
    maxWidth: "652px",
  },
});
