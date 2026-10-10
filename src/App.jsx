import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PageEffects from "./components/layout/PageEffects";
import PageTransition from "./components/layout/PageTransition";

// Route-level code splitting: a page (and the libraries only it needs, e.g. GSAP on the home page) downloads on demand.
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const page = (Component) => (
  <Suspense fallback={<div className="min-h-screen bg-teal-900" aria-busy="true" />}>
    <Component />
    <PageEffects />
  </Suspense>
);

export default function App() {
  return (
    <>
      <PageTransition />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={page(HomePage)} />
          <Route path="/about" element={page(AboutPage)} />
          <Route path="/services" element={page(ServicesPage)} />
          <Route path="/projects" element={page(ProjectsPage)} />
          <Route path="/projects/:id" element={page(ProjectDetailPage)} />
          <Route path="/clients" element={page(ClientsPage)} />
          <Route path="/contact" element={page(ContactPage)} />
          <Route path="*" element={page(NotFoundPage)} />
        </Route>
      </Routes>
    </>
  );
}
