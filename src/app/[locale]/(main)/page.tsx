import MainBtn from "@/_components/common/buttons/MainBtn";
import Container from "@/_components/common/container/Container";
import { CircleCheckBig, LaptopMinimal, Play, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import StatisticsSection from "./home/_components/statistics/StatisticsSection";
import Link from "next/link";
const HomePage = () => {
  const t = useTranslations("Home");

  return (
    <>
      {/* Hero Section */}
      <section className="py-10 md:py-32 lg:py-48 bg-[#cee8ff] relative">
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

      {/* Statistics Section */}
      <StatisticsSection />

      {/* About Us Section */}
      <section className="bg-[#cee8ff] py-15 md:py-28">
        <Container>
          <div className="text-center text-[#1f2b40]">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl">
              About Us
            </h2>
            <p className="text-lg mt-5 mx-auto w-full sm:w-[90%] md:w-[60%] lg:w-full">
              Here is short details about our institute, Also you can see how we
              work
            </p>

            <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-15 mt-20">
              <div className="video w-92 md:w-auto lg:w-full relative">
                <img
                  src="/images/homepage/about-1.jpg"
                  alt="Video Thumbnail"
                  className="rounded-xl w-full object-cover"
                />
                <Link
                  href="https://youtu.be/1SZle1skb84?si=jYHf_B_7uZZxSYrq"
                  className="absolute top-[40%] sm:top-[38%] left-[45%] sm:left-[42%] cursor-pointer block"
                >
                  <button className="flex items-center justify-center w-14 sm:w-20 md:w-24 h-14 sm:h-20 md:h-24 rounded-full bg-white hover:bg-[#1f2b40] duration-300 cursor-pointer group">
                    <Play className="size-6 sm:size-10 fill-[#1f2b40] stroke-[#1f2b40] group-hover:fill-white group-hover:stroke-white" />
                  </button>
                </Link>
              </div>

              <div className="flex-column gap-5 xl:gap-7 text-left w-full">
                <h3 className="font-semibold text-3xl">
                  Corporate Learning Institute
                </h3>

                <div className="flex-column gap-5 xl:gap-7 text-[#656a7b] text-[17px]">
                  <p>
                    Since the year of 2008 and now at in 2019 “Spondon It” most
                    popular in UI & UX, Web App Development, Digital Marketing
                    and Graphic Design related service provider company both
                    Local (Bangladesh) and global too!
                  </p>
                  <p>
                    At a time we are also doing our best for our clients by
                    giving our service. This gives us boost in popularity in
                    this Digital Tech World.
                  </p>
                  <div className="flex gap-5">
                    <CircleCheckBig />
                    Explore the wide-range of online course in the world
                  </div>
                  <div className="flex gap-5">
                    <CircleCheckBig />
                    Popular online course in the world
                  </div>
                </div>
                <MainBtn title="know more" className="w-fit" />
              </div>
            </div>

            <div className="partner mt-28">
              <h3 className="text-3xl">Our Partner</h3>
              <div className="slider grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-12">
                <div className="h-28 rounded-xl bg-white">
                  <img
                    src="/images/homepage/logo (1).jpg"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="h-28 rounded-xl bg-white">
                  <img
                    src="/images/homepage/logo (2).jpg"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="h-28 rounded-xl bg-white">
                  <img
                    src="/images/homepage/logo (3).jpg"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="h-28 rounded-xl bg-white">
                  <img
                    src="/images/homepage/logo (4).jpg"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
