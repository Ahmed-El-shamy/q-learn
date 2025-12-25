const CourseQASkeleton = () => {
    return (
        <div>
            <div className="h-8 sm:h-9 md:h-10 bg-gray-200 rounded w-48 mb-4 sm:mb-6 animate-pulse" />
            <div className="space-y-4 sm:space-y-5">
                {Array(3).fill(0).map((_, i) => (
                    <div key={i}>
                        <div className="flex gap-2 sm:gap-3 md:gap-4 py-4 sm:py-5 md:py-6 border-b border-b-gray-300">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] bg-gray-200 rounded-full flex-shrink-0" />
                            <div className="flex flex-col gap-1 flex-1">
                                <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded w-24 sm:w-32" />
                                <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24" />
                                <div className="h-3 sm:h-4 md:h-5 bg-gray-200 rounded w-full" />
                                <div className="h-3 sm:h-4 md:h-5 bg-gray-200 rounded w-3/4" />
                            </div>
                        </div>
                        {i < 2 && (
                            <div className="px-4 sm:px-6 md:px-8 lg:px-10">
                                {Array(1).fill(0).map((_, j) => (
                                    <div key={j} className="flex gap-2 sm:gap-3 md:gap-4 py-4 sm:py-6 md:py-8 border-b border-b-gray-300">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] bg-gray-200 rounded-full flex-shrink-0" />
                                        <div className="flex flex-col gap-1 flex-1">
                                            <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded w-24 sm:w-32" />
                                            <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24" />
                                            <div className="h-3 sm:h-4 md:h-5 bg-gray-200 rounded w-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded w-48 sm:w-64 animate-pulse" />
            </div>
        </div>
    );
};

export default CourseQASkeleton;

