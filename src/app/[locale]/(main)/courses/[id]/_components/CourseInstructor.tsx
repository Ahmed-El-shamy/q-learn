import { BookOpen, MessageSquare, Star, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const CourseInstructor = () => {
    const t = useTranslations("courses");

    const stats = [
        {
            label: t("course-rating"),
            value: 0,
            icon: <Star className="h-5 w-5 text-primary" />,
        },
        {
            label: t("reviews"),
            value: 0,
            icon: <MessageSquare className="h-5 w-5 text-primary" />,
        },
        {
            label: t("students"),
            value: 6,
            icon: <Users className="h-5 w-5 text-primary" />,
        },
        {
            label: t("courses"),
            value: 6,
            icon: <BookOpen className="h-5 w-5 text-primary" />,
        },
    ];

    return (
        <div>
            <p className="mb-10 text-3xl font-bold">
                {t("instructor")}
            </p>
            <div className="border border-b-primary border-b-2 flex justify-center items-center border-gray-300 rounded px-10 py-4">
                <div className="w-2/3 flex gap-4 px-4 border-e border-e-primary">
                    <Image 
                        height={140}
                        width={140}
                        className="rounded-full"
                        src="/images/600x600.jpg"
                        alt="course-instructor"
                    />
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-xl">
                            Instructor Name
                        </p>
                        <p className="line-clamp-3 text-sm text-gray-600">
                            Instructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor NameInstructor Name
                        </p>
                        <div className="flex gap-1 mt-2">
                                <div className="bg-primary rounded-full p-2">
                                    <Image height={20} width={20} src="/images/footer/facebook.svg" alt="facebook" />
                                </div>
                                <div className="bg-primary rounded-full p-2">
                                    <Image height={20} width={20} src="/images/footer/twitter.svg" alt="facebook" />
                                </div>
                                <div className="bg-primary rounded-full p-2">
                                    <Image height={20} width={20} src="/images/footer/youtube.svg" alt="facebook" />
                                </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 flex flex-col gap-4 ps-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex items-center gap-3 text-gray-800">
                            <span className="rounded-lg p-2 text-white bg-linear-to-br flex items-center justify-center">
                                {stat.icon}
                            </span>
                            <p className="text-lg font-semibold">
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