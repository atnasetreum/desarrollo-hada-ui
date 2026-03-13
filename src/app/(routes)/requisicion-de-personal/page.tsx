"use client";

import { useEffect, useMemo, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { APP_COLORS } from "@/theme/tokens";

type Product = {
  id: number;
  name: string;
  quantity: number;
};

type SortField = "id" | "name" | "quantity";
type SortDirection = "asc" | "desc" | null;

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Jabon Antibacterial", quantity: 34 },
  { id: 2, name: "Shampoo Reparador", quantity: 22 },
  { id: 3, name: "Acondicionador Nutritivo", quantity: 18 },
  { id: 4, name: "Crema Corporal Aloe", quantity: 41 },
  { id: 5, name: "Gel Fijador Forte", quantity: 27 },
  { id: 6, name: "Locion Hidratante", quantity: 15 },
  { id: 7, name: "Protector Solar FPS50", quantity: 12 },
  { id: 8, name: "Desodorante Roll-On", quantity: 49 },
  { id: 9, name: "Talco Refrescante", quantity: 29 },
  { id: 10, name: "Crema Facial Dia", quantity: 20 },
  { id: 11, name: "Crema Facial Noche", quantity: 19 },
  { id: 12, name: "Mascarilla Capilar", quantity: 24 },
  { id: 13, name: "Aceite Capilar Argan", quantity: 17 },
  { id: 14, name: "Espuma Limpiadora", quantity: 14 },
  { id: 15, name: "Tonico Facial", quantity: 31 },
  { id: 16, name: "Balsamo Labial", quantity: 54 },
  { id: 17, name: "Serum Vitaminado", quantity: 11 },
  { id: 18, name: "Jabon Exfoliante", quantity: 26 },
  { id: 19, name: "Crema de Manos", quantity: 37 },
  { id: 20, name: "Gel Ducha Herbal", quantity: 23 },
];

