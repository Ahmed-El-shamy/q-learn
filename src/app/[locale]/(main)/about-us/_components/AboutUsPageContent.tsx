"use client";

import Image from "next/image";
import { useCountUp } from "../../_hooks/useCountUp";
import HtmlContent from "@/_components/common/HtmlContent";
import type { SimpleSection } from "@/types/simpleSection.types";

const defaultHeroTitle = "Learn More About Us";
const defaultWhoWeAreTitle = "Improving lives through Learning. We are always Inspired by the world and people us. Celebrating e-Learning excellence in Personal.";
const defaultSubheading = "We are here to meet your demand and teach the most beneficial way for you in Personal.";
const defaultLibraryTitle = "Build your own library for your career and personal growth.";
const defaultLibraryDesc = "Our goal is to learn the next generation of creative professionals for a future in any industry. We offer course in most demanded industries. Whether begin to your journey on our courses website or choose the flexibility of video learning our courses are designed to help you along your path.";

type Props = {
  data: SimpleSection | null;
};

export default function AboutUsPageContent({ data }: Props) {
  const teachers = useCountUp(100);
  const courses = useCountUp(200);
  const students = useCountUp(150);

  const heroTitle = data?.title || defaultHeroTitle;
  const whoWeAreTitle = data?.title || defaultWhoWeAreTitle;
  const hasDescription = Boolean(data?.description?.trim());

  return (
    <>
      <section
        className="bg-[url('/images/about-us/about-hero.webp')] 
             bg-cover bg-center bg-no-repeat
             h-64 w-full text-center"
      >
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold translate-y-24">
          {heroTitle}
        </h1>
      </section>

      <section className="containerr">
        <div className="flex flex-col md:flex-row border border-[#d1d1d1] rounded my-28">
          <div className="flex-1 p-10 px-5 lg:px-16">
            <p className="capitalize text-[#373737] font-semibold">
              Who we are
            </p>
            <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl text-[#202e3b] mt-5 w-full lg:w-[90%] xl:w-[85%] leading-10">
              {whoWeAreTitle}
            </h2>
          </div>
          <div className="flex-1 p-10 px-5 lg:px-16 gradient-background text-white">
            {hasDescription ? (
              <div className="prose prose-invert max-w-none prose-p:leading-relaxed [&_p]:text-xl [&_p]:font-bold [&_p]:md:text-3xl [&_p]:lg:text-4xl [&_p]:w-full [&_p]:lg:w-[90%] [&_p]:xl:w-[85%] [&_p]:leading-12">
                <HtmlContent html={data!.description} />
              </div>
            ) : (
              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full lg:w-[90%] xl:w-[85%] leading-12">
                {defaultSubheading}
              </h2>
            )}
          </div>
        </div>

        <div className="flex gap-20 xl:mt-64">
          <div className="flex-1 hidden md:flex gap-10">
            <div>
              {data?.image ? (
                <Image
                  src={data.image}
                  alt={data.title || ""}
                  width={400}
                  height={300}
                  className="h-[300px] xl:-translate-y-40 xl:translate-x-10 hidden lg:block object-cover"
                />
              ) : (
                <Image
                  src={"/images/about-us/1.jpg"}
                  alt=""
                  width={400}
                  height={100}
                  className=" h-[300px] xl:-translate-y-40 xl:translate-x-10 hidden lg:block"
                />
              )}
              <Image
                src={"/images/about-us/2.jpg"}
                alt=""
                width={300}
                height={100}
                className="h-full lg:h-[400px] lg:translate-y-5 xl:-translate-y-32 w-[500px] lg:w-[400px] lg:translate-x-28 xl:translate-x-14"
              />
            </div>
            <Image
              src={"/images/about-us/3.jpg"}
              alt=""
              width={350}
              height={100}
              className="h-[450px] -translate-y-10 translate-x-8 hidden xl:block"
            />
          </div>

          <div className="flex-1">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-6xl text-[#202e3b] w-full md:w-[95%] lg:w-[90%] xl:w-[85%]">
              {defaultLibraryTitle}
            </h2>
            <p className="mt-5 text-[#373737] text-xl w-full md:w-[90%] xl:w-[80%]">
              {defaultLibraryDesc}
            </p>
          </div>
        </div>
      </section>

      <section className="flex lg:h-screen">
        <div className="space-y-10 py-28 px-4 sm:px-10 md:px-0 relative z-1 md:-mr-96">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 md:translate-x-40">
            <h2
              ref={teachers.ref}
              className="text-[#656a7b] text-4xl md:text-6xl font-bold"
            >
              {teachers.count}K+
            </h2>
            <div>
              <h3 className="text-[#202e3b] text-2xl font-bold">
                Most Involved Teachers
              </h3>
              <p className="text-[#373737] mt-3 w-full md:w-[40%] lg:w-[60%]">
                Key features are the ability to develop relationships with their
                students, patient, caring and kind knowledge offer learner
                engaging students of their.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 md:translate-x-32">
            <h2
              ref={courses.ref}
              className="text-[#656a7b] text-4xl md:text-6xl font-bold"
            >
              {courses.count}+
            </h2>
            <div>
              <h3 className="text-[#202e3b] text-2xl font-bold">
                Large Selection of Courses
              </h3>
              <p className="text-[#373737] mt-3 w-full md:w-[45%] lg:w-[65%]">
                Key features are the ability to develop relationships with their
                students, patient, caring and kind knowledge offer learner
                engaging students of their.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 md:translate-x-16">
            <h2
              ref={students.ref}
              className="text-[#656a7b] text-4xl md:text-6xl font-bold"
            >
              {students.count}K+
            </h2>
            <div>
              <h3 className="text-[#202e3b] text-2xl font-bold">
                Large Selection of Courses
              </h3>
              <p className="text-[#373737] mt-3 w-full md:w-[50%] lg:w-[80%]">
                Key features are the ability to develop relationships with their
                students, patient, caring and kind knowledge offer learner
                engaging students of their.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full hidden lg:block">
          <img
            src={"/images/about-us/counter_bg.png"}
            alt=""
            className="[clip-path:polygon(25%_0%,100%_0,100%_100%,0%_100%)] w-full h-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
