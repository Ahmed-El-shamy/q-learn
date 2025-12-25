import MainBtn from "@/_components/common/buttons/MainBtn";
import ErrorHandler from "@/_components/common/error-handler/ErrorHandler";
import api, { Api } from "@/_lib/api/api";
import Image from "next/image";
import { Hero } from "./types/hero.types";
import HtmlContent from "@/_components/common/HtmlContent";

const HeroSection = async () => {
  try {
    const response = await api.get(Api.routes.site.hero);
    if (!response?.status) return null;
    const d = response.data as Hero;
    return (
      <>
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center h-full">
          <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[45%] xl:w-[49%] mx-auto pt-10 md:pt-0">
            <h1 className="text-[#425073] font-semibold text-4xl lg:text-5xl xl:text-6xl leading-12 md:leading-15 lg:leading-20">
              {d?.title}
            </h1>
            {d?.description && (
              <div className="text-[#777e93]! text-lg! my-4! md:my-8!">
                <HtmlContent html={d?.description} />
              </div>
            )}

            <div className="flex flex-row md:flex-col lg:flex-row gap-4 lg:gap-8">
              <MainBtn title="view all courses" />
              <MainBtn
                title="view all quizzes"
                className="text-[#1f2b40]! bg-white hover:text-white!"
              />
            </div>
          </div>
          {d?.image && (
            <div className="relative w-full md:w-[520px] h-[250px] lg:h-[350px] xl:h-[400px]">
              <Image
                src={d.image}
                alt={d.title}
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 520px"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </>
    );
  } catch {
    return <ErrorHandler />;
  }
};

export default HeroSection;
