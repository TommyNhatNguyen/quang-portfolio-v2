export { useGSAP } from "@gsap/react";
export { gsap } from "gsap";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";


export function initGSAP() {
    gsap.registerPlugin(useGSAP);
}
