import { createBrowserRouter } from "react-router";

import LandingPage from "../pages/landingPage/LandingPage.tsx";
import Services from "../pages/services/Services.tsx";
import Packages from "../pages/packages/Packages.tsx";
import Inventory from "../pages/inventory/Inventory.tsx";
import QuotePage from "../pages/quote/Quote.tsx";
import Gallery from "../pages/gallery/Gallery.tsx";
import About from "../pages/about/About.tsx";
import Contact from "../pages/contact/Contact.tsx";
import PrivacyPolicy from "../pages/privacy/privacy.tsx";
import Terms from "../pages/terms/Terms.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/packages",
    element: <Packages />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/quote",
    element: <QuotePage />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
]);
