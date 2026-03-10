import NavbarSkeleton from "@/_components/common/loaders/skeltons/NavbarSkeleton";
import { ReactNode, Suspense } from "react";
import ContentNavbar from "./_components/contentNavbar";
import CourseSidebar from "./_components/CourseSidebar";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import CourseDetailsQuery from "../../(main)/courses/[id]/_data/CourseDetailsQuery";
import LanguageSwitcher from "@/_components/lang/LanguageSwitcher";

const Layout = async ({
    children,
    params,
}: {
    children: ReactNode,
    params: Promise<{
        course: string;
    }>
}) => {
    const { course: courseId } = await params;
    const queryClient = new QueryClient();
    
    try {
        await queryClient.prefetchQuery({
            ...CourseDetailsQuery(courseId)
        });
    } catch (error) {
        // Error will be handled by error boundary
    }
    
    const dehydrated = dehydrate(queryClient);
    
    return (
        <HydrationBoundary state={dehydrated}>
            <div className="flex flex-col min-h-screen">
                <Suspense fallback={<NavbarSkeleton />}>
                    <ContentNavbar params={params} />
                </Suspense>
                <div className="flex flex-col xl:flex-row flex-1 overflow-y-auto">
                    <div className="flex-1 xl:basis-4/5 overflow-hidden">
                        {children}
                    </div>
                    <Suspense fallback={
                        <div className="w-full xl:w-1/5 xl:h-full xl:overflow-y-auto border-t xl:border-t-0 xl:border-l border-gray-300 bg-white">
                            <NavbarSkeleton />
                        </div>
                    }>
                        <CourseSidebar />
                    </Suspense>
                </div>
                <LanguageSwitcher />
            </div>
        </HydrationBoundary>
    );
}

export default Layout;