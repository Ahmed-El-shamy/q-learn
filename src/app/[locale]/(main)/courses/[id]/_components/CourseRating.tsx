import { useTranslations } from "next-intl";
import Rate from "../../_components/Rate";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";

const CourseRating = () => {
    const t = useTranslations("courses");
    const baseT = useTranslations();
    const session = useSession();
    const isAuthenticated = session.status === "authenticated";

    return (
        <div>
            <p className="text-3xl font-bold mb-6">
                {t("course-full-rating")}
            </p>
            <div className="rounded border-gray-300 border p-6 flex gap-6 justify-between">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-5xl font-bold">
                        0
                    </p>
                    <Rate rate={0} />
                    <p className="text-lg font-bold text-gray-500">
                        {t("course-rating")}
                    </p>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    {
                        Array(5).fill(1).map((num, i) => num + i).map(rate => (
                            <div className="w-full flex items-center gap-3">
                                <div className="flex-1 rounded-full bg-gray-200 h-full">
                                </div>
                                <Rate rate={rate} size={20} />
                                <p>
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
                    <div className="flex justify-between text-nowrap items-center gap-1 mt-4">
                        <div>
                            There are currently no reviews
                        </div>
                        <div className="flex gap-2 [&>a]:hover:underline [&>a]:cursor-pointer [&>a]:text-blue-500">
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
                    <div>
                        The user is signed in
                    </div>
                }
            </div>
        </div>
    );
}

export default CourseRating;