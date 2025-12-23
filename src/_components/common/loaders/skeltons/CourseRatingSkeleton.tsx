const CourseRatingSkeleton = () => {
    return (
        <div>
            <div className="h-8 sm:h-9 md:h-10 bg-gray-200 rounded w-48 mb-4 sm:mb-6" />
            <div className="rounded border-gray-300 border p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="h-12 sm:h-16 md:h-20 bg-gray-200 rounded w-20 sm:w-24 md:w-28" />
                    <div className="flex gap-1">
                        {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="h-5 w-5 bg-gray-200 rounded" />
                        ))}
                    </div>
                    <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded w-24 sm:w-28 md:w-32" />
                </div>
                <div className="flex-1 flex flex-col gap-2 sm:gap-3 md:gap-4">
                    {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="w-full flex items-center gap-2 sm:gap-3">
                            <div className="flex-1 rounded-full bg-gray-200 h-4 sm:h-5" />
                            <div className="flex gap-1">
                                {Array(5).fill(0).map((_, j) => (
                                    <div key={j} className="h-4 w-4 bg-gray-200 rounded" />
                                ))}
                            </div>
                            <div className="h-4 sm:h-5 bg-gray-200 rounded w-8 sm:w-10" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseRatingSkeleton;

