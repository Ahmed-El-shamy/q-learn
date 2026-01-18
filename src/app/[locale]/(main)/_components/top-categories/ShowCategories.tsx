"use client";
import { categoriesOptions } from "./queries/categoriesOptions";
import { useQuery } from "@tanstack/react-query";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
import CategoryCard from "../../category/_components/CategoryCard";
import { CategoryBase } from "@/types/categories.types";
const ShowCategories = () => {
  const queryResult = useQuery(categoriesOptions());
  return (
    <section aria-labelledby="top-categories-heading">
      <div className="text-center space-y-5">
        <h2
          id="top-categories-heading"
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
        >
          Top Categories
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
          Amet minim non deserunt ullamco est sit aliqua dolor do amet sint
          velit officia consequat.
        </p>

        {queryResult?.data && queryResult?.data?.length > 0 ? (
          <HorizontalCarousel ariaLabel="Top categories slider">
            {queryResult?.data?.map((item: CategoryBase) => (
              <CategoryCard
                key={item?.id}
                name={item?.name}
                slug={item?.slug}
                courses_count={item?.courses_count}
                image={item?.image}
              />
            ))}
          </HorizontalCarousel>
        ) : null}
      </div>
    </section>
  );
};

export default ShowCategories;
