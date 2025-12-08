import MainBtn from "@/_components/common/buttons/MainBtn";
import Container from "@/_components/common/container/Container";
import { LaptopMinimal, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import StatisticsSection from "./home/_components/statistics/StatisticsSection";
const HomePage = () => {
  const t = useTranslations("Home");

  return (
    <>
      <section className="h-[60vh] sm:h-[50vh] md:h-screen lg:h-[120vh] bg-[#cee8ff] relative">
        <Container>
          <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center h-full">
            <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[45%] xl:w-[49%] mx-auto pt-10 md:pt-0">
              <h1 className="text-[#425073] font-semibold text-4xl lg:text-5xl xl:text-6xl leading-12 md:leading-15 lg:leading-20">
                For every student, every classroom. Real results.
              </h1>

              <p className="text-[#777e93] text-lg my-4 md:my-8">
                Build skills with courses, certificates, and degrees online from
                world-class universities and companies
              </p>

              <div className="flex flex-row md:flex-col lg:flex-row gap-4 lg:gap-8">
                <MainBtn title="view all courses" />
                <MainBtn
                  title="view all quizzes"
                  className="text-[#1f2b40]! bg-white hover:text-white!"
                />
              </div>
            </div>

            <div className="hidden md:grid md:grid-cols-2 gap-3 lg:gap-8">
              <div className="relative w-full h-[450px]">
                <div className="absolute -left-2 bottom-48 lg:bottom-22 xl:bottom-12 w-32 lg:w-40 xl:w-48 h-32 lg:h-40 xl:h-48 bg-[#425073] rounded-full"></div>
                <div className="relative z-10 h-[250px] lg:h-[350px] xl:h-[400px]">
                  <img
                    src="images/homepage/business-man1.jpg"
                    alt="hero image 1"
                    className="w-full h-full object-cover rounded-t-full rounded-bl-full"
                  />
                </div>
                <div className="absolute -left-8 top-1/12 lg:top-1/5 xl:top-1/4 z-10 bg-white rounded-xl py-1 px-5">
                  <div className="flex-center mt-2 gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill="#1f2b40" stroke="#1f2b40" />
                    ))}
                  </div>
                  <p className="text-[10px] lg:text-[12px] text-[#777e93] mt-1">
                    5300+ Rating
                  </p>
                </div>
              </div>

              <div className="relative w-full h-[450px]">
                <div className="absolute -right-5 lg:-right-10 -top-10 w-32 lg:w-40 xl:w-48 h-32 lg:h-40 xl:h-48 bg-white rounded-full"></div>
                <div className="absolute -top-15 z-10 h-[250px] lg:h-[350px] xl:h-[400px]">
                  <img
                    src="images/homepage/business-man6.jpg"
                    alt="hero image 2"
                    className="w-full h-full object-cover rounded-t-full rounded-br-full"
                  />
                </div>
                <div className="absolute -right-8 bottom-2/3 lg:bottom-1/2 xl:bottom-1/3 z-10 bg-white rounded-xl py-2 px-4">
                  <div className="flex-center gap-2">
                    <LaptopMinimal className="size-7 lg:size-10" />
                    <div>
                      <h2 className="text-sm lg:text-xl font-extrabold text-[#1f2b40]">
                        7100+
                      </h2>
                      <p className="text-sm lg:text-[16px] text-[#777e93] -mt-1">
                        Free Courses
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <StatisticsSection />
    </>
  );
};

export default HomePage;
