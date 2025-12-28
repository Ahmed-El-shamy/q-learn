export default function Loading() {
  return (
    <div className="containerr space-between-sections">
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">
          {/* --------------------- Main Content Skeleton --------------------- */}
          <article className="border border-[#d1d1d1] overflow-hidden flex flex-col h-full bg-white animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full h-72 sm:h-92 md:h-110 xl:h-132 bg-gray-200" />

            <div className="px-5 py-10 md:p-10 flex flex-col gap-8 flex-1">
              {/* Author and Date Badges Skeleton */}
              <div className="flex flex-wrap gap-3 md:gap-5">
                {/* Author Badge Skeleton */}
                <div className="flex items-center py-2 sm:py-1 ps-3 sm:ps-1 pe-7 bg-gray-200 rounded-full gap-2">
                  <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-full bg-gray-300" />
                  <div className="h-4 sm:h-5 bg-gray-300 rounded w-24 sm:w-32" />
                </div>

                {/* Date Badge Skeleton */}
                <div className="flex items-center py-2 sm:py-1 px-7 bg-gray-200 rounded-full">
                  <div className="h-4 sm:h-5 bg-gray-300 rounded w-20 sm:w-28" />
                </div>
              </div>

              {/* Title and Content Skeleton */}
              <div className="space-y-5">
                {/* Title Skeleton */}
                <div className="space-y-3">
                  <div className="h-8 md:h-10 bg-gray-200 rounded w-3/4" />
                  <div className="h-8 md:h-10 bg-gray-200 rounded w-1/2" />
                </div>

                {/* Description Content Skeleton */}
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-11/12" />
                  <div className="h-4 bg-gray-200 rounded w-10/12" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-9/12" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>

              {/* Social Icons Skeleton */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

