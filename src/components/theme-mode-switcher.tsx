"use client";

import { useState } from "react";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import SettingsBrightnessRoundedIcon from "@mui/icons-material/SettingsBrightnessRounded";
import { APP_COLORS } from "@/theme/tokens";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { alpha, useColorScheme } from "@mui/material/styles";

type ThemeMode = "light" | "dark" | "system";

export const ThemeModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  if (mode === undefined) {
    return <Box sx={{ width: 36, height: 36 }} />;
  }

  const selectedMode = (mode || "system") as ThemeMode;

  const ModeIcon =
    selectedMode === "light"
      ? LightModeRoundedIcon
      : selectedMode === "dark"
        ? DarkModeRoundedIcon
        : SettingsBrightnessRoundedIcon;

  return (
    <>
      <Tooltip title="Cambiar tema">
        <IconButton
          aria-label="Menu de tema"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          sx={{
            width: 36,
            height: 36,
            border: `1px solid ${alpha(APP_COLORS.surface, 0.3)}`,
            bgcolor: alpha(APP_COLORS.surface, 0.14),
            color: APP_COLORS.surface,
            "&:hover": {
              bgcolor: alpha(APP_COLORS.surface, 0.2),
            },
          }}
        >
          <ModeIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 180,
              borderRadius: 2,
              border: `1px solid ${alpha(APP_COLORS.secondary, 0.12)}`,
            },
          },
        }}
      >
        <MenuItem
          selected={selectedMode === "light"}
          onClick={() => {
            setMode("light");
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <LightModeRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>

        <MenuItem
          selected={selectedMode === "dark"}
          onClick={() => {
            setMode("dark");
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <DarkModeRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>

        <MenuItem
          selected={selectedMode === "system"}
          onClick={() => {
            setMode("system");
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <SettingsBrightnessRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>System</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
