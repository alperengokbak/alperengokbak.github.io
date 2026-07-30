import { createContext } from "react";

/**
 * Lives apart from LocaleContext.jsx so that file exports only a component —
 * mixing a component and non-component exports breaks React Fast Refresh.
 */
export const LocaleContext = createContext(null);
