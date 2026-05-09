"use client";

import { ErrorBoundary } from "@/components/errors/ErrorBoundary";

interface PropertyListingErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PropertyListingError({
  error,
  reset,
}: PropertyListingErrorProps) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="Portafolio temporalmente no disponible"
      description="Estamos recuperando el acceso a nuestro portafolio de activos. Por favor, intenta nuevamente en unos momentos."
    />
  );
}
