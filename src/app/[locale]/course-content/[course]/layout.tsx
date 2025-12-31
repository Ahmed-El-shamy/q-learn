import NavbarSkeleton from "@/_components/common/loaders/skeltons/NavbarSkeleton";
import { ReactNode, Suspense } from "react";
import ContentNavbar from "./_components/contentNavbar";

const Layout = ({
    children,
    params,
}: {
    children: ReactNode,
    params: Promise<{
        course: string;
    }>
}) => {
    return (
        <div>
            <Suspense fallback={<NavbarSkeleton />}>
                <ContentNavbar params={params} />
            </Suspense>
            {children} 
        </div>
    );
}

export default Layout;