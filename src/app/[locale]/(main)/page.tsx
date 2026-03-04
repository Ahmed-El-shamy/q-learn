import Container from "@/_components/common/container/Container";
import TopCategoriesSection from "./_components/top-categories/TopCategoriesSection";
import TestimonialsSection from "./_components/testimonials/TestimonialsSection";
import TeachersSection from "./_components/teachers/TeachersSection";
import StatisticsSection from "./_components/statistics/StatisticsSection";
import BlogsSection from "./_components/blogs/BlogsSection";
import AboutUsSection from "./_components/about/AboutUsSection";
import HeroSection from "./_components/hero/HeroSection";
import { Suspense } from "react";
import StatisticsSectionSkeleton from "@/_components/common/loaders/skeltons/StatisticsSectionSkeleton";
import TopCategoriesSkeleton from "@/_components/common/loaders/skeltons/TopCategoriesSkeleton";
import HeroSkeleton from "@/_components/common/loaders/skeltons/HeroSkeltion";
import BrandsCardSkeleton from "@/_components/common/loaders/skeltons/BrandSkelton";
import AboutSklelton from "@/_components/common/loaders/skeltons/AboutSkelton";
import BlogSkelton from "@/_components/common/loaders/skeltons/BlogSkelton";
import TrendedCoursesSection from "./courses/_components/TrendedCoursesSection";
const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <Suspense fallback={<HeroSkeleton />}>
        <section className="py-10 md:py-32 lg:py-48 bg-[#E8F8EE] relative">
          <Container>
            <HeroSection />
          </Container>
        </section>
      </Suspense>

      {/* Statistics Section */}
      <Suspense fallback={<StatisticsSectionSkeleton />}>
        <StatisticsSection />
      </Suspense>
      <Suspense fallback={<TopCategoriesSkeleton />}>
        <section className="bg-[#DCF5E5] py-16 md:py-20">
          <div className="containerr">
            <TopCategoriesSection />
          </div>
        </section>
      </Suspense>
      <Suspense fallback={<TopCategoriesSkeleton />}>
        <section className="bg-[#DCF5E5] py-16 md:py-20">
          <div className="containerr">
            <TrendedCoursesSection />
          </div>
        </section>
      </Suspense>
      <Suspense fallback={<BlogSkelton />}>
        <section className="bg-[#FFFFFF] py-16 md:py-20">
          <div className="containerr">
            <TestimonialsSection />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<BrandsCardSkeleton />}>
        <section className="bg-[#FFFFFF] py-16 md:py-20">
          <div className="containerr">
            <TeachersSection />
          </div>
        </section>
      </Suspense>

      {/* About Us Section */}
      <Suspense fallback={<AboutSklelton />}>
        <section className="bg-[#E8F8EE] py-15 md:py-28">
          <Container>
            <AboutUsSection />
          </Container>
        </section>
      </Suspense>

      {/* Blogs Section */}
      <Suspense fallback={<BlogSkelton />}>
        <section className="bg-[#E8F8EE] py-15 md:py-28 md:pb-96 pb-96">
          <Container>
            <BlogsSection />
          </Container>
        </section>
      </Suspense>
    </>
  );
};

export default HomePage;
