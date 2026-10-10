import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import AOS from "aos";
import "@fontsource-variable/plus-jakarta-sans";
import "aos/dist/aos.css";
import "./styles/index.css";
import "./styles/motion.css";
import App from "./App";
import { prefersReducedMotion } from "./utils/motion";
import { warmUpLandingPage } from "./utils/preload";

// Hash routing (#/about) works on any static host. Set VITE_ROUTER=browser to use clean URLs (needs the Nginx SPA fallback).
const Router = import.meta.env.VITE_ROUTER === "browser" ? BrowserRouter : HashRouter;

// `html.mx` switches on the extra entrance choreography (skipped entirely for reduced-motion visitors)
if (!prefersReducedMotion()) document.documentElement.classList.add("mx");

AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true, // each element animates once: no re-animation work while scrolling back and forth
  offset: 60,
  disable: () => prefersReducedMotion(),
});

warmUpLandingPage();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
