"use client";

import { ErrorBoundary } from "@/components/errors/ErrorBoundary";

interface PropertyDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PropertyDetailError({
  error,
  reset,
}: PropertyDetailErrorProps) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="Propiedad no encontrada"
      description="La propiedad que buscas no está disponible o ha sido removida. Vuelve al portafolio para explorar otras opciones."
    />
  );
}
