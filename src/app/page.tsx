"use client";

import { type FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { DM_Sans, Sora } from "next/font/google";
import * as CryptoJS from "crypto-js";
import { authService } from "@/services";
import { useAuthStore } from "@/stores/auth.store";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

const headingFont = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { setSession } = useAuthStore();
  const isDev = process.env.NODE_ENV === "development";
  const cryptoKey =
    process.env.NEXT_PUBLIC_AUTH_CREDENTIALS_CRYPTO_KEY ||
    (isDev ? "dev_crypto_key_change_me" : "");

  const [form, setForm] = useState<LoginForm>({
    email: isDev ? "eduardo-266@hotmail.com" : "",
    password: isDev ? "12345678" : "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
          fontFamily: bodyFont.style.fontFamily,
          h4: {
            fontWeight: 700,
            fontFamily: headingFont.style.fontFamily,
            letterSpacing: "-0.03em",
          },
          h5: {
            fontFamily: headingFont.style.fontFamily,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          },
          body2: {
            color: "#5A5F55",
          },
        },
        components: {
          MuiTextField: {
            defaultProps: {
              variant: "outlined",
            },
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: 14,
                },
              },
            },
          },
        },
      }),
    [],
  );

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cryptoKey) {
      setErrorMessage(
        "No hay clave de cifrado configurada para autenticacion.",
      );
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const encryptedEmail = CryptoJS.AES.encrypt(
        form.email,
        cryptoKey,
      ).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(
        form.password,
        cryptoKey,
      ).toString();

      const response = await authService.login({
        email: encryptedEmail,
        password: encryptedPassword,
      });

      if (response.status < 200 || response.status >= 300) {
        setErrorMessage("Credenciales invalidas o sesion no autorizada.");
        return;
      }

      const sessionResponse = await authService.checkToken();
      setSession({
        userId: sessionResponse.data.userId,
        user: sessionResponse.data.user,
      });

      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("No fue posible iniciar sesion. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
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
          "@keyframes cardRise": {
            from: {
              opacity: 0,
              transform: "translateY(18px)",
            },
            to: {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
          "@keyframes pulseFloat": {
            "0%": {
              transform: "translateY(0)",
            },
            "50%": {
              transform: "translateY(-4px)",
            },
            "100%": {
              transform: "translateY(0)",
            },
          },
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
            animation: "cardRise 520ms ease-out",
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
              overflow: "hidden",
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
            <Box
              sx={{
                position: "absolute",
                right: -46,
                bottom: -46,
                width: 188,
                height: 188,
                borderRadius: "50%",
                border: "1px dashed rgba(255,255,255,0.35)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                right: 54,
                top: 42,
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.10)",
                transform: "rotate(15deg)",
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
                  animation: "pulseFloat 4s ease-in-out infinite",
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

              <Typography variant="h4">Gestión Humana</Typography>
              <Typography variant="body1" sx={{ maxWidth: 360 }}>
                Administra procesos, personal y seguimiento en una sola
                plataforma.
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 360 }}>
                Optimiza tu gestión humana con herramientas integrales y fáciles
                de usar.
              </Typography>
            </Stack>

            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Plataforma integral de gestion humana inteligente.
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
              animation: "cardRise 520ms ease-out 120ms both",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h5" sx={{ color: "#22281A" }}>
                Iniciar sesion
              </Typography>
              <Typography variant="body2">
                Ingresa con tu correo corporativo y contraseña.
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
                label="Contraseña"
                type={showPassword ? "text" : "password"}
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Mostrar u ocultar contrasena"
                        onClick={() => setShowPassword((state) => !state)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffRoundedIcon fontSize="small" />
                        ) : (
                          <VisibilityRoundedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberUser}
                  onChange={(event) => setRememberUser(event.target.checked)}
                  color="primary"
                />
              }
              label="Recordarme en este equipo"
              sx={{ mt: -1, color: "#4A5540" }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                py: 1.4,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 3,
                boxShadow: "none",
                minHeight: 48,
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              {isSubmitting ? "Ingresando..." : "Iniciar sesion"}
            </Button>

            {errorMessage ? (
              <Typography variant="body2" sx={{ color: "#B3261E", mt: -1 }}>
                {errorMessage}
              </Typography>
            ) : null}

            <Divider sx={{ borderColor: "rgba(117, 173, 42, 0.2)" }} />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
              spacing={1.5}
              sx={{ width: "100%" }}
            >
              <Link
                href="#"
                underline="hover"
                color="primary.dark"
                sx={{
                  fontWeight: 600,
                  flex: 1,
                  textAlign: { xs: "left", sm: "center" },
                }}
              >
                Registrarse
              </Link>

              <Link
                href="#"
                underline="hover"
                color="primary.dark"
                sx={{
                  fontWeight: 600,
                  flex: 1,
                  textAlign: { xs: "left", sm: "center" },
                }}
              >
                ¿ Olvidaste tu contraseña ?
              </Link>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
