"use client";

import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { useAuthStore } from "@/stores/auth.store";

const DashboardPage = () => {
  const router = useRouter();
  const { user, userId, clearSession } = useAuthStore();

  const handleLogout = async () => {
    await authService.logout();
    clearSession();

    router.replace("/");
    router.refresh();
  };

  if (!user || !userId) {
    return <div>Redirigiendo...</div>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user.name}</p>
      <p>Correo: {user.email}</p>
      <p>User ID: {userId}</p>
      <button onClick={handleLogout} type="button">
        Cerrar sesion
      </button>
    </main>
  );
};

export default DashboardPage;
