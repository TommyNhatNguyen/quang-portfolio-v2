import "@/app/styles/work-detail.css";
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
            <h1 {...stylex.props(styles.heroH1)}>
              Crafting Digital Experiences
              <br />
              That Matter
            </h1>
            <p {...stylex.props(styles.heroLead)}>
              In an age of infinite scroll and fleeting attention, creating
              meaningful digital experiences has become both an art and a
              science.
            </p>
          </div>
        </header>

        <div className="work-detail__content">
          <aside>
            <h2>Summary of the article</h2>
            <p>
              Successful digital experience design requires a blend of deep user
              research, simplification thinking, and a commitment to putting
              people at the center of every decision. When done right, digital
              products not only solve problems but also create emotional
              connections with users.
            </p>
          </aside>

          <p>
            Digital experience design is not just about creating a visually
            appealing interface. It is a journey of understanding users,
            anticipating their needs, and turning each interaction into a
            meaningful moment.
          </p>

          <h2>Understand users before designing</h2>
          <p>
            With a professional design process, I start each project by
            listening. Listening not only to what clients say but also to what
            they don&apos;t say - the hidden pain points, the unspoken
            expectations, and the subconscious behaviors when they interact with
            digital products.
          </p>

          <figure>
            <img
              src="/meta-image.jpg"
              alt="Illustration of the user research process"
            />
            <figcaption>Illustration of the user research process</figcaption>
          </figure>

          <blockquote>
            <p>
              &ldquo;The best design is the one you don&apos;t realize exists.
              It feels as natural as breathing, guiding you to the right place
              without you having to think about it.&rdquo;
            </p>
            <footer>— Minh Tran, UX Director</footer>
          </blockquote>

          <p>
            In today&apos;s digital world, users are no longer patient with
            disjointed experiences or complex interfaces. They expect
            seamlessness - from the moment they open the app to when they
            achieve their goals. Every second of waiting, every unnecessary
            click is an opportunity for them to leave.
          </p>

          <h2>Human-centered design principles</h2>
          <p>
            We believe that technology should serve people, not the other way
            around. This means sometimes rejecting &ldquo;cool&rdquo; features
            to keep the product simple and user-friendly. Less is more, but
            better.
          </p>

          <figure>
            <img
              src="/meta-image.jpg"
              alt="Illustration of the user research process"
            />
            <figcaption>Illustration of the user research process</figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
};

export default Page;

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
  heroLead: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.base,
    letterSpacing: letterSpacing.normal,
    color: colors.textPrimary,
    textAlign: "center",
    width: "100%",
    marginTop: spacing.lg,
    marginBottom: 0,
  },
});
