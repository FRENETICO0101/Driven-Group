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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-light text-slate-100 mb-4">{title}</h1>
        <p className="text-slate-400 mb-8 text-sm leading-relaxed">
          {description}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 text-sm font-medium text-slate-100 border border-slate-700 hover:border-slate-500 transition-colors"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
}