const PersonnelRequisitionPage = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formQuantity, setFormQuantity] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSortToggle = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection("asc");
      return;
    }

    if (sortDirection === "asc") {
      setSortDirection("desc");
      return;
    }

    if (sortDirection === "desc") {
      setSortField(null);
      setSortDirection(null);
      return;
    }

    setSortDirection("asc");
  };

  const openCreateForm = () => {
    setEditingProductId(null);
    setFormName("");
    setFormQuantity("");
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProductId(product.id);
    setFormName(product.name);
    setFormQuantity(String(product.quantity));
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProductId(null);
    setFormName("");
    setFormQuantity("");
  };

  const handleSaveProduct = () => {
    const safeName = formName.trim();
    const safeQuantity = Number(formQuantity);

    if (!safeName || Number.isNaN(safeQuantity) || safeQuantity < 0) {
      return;
    }

    if (editingProductId !== null) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProductId
            ? { ...product, name: safeName, quantity: safeQuantity }
            : product,
        ),
      );
    } else {
      const nextId =
        products.length > 0
          ? Math.max(...products.map((product) => product.id)) + 1
          : 1;

      setProducts((current) => [
        ...current,
        { id: nextId, name: safeName, quantity: safeQuantity },
      ]);
    }

    closeForm();
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  const requestDeleteProduct = (product: Product) => {
    setDeleteTarget(product);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) {
      return;
    }

    handleDeleteProduct(deleteTarget.id);
    setDeleteTarget(null);
  };

  const filteredAndSortedProducts = useMemo(() => {
    const normalizedTerm = debouncedSearchTerm.toLowerCase().trim();

    const filtered = products.filter((product) => {
      if (!normalizedTerm) {
        return true;
      }

      const matchesName = product.name.toLowerCase().includes(normalizedTerm);
      const matchesId = String(product.id).includes(normalizedTerm);
      const matchesQuantity = String(product.quantity).includes(normalizedTerm);

      return matchesName || matchesId || matchesQuantity;
    });

    if (!sortField || !sortDirection) {
      return filtered;
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortField === "name") {
        return a.name.localeCompare(b.name, "es", { sensitivity: "base" });
      }

      return a[sortField] - b[sortField];
    });

    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [products, debouncedSearchTerm, sortField, sortDirection]);

  const paginatedProducts = useMemo(() => {
    if (rowsPerPage === -1) {
      return filteredAndSortedProducts;
    }

    const start = page * rowsPerPage;
    return filteredAndSortedProducts.slice(start, start + rowsPerPage);
  }, [filteredAndSortedProducts, page, rowsPerPage]);

  const sortLabel = (field: SortField) => {
    if (sortField !== field || !sortDirection) {
      return "null";
    }

    return sortDirection;
  };

  return (
    <Stack spacing={2.5}>
      <Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: -0.25,
            }}
          >
            CRUD de Productos
          </Typography>
          <Chip
            label={`${products.length} productos`}
            size="small"
            sx={{
              bgcolor: alpha(APP_COLORS.primary, 0.14),
              border: `1px solid ${alpha(APP_COLORS.primary, 0.28)}`,
              fontWeight: 700,
            }}
          />
        </Stack>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Estructura visual para crear, editar, eliminar, filtrar y listar
          productos.
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={1.5}
        alignItems={{ xs: "stretch", lg: "center" }}
        justifyContent="space-between"
      >
        <Card
          sx={{
            borderRadius: "16px",
            border: `1px solid ${alpha(APP_COLORS.primary, 0.2)}`,
            backgroundColor: "background.paper",
            boxShadow: `0 6px 16px ${alpha(APP_COLORS.secondary, 0.08)}`,
            flex: 1,
            maxWidth: { lg: 760 },
          }}
        >
          <CardContent sx={{ p: 1.25, "&:last-child": { pb: 1.25 } }}>
            <TextField
              placeholder="Buscar por ID, nombre o cantidad"
              size="small"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setPage(0);
              }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 44,
                },
              }}
            />
          </CardContent>
        </Card>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent="flex-end"
          sx={{ minWidth: { lg: "fit-content" } }}
        >
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={openCreateForm}
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
            Crear
          </Button>

          <Button
            variant="outlined"
            startIcon={<RefreshRoundedIcon />}
            onClick={() => window.location.reload()}
            sx={{
              borderRadius: "12px",
              borderColor: alpha(APP_COLORS.primary, 0.35),
              color: "text.primary",
            }}
          >
            Refrescar
          </Button>
        </Stack>
      </Stack>

      {isFormOpen ? (
        <Card
          sx={{
            borderRadius: "16px",
            border: `1px solid ${alpha(APP_COLORS.primary, 0.25)}`,
            backgroundColor: "background.paper",
            boxShadow: `0 6px 16px ${alpha(APP_COLORS.secondary, 0.08)}`,
          }}
        >
          <CardContent>
            <Stack spacing={1.5}>
              <Typography sx={{ fontWeight: 700, color: "text.primary" }}>
                {editingProductId !== null
                  ? "Editar producto"
                  : "Crear producto"}
              </Typography>

              <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                <TextField
                  label="Nombre"
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)}
                  fullWidth
                />
                <TextField
                  label="Cantidad"
                  type="number"
                  value={formQuantity}
                  onChange={(event) => setFormQuantity(event.target.value)}
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              </Stack>

              <Stack direction="row" spacing={1.25}>
                <Button
                  variant="contained"
                  onClick={handleSaveProduct}
                  sx={{
                    bgcolor: APP_COLORS.primary,
                    color: APP_COLORS.surface,
                    borderRadius: "12px",
                  }}
                >
                  Guardar
                </Button>
                <Button
                  variant="text"
                  onClick={closeForm}
                  sx={{ color: "text.secondary" }}
                >
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ) : null}

      <Card
        sx={{
          borderRadius: "16px",
          border: `1px solid ${alpha(APP_COLORS.primary, 0.2)}`,
          backgroundColor: "background.paper",
          boxShadow: `0 6px 16px ${alpha(APP_COLORS.secondary, 0.08)}`,
          overflow: "hidden",
        }}
      >
        <Table
          size="small"
          sx={{
            "& .MuiTableCell-root": {
              borderBottom: `1px solid ${alpha(APP_COLORS.secondary, 0.12)}`,
            },
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: APP_COLORS.primary,
                "& .MuiTableCell-root": {
                  color: APP_COLORS.surface,
                  borderBottom: "none",
                  py: 1.7,
                },
              }}
            >
              {[
                { key: "id", label: "ID" },
                { key: "name", label: "Nombre" },
                { key: "quantity", label: "Cantidad" },
              ].map((column) => (
                <TableCell key={column.key} sx={{ fontWeight: 700 }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography
                      component="span"
                      sx={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: APP_COLORS.surface,
                      }}
                    >
                      {column.label}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleSortToggle(column.key as SortField)}
                      sx={{
                        width: 24,
                        height: 24,
                        color: alpha(APP_COLORS.surface, 0.9),
                      }}
                    >
                      <SwapVertRoundedIcon sx={{ fontSize: 17 }} />
                    </IconButton>
                    {sortLabel(column.key as SortField) !== "null" && (
                      <Chip
                        label={sortLabel(column.key as SortField)}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: 10,
                          bgcolor: alpha(APP_COLORS.surface, 0.18),
                          color: APP_COLORS.surface,
                          border: `1px solid ${alpha(APP_COLORS.surface, 0.26)}`,
                        }}
                      />
                    )}
                  </Stack>
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 700 }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedProducts.map((product, index) => (
              <TableRow
                key={product.id}
                hover
                sx={{
                  backgroundColor:
                    index % 2 === 0
                      ? alpha(APP_COLORS.surface, 0.98)
                      : "#F3F4F3",
                  "& .MuiTableCell-root": {
                    color: "text.primary",
                  },
                }}
              >
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      size="small"
                      onClick={() => openEditForm(product)}
                      sx={{ color: "primary.main" }}
                    >
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => requestDeleteProduct(product)}
                      sx={{ color: "error.main" }}
                    >
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}

            {paginatedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box
                    sx={{ py: 3, textAlign: "center", color: "text.secondary" }}
                  >
                    No hay productos para mostrar.
                  </Box>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredAndSortedProducts.length}
          page={page}
          onPageChange={(_, nextPage) => setPage(nextPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 20, { label: "Todos", value: -1 }]}
          labelRowsPerPage="Filas por pagina"
          showFirstButton
          showLastButton
        />
      </Card>

      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          Confirmar eliminacion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteTarget
              ? `Se eliminara el producto "${deleteTarget.name}".`
              : "Se eliminara el producto seleccionado."}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setDeleteTarget(null)}
            sx={{ color: "text.secondary" }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            sx={{ borderRadius: "10px" }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default PersonnelRequisitionPage;
