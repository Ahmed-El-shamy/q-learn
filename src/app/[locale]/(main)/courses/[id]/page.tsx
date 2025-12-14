import CourseHero from "./_components/CourseHero";
import CoursePanels from "./_components/CoursePanels";
import CourseStickyContent from "./_components/CourseStickyContent";

const Page = () => {
  return (
    <div>
      <div className="relative">
        <CourseHero />
        <div className="lg:absolute h-full sm:max-w-[600px] md:max-w-[800px] mx-auto lg:max-w-none w-full lg:w-1/3 top-0 start-2/3 pt-4 px-2 md:px-8 lg:px-0 lg:pt-20">
          <div className="lg:sticky w-full lg:w-fit z-50 top-0 start-2/3 rounded border border-primary bg-white shadow-lg">
            <CourseStickyContent />  
          </div>
        </div>
        <CoursePanels />
      </div>
    </div>
  );
};

export default Page;