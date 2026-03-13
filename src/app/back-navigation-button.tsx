"use client";

import { useRouter } from "next/navigation";
import { APP_COLORS } from "@/theme/tokens";

export const BackNavigationButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <button
      onClick={handleGoBack}
      type="button"
      style={{
        borderRadius: "14px",
        padding: "12px 20px",
        fontWeight: 700,
        color: APP_COLORS.secondary,
        background: "rgba(118, 182, 41, 0.14)",
        border: "1px solid rgba(118, 182, 41, 0.42)",
        cursor: "pointer",
      }}
    >
      Volver atras
    </button>
  );
};
