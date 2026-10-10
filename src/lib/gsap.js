import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerScrollRefresh } from "./scrollRefresh";

gsap.registerPlugin(ScrollTrigger);
registerScrollRefresh(() => ScrollTrigger.refresh());

export { gsap, ScrollTrigger };
