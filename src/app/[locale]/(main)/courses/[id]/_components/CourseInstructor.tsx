import { useQuery } from "@tanstack/react-query";
import { BookOpen, MessageSquare, Star, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import CourseDetailsQuery from "../_data/CourseDetailsQuery";
import CustomSkeleton from "@/_components/common/loaders/skeltons/CustomSkeleton";
import Avatar from "@/_components/common/avatar/Avatar";

const CourseInstructor = () => {
    const t = useTranslations("courses");
    const params: {id: string} = useParams();

    const {data: course, isLoading} = useQuery({
        ...CourseDetailsQuery(params.id),
        refetchOnMount: false
    });

    const data = course?.instructor;

    const stats = [
        {
            label: t("course-rating"),
            value: data?.ratings_count || 0,
            icon: <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
        },
        {
            label: t("reviews"),
            value: data?.reviews_count || 0,
            icon: <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
        },
        {
            label: t("students"),
            value: data?.students_count || 0,
            icon: <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
        },
        {
            label: t("courses"),
            value: data?.courses_count || 0,
            icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
        },
    ];

    if (isLoading) {
        return (
            <div>
                <p className="mb-6 sm:mb-8 md:mb-10 text-xl sm:text-2xl md:text-3xl font-bold">
                    {t("instructor")}
                </p>
                <div className="border border-b-primary border-b-2 border-gray-300 rounded px-4 sm:px-6 md:px-10 py-3 sm:py-4">
                    <CustomSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div>
            <p className="mb-6 sm:mb-8 md:mb-10 text-xl sm:text-2xl md:text-3xl font-bold">
                {t("instructor")}
            </p>
            <div className="border border-b-primary border-b-2 flex flex-col lg:flex-row justify-center items-center border-gray-300 rounded px-4 sm:px-6 md:px-10 py-3 sm:py-4">
                <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-3 sm:gap-4 px-0 sm:px-2 md:px-4 lg:border-e lg:border-e-primary pb-4 lg:pb-0">
                    {data?.avatar && (
                        <Avatar 
                            src={data.avatar}
                            alt={data?.user?.name || "course-instructor"}
                            size={140}
                            className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-[140px] lg:h-[140px] mx-auto sm:mx-0"
                        />
                    )}
                    <div className="flex flex-col gap-2">
                        {data?.user?.name && (
                            <p className="font-bold text-base sm:text-lg md:text-xl text-center sm:text-left">
                                {data.user.name}
                            </p>
                        )}
                        {data?.description && (
                            <p className="line-clamp-3 text-xs sm:text-sm md:text-base text-gray-600">
                                {data.description}
                            </p>
                        )}
                        <div className="flex gap-1 mt-2 justify-center sm:justify-start">
                                <div className="bg-primary rounded-full p-1.5 sm:p-2">
                                    <Image height={16} width={16} className="sm:w-5 sm:h-5" src="/images/footer/facebook.svg" alt="facebook" />
                                </div>
                                <div className="bg-primary rounded-full p-1.5 sm:p-2">
                                    <Image height={16} width={16} className="sm:w-5 sm:h-5" src="/images/footer/twitter.svg" alt="facebook" />
                                </div>
                                <div className="bg-primary rounded-full p-1.5 sm:p-2">
                                    <Image height={16} width={16} className="sm:w-5 sm:h-5" src="/images/footer/youtube.svg" alt="facebook" />
                                </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-3 sm:gap-4 ps-0 lg:ps-4 justify-center lg:justify-start">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex items-center gap-2 sm:gap-3 text-gray-800">
                            <span className="rounded-lg p-1.5 sm:p-2 text-white bg-linear-to-br flex items-center justify-center">
                                {stat.icon}
                            </span>
                            <p className="text-sm sm:text-base md:text-lg font-semibold">
                                {stat.value} {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseInstructor;