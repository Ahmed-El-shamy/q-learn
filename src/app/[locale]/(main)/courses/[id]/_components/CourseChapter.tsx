import { useTranslations } from "next-intl";
import { Chapter } from "../../_types/course.types";
import { ChevronDown, CirclePlay, Lock } from "lucide-react";
import VideoDialog from "./VideoDialog";

const CourseChapter = ({
    chapter,
    expanded,
    toggleChapter,
}: {
    chapter: Chapter,
    expanded: boolean,
    toggleChapter: (chapterId: number) => void,
}) => {
    const t = useTranslations("courses");
    const lectureCount = chapter.lessons_count || chapter.lessons.length;

    return (
        <>
        <div onClick={() => toggleChapter(chapter.id)} className="main-background cursor-pointer text-white flex justify-between items-center p-2 sm:p-3 md:p-4 rounded">
            <p className="text-sm sm:text-base md:text-lg font-bold flex-1 pr-2">
                {chapter.title}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base shrink-0">
                <div>
                    <span>{lectureCount}</span>
                    <span>{t("lectures")}</span>
                </div>
                <ChevronDown size={14} className={`sm:w-4 sm:h-4 md:w-4 md:h-4 ${expanded ? "rotate-180" : "rotate-0"} transition-transform duration-500 ease-in-out`} strokeWidth={1.5} />
            </div>
        </div>
        <div className={`grid transition-all duration-500 ease-in-out overflow-hidden bg-white ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="min-h-0 p-1 sm:p-2">
                {
                    chapter.lessons.map((lesson) => (
                        <div key={lesson.id} className="w-full px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg border-b">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                                <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-1/2 line-clamp-1">
                                    <div className="shrink-0">
                                        {
                                            (lesson.is_free_preview && lesson.video) ?
                                            <CirclePlay size={16} className="sm:w-5 sm:h-5" />
                                            :
                                            <Lock size={16} className="sm:w-5 sm:h-5" />
                                        }
                                    </div>
                                    <p className="truncate">
                                        {lesson.title}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    {
                                        (lesson.is_free_preview && lesson.video) && (
                                            <VideoDialog videoUrl={lesson.video}>
                                                <p className="hover:underline text-primary cursor-pointer text-xs sm:text-sm md:text-base">
                                                    {t("preview")}
                                                </p>
                                            </VideoDialog>
                                        )
                                    }
                                </div>
                            </div>
                            <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-gray-600">
                                {lesson.description}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default CourseChapter;