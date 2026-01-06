export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="border border-[#d1d1d1] overflow-hidden flex flex-col h-full animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-full h-52 bg-gray-200" />

          <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
            {/* User and date skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/2" />

            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-full" />
              <div className="h-6 bg-gray-200 rounded w-3/4" />
            </div>

            {/* Button and time skeleton */}
            <div className="flex flex-row lg:flex-col xl:flex-row items-center lg:items-start xl:items-center gap-8 lg:gap-5 xl:gap-8 mt-5">
              <div className="h-10 bg-gray-200 rounded w-32" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
