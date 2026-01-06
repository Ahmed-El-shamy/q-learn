'use client';

import CourseDetailsQuery from "@/app/[locale]/(main)/courses/[id]/_data/CourseDetailsQuery";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import CustomSkeleton from "@/_components/common/loaders/skeltons/CustomSkeleton";
import { Link } from "@/i18n/navigation";
import { Chapter } from "@/app/[locale]/(main)/courses/_types/course.types";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface CourseChapterWithLinksProps {
    chapter: Chapter;
    expanded: boolean;
    toggleChapter: (chapterId: number) => void;
    courseId: string;
    activeLessonId: number | null;
}

const CourseChapterWithLinks = ({ chapter, expanded, toggleChapter, activeLessonId }: CourseChapterWithLinksProps) => {
    const {course: courseId} = useParams();
    const t = useTranslations("courses");
    const lectureCount = chapter.lessons_count || chapter.lessons.length;

    return (
        <div>
            <div onClick={() => toggleChapter(chapter.id)} className="cursor-pointer text-white border-b border-gray-300 flex flex-col gradient-background px-4 py-3">
                <div className="flex justify-between items-center gap-2">
                    <p className="text-sm sm:text-base md:text-lg font-bold truncate flex-1">
                        {chapter.title}
                    </p>
                    <ChevronDown size={14} className={`sm:w-4 sm:h-4 md:w-4 md:h-4 text-white shrink-0 ${expanded ? "rotate-180" : "rotate-0"} transition-transform duration-500 ease-in-out`} strokeWidth={1.5} />
                </div>
                <p className="text-xs sm:text-sm text-white/80 mt-1">
                    {lectureCount} {lectureCount === 1 ? t("lectures") || "lecture" : t("lectures") || "lectures"}
                </p>
            </div>
            <div className={`grid transition-all duration-500 ease-in-out overflow-hidden bg-white ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="min-h-0">
                    {
                        chapter.lessons.map((lesson) => (
                            <Link 
                                key={lesson.id} 
                                href={`/course-content/${courseId}/${lesson.id}`}
                                className={`w-full px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-sm sm:text-base flex items-center gap-2 transition-colors ${
                                    activeLessonId === lesson.id 
                                        ? 'bg-purple-50 text-purple-700 font-medium' 
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                <input 
                                    type="checkbox" 
                                    checked={(lesson as any).is_finished || (lesson as any).completed || false}
                                    readOnly
                                    className="w-4 h-4 cursor-pointer accent-purple-600 shrink-0"
                                    onClick={(e) => e.preventDefault()}
                                />
                                <p className="line-clamp-1 flex-1">
                                    {lesson.title}
                                </p>
                                {(lesson as any).duration && (
                                    <span className="text-xs sm:text-sm text-gray-500 shrink-0">
                                        {(lesson as any).duration}
                                    </span>
                                )}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

const CourseSidebar = () => {
    const params = useParams<{course: string; lesson?: string}>();
    const {course: courseId, lesson: lessonId} = params;
    const { data: course, isLoading } = useQuery({
        ...CourseDetailsQuery(courseId),
        refetchOnMount: false
    });
    const t = useTranslations("courses");

    const content = course?.content;
    const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
    
    // Effect to expand chapter containing the active lesson
    useEffect(() => {
        if (!lessonId || !content?.chapters || content.chapters.length === 0) return;

        // Find the chapter containing the lesson
        for (const chapter of content.chapters) {
            const lesson = chapter.lessons.find(l => l.id.toString() === lessonId);
            if (lesson) {
                setExpandedChapter(chapter.id);
                break;
            }
        }
    }, [lessonId, content]);

    const toggleChapter = useCallback((chapterId: number) => {
        setExpandedChapter((prev) => {
            if (prev === chapterId) {
                return null;
            }
            return chapterId;
        });
    }, []);

    if (isLoading) {
        return (
            <div className="w-full xl:w-1/5 xl:h-full xl:overflow-y-auto border-t xl:border-t-0 xl:border-l border-gray-300 bg-white">
                <CustomSkeleton />
            </div>
        );
    }

    // Handle empty content case
    if (!content || !content.chapters || content.chapters.length === 0) {
        return (
            <div className="w-full xl:w-1/5 xl:h-full xl:overflow-y-auto border-t xl:border-t-0 xl:border-l border-gray-300 bg-white">
                <div className="p-4 text-center text-gray-600">
                    <p>{t("noChaptersAvailable")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full xl:w-1/5 xl:h-full py-5 xl:py-0 xl:overflow-y-auto border-t xl:border-t-0 xl:border-l border-gray-300 bg-white">
            <div className="flex flex-col px-4">
                {content.chapters.map((chapter) => (
                    <CourseChapterWithLinks
                        key={chapter.id}
                        chapter={chapter}
                        expanded={expandedChapter === chapter.id}
                        toggleChapter={toggleChapter}
                        courseId={courseId}
                        activeLessonId={lessonId ? parseInt(lessonId) : null}
                    />
                ))}
            </div>
        </div>
    );
}

export default CourseSidebar;

