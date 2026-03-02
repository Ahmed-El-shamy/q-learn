import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import CourseChapter from "./CourseChapter";
import CourseDetailsQuery from "../_data/CourseDetailsQuery";
import CustomSkeleton from "@/_components/common/loaders/skeltons/CustomSkeleton";

const CourseContent = () => {
  const t = useTranslations("courses");
  const params: { id: string } = useParams();

  const { data: course, isLoading } = useQuery({
    ...CourseDetailsQuery(params.id),
    refetchOnMount: false,
  });

  const content = course?.content;

  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(
    new Set(),
  );

  const toggleChapter = useCallback((chapterId: number) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  }, []);

  const toggleAllChapters = useCallback(() => {
    if (!content?.chapters) return;
    if (expandedChapters.size === content.chapters.length) {
      setExpandedChapters(new Set());
    } else {
      setExpandedChapters(
        new Set(content.chapters.map((chapter) => chapter.id)),
      );
    }
  }, [expandedChapters.size, content?.chapters]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 sm:gap-3">
        <p className="text-base sm:text-lg md:text-xl font-bold">
          {t("course-content")}
        </p>
        <CustomSkeleton />
      </div>
    );
  }

  // Handle empty content case
  if (!content || !content.chapters || content.chapters.length === 0) {
    return (
      <div className="flex flex-col gap-2 sm:gap-3">
        <p className="text-base sm:text-lg md:text-xl font-bold">
          {t("course-content")}
        </p>
        <div className="border border-gray-300 rounded-lg p-4 sm:p-5 text-center text-gray-600 text-sm">
          <p>
            {t("no-content-available") ||
              "No content available for this course."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <p className="text-base sm:text-lg md:text-xl font-bold">
        {t("course-content")}
      </p>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs sm:text-sm">
          <span>
            {content.total_chapters}{" "}
            {t(content.total_chapters === 1 ? "chapter" : "chapters")}
          </span>
          <span className="text-gray-600">•</span>
          <span>
            {content.lectures}{" "}
            {t(content.lectures === 1 ? "lecture" : "lectures")}
          </span>
          <span className="text-gray-600">•</span>
          <span>
            {content.quizzes} {t(content.quizzes === 1 ? "quiz" : "quizzes")}
          </span>
        </div>
        {content.chapters.length > 0 && (
          <button
            className="text-primary text-xs sm:text-sm cursor-pointer"
            onClick={toggleAllChapters}
          >
            {t("toggle-all-chapters")}
          </button>
        )}
      </div>
      <div className="flex flex-col w-full">
        {content.chapters.map((chapter) => (
          <CourseChapter
            key={chapter.id}
            chapter={chapter}
            expanded={expandedChapters.has(chapter.id)}
            toggleChapter={toggleChapter}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
