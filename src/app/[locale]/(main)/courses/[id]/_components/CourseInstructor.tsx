import { BookOpen, MessageSquare, Star, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const CourseInstructor = () => {
    const t = useTranslations("courses");

    const stats = [
        {
            label: t("course-rating"),
            value: 0,
            icon: <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
        },
        {
            label: t("reviews"),
            value: 0,
            icon: <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
        },
        {
            label: t("students"),
            value: 6,
            icon: <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
        },
        {
            label: t("courses"),
            value: 6,
            icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
        },
    ];

    return (
        <div>
            <p className="mb-6 sm:mb-8 md:mb-10 text-xl sm:text-2xl md:text-3xl font-bold">
                {t("instructor")}
            </p>
            <div className="border border-b-primary border-b-2 flex flex-col lg:flex-row justify-center items-center border-gray-300 rounded px-4 sm:px-6 md:px-10 py-3 sm:py-4">
                <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-3 sm:gap-4 px-0 sm:px-2 md:px-4 lg:border-e lg:border-e-primary pb-4 lg:pb-0">
                    <Image 
                        height={140}
                        width={140}
                        className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-[140px] lg:h-[140px] mx-auto sm:mx-0"
                        src="/images/600x600.jpg"
                        alt="course-instructor"
                    />
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-base sm:text-lg md:text-xl text-center sm:text-left">
                            Instructor Name
                        </p>
                        <p className="line-clamp-3 text-xs sm:text-sm md:text-base text-gray-600">
                            Instructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor Name
                        </p>
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