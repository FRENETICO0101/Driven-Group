export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-black">Propiedad no encontrada</h1>
        <p className="text-gray">La propiedad que buscas no está disponible o ha sido removida.</p>
        <a
          href="/real-estate"
          className="inline-block bg-black text-white hover:bg-dark-gray transition-colors px-6 py-3 rounded-lg font-semibold mt-6"
        >
          Volver al catálogo
        </a>
      </div>
    </main>
  );
}
