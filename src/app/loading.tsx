import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto">
      {/* Navbar Skeleton */}
      <div className="h-16 border-b">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <Skeleton className="h-10 w-48 mx-auto" />
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-6 border rounded-lg">
              <Skeleton className="h-12 w-12 mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Blog Section Skeleton */}
      <div className="py-24 px-4">
        <div className="text-center mb-12">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="border-t py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i}>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3].map(j => (
                    <Skeleton key={j} className="h-4 w-24" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
