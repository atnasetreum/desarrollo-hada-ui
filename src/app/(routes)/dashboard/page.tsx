"use client";

import Grid from "@mui/material/Grid";
import { APP_COLORS } from "@/theme/tokens";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import { useAuthStore } from "@/stores/auth.store";

const DashboardPage = () => {
  const { user, userId } = useAuthStore();

  if (!user || !userId) {
    return (
      <Box
        sx={{
          minHeight: "60dvh",
          display: "grid",
          placeItems: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            border: `1px solid ${alpha(APP_COLORS.primary, 0.28)}`,
            boxShadow: "0 12px 30px rgba(28, 44, 14, 0.1)",
            p: 4,
            textAlign: "center",
            backgroundColor: "background.paper",
          }}
        >
          <CircularProgress
            size={28}
            thickness={5}
            sx={{ color: "primary.main", mb: 2 }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Redirigiendo al panel
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            Verificando credenciales y permisos de acceso...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: -0.25,
            textWrap: "balance",
          }}
        >
          Panel de Gestion Humana
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Bienvenido, {user.name}. Seguimiento estrategico de personas y
          cultura.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            sx={{
              borderRadius: "16px",
              border: `1px solid ${alpha(APP_COLORS.primary, 0.2)}`,
              backgroundColor: "background.paper",
              boxShadow: `0 6px 16px ${alpha(APP_COLORS.secondary, 0.08)}`,
              animation: "fadeInUp 420ms ease-out",
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
              },
              "@keyframes fadeInUp": {
                from: { opacity: 0, transform: "translateY(10px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Rotacion mensual
                </Typography>
                <TrendingUpRoundedIcon sx={{ color: "primary.main" }} />
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  color: "text.primary",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                2.8%
              </Typography>
              <Chip
                label="-0.6 pts vs mes anterior"
                size="small"
                sx={{
                  mt: 1,
                  bgcolor: alpha(APP_COLORS.primary, 0.18),
                  color: "text.primary",
                  fontWeight: 700,
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            sx={{
              borderRadius: "16px",
              border: `1px solid ${alpha(APP_COLORS.primary, 0.2)}`,
              backgroundColor: "background.paper",
              boxShadow: `0 6px 16px ${alpha(APP_COLORS.secondary, 0.08)}`,
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Colaboradores activos
                </Typography>
                <BadgeRoundedIcon sx={{ color: "primary.main" }} />
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  color: "text.primary",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                328
              </Typography>
              <Chip
                label="95% asistencia promedio"
                size="small"
                sx={{
                  mt: 1,
                  bgcolor: alpha(APP_COLORS.primary, 0.12),
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            sx={{
              borderRadius: "16px",
              border: `1px solid ${alpha(APP_COLORS.primary, 0.2)}`,
              backgroundColor: "background.paper",
              boxShadow: `0 6px 16px ${alpha(APP_COLORS.secondary, 0.08)}`,
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Vacantes activas
                </Typography>
                <GroupsRoundedIcon sx={{ color: "primary.main" }} />
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  color: "text.primary",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                14
              </Typography>
              <Chip
                label="6 posiciones criticas"
                size="small"
                sx={{
                  mt: 1,
                  bgcolor: alpha(APP_COLORS.primary, 0.12),
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            sx={{
              borderRadius: "16px",
              border: `1px solid ${alpha(APP_COLORS.primary, 0.2)}`,
              backgroundColor: "background.paper",
              boxShadow: `0 6px 16px ${alpha(APP_COLORS.secondary, 0.08)}`,
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Procesos de seleccion
                </Typography>
                <PersonSearchRoundedIcon sx={{ color: "primary.main" }} />
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  color: "text.primary",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                22
              </Typography>
              <Chip
                label="Tiempo promedio: 18 dias"
                size="small"
                sx={{
                  mt: 1,
                  bgcolor: alpha(APP_COLORS.primary, 0.12),
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            sx={{
              borderRadius: "16px",
              border: `1px solid ${alpha(APP_COLORS.primary, 0.2)}`,
              backgroundColor: "background.paper",
              boxShadow: `0 6px 16px ${alpha(APP_COLORS.secondary, 0.08)}`,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                Indicadores por frente de gestion
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Avance semanal en prioridades clave de talento.
              </Typography>
              <Stack spacing={1.5}>
                {[
                  { label: "Clima laboral", value: 88 },
                  { label: "Capacitacion", value: 64 },
                  { label: "Desempeno y feedback", value: 79 },
                  { label: "Cobertura de vacantes", value: 52 },
                ].map((item) => (
                  <Box key={item.label}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ mb: 0.5 }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "text.primary", fontWeight: 600 }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {item.value}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        height: 11,
                        borderRadius: 999,
                        backgroundColor: alpha(APP_COLORS.primary, 0.15),
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 999,
                          backgroundColor: APP_COLORS.primary,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              borderRadius: "16px",
              border: `1px solid ${alpha(APP_COLORS.primary, 0.2)}`,
              backgroundColor: "background.paper",
              boxShadow: `0 6px 16px ${alpha(APP_COLORS.secondary, 0.08)}`,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                Sesion de RR. HH.
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Acceso autorizado al centro de personas.
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  Responsable: <strong>{user.name}</strong>
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  Correo institucional: <strong>{user.email}</strong>
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  ID de sesion: <strong>{userId}</strong>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default DashboardPage;
