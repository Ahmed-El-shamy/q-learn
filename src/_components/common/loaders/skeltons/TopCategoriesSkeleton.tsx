// app/[locale]/_components/TopCategoriesSkeleton.tsx
export default function TopCategoriesSkeleton() {
  return (
    <section aria-label="Loading top categories">
      <div className="text-center mb-10 md:mb-12">
        <div className="h-9 w-56 mx-auto rounded bg-slate-200 animate-pulse mb-4" />
        <div className="h-4 w-[520px] max-w-full mx-auto rounded bg-slate-200 animate-pulse" />
      </div>

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[240px] rounded-2xl bg-white p-4 shadow"
          >
            <div className="h-28 rounded-xl bg-slate-200 animate-pulse" />
            <div className="h-5 w-3/4 mt-4 rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-1/2 mt-2 rounded bg-slate-200 animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}
