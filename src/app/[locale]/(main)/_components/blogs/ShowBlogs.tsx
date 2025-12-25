"use client";
import { useQuery } from "@tanstack/react-query";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
import { blogsOptions } from "../../blogs/_quires/blogsOptions";
import BlogCard from "./BlogCard";
const ShowBlogs = () => {
  const queryResult = useQuery(blogsOptions());
  return (
    <>
      <div className="text-center text-[#1f2b40]">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl">
          Articles & News
        </h2>
        <p className="text-lg mt-5 mx-auto w-full sm:w-[90%] md:w-[62%]">
          The world's largest selection of courses choose from 130,000 online
          video courses with new additions published every month
        </p>

        <HorizontalCarousel className="mt-10">
          {queryResult?.data &&
            queryResult?.data?.length > 0 &&
            queryResult?.data.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
        </HorizontalCarousel>
      </div>
    </>
  );
};

export default ShowBlogs;
