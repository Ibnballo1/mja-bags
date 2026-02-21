export default function Loading() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Header skeleton */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-9 w-48 bg-cream-200 rounded-xl animate-pulse" />
          <div className="h-4 w-32 bg-cream-100 rounded-xl animate-pulse mt-2" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white shadow-card border border-cream-200 overflow-hidden"
            >
              <div className="aspect-[4/5] bg-cream-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-16 bg-cream-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-cream-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-cream-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
