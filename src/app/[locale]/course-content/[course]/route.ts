import api, { Api } from "@/_lib/api/api";
import { redirect } from "@/i18n/navigation";
import { CourseDetails } from "../../(main)/courses/_types/course.types";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ course: string }> }
) {
    const { course: courseId } = await params;
    const locale = await getLocale();
    
    let course: CourseDetails | undefined;
    
    try {
        const response = await api.get<CourseDetails>(`${Api.routes.site.courses}/${courseId}`);
        course = response?.data;
    } catch(e) {
        console.log(e);
        notFound();
    }
    
    if (!course || !course.content.chapters?.[0]?.lessons?.[0]?.id) {
        notFound();
    }
    
    // redirect() throws a special error that Next.js catches - don't wrap it in try-catch
    redirect({
        href: `/course-content/${courseId}/${course.content.chapters[0].lessons[0].id}`,
        locale: locale 
    });
}

