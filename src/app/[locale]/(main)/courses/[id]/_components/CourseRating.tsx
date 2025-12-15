import { useTranslations } from "next-intl";
import Rate from "../../_components/Rate";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import CourseRatingInput from "./CourseRatingInput";

const CourseRating = () => {
    const t = useTranslations("courses");
    const baseT = useTranslations();
    const session = useSession();
    const isAuthenticated = session.status === "authenticated";

    return (
        <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                {t("course-full-rating")}
            </p>
            <div className="rounded border-gray-300 border p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        0
                    </p>
                    <Rate rate={0} />
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-500">
                        {t("course-rating")}
                    </p>
                </div>
                <div className="flex-1 flex flex-col gap-2 sm:gap-3 md:gap-4">
                    {
                        Array(5).fill(1).map((num, i) => num + i).map(rate => (
                            <div key={rate} className="w-full flex items-center gap-2 sm:gap-3">
                                <div className="flex-1 rounded-full bg-gray-200 h-full">
                                </div>
                                <Rate rate={rate} size={16} />
                                <p className="text-xs sm:text-sm md:text-base">
                                    (0)
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                {
                    !isAuthenticated ?
                        <div className="flex flex-col sm:flex-row justify-between text-nowrap items-start sm:items-center gap-2 sm:gap-1 mt-4">
                            <div className="text-xs sm:text-sm md:text-base">
                                There are currently no reviews
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-2 [&>a]:hover:underline [&>a]:cursor-pointer [&>a]:text-blue-500 text-xs sm:text-sm md:text-base">
                                <Link href="/auth/login">
                                    {baseT("auth.login")}
                                </Link>
                                <p>
                                    {baseT("or")}
                                </p>
                                <Link href={"/auth/register"}>
                                    {baseT("auth.signup")}
                                </Link>
                                <p>
                                    {t("as-a-student")}
                                </p>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-4">
                            <p className="text-xs sm:text-sm md:text-base">
                                {t("be-the-first-reviewer")}
                            </p>
                            <div className="text-xs sm:text-sm md:text-base">
                                <CourseRatingInput />
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default CourseRating;