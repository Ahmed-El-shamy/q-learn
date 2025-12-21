const CoursePanelsSkeleton = () => {
  return (
    <div className="rounded-lg mx-auto max-w-[600px] md:max-w-[800px] lg:max-w-[1400px] px-2 md:px-8 pt-6 animate-pulse">
      <div className="w-full lg:w-2/3 bg-white border shadow-md rounded py-2 px-4">
        {/* Tabs skeleton */}
        <div className="flex items-center gap-2 w-full py-1 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 sm:h-10 bg-gray-300 rounded w-20 sm:w-24" />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="py-10 space-y-6">
          {/* Title skeleton */}
          <div className="h-6 sm:h-7 md:h-8 bg-gray-300 rounded w-48" />
          
          {/* Paragraph skeletons */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
          </div>

          {/* Subtitle skeleton */}
          <div className="h-6 sm:h-7 md:h-8 bg-gray-300 rounded w-56 mt-6" />
          
          {/* More paragraph skeletons */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>

          {/* Another subtitle skeleton */}
          <div className="h-6 sm:h-7 md:h-8 bg-gray-300 rounded w-52 mt-6" />
          
          {/* More paragraph skeletons */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePanelsSkeleton;

