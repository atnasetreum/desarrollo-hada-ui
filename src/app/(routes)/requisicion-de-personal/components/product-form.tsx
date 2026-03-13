"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { APP_COLORS } from "@/theme/tokens";

type ProductFormProps = {
  initialName?: string;
  initialQuantity?: number;
  isEditing: boolean;
  onCancel: () => void;
  onSubmit: (payload: { name: string; quantity: number }) => void;
};

export const ProductForm = ({
  initialName,
  initialQuantity,
  isEditing,
  onCancel,
  onSubmit,
}: ProductFormProps) => {
  const [name, setName] = useState(initialName ?? "");
  const [quantity, setQuantity] = useState(
    initialQuantity !== undefined ? String(initialQuantity) : "",
  );

  const handleSubmit = () => {
    const safeName = name.trim();
    const safeQuantity = Number(quantity);

    if (!safeName || Number.isNaN(safeQuantity) || safeQuantity < 0) {
      return;
    }

    onSubmit({ name: safeName, quantity: safeQuantity });
  };

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: -0.25,
          }}
        >
          {isEditing ? "Editar producto" : "Crear producto"}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Completa los datos del producto y guarda los cambios.
        </Typography>
      </Box>

      <Card
        sx={{
          borderRadius: "16px",
          border: `1px solid ${alpha(APP_COLORS.primary, 0.25)}`,
          backgroundColor: "background.paper",
          boxShadow: `0 6px 16px ${alpha(APP_COLORS.secondary, 0.08)}`,
          maxWidth: 860,
        }}
      >
        <CardContent>
          <Stack spacing={1.5}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
              <TextField
                label="Nombre"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                autoFocus
              />
              <TextField
                label="Cantidad"
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Stack>

            <Stack direction="row" spacing={1.25}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  bgcolor: APP_COLORS.primary,
                  color: APP_COLORS.surface,
                  borderRadius: "12px",
                  px: 2,
                  "&:hover": {
                    bgcolor: alpha(APP_COLORS.primary, 0.9),
                  },
                }}
              >
                {isEditing ? "Actualizar" : "Guardar"}
              </Button>
              <Button
                variant="outlined"
                onClick={onCancel}
                sx={{
                  borderRadius: "12px",
                  borderColor: alpha(APP_COLORS.primary, 0.35),
                  color: "text.primary",
                }}
              >
                Volver
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
