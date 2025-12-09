import Container from "@/_components/common/container/Container";
import { useTranslations } from "next-intl";
import TopCategoriesSection from "./_components/TopCategoriesSection";
import TestimonialsSection from "./_components/testimonials/TestimonialsSection";
import TeachersSection from "./_components/teachers/TeachersSection";
const HomePage = () => {
  const t = useTranslations("Home");

  return (
    <>
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
    </>
  );
};

export default HomePage;
