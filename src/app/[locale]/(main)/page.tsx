import Container from "@/_components/common/container/Container";
import { useTranslations } from "next-intl";
import TopCategoriesSection from "./_components/TopCategoriesSection";
import TestimonialsSection from "./_components/testimonials/TestimonialsSection";
import TeachersSection from "./_components/teachers/TeachersSection";
import StatisticsSection from "./_components/statistics/StatisticsSection";
import BlogsSection from "./_components/blogs/BlogsSection";
import AboutUsSection from "./_components/about/AboutUsSection";
import HeroSection from "./_components/hero/HeroSection";
const HomePage = () => {
  const t = useTranslations("Home");

  return (
    <>
      {/* Hero Section */}
      <section className="py-10 md:py-32 lg:py-48 bg-[#cee8ff] relative">
        <Container>
          <HeroSection />
        </Container>
      </section>

      {/* Statistics Section */}
      <StatisticsSection />

      <section className="bg-[#D7ECFF] py-16 md:py-20">
        <div className="containerr">
          <TopCategoriesSection />
        </div>
      </section>

      <section className="bg-[#FFFFF] py-16 md:py-20">
        <div className="containerr">
          <TestimonialsSection />
        </div>
      </section>

      <section className="bg-[#FFFFF] py-16 md:py-20">
        <div className="containerr">
          <TeachersSection />
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-[#cee8ff] py-15 md:py-28">
        <Container>
          <AboutUsSection />
        </Container>
      </section>

      {/* Blogs Section */}
      <section className="bg-[#cee8ff] py-15 md:py-28 md:pb-96 pb-96">
        <Container>
          <BlogsSection />
        </Container>
      </section>
    </>
  );
};

export default HomePage;
