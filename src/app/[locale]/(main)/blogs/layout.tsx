import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React from "react";
import SearchComponent from "./_components/SearchComponent";
import RecentPosts from "./_components/RecentPosts";
import FilterComponent from "./_components/FilterComponent";

const BlogsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className="bg-[url('/images/about-us/about-hero.webp')] 
             bg-cover bg-center bg-no-repeat
             h-64 w-full text-center"
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold translate-y-24">
          Explore Our Blog Posts
        </h1>
      </div>

      <div className="containerr mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">{children}</div>

          <div className="lg:col-span-3 space-y-5">
            <SearchComponent />

            <RecentPosts />

            <FilterComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsLayout;
