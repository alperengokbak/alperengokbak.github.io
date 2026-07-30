import { render as rtlRender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LocaleProvider } from "../i18n/LocaleContext.jsx";

/**
 * Renders inside the providers every page-level component depends on: a router (for
 * NavBar's route-aware anchors) and a locale (for useTranslation).
 *
 * Pass `route` to start at a specific path, e.g. render(<NavBar />, { route: "/case-studies/x" }).
 */
export function render(ui, { route = "/", ...options } = {}) {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>
      <LocaleProvider>{children}</LocaleProvider>
    </MemoryRouter>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
