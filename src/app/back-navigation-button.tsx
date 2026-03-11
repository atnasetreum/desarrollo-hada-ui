"use client";

import { useRouter } from "next/navigation";

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
        color: "#35521a",
        background: "#f4f9eb",
        border: "1px solid rgba(93, 142, 42, 0.42)",
        cursor: "pointer",
      }}
    >
      Volver atras
    </button>
  );
};
