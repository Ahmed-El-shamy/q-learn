import CourseHero from "./_components/CourseHero";
import CoursePanels from "./_components/CoursePanels";
import CourseStickyContent from "./_components/CourseStickyContent";
import api, { Api } from "@/_lib/api/api";
import type { CourseDetails } from "../_types/course.types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CourseDetailsQuery from "./_data/CourseDetailsQuery";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> => {
  try {
    const { id } = await params;
    const response = await api.get<CourseDetails>(
      `${Api.routes.site.courses}/${id}`,
    );
    if (response?.data) {
      const course = response.data;
      return {
        title: course.title,
        description: course.short_description,
      };
    }
    notFound();
  } catch (e) {
    notFound();
  }
};

const Page = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  const courseOptions = CourseDetailsQuery(id);
  await queryClient.prefetchQuery(courseOptions);
  const course = queryClient.getQueryData(courseOptions.queryKey);
  const dehydrated = dehydrate(queryClient);

  if (course) {
    return (
      <div>
        <div className="relative">
          <CourseHero
            category={course.category}
            description={course.short_description}
            hours={course.total_hours}
            instructor={course.instructor?.user?.name ?? ""}
            instructorAvatar={course.instructor?.avatar ?? course.instructor?.user?.avatar_url ?? null}
            rating={parseFloat(course.average_rating)}
            students={course.total_enrollments}
            title={course.title}
          />
          <HydrationBoundary state={dehydrated}>
            <div className="lg:absolute h-full sm:max-w-[600px] md:max-w-[800px] mx-auto lg:max-w-none w-full lg:w-1/3 top-0 start-2/3 pt-4 px-2 md:px-8 lg:px-0 lg:pt-20">
              <div className="lg:sticky w-full lg:w-fit z-50 top-0 start-2/3 rounded border border-primary bg-white shadow-lg">
                <CourseStickyContent />
              </div>
            </div>
            <CoursePanels />
          </HydrationBoundary>
        </div>
      </div>
    );
  }

  // handle the not found case.
  return null;
};

export default Page;
