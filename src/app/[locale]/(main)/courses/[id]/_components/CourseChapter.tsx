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
        <div onClick={() => toggleChapter(index)} className="bg-primary cursor-pointer text-white flex justify-between items-center p-4 rounded">
            <p className="text-lg font-bold">
                {chapter.title}
            </p>
            <div className="flex items-center gap-2 text-sm md:text-base">
                <div>
                    <span>{lectureCount}</span>
                    <span>{t("lectures")}</span>
                    <span className="text-white/80">•</span>
                    <span>{chapter.duration}</span>
                </div>
                <ChevronDown size={16} color="#ffffff" className={`${chapter.expanded ? "rotate-180" : "rotate-0"} transition-transform duration-500 ease-in-out`} strokeWidth={1.5} />
            </div>
        </div>
        <div className={`grid transition-all duration-500 ease-in-out overflow-hidden bg-white ${chapter.expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="min-h-0 p-2">
                {
                    chapter.lessons.map((lesson, index) => (
                        <div key={index} className="w-full px-4 py-6 text-lg border-b">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 w-1/2 line-clamp-1">
                                    <div>
                                        {
                                            lesson.isLocked ?
                                            <Lock size={20} />
                                            :
                                            <CirclePlay size={20} />
                                        }
                                    </div>
                                    <p>
                                        {lesson.name}
                                    </p>
                                </div>
                                {
                                    !lesson.isLocked && (
                                        <p className="hover:underline text-primary cursor-pointer">
                                            {t("preview")}
                                        </p>
                                    )
                                }
                                <div>
                                    {lesson.duration}
                                </div>
                            </div>
                            <p className="mt-4">
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