"use client";
import "photoswipe/dist/photoswipe.css";
import { useCallback } from "react";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

const CLOSE_SVG = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.6667 1.88L16.7867 0L9.33333 7.45333L1.88 0L0 1.88L7.45333 9.33333L0 16.7867L1.88 18.6667L9.33333 11.2133L16.7867 18.6667L18.6667 16.7867L11.2133 9.33333L18.6667 1.88Z" fill="black" fill-opacity="0.9"/></svg>`;
const ARROW_PREV_SVG = `<svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.33333 18.6667L11.2133 16.7867L5.10667 10.6667H26.6667V8H5.10667L11.2267 1.88L9.33333 0L0 9.33333L9.33333 18.6667Z" fill="white" fill-opacity="0.9"/></svg>`;
const ARROW_NEXT_SVG = `<svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.3333 0L15.4533 1.88L21.56 8H0V10.6667H21.56L15.44 16.7867L17.3333 18.6667L26.6667 9.33333L17.3333 0Z" fill="white" fill-opacity="0.9"/></svg>`;

const MOBILE_BREAKPOINT = 768;
const MOBILE_PADDING = 16;
const DESKTOP_SPACING = 48;
const BUTTON_SIZE = 56;

function isMobileViewport() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

function getViewportPadding() {
  if (!isMobileViewport()) {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }

  return {
    top: MOBILE_PADDING + BUTTON_SIZE + MOBILE_PADDING,
    bottom: MOBILE_PADDING + BUTTON_SIZE + MOBILE_PADDING,
    left: MOBILE_PADDING,
    right: MOBILE_PADDING,
  };
}

function hideButtons(root: HTMLElement) {
  root
    .querySelectorAll<HTMLElement>(".pswp__button--close, .pswp__button--arrow")
    .forEach((button) => {
      button.style.opacity = "0";
      button.style.pointerEvents = "none";
    });
}

function showButtons(root: HTMLElement) {
  root
    .querySelectorAll<HTMLElement>(".pswp__button--close, .pswp__button--arrow")
    .forEach((button) => {
      button.style.opacity = "1";
      button.style.pointerEvents = "auto";
    });
}

function updateButtonPositions(
  pswp: InstanceType<typeof import("photoswipe").default>,
): boolean {
  const root = (pswp as any).element as HTMLElement | null;
  if (!root) return false;

  const currSlide = (pswp as any).currSlide;
  const contentEl = currSlide?.content?.element as HTMLElement | null;
  if (!contentEl) return false;

  // getBoundingClientRect gives the actual rendered screen position after all CSS transforms
  const rect = contentEl.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;

  const imgLeft = rect.left;
  const imgTop = rect.top;
  const imgWidth = rect.width;
  const imgHeight = rect.height;

  const arrowPrev = root.querySelector<HTMLElement>(
    ".pswp__button--arrow--prev",
  );
  const arrowNext = root.querySelector<HTMLElement>(
    ".pswp__button--arrow--next",
  );
  const closeBtn = root.querySelector<HTMLElement>(".pswp__button--close");

  if (isMobileViewport()) {
    if (closeBtn) {
      closeBtn.style.top = `${imgTop - MOBILE_PADDING - BUTTON_SIZE}px`;
      closeBtn.style.left = `${imgLeft + (imgWidth - BUTTON_SIZE) / 2}px`;
      closeBtn.style.right = "auto";
      closeBtn.style.margin = "0";
    }

    const arrowTop = imgTop + imgHeight + MOBILE_PADDING;

    if (arrowPrev) {
      arrowPrev.style.left = `${imgLeft}px`;
      arrowPrev.style.right = "auto";
      arrowPrev.style.top = `${arrowTop}px`;
      arrowPrev.style.marginTop = "0";
    }

    if (arrowNext) {
      arrowNext.style.left = `${imgLeft + imgWidth - BUTTON_SIZE}px`;
      arrowNext.style.right = "auto";
      arrowNext.style.top = `${arrowTop}px`;
      arrowNext.style.marginTop = "0";
    }
  } else {
    const arrowTop = imgTop + imgHeight / 2 - BUTTON_SIZE / 2;

    if (arrowPrev) {
      arrowPrev.style.left = `${imgLeft - DESKTOP_SPACING - BUTTON_SIZE}px`;
      arrowPrev.style.right = "auto";
      arrowPrev.style.top = `${arrowTop}px`;
      arrowPrev.style.marginTop = "0";
    }

    if (arrowNext) {
      arrowNext.style.left = `${imgLeft + imgWidth + DESKTOP_SPACING}px`;
      arrowNext.style.right = "auto";
      arrowNext.style.top = `${arrowTop}px`;
      arrowNext.style.marginTop = "0";
    }

    if (closeBtn) {
      closeBtn.style.top = `${imgTop}px`;
      closeBtn.style.left = `${imgLeft + imgWidth + DESKTOP_SPACING}px`;
      closeBtn.style.right = "auto";
      closeBtn.style.margin = "0";
    }
  }

  return true;
}

