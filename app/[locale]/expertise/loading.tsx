import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <section className="py-24 lg:py-32 bg-background border-b border-border/50">
        <div className="container px-6">
          <div className="max-w-4xl space-y-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </section>

      {/* Services Skeleton */}
      <section className="py-24 lg:py-32">
        <div className="container px-6">
          <div className="space-y-40">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className={`lg:col-span-6 ${i % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-7'}`}>
                  <div className="space-y-6">
                    <Skeleton className="h-32 w-32 rounded-full opacity-10" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-px w-16" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </div>
                <div className={`lg:col-span-5 ${i % 2 === 0 ? 'lg:col-start-8' : 'lg:col-start-1 lg:row-start-1'}`}>
                  <Skeleton className="aspect-square w-full rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
