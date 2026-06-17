import { colors } from "@/lib/colors.stylex";
import { radius, spacing } from "@/lib/spacing.stylex";
import { fontSize, fontWeight } from "@/lib/typography.stylex";
import { breakpoints } from "@/lib/variables.stylex";
import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const STACK_ITEMS = [
  "figma",
  "framer",
  "jitter",
  "cursor",
  "claude",
  "after-effects",
];

const AboutPage = () => {
  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.container)}>
        {/* Profile */}
        <div {...stylex.props(styles.profile)}>
          <div {...stylex.props(styles.avatar)}>
            <Image
              src={"/avatar.jpg"}
              alt="avatar"
              width={100}
              height={100}
              preload={true}
              {...stylex.props(styles.avatarImage)}
            />
          </div>
          <div {...stylex.props(styles.profileInfo)}>
            <div {...stylex.props(styles.nameRow)}>
              <span {...stylex.props(styles.name)}>quang.laam (steve)</span>
              <div {...stylex.props(styles.badge)}>
                <Image
                  src={"/icons/verify-icon.svg"}
                  alt="badge"
                  width={20}
                  height={20}
                  preload={true}
                  {...stylex.props(styles.badgeImage)}
                />
              </div>
            </div>
            <p {...stylex.props(styles.title)}>Senior UX/UI designer</p>
          </div>
        </div>

        {/* Bio */}
        <p {...stylex.props(styles.bio)}>
          As a designer working at the intersection of Product thinking and UI
          Visual craft, I believe great design is where visual polish meets
          seamless user experience. I enjoy obsessing over the finer details —
          from typography and whitespace to color harmony — to transform complex
          workflows into interfaces that feel intuitive, delightful, and
          impactful.
        </p>

        {/* Links */}
        <div {...stylex.props(styles.linksRow)}>
          <div {...stylex.props(styles.socialLinks)}>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                {...stylex.props(styles.socialLink)}
              >
                <span {...stylex.props(styles.socialLinkLabel)}>{label}</span>
                <div {...stylex.props(styles.socialLinkIcon)}>
                  <Image
                    src={`/icons/arrow-up-right-icon.svg`}
                    alt={label}
                    width={16}
                    height={16}
                    preload={true}
                    {...stylex.props(styles.socialLinkIconImage)}
                  />
                </div>
              </Link>
            ))}
          </div>
          <div {...stylex.props(styles.actionLinks)}>
            <Link href="#" {...stylex.props(styles.actionPrimary)}>
              <div {...stylex.props(styles.icon)}>
                <Image
                  src={"/icons/download-icon.svg"}
                  alt="download"
                  width={16}
                  height={16}
                  preload={true}
                />
              </div>
              <span {...stylex.props(styles.actionPrimaryLabel)}>
                Download CV
              </span>
            </Link>
            <Link
              href="mailto:hello@quang.laam.com"
              {...stylex.props(styles.actionSecondary)}
            >
              <div {...stylex.props(styles.icon)}>
                <Image
                  src={"/icons/email-icon.svg"}
                  alt="copy"
                  width={16}
                  height={16}
                  preload={true}
                />
              </div>
              <span {...stylex.props(styles.actionSecondaryLabel)}>
                Copy email
              </span>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr {...stylex.props(styles.divider)} />

        {/* Stack */}
        <section {...stylex.props(styles.stack)}>
          <span {...stylex.props(styles.stackLabel)}>STACK</span>
          <div {...stylex.props(styles.stackIcons)}>
            {STACK_ITEMS.map((name) => (
              <div key={name} {...stylex.props(styles.stackIcon)}>
                <Image
                  src={`/${name}-logo.svg`}
                  alt={name}
                  width={40}
                  height={40}
                  preload={true}
                  {...stylex.props(styles.stackIconImage)}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

const styles = stylex.create({
  page: {
    height: "100vh",
    width: "100%",
    paddingTop: "84px",
  },
  container: {
    maxWidth: "600px",
    margin: "auto",
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    gap: spacing.base,
  },
  avatar: {
    width: "56px",
    height: "56px",
    borderRadius: radius.md,
    backgroundColor: colors.bgSecondary,
    flexShrink: 0,
    overflow: "hidden",
  },
  avatarImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    objectPosition: "top",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: spacing.base,
    height: "100%",
  },
  nameRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  name: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
  },
  badge: {
    width: "18px",
    height: "18px",
    flexShrink: 0,
  },
  badgeImage: {
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
  },
  bio: {
    fontSize: fontSize.base,
    marginTop: "16px",
  },
  linksRow: {
    display: {
      default: "flex",
      [breakpoints.mobile]: "grid",
    },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: {
      default: spacing.base,
      [breakpoints.mobile]: spacing["3xl"],
    },
    marginTop: "40px",
    gridTemplateColumns: {
      default: "none",
      [breakpoints.mobile]: "1fr",
    },
    gridTemplateRows: {
      default: "none",
      [breakpoints.mobile]: "repeat(2, 1fr)",
    },
  },
  socialLinks: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: "8px",
    paddingRight: "8px",
    borderRadius: radius.full,
    backgroundColor: colors.overlaySubtle,
  },
  socialLinkLabel: {
    fontSize: fontSize.md,
  },
  socialLinkIcon: {
    width: "8px",
    height: "8px",
    flexShrink: 0,
    color: colors.black,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialLinkIconImage: {
    height: "100%",
    width: "100%",
  },
  actionLinks: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flexWrap: "wrap",
  },
  actionPrimary: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: "8px",
    paddingRight: "12px",
    paddingTop: "8px",
    paddingBottom: "8px",
    borderRadius: radius.full,
    backgroundColor: colors.surfaceDarker,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textInverse,
  },
  actionPrimaryLabel: {
    textWrap: "nowrap",
  },
  actionSecondary: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    gap: spacing.sm,
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "8px",
    paddingRight: "12px",
    borderRadius: radius.full,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  actionSecondaryLabel: {
    textWrap: "nowrap",
  },
  icon: {
    width: "16px",
    height: "16px",
    borderRadius: radius.xs,
    backgroundColor: colors.textMuted,
    flexShrink: 0,
  },
  divider: {
    border: "none",
    borderTop: `1px solid ${colors.borderLight}`,
    marginTop: "24px",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.base,
    marginTop: "24px",
  },
  stackLabel: {
    fontSize: fontSize.lg,
  },
  stackIcons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xl,
  },
  stackIcon: {
    width: "40px",
    height: "40px",
    borderRadius: radius.lg,
    backgroundColor: colors.overlayIconLight,
    flexShrink: 0,
  },
  stackIconImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
    objectPosition: "center",
  },
});
