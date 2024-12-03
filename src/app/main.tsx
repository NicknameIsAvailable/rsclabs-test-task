import { createRoot } from "react-dom/client";
import "@/shared/styles/index.css";
import { BrowserRouter } from "react-router";
import { RoutesList } from "../pages";
import { Providers } from "@/shared/lib/providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  </Providers>,
);
