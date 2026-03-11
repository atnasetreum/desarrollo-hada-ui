"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authService } from "@/services";
import { useAuthStore } from "@/stores/auth.store";
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const drawerWidth = 292;

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <SpaceDashboardRoundedIcon fontSize="small" />,
    enabled: true,
  },
  {
    label: "Requisicion de Personal",
    href: "/requisicion-de-personal",
    icon: <PersonAddAlt1RoundedIcon fontSize="small" />,
    enabled: true,
  },
  {
    label: "Talento y Cultura",
    href: "/2",
    icon: <Groups2RoundedIcon fontSize="small" />,
    enabled: false,
  },
  {
    label: "Nomina y Compensaciones",
    href: "/2",
    icon: <Inventory2RoundedIcon fontSize="small" />,
    enabled: false,
  },
  {
    label: "Reclutamiento y Seleccion",
    href: "/2",
    icon: <LocalShippingRoundedIcon fontSize="small" />,
    enabled: false,
  },

  {
    label: "Analitica de Personas",
    href: "/2",
    icon: <InsightsRoundedIcon fontSize="small" />,
    enabled: false,
  },
] as const;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { isSessionReady, user, userId, setSession, clearSession } =
    useAuthStore();

  const userName = user?.name ?? "";

  const userInitials = useMemo(() => {
    if (!userName) {
      return "CT";
    }

    return userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
  }, [userName]);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await authService.checkToken();
        setSession({
          userId: response.data.userId,
          user: response.data.user,
        });
      } catch {
        clearSession();
        router.replace("/");
      }
    };

    if (!isSessionReady) {
      void loadSession();
    }
  }, [clearSession, isSessionReady, router, setSession]);

  const handleLogout = async () => {
    await authService.logout();
    clearSession();
    router.replace("/");
    router.refresh();
  };

  const menu = (
    <Box
      sx={{
        height: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #5D8E2A 0%, #4D7623 100%)",
        color: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: 3,
          p: 2,
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.24), rgba(255,255,255,0.08))",
          backdropFilter: "blur(2px)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.9)",
            letterSpacing: 1,
            fontWeight: 700,
          }}
        >
          COSMETICOS TRUJILLO
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mt: 0.5,
            fontWeight: 800,
            color: "#FFFFFF",
            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          Plataforma de Capital Humano
        </Typography>
      </Box>

      <List sx={{ mt: 2, gap: 0.5, display: "grid" }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <ListItemButton
              key={item.label}
              component={item.enabled ? Link : "button"}
              href={item.enabled ? item.href : undefined}
              disabled={!item.enabled}
              onClick={() => {
                if (!isDesktop) {
                  setMobileDrawerOpen(false);
                }
              }}
              sx={{
                borderRadius: 2,
                color: "#FFFFFF",
                border: "1px solid transparent",
                backgroundColor: isActive
                  ? "rgba(255, 255, 255, 0.24)"
                  : "transparent",
                borderColor: isActive
                  ? "rgba(255, 255, 255, 0.45)"
                  : "transparent",
                boxShadow: isActive
                  ? "0 8px 18px rgba(13, 21, 7, 0.24)"
                  : "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                },
                "&:focus-visible": {
                  outline: "2px solid #D9F0B4",
                  outlineOffset: 2,
                },
                "&.Mui-disabled": {
                  opacity: 1,
                  color: "rgba(255, 255, 255, 0.72)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 34 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
              {!item.enabled ? (
                <Chip
                  size="small"
                  label="Prox"
                  sx={{
                    height: 22,
                    fontSize: 10,
                    fontWeight: 700,
                    backgroundColor: "rgba(255,255,255,0.22)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                />
              ) : null}
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: "auto", pt: 2 }}>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.24)" }} />
        <Typography
          variant="caption"
          sx={{ mt: 1.5, display: "block", opacity: 0.8 }}
        >
          v2026.03.10
        </Typography>
      </Box>
    </Box>
  );

  if (!isSessionReady) {
    return <div>Cargando sesion...</div>;
  }

  if (!user || !userId) {
    return <div>Redirigiendo...</div>;
  }

  return (
    <Box sx={{ minHeight: "100dvh", backgroundColor: "#FFFFFF" }}>
      <CssBaseline />

      <AppBar
        elevation={0}
        sx={{
          ml: { lg: `${drawerWidth}px` },
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          background: "linear-gradient(180deg, #5D8E2A 0%, #4D7623 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.14)",
          color: "#FFFFFF",
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          {!isDesktop ? (
            <IconButton
              aria-label="Abrir menu"
              onClick={() => setMobileDrawerOpen(true)}
              edge="start"
              sx={{ mr: 1, color: "#FFFFFF" }}
            >
              <MenuRoundedIcon />
            </IconButton>
          ) : null}

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Centro de Gestion Humana
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.3)",
                color: "#FFFFFF",
                fontWeight: 800,
                border: "1px solid rgba(255, 255, 255, 0.35)",
              }}
            >
              {userInitials}
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, lineHeight: 1.1, color: "#FFFFFF" }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.82)" }}
              >
                Colaborador #{userId}
              </Typography>
            </Box>
            <IconButton
              aria-label="Cerrar sesion"
              onClick={handleLogout}
              sx={{ color: "#FFFFFF" }}
            >
              <LogoutRoundedIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop ? true : mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight: "none",
            boxSizing: "border-box",
          },
        }}
      >
        {menu}
      </Drawer>

      <Box
        component="main"
        sx={{
          ml: { lg: `${drawerWidth}px` },
          mt: "72px",
          p: { xs: 2, md: 3 },
        }}
      >
        <Box
          key={pathname}
          sx={{
            animation: "routeFadeIn 220ms ease-out",
            "@keyframes routeFadeIn": {
              from: {
                opacity: 0,
                transform: "translateY(6px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
