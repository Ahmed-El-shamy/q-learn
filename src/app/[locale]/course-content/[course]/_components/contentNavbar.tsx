import MainBtn from "@/_components/common/buttons/MainBtn";
import api, { Api } from "@/_lib/api/api";
import { getSettings } from "@/_lib/server/getSettings";
import { CourseDetails } from "@/app/[locale]/(main)/courses/_types/course.types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AutoNext from "./AutoNext";
import CourseContentOptions from "./CourseContentOptions";

const ContentNavbar = async ({
    params
}: {
    params: Promise<{
        course: string
    }>
}) => {
    const { course: courseId } = await params;
    const settings = getSettings();
    const response =  api.get<CourseDetails>(`${Api.routes.site.courses}/${courseId}`);

    // to fire the requests all at once.
    await Promise.all([settings, response]);
    const courseResponse = await response;
    const settingsResponse = await settings;

    if(courseResponse?.data) {
        return (
            <div className="w-full bg-white py-1 px-6 flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <Link href="/">
                        <Image 
                            src={settingsResponse?.site_logo || "/logo-placeholder.jpg"}
                            alt="site-image"
                            height={30}
                            width={80}
                        />
                    </Link>
                    <p className="line-clamp-1 text-xl hidden lg:block font-normal text-gray-800">
                        {courseResponse.data.title}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <AutoNext />
                    <div className="flex items-center gap-2">
                        <Link href="#">
                            <MainBtn title="previous-lesson" containerClassName="w-fit px-0 py-0 border-0" className="p-1"> 
                                <ChevronLeft />
                            </MainBtn>
                        </Link>
                        <Link href="#">
                            <MainBtn title="next-lesson" containerClassName="w-fit px-0 py-0 border-0" className="p-1"> 
                                <ChevronRight />
                            </MainBtn>
                        </Link>
                    </div>
                    <div className="relative">
                        <svg height={45} width={45}>
                            <circle 
                                r={18}
                                cx={22.5}
                                cy={22.5}
                                fill="none"
                                stroke="var(--color-gray-200)"
                                strokeWidth={4}
                            />
                            <circle 
                                r={18}
                                cx={22.5}
                                cy={22.5}
                                fill="none"
                                stroke="var(--color-purple-500)"
                                strokeDasharray="114, 10000"
                                strokeDashoffset="40"
                                strokeWidth={4}
                            />
                        </svg>
                        <p className="absolute top-1/2 start-1/2 text-xs pt-px -translate-1/2">
                            65%
                        </p>
                    </div>
                    <CourseContentOptions />
                </div>
            </div>
        );
    }
    throw response;
}

export default ContentNavbar;