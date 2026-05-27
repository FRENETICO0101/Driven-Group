"use client";

export interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
}

export function ErrorBoundary({
  error,
  reset,
  title = "Algo salió mal",
  description = "Estamos trabajando para solucionar este problema.",
}: ErrorBoundaryProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4" role="alert">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-light text-white mb-4">{title}</h1>
        <p className="text-gray mb-8 text-sm leading-relaxed">
          {description}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 text-sm font-medium text-white border border-dark-gray hover:border-gray transition-colors focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Reintentar cargar la página"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
}
