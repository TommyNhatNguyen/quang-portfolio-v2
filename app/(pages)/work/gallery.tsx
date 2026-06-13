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

export function useGallery() {
  const openGallery = useCallback(async (images: GalleryImage[]) => {
    const { default: PhotoSwipe } = await import("photoswipe");

    const pswp = new PhotoSwipe({
      dataSource: images,
      index: 0,
      bgOpacity: 0.8,
      zoom: false,
      closeSVG: CLOSE_SVG,
      arrowPrevSVG: ARROW_PREV_SVG,
      arrowNextSVG: ARROW_NEXT_SVG,
    });
    pswp.init();
  }, []);

  return { openGallery };
}
