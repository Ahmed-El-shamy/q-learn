"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
import BlogCard from "./BlogCard";
import { blogsOptions } from "../../blogs/_quires/blogsOptions";

const ShowBlogs = () => {
  const t = useTranslations("blogs");
  const queryResult = useQuery(blogsOptions());
  return (
    <>
      <div className="text-center text-[#1f2b40]">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl">
          {t("title")}
        </h2>
        <p className="text-lg mt-5 mx-auto w-full sm:w-[90%] md:w-[62%]">
          {t("description")}
        </p>

        <HorizontalCarousel slidesPerView={{
          base: 1,
          sm: 1.5,
          md: 2,
          lg: 2.5, 
          xl: 3
        }} className="mt-10">
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
