import CourseHero from "./_components/CourseHero";
import CoursePanels from "./_components/CoursePanels";

const Page = () => {
  return (
    <div>
      <div className="relative">
        <CourseHero />
        <CoursePanels />
        <div className="absolute h-full w-1/3 top-0 start-2/3 pt-20">
          <div className="sticky top-0 start-2/3 rounded border border-primary bg-white shadow-lg w-[80%]">
            Hello there 
          </div>
        </div>
      </div>
      <div className="h-screen">

      </div>
    </div>
  );
};

export default Page;