function syncButtonPositions(
  pswp: InstanceType<typeof import("photoswipe").default>,
) {
  const root = (pswp as any).element as HTMLElement | null;
  if (!root) return;

  if (updateButtonPositions(pswp)) {
    showButtons(root);
  }
}

function scheduleButtonPositionSync(
  pswp: InstanceType<typeof import("photoswipe").default>,
) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => syncButtonPositions(pswp));
  });
}

export function useGallery(images: GalleryImage[]) {
  const openGallery = useCallback(
    async (index: number) => {
      const { default: PhotoSwipe } = await import("photoswipe");

      const pswp = new PhotoSwipe({
        dataSource: images,
        index,
        bgOpacity: 0.8,
        zoom: false,
        closeSVG: CLOSE_SVG,
        arrowPrevSVG: ARROW_PREV_SVG,
        arrowNextSVG: ARROW_NEXT_SVG,
        paddingFn: () => getViewportPadding(),
      });

      pswp.on("contentLoad", (e) => {
        const { content } = e;
        e.preventDefault();

        const wrapper = document.createElement("div");
        wrapper.style.cssText = [
          `width: ${content.data.width}px`,
          `height: ${content.data.height}px`,
          "border-radius: 12px",
          "border: 5px solid #1f1f1f",
          "box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 6px 12px 0px rgba(0, 0, 0, 0.04)",
          "background-color: rgba(255, 255, 255, 0.12)",
          "background-filter: blur(1px)",
          "overflow: hidden",
        ].join("; ");

        const img = document.createElement("img");
        img.src = content.data.src as string;
        img.alt = (content.data.alt as string) ?? "";
        img.style.cssText =
          "width: 102%; height: 102%; object-fit: fill; object-position: top; display: block;";
        img.onload = () => (content as any).onLoaded();
        img.onerror = () => (content as any).onError();

        wrapper.appendChild(img);
        (content as any).element = wrapper;
      });

      pswp.on("afterInit", () => {
        const root = (pswp as any).element as HTMLElement | null;
        if (root) {
          hideButtons(root);
          root.classList.toggle("pswp--mobile-controls", isMobileViewport());
        }
      });
      pswp.on("openingAnimationEnd", () => scheduleButtonPositionSync(pswp));
      pswp.on("loadComplete", () => scheduleButtonPositionSync(pswp));
      pswp.on("zoomPanUpdate", () => syncButtonPositions(pswp));
      pswp.on("resize", () => {
        const root = (pswp as any).element as HTMLElement | null;
        if (root) {
          root.classList.toggle("pswp--mobile-controls", isMobileViewport());
        }
        scheduleButtonPositionSync(pswp);
      });
      pswp.on("change", () => {
        const root = (pswp as any).element as HTMLElement | null;
        if (root) hideButtons(root);
        scheduleButtonPositionSync(pswp);
      });

      pswp.init();
    },
    [images],
  );

  return { openGallery };
}
