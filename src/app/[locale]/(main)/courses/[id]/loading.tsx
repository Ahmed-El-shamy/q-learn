import CourseHeroSkeleton from "./_components/CourseHeroSkeleton";
import CourseStickyContentSkeleton from "./_components/CourseStickyContentSkeleton";
import CoursePanelsSkeleton from "./_components/CoursePanelsSkeleton";

const LoadingCourseDetails = () => {
    return (
        <div>
            <div className="relative">
                <CourseHeroSkeleton />
                <div className="lg:absolute h-full sm:max-w-[600px] md:max-w-[800px] mx-auto lg:max-w-none w-full lg:w-1/3 top-0 start-2/3 pt-4 px-2 md:px-8 lg:px-0 lg:pt-20">
                    <div className="lg:sticky w-full lg:w-fit z-50 top-0 start-2/3 rounded border border-primary bg-white shadow-lg">
                        <CourseStickyContentSkeleton />  
                    </div>
                </div>
                <CoursePanelsSkeleton />
            </div>
        </div>
    )
}

export default LoadingCourseDetails;