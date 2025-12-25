"use client";
import { instructorsOptions } from "./_quires/teachersOptions";
import { useQuery } from "@tanstack/react-query";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
import CategoryCard from "../../category/_components/CategoryCard";
import type { Instructor } from "@/types/instructor.types";
import TeacherCard from "./TeacherCard";
const ShowTeachers = () => {
  const queryResult = useQuery(instructorsOptions());

  return (
    <section aria-labelledby="teachers-heading">
      <div className="text-center space-y-4">
        <h2
          id="teachers-heading"
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
        >
          Expert Teachers
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
          Here is short details about our institute, Also you can see how we
          work
        </p>
        {queryResult?.data && queryResult?.data?.length > 0 ? (
          <HorizontalCarousel ariaLabel="Top categories slider">
            {queryResult?.data?.map((item: Instructor) => (
              <TeacherCard instructor={item} />
            ))}
          </HorizontalCarousel>
        ) : null}
      </div>
    </section>
  );
};

export default ShowTeachers;
