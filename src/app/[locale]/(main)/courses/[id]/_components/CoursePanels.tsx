"use client";

import { useRef, useState } from "react";
import CourseOverview from "./CourseOverview";
import CourseContent from "./CourseContent";
import CourseInstructor from "./CourseInstructor";
import CourseRating from "./CourseRating";
import CourseQA from "./CourseQA";
import MainBtn from "@/_components/common/buttons/MainBtn";
import StudentsAlsoBought from "./StudentsAlsoBought";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CourseDetailsQuery, {
  courseReviewsQuery,
  courseQAQuery,
} from "../_data/CourseDetailsQuery";

const panels = [
  {
    title: "overview",
  },
  {
    title: "content",
  },
  {
    title: "instructor",
  },
  {
    title: "QA",
  },
  {
    title: "reviews",
  },
] as const;

const CoursePanels = () => {
  const t = useTranslations("courses");
  const [currentPanel, setCurrentPanel] = useState<
    (typeof panels)[number]["title"]
  >(panels[0].title);
  const panelsRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const params: { id: string } = useParams();
  const query = useQuery({
    ...CourseDetailsQuery(params.id),
    refetchOnMount: false,
  });
  const course = query.data!;

  // prefetching the reviews for later consumption when the reviews panel is opened.
  queryClient.prefetchQuery({
    ...courseReviewsQuery(params.id),
  });

  // prefetching the QA for later consumption when the QA panel is opened.
  queryClient.prefetchQuery({
    ...courseQAQuery(params.id),
  });

  function renderActivePanel() {
    switch (currentPanel) {
      case "overview":
        return <CourseOverview overview={course.description} />;
      case "content":
        return <CourseContent />;
      case "instructor":
        return <CourseInstructor />;
      case "reviews":
        return <CourseRating />;
      case "QA":
        return <CourseQA />;
    }
  }

  function changeActivePanel(title: (typeof panels)[number]["title"]) {
    panelsRef.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentPanel(title);
  }

  return (
    <div className="rounded-lg mx-auto max-w-[600px] md:max-w-[800px] lg:max-w-[1400px] px-2 md:px-8 pt-6">
      <div className="w-full lg:w-2/3 bg-white border shadow-md rounded py-2 px-4">
        <div className="h-0" ref={panelsRef} />
        <div className="flex items-center gap-2 w-full py-1 overflow-x-auto sticky top-0 bg-white z-40">
          {panels.map((panel) => (
            <MainBtn
              variant={currentPanel === panel.title ? "main" : "secondary"}
              containerClassName="min-w-fit"
              className={
                currentPanel === panel.title ? "pointer-events-none" : ""
              }
              onClick={() => changeActivePanel(panel.title)}
              key={panel.title}
            >
              {t(panel.title)}
            </MainBtn>
          ))}
        </div>
        <div className="py-10">{renderActivePanel()}</div>
        <StudentsAlsoBought />
      </div>
    </div>
  );
};

export default CoursePanels;
