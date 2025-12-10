import MainBtn from "@/_components/common/buttons/MainBtn";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
import { CircleCheckBig, Play } from "lucide-react";
import Link from "next/link";

const partnerData = [
  {
    image: "/images/homepage/logo (1).jpg",
  },
  {
    image: "/images/homepage/logo (2).jpg",
  },
  {
    image: "/images/homepage/logo (3).jpg",
  },
  {
    image: "/images/homepage/logo (4).jpg",
  },
  {
    image: "/images/homepage/logo (1).jpg",
  },
  {
    image: "/images/homepage/logo (2).jpg",
  },
  {
    image: "/images/homepage/logo (3).jpg",
  },
  {
    image: "/images/homepage/logo (4).jpg",
  },
];

const AboutUsSection = () => {
  return (
    <>
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
                popular in UI & UX, Web App Development, Digital Marketing and
                Graphic Design related service provider company both Local
                (Bangladesh) and global too!
              </p>
              <p>
                At a time we are also doing our best for our clients by giving
                our service. This gives us boost in popularity in this Digital
                Tech World.
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
          <h3 className="text-3xl mb-8">Our Partner</h3>
          <HorizontalCarousel>
            {partnerData.map((partner, i) => (
              <div key={i} className="w-[250px] h-28 rounded-xl bg-white">
                <img
                  src={partner.image}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </HorizontalCarousel>
        </div>
      </div>
    </>
  );
};

export default AboutUsSection;
