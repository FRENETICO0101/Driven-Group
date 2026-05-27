export function PropertyListingSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="h-64 sm:h-80 bg-gradient-to-b from-black to-black animate-pulse" />

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="h-10 w-32 bg-black rounded animate-pulse" />
          <div className="h-10 w-32 bg-black rounded animate-pulse" />
          <div className="h-10 w-32 bg-black rounded animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square bg-black rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-black rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-black rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
