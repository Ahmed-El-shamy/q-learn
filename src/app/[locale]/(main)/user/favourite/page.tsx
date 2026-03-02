"use client";
import CourseCard from "../../courses/_components/CourseCard";
import FetchHandler from "@/_components/common/fetchHandler/FetchHandler";
import useGetMyWhishlist from "./_services/useGetMyWhishlist";
import EmptyState from "../_components/EmptyState";
import SectionHeader from "../_components/SectionHeader";

const Page = () => {
  const query = useGetMyWhishlist();
  return (
    <FetchHandler queryResult={query} skeletonType="blog">
      <div className="space-y-6">
        <SectionHeader title="My favourites" />
        {query?.data ? (
          query?.data?.length > 0 ? (
            <div className="grid gap-4  lg:grid-cols-2 xl:grid-cols-3">
              {query?.data.map((c) => (
                <CourseCard key={c?.id} {...c} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="no courses in the wishlist yet"
              cta={{ label: "Browse courses", href: "/courses" }}
            />
          )
        ) : null}
      </div>
    </FetchHandler>
  );
};

export default Page;
