import { createRoot } from "react-dom/client";
import "./index.css";
import "flag-icons/css/flag-icons.min.css";

import { RouterProvider } from "react-router";
import { router } from "./router/router.tsx";
import { LanguageProvider } from "./i18n/LanguageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <RouterProvider router={router} />
  </LanguageProvider>,
);
