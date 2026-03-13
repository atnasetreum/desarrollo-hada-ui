"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import { appTheme } from "./theme";

type AppThemeProviderProps = {
  children: ReactNode;
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  return (
    <ThemeProvider
      theme={appTheme}
      defaultMode="light"
      modeStorageKey="hada-color-mode"
      disableTransitionOnChange
    >
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
};
