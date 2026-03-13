import type { Metadata } from "next";
import Link from "next/link";
import { BackNavigationButton } from "@/app/back-navigation-button";
import { APP_COLORS } from "@/theme/tokens";

export const metadata: Metadata = {
  title: "404 | Desarrollo Hada",
  description:
    "La pagina solicitada no fue encontrada. Regresa al inicio o al dashboard.",
};

const NotFoundPage = () => {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: `radial-gradient(circle at 18% 20%, rgba(118, 182, 41, 0.18), transparent 45%), radial-gradient(circle at 80% 75%, rgba(0, 84, 45, 0.2), transparent 38%), linear-gradient(160deg, rgba(118, 182, 41, 0.09) 0%, ${APP_COLORS.surface} 52%, rgba(0, 84, 45, 0.08) 100%)`,
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "28px",
          border: "1px solid rgba(118, 182, 41, 0.2)",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(118,182,41,0.08))",
          boxShadow: "0 20px 44px rgba(58, 89, 26, 0.14)",
          padding: "clamp(24px, 5vw, 48px)",
          color: APP_COLORS.secondary,
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            letterSpacing: "0.24em",
            fontWeight: 700,
            color: APP_COLORS.primary,
          }}
        >
          ERROR DE NAVEGACION
        </p>

        <h1
          style={{
            margin: "12px 0 8px",
            fontSize: "clamp(52px, 11vw, 110px)",
            lineHeight: 1,
            fontWeight: 800,
            color: APP_COLORS.secondary,
          }}
        >
          404
        </h1>

        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "clamp(22px, 4.8vw, 34px)",
            lineHeight: 1.2,
            fontWeight: 700,
          }}
        >
          Esta pagina no existe
        </h2>

        <p
          style={{
            margin: "0 auto",
            maxWidth: "52ch",
            fontSize: "16px",
            lineHeight: 1.55,
            color: "rgba(0,84,45,0.82)",
          }}
        >
          La direccion que escribiste puede ser incorrecta o el contenido fue
          movido. Usa una de estas opciones para continuar.
        </p>

        <div
          style={{
            marginTop: "28px",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              borderRadius: "14px",
              padding: "12px 20px",
              textDecoration: "none",
              fontWeight: 700,
              color: APP_COLORS.surface,
              background: `linear-gradient(135deg, ${APP_COLORS.primary}, ${APP_COLORS.secondary})`,
              boxShadow: "0 12px 24px rgba(0, 84, 45, 0.25)",
            }}
          >
            Ir al inicio
          </Link>

          <Link
            href="/dashboard"
            style={{
              borderRadius: "14px",
              padding: "12px 20px",
              textDecoration: "none",
              fontWeight: 700,
              color: APP_COLORS.secondary,
              background: APP_COLORS.surface,
              border: "1px solid rgba(118, 182, 41, 0.42)",
            }}
          >
            Ir al dashboard
          </Link>

          <BackNavigationButton />
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
