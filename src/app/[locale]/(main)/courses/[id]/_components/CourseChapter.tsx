import { useTranslations } from "next-intl";
import { type CourseChapter as CourseChapterType } from "../course-details.types";
import { ChevronDown, CirclePlay, Lock } from "lucide-react";

const CourseChapter = ({
    chapter,
    toggleChapter,
    index,
}: {
    chapter: CourseChapterType,
    toggleChapter: (index: number) => void,
    index: number
}) => {
    const t = useTranslations("courses");
    const lectureCount = chapter.lessons.length;

    return (
        <>
        <div onClick={() => toggleChapter(index)} className="main-background cursor-pointer text-white flex justify-between items-center p-2 sm:p-3 md:p-4 rounded">
            <p className="text-sm sm:text-base md:text-lg font-bold flex-1 pr-2">
                {chapter.title}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base flex-shrink-0">
                <div>
                    <span>{lectureCount}</span>
                    <span>{t("lectures")}</span>
                    <span className="text-white/80">•</span>
                    <span>{chapter.duration}</span>
                </div>
                <ChevronDown size={14} className={`sm:w-4 sm:h-4 md:w-4 md:h-4 ${chapter.expanded ? "rotate-180" : "rotate-0"} transition-transform duration-500 ease-in-out`} strokeWidth={1.5} />
            </div>
        </div>
        <div className={`grid transition-all duration-500 ease-in-out overflow-hidden bg-white ${chapter.expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="min-h-0 p-1 sm:p-2">
                {
                    chapter.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="w-full px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg border-b">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                                <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-1/2 line-clamp-1">
                                    <div className="flex-shrink-0">
                                        {
                                            lesson.isLocked ?
                                            <Lock size={16} className="sm:w-5 sm:h-5" />
                                            :
                                            <CirclePlay size={16} className="sm:w-5 sm:h-5" />
                                        }
                                    </div>
                                    <p className="truncate">
                                        {lesson.name}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    {
                                        !lesson.isLocked && (
                                            <p className="hover:underline text-primary cursor-pointer text-xs sm:text-sm md:text-base">
                                                {t("preview")}
                                            </p>
                                        )
                                    }
                                    <div className="text-xs sm:text-sm md:text-base">
                                        {lesson.duration}
                                    </div>
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