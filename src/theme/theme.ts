import { alpha, createTheme } from "@mui/material/styles";
import { APP_COLORS } from "./tokens";

export const appTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: APP_COLORS.primary,
          contrastText: APP_COLORS.surface,
        },
        secondary: {
          main: APP_COLORS.secondary,
          contrastText: APP_COLORS.surface,
        },
        background: {
          default: APP_COLORS.surface,
          paper: APP_COLORS.surface,
        },
        text: {
          primary: APP_COLORS.secondary,
          secondary: alpha(APP_COLORS.secondary, 0.75),
        },
        divider: alpha(APP_COLORS.secondary, 0.16),
      },
    },
    dark: {
      palette: {
        primary: {
          main: APP_COLORS.primary,
          contrastText: APP_COLORS.secondary,
        },
        secondary: {
          main: APP_COLORS.surface,
          contrastText: APP_COLORS.secondary,
        },
        background: {
          default: "#0F1310",
          paper: "#171C18",
        },
        text: {
          primary: APP_COLORS.surface,
          secondary: alpha(APP_COLORS.surface, 0.78),
        },
        divider: alpha(APP_COLORS.surface, 0.2),
      },
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});
