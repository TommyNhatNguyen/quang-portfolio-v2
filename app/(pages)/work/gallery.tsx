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

const SPACING = 48;
const BUTTON_SIZE = 56;

function updateButtonPositions(pswp: InstanceType<typeof import("photoswipe").default>) {
  const slide = (pswp as any).currSlide;
  if (!slide?.bounds?.center) return;

  const currZoomLevel: number = slide.currZoomLevel;
  const imgWidth = slide.width * currZoomLevel;
  const imgHeight = slide.height * currZoomLevel;
  const imgLeft: number = slide.bounds.center.x;
  const imgTop: number = slide.bounds.center.y;

  const root = (pswp as any).element as HTMLElement | null;
  if (!root) return;

  const arrowPrev = root.querySelector<HTMLElement>(".pswp__button--arrow--prev");
  const arrowNext = root.querySelector<HTMLElement>(".pswp__button--arrow--next");
  const closeBtn = root.querySelector<HTMLElement>(".pswp__button--close");

  const arrowTop = imgTop + imgHeight / 2 - BUTTON_SIZE / 2;

  if (arrowPrev) {
    arrowPrev.style.left = `${imgLeft - SPACING - BUTTON_SIZE}px`;
    arrowPrev.style.right = "auto";
    arrowPrev.style.top = `${arrowTop}px`;
    arrowPrev.style.marginTop = "0";
  }

  if (arrowNext) {
    arrowNext.style.left = `${imgLeft + imgWidth + SPACING}px`;
    arrowNext.style.right = "auto";
    arrowNext.style.top = `${arrowTop}px`;
    arrowNext.style.marginTop = "0";
  }

  if (closeBtn) {
    closeBtn.style.top = `${imgTop}px`;
    closeBtn.style.left = `${imgLeft + imgWidth + SPACING}px`;
    closeBtn.style.right = "auto";
    closeBtn.style.margin = "0";
  }
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
      });

      pswp.on("afterInit", () => updateButtonPositions(pswp));
      pswp.on("zoomPanUpdate", () => updateButtonPositions(pswp));
      pswp.on("resize", () => updateButtonPositions(pswp));

      pswp.init();
    },
    [images],
  );

  return { openGallery };
}
