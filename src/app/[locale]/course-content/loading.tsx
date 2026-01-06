export default function Loading() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="w-full py-2 px-6 flex justify-between items-center border-b border-gray-200 bg-white animate-pulse">
        {/* Logo Skeleton */}
        <div className="h-10 w-48 bg-gray-200 rounded" />
        
        {/* Course Title and Controls */}
        <div className="flex items-center gap-4">
          {/* Course Title Skeleton */}
          <div className="h-6 w-64 bg-gray-200 rounded" />
          
          {/* Controls Skeleton */}
          <div className="flex items-center gap-3">
            {/* Auto Next Toggle */}
            <div className="h-8 w-20 bg-gray-200 rounded" />
            {/* Navigation Arrows */}
            <div className="h-8 w-8 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-200 rounded" />
            {/* Progress Indicator */}
            <div className="h-6 w-16 bg-gray-200 rounded" />
            {/* Menu Icon */}
            <div className="h-8 w-8 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Video Player */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Video Title Section */}
          <div className="px-6 py-4 border-b border-gray-200 animate-pulse">
            <div className="flex items-center gap-3">
              {/* Profile Picture Skeleton */}
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              {/* Video Title Skeleton */}
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>

          {/* Video Player Area */}
          <div className="flex-1 relative bg-gray-900 flex items-center justify-center animate-pulse">
            {/* Video Content Skeleton */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              {/* Play Button Skeleton */}
              <div className="w-20 h-20 bg-gray-700 rounded-full" />
            </div>
          </div>

          {/* Video Controls */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-100 animate-pulse">
            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <div className="w-10 h-10 bg-gray-200 rounded" />
              {/* Rewind/Fast Forward */}
              <div className="w-8 h-8 bg-gray-200 rounded" />
              <div className="w-8 h-8 bg-gray-200 rounded" />
              {/* Progress Bar */}
              <div className="flex-1 h-2 bg-gray-200 rounded" />
              {/* Time Display */}
              <div className="h-4 w-20 bg-gray-200 rounded" />
              {/* Volume Control */}
              <div className="w-24 h-2 bg-gray-200 rounded" />
              {/* Settings */}
              <div className="w-8 h-8 bg-gray-200 rounded" />
              {/* Fullscreen */}
              <div className="w-8 h-8 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Course Navigation */}
        <div className="w-80 border-l border-gray-200 bg-white flex flex-col animate-pulse">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <div className="flex-1 py-3 px-4 bg-gray-100">
              <div className="h-5 w-24 bg-gray-200 rounded mx-auto" />
            </div>
            <div className="flex-1 py-3 px-4">
              <div className="h-5 w-16 bg-gray-200 rounded mx-auto" />
            </div>
          </div>

          {/* Course Sections */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Section 1 */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="pl-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-2/3" />
              <div className="pl-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
              </div>
            </div>

            {/* Section 3 - Expanded */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-1/2" />
              <div className="pl-4 space-y-3">
                {/* Lesson Items */}
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {/* Icon Skeleton */}
                    <div className="w-5 h-5 bg-gray-200 rounded" />
                    {/* Lesson Title and Duration */}
                    <div className="flex-1 space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Sections */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-2/3" />
                <div className="pl-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

