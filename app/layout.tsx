import { colors } from "@/lib/colors.stylex";
import { initGSAP } from "@/lib/gsap";
import * as stylex from "@stylexjs/stylex";
import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { fontFamily, fontSize, fontWeight } from "../lib/typography.stylex";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "quang.laam — Portfolio",
  description: "Product designer & developer portfolio",
};

initGSAP();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const htmlProps = stylex.props(styles.html);
  return (
    <html
      lang="en"
      {...htmlProps}
      className={`${interTight.variable} ${inter.variable}${htmlProps.className ? ` ${htmlProps.className}` : ""}`}
    >
      <body {...stylex.props(styles.body)}>{children}</body>
    </html>
  );
}

const styles = stylex.create({
  html: {
    fontSize: "62.5%",
    fontFamily: fontFamily.primary,
    lineHeight: "normal",
    letterSpacing: "normal",
    height: "100%",
    width: "100%",
    margin: "auto",
  },
  body: {
    height: "100%",
    width: "100%",
    margin: "auto",
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    color: colors.black,
    backgroundColor: colors.white,
  },
});
