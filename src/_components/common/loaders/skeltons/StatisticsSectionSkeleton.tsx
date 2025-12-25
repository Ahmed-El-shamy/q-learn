type Props = {
  cards?: number; // default 4
};

export default function StatisticsSectionSkeleton({ cards = 4 }: Props) {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Optional section header skeleton */}
        <div className="mb-6">
          <div className="h-6 w-40 rounded bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_infinite]" />
          </div>
          <div className="mt-3 h-4 w-72 rounded bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_infinite]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: cards }).map((_, i) => (
            <article
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              aria-busy="true"
              aria-label="Loading statistics"
            >
              {/* top row (icon + label) */}
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_infinite]" />
                </div>

                <div className="h-4 w-20 rounded bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_infinite]" />
                </div>
              </div>

              {/* number */}
              <div className="mt-4 h-8 w-28 rounded bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_infinite]" />
              </div>

              {/* subtitle */}
              <div className="mt-3 h-4 w-40 rounded bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_infinite]" />
              </div>

              {/* tiny line */}
              <div className="mt-4 h-3 w-24 rounded bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_infinite]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
