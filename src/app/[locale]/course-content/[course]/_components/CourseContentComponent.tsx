'use client';

import CourseDetailsQuery from "@/app/[locale]/(main)/courses/[id]/_data/CourseDetailsQuery";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CustomSkeleton from "@/_components/common/loaders/skeltons/CustomSkeleton";
import { useTranslations } from "next-intl";
import QuizComponent from "./QuizComponent";

const CourseContentComponent = () => {
    const params = useParams<{course: string; lesson: string}>();
    const {course: courseId, lesson: lessonId} = params;
    const { data: course, isLoading } = useQuery({
        ...CourseDetailsQuery(courseId),
        refetchOnMount: false
    });
    const t = useTranslations("courses");

    const content = course?.content;
    
    // Find the current lesson based on lessonId
    const currentLesson = lessonId && content?.chapters
        ? content.chapters
            .flatMap(chapter => chapter.lessons)
            .find(lesson => lesson.id.toString() === lessonId)
        : null;

    if (isLoading) {
        return (
            <div className="w-full aspect-video xl:h-[calc(100vh-56px)] flex items-center justify-center bg-black">
                <CustomSkeleton />
            </div>
        );
    }

    // Handle empty content case
    if (!content || !content.chapters || content.chapters.length === 0) {
        return (
            <div className="w-full aspect-video xl:h-[calc(100vh-56px)] flex items-center justify-center bg-black">
                <p className="text-white">{t("noContentAvailable")}</p>
            </div>
        );
    }

    return (
        <div className="w-full aspect-video h-[60vh] xl:h-[calc(100vh-56px)] bg-black">
            {currentLesson?.type === "quiz" && currentLesson?.quiz ? (
                <QuizComponent quizId={currentLesson.quiz.id} />
            ) : currentLesson?.type === "video" && currentLesson?.video ? (
                <video 
                    className="w-full h-full object-contain"
                    controls
                    key={currentLesson.video}
                >
                    <source src={currentLesson.video} type="video/mp4" />
                    {t("videoNotSupported")}
                </video>
            ) : (
                <div className="text-white text-center">
                    <p>{t("noVideoAvailable")}</p>
                </div>
            )}
        </div>
    );
}

export default CourseContentComponent;