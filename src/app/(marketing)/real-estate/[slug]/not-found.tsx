export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Propiedad no encontrada</h1>
        <p className="text-slate-400">La propiedad que buscas no está disponible o ha sido removida.</p>
        <a
          href="/real-estate"
          className="inline-block quartz-button px-6 py-3 rounded-lg font-semibold mt-6"
        >
          Volver al catálogo
        </a>
      </div>
    </main>
  );
}
