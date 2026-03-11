"use client";

import Grid from "@mui/material/Grid";
import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import { useAuthStore } from "@/stores/auth.store";

const ACCENT = "#8CBB4E";

const DashboardPage = () => {
  const { user, userId } = useAuthStore();

  if (!user || !userId) {
    return <div>Redirigiendo...</div>;
  }

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#212721",
            letterSpacing: -0.25,
            textWrap: "balance",
          }}
        >
          Panel de Gestion Humana
        </Typography>
        <Typography variant="body1" sx={{ color: "#626A63" }}>
          Bienvenido, {user.name}. Seguimiento estrategico de personas y
          cultura.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid #E3E6DF",
              backgroundColor: "#FFFFFF",
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
                <Typography variant="subtitle2" sx={{ color: "#49524C" }}>
                  Rotacion mensual
                </Typography>
                <TrendingUpRoundedIcon sx={{ color: ACCENT }} />
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  color: "#202620",
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
                  bgcolor: "rgba(140, 187, 78, 0.18)",
                  color: "#425132",
                  fontWeight: 700,
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid #E3E6DF",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle2" sx={{ color: "#49524C" }}>
                  Colaboradores activos
                </Typography>
                <BadgeRoundedIcon sx={{ color: ACCENT }} />
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  color: "#202620",
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
                  bgcolor: "#F1F3EE",
                  color: "#4F564F",
                  fontWeight: 600,
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid #E3E6DF",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle2" sx={{ color: "#49524C" }}>
                  Vacantes activas
                </Typography>
                <GroupsRoundedIcon sx={{ color: ACCENT }} />
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  color: "#202620",
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
                  bgcolor: "#F1F3EE",
                  color: "#4F564F",
                  fontWeight: 600,
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid #E3E6DF",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle2" sx={{ color: "#49524C" }}>
                  Procesos de seleccion
                </Typography>
                <PersonSearchRoundedIcon sx={{ color: ACCENT }} />
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  color: "#202620",
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
                  bgcolor: "#F1F3EE",
                  color: "#4F564F",
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
              borderRadius: 4,
              border: "1px solid #E3E6DF",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#232A24" }}
              >
                Indicadores por frente de gestion
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "#646C65" }}>
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
                        sx={{ color: "#343D36", fontWeight: 600 }}
                      >
                        {item.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#5E665F" }}>
                        {item.value}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        height: 10,
                        borderRadius: 8,
                        backgroundColor: "#ECEFE9",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 8,
                          background: `linear-gradient(90deg, ${ACCENT}, #A8C77D)`,
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
              borderRadius: 4,
              border: "1px solid #E3E6DF",
              background:
                "radial-gradient(circle at top right, rgba(140,187,78,0.18), rgba(255,255,255,0.98) 58%)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#252D26" }}
              >
                Sesion de RR. HH.
              </Typography>
              <Typography variant="body2" sx={{ color: "#636C64", mb: 2 }}>
                Acceso autorizado al centro de personas.
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: "#3B433D" }}>
                  Responsable: <strong>{user.name}</strong>
                </Typography>
                <Typography variant="body2" sx={{ color: "#3B433D" }}>
                  Correo institucional: <strong>{user.email}</strong>
                </Typography>
                <Typography variant="body2" sx={{ color: "#3B433D" }}>
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
