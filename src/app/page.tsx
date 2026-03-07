"use client";

import { type FormEvent, useMemo, useState } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#75AD2A",
            dark: "#5F8F21",
            light: "#93C84D",
          },
          background: {
            default: "#F4F8EE",
          },
        },
        shape: {
          borderRadius: 16,
        },
        typography: {
          fontFamily: '"Montserrat", "Segoe UI", sans-serif',
          h4: {
            fontWeight: 700,
          },
          body2: {
            color: "#5A5F55",
          },
        },
      }),
    [],
  );

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Valores capturados:", {
      correo: form.email,
      contrasena: form.password,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          px: 2,
          py: 4,
          background:
            "radial-gradient(circle at 15% 15%, rgba(117,173,42,0.28), transparent 32%), radial-gradient(circle at 85% 85%, rgba(117,173,42,0.18), transparent 30%), linear-gradient(145deg, #F9FBF4 10%, #E8F1DA 100%)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 980,
            overflow: "hidden",
            borderRadius: 6,
            border: "1px solid rgba(117, 173, 42, 0.20)",
            boxShadow: "0 18px 48px rgba(44, 78, 16, 0.16)",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.1fr 1fr",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              bgcolor: "primary.main",
              color: "#F7FBEF",
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 4,
              isolation: "isolate",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(140deg, rgba(255,255,255,0.22) 0%, transparent 60%)",
                zIndex: -1,
              }}
            />

            <Stack spacing={2}>
              <Box
                sx={{
                  width: "fit-content",
                  maxWidth: "100%",
                  px: 2,
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: "rgba(255, 255, 255, 0.78)",
                  border: "1px solid rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(3px)",
                  boxShadow: "0 10px 26px rgba(35, 58, 15, 0.22)",
                }}
              >
                <Box
                  component="img"
                  src="https://api.comportarte.com/static/images/login/logo-superior.png"
                  alt="Logo principal"
                  sx={{
                    width: 220,
                    maxWidth: "100%",
                    objectFit: "contain",
                    display: "block",
                    filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.08))",
                  }}
                />
              </Box>

              <Typography variant="h4">Recursos Humanos Inteligente</Typography>
              <Typography variant="body1" sx={{ maxWidth: 360 }}>
                Administra procesos, personal y seguimiento en una sola
                plataforma.
              </Typography>
            </Stack>

            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Plataforma integral de gestion RH
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: { xs: 4, md: 6 },
              bgcolor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h5" sx={{ color: "#22281A" }}>
                Iniciar sesion
              </Typography>
              <Typography variant="body2">
                Ingresa con tu correo corporativo y contrasena.
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <TextField
                label="Correo"
                type="email"
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                required
                fullWidth
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Contrasena"
                type="password"
                value={form.password}
                onChange={(event) =>
                  handleChange("password", event.target.value)
                }
                required
                fullWidth
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                py: 1.4,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 3,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Iniciar sesion
            </Button>

            <Divider sx={{ borderColor: "rgba(117, 173, 42, 0.2)" }} />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              spacing={1.5}
            >
              <Link
                href="#"
                underline="hover"
                color="primary.dark"
                sx={{ fontWeight: 600 }}
              >
                Olvidaste tu contrasena?
              </Link>

              <Box
                component="img"
                src="https://api.comportarte.com/static/images/login/logo-inferior.png"
                alt="Footer"
                sx={{
                  height: 36,
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Stack>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
