const CourseHeroSkeleton = () => {
  return (
    <div className="w-full bg-gray-300 relative py-22 animate-pulse">
      <div className="absolute top-0 left-0 h-full w-full bg-black/60" />
      <div className="max-w-[600px] md:max-w-[800px] lg:max-w-[1400px] px-2 md:px-8 mx-auto relative z-10">
        <div className="w-full lg:w-2/3 flex flex-col gap-2">
          {/* Breadcrumb skeleton */}
          <div className="h-3 sm:h-4 bg-white/40 rounded w-48" />
          
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-6 sm:h-7 md:h-8 lg:h-9 bg-white/40 rounded w-full" />
            <div className="h-6 sm:h-7 md:h-8 lg:h-9 bg-white/40 rounded w-3/4" />
          </div>
          
          {/* Tags skeleton */}
          <div className="py-4 sm:py-6 md:py-8 flex items-center gap-2 sm:gap-4">
            <div className="h-4 sm:h-5 bg-white/40 rounded w-20" />
            <div className="h-4 sm:h-5 bg-white/40 rounded w-24" />
            <div className="h-4 sm:h-5 bg-white/40 rounded w-16" />
          </div>
          
          {/* Stats skeleton */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-4">
            {/* Instructor badge */}
            <div className="bg-white/40 p-1.5 sm:p-2 rounded w-32 h-8 sm:h-10" />
            {/* Students count */}
            <div className="bg-white/40 p-1.5 sm:p-2 rounded w-28 h-8 sm:h-10" />
            {/* Duration */}
            <div className="bg-white/40 p-1.5 sm:p-2 rounded w-32 h-8 sm:h-10" />
            {/* Rating */}
            <div className="bg-white/40 p-1.5 sm:p-2 rounded w-24 h-8 sm:h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeroSkeleton;

