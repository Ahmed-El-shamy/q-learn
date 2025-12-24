"use client";

import CoursesContent from "./_components/CoursesContent";
import { CourseFilterProvider } from "./_services/CourseFilterProvider";

const Page = () => {
  return (
    <CourseFilterProvider>
      <CoursesContent />
    </CourseFilterProvider>
  );
};

export default Page;
