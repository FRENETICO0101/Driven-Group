export interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({
  title = "No hay resultados",
  description = "Intenta ajustar tus filtros o explora otras opciones.",
  action,
}: EmptyStateProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-light text-slate-100 mb-3">{title}</h2>
        <p className="text-slate-400 text-sm mb-6">{description}</p>
        {action && (
          <a
            href={action.href}
            className="inline-block px-6 py-2 text-sm font-medium text-slate-100 border border-slate-700 hover:border-slate-500 transition-colors"
          >
            {action.label}
          </a>
        )}
      </div>
    </div>
  );
}
