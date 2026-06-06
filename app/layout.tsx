import * as stylex from "@stylexjs/stylex";
import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { colors } from "../lib/colors.stylex";
import { fontFamily } from "../lib/typography.stylex";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const styles = stylex.create({
  body: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.bgPrimary,
    color: colors.textPrimary,
    fontFamily: fontFamily.primary,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    overflowX: "hidden",
  },
});

export const metadata: Metadata = {
  title: "quang.laam — Portfolio",
  description: "Product designer & developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable}`}>
      <body {...stylex.props(styles.body)}>{children}</body>
    </html>
  );
}
