import DialogComponent from "@/_components/common/dialog/Dialog";
import CourseHero from "./_components/CourseHero";
import CoursePanels from "./_components/CoursePanels";
import CourseStickyContent from "./_components/CourseStickyContent";
import api, { Api } from "@/_lib/api/api";
import { Course } from "../_types/course.types";

const Page = async ({
  params
}: {
  params: Promise<{
    id: string
  }>
}) => {
  const {id} = await params;
  const response = await api.get<Course>(`${Api.routes.site.courses}/${id}`);
  const course = response?.data;
  if(course) {
  return (
      <div>
        <div className="relative">
          <CourseHero
            category={course.category}
            description={course.description}
            hours={course.total_hours}
            instructor={course.user || ""}
            rating={parseFloat(course.average_rating)}
            students={course.total_enrollments}
            title={course.title}
          />
          <div className="lg:absolute h-full sm:max-w-[600px] md:max-w-[800px] mx-auto lg:max-w-none w-full lg:w-1/3 top-0 start-2/3 pt-4 px-2 md:px-8 lg:px-0 lg:pt-20">
            <div className="lg:sticky w-full lg:w-fit z-50 top-0 start-2/3 rounded border border-primary bg-white shadow-lg">
              <CourseStickyContent />  
            </div>
          </div>
          <CoursePanels />
        </div>
      </div>
    );
  }

  // handle the not found case.
  return null;
};

export default Page;