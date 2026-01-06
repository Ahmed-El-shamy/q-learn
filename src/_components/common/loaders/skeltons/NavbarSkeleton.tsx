const NavbarSkeleton = () => {
  return (
    <>
      <header className="hidden md:block bg-white shadow-sm py-4 h-14 border-b border-b-gray-200">
        <div className="containerr flex-between gap-4 xl:gap-6 h-full">
          {/* Logo Skeleton */}
          <div className="animate-pulse">
            <div className="w-32 h-12 bg-gray-200 rounded" />
          </div>

          {/* Search Bar Skeleton */}
          <div className="flex-1 animate-pulse">
            <div className="h-12 bg-gray-200 rounded-md" />
          </div>

          {/* Hotline Skeleton */}
          <div className="animate-pulse flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>

          {/* Nav Icons Skeleton */}
          <div className="animate-pulse flex items-center gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-10 h-10 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default NavbarSkeleton;

