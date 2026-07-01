"use client";

import * as stylex from "@stylexjs/stylex";
import {
  AnimationOptions,
  motion,
  stagger,
  useAnimate,
} from "framer-motion";
import { debounce } from "lodash";
import { useState } from "react";

interface TextProps {
  label: string;
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function LetterSwapForward({
  label,
  reverse = true,
  transition = {
    type: "spring",
    duration: 0.7,
  },
  staggerDuration = 0.03,
  staggerFrom = "first",
  className,
  style,
  onClick,
  ...props
}: TextProps) {
  const [scope, animate] = useAnimate();
  const [blocked, setBlocked] = useState(false);

  const hoverStart = () => {
    if (blocked) return;

    setBlocked(true);

    // Function to merge user transition with stagger and delay
    const mergeTransition = (baseTransition: AnimationOptions) => ({
      ...baseTransition,
      delay: stagger(staggerDuration, {
        from: staggerFrom,
      }),
    });

    animate(
      ".letter",
      { y: reverse ? "100%" : "-100%" },
      mergeTransition(transition),
    ).then(() => {
      animate(
        ".letter",
        {
          y: 0,
        },
        {
          duration: 0,
        },
      ).then(() => {
        setBlocked(false);
      });
    });

    animate(
      ".letter-secondary",
      {
        top: "0%",
      },
      mergeTransition(transition),
    ).then(() => {
      animate(
        ".letter-secondary",
        {
          top: reverse ? "-100%" : "100%",
        },
        {
          duration: 0,
        },
      );
    });
  };

  const wrapper = stylex.props(styles.wrapper);
  const letter = stylex.props(styles.letter);
  const letterSecondary = stylex.props(styles.letterSecondary);

  return (
    <span
      className={joinClassNames(wrapper.className, className)}
      style={{ ...wrapper.style, ...style }}
      onMouseEnter={hoverStart}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span {...stylex.props(styles.srOnly)}>{label}</span>

      {label.split("").map((letterChar: string, i: number) => {
        return (
          <span key={i} {...stylex.props(styles.letterGroup)}>
            <motion.span
              className={joinClassNames("letter", letter.className)}
              style={{ ...letter.style, top: 0 }}
            >
              {letterChar}
            </motion.span>
            <motion.span
              className={joinClassNames(
                "letter-secondary",
                letterSecondary.className,
              )}
              aria-hidden={true}
              style={{
                ...letterSecondary.style,
                top: reverse ? "-100%" : "100%",
              }}
            >
              {letterChar}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export function LetterSwapPingPong({
  label,
  reverse = true,
  transition = {
    type: "spring",
    duration: 0.7,
  },
  staggerDuration = 0.03,
  staggerFrom = "first",
  className,
  style,
  onClick,
  ...props
}: TextProps) {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  const mergeTransition = (baseTransition: AnimationOptions) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  });

  const hoverStart = debounce(
    () => {
      if (isHovered) return;
      setIsHovered(true);

      animate(
        ".letter",
        { y: reverse ? "100%" : "-100%" },
        mergeTransition(transition),
      );

      animate(
        ".letter-secondary",
        {
          top: "0%",
        },
        mergeTransition(transition),
      );
    },
    100,
    { leading: true, trailing: true },
  );

  const hoverEnd = debounce(
    () => {
      setIsHovered(false);

      animate(
        ".letter",
        {
          y: 0,
        },
        mergeTransition(transition),
      );

      animate(
        ".letter-secondary",
        {
          top: reverse ? "-100%" : "100%",
        },
        mergeTransition(transition),
      );
    },
    100,
    { leading: true, trailing: true },
  );

  const wrapper = stylex.props(styles.wrapper);
  const letter = stylex.props(styles.letter);
  const letterSecondary = stylex.props(styles.letterSecondary);

  return (
    <motion.span
      className={joinClassNames(wrapper.className, className)}
      style={{ ...wrapper.style, ...style }}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span {...stylex.props(styles.srOnly)}>{label}</span>

      {label.split("").map((letterChar: string, i: number) => {
        return (
          <span key={i} {...stylex.props(styles.letterGroup)}>
            <motion.span
              className={joinClassNames("letter", letter.className)}
              style={{ ...letter.style, top: 0 }}
            >
              {letterChar}
            </motion.span>
            <motion.span
              className={joinClassNames(
                "letter-secondary",
                letterSecondary.className,
              )}
              aria-hidden={true}
              style={{
                ...letterSecondary.style,
                top: reverse ? "-100%" : "100%",
              }}
            >
              {letterChar}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

const styles = stylex.create({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  letterGroup: {
    whiteSpace: "pre",
    position: "relative",
    display: "flex",
  },
  letter: {
    position: "relative",
  },
  letterSecondary: {
    position: "absolute",
  },
});
