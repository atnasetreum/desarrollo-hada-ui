"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services";
import { useAuthStore } from "@/stores/auth.store";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isSessionReady, setSession, clearSession } = useAuthStore();

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

  if (!isSessionReady) {
    return <div>Cargando sesion...</div>;
  }

  return <>{children}</>;
};

export default MainLayout;
