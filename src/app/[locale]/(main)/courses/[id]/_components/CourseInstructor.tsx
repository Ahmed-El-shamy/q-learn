import { useTranslations } from "next-intl";
import Image from "next/image";

const CourseInstructor = () => {
    const t = useTranslations("courses");

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
                        <div className="flex gap-1">
                            Social media links
                        </div>
                    </div>
                </div>
                <div className="w-1/3 flex flex-col gap-2 ps-4">
                    Instructor Statistics
                </div>
            </div>
        </div>
    );
}

export default CourseInstructor;