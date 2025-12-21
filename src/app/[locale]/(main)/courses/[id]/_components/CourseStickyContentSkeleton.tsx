const CourseStickyContentSkeleton = () => {
  return (
    <div className="lg:w-fit w-full animate-pulse">
      {/* Image skeleton */}
      <div className="h-[300px] w-full md:h-[500px] lg:h-[200px] min-w-[280px] xl:min-w-none xl:h-[270px] xl:w-[380px] bg-gray-300 rounded" />
      
      <div className="px-2 xl:px-8">
        {/* Price skeleton */}
        <div className="flex items-end gap-2 sm:gap-4 py-2 xl:py-6">
          <div className="h-6 sm:h-7 md:h-8 bg-gray-300 rounded w-16" />
          <div className="h-4 sm:h-5 md:h-6 lg:h-7 bg-gray-300 rounded w-20" />
        </div>

        {/* Buttons skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-10 sm:h-12 bg-gray-300 rounded w-full" />
          <div className="h-10 sm:h-12 bg-gray-300 rounded w-full" />
        </div>

        {/* Course properties skeleton */}
        <div className="flex flex-col gap-2 sm:gap-3 py-3 sm:py-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded" />
              <div className="h-4 sm:h-5 bg-gray-300 rounded w-40 sm:w-48" />
            </div>
          ))}
        </div>

        {/* Coupon input skeleton */}
        <div className="h-10 sm:h-12 bg-gray-300 rounded w-full mb-4" />

        {/* Share section skeleton */}
        <div className="h-5 sm:h-6 bg-gray-300 rounded w-20 mb-4" />
        <div className="flex items-center gap-2 py-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseStickyContentSkeleton;

