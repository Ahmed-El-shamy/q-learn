"use client";
import MainBtn from "@/_components/common/buttons/MainBtn";
import Container from "@/_components/common/container/Container";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const RewardWidget = () => {
  const t = useTranslations("footer");
  return (
    <Container>
      <div className="w-full sm:w-[80%] md:w-[90%] mx-auto lg:w-full bg-white rounded-4xl p-10 relative -mt-72 md:-mt-60 lg:-mt-48 xl:-mt-60">
        <div className="hidden md:block absolute -top-20 sm:-top-24 md:-top-40 -right-20 w-48 sm:w-60 md:w-72 lg:w-80 xl:w-92">
          <img
            src="/images/footer/medal.webp"
            alt={t("medalAlt")}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 xl:gap-0">
          <div className="w-full">
            <img
              src="/images/footer/gift-box.webp"
              alt={t("rewardBoxAlt")}
              className="w-48 lg:w-92 h-full object-cover mx-auto"
              loading="lazy"
            />
          </div>
          <div className="">
            <h2 className="font-semibold text-4xl lg:text-5xl text-[#38485c]">
              {t("title")}
            </h2>
            <p className="my-8 text-lg text-[#a4abbd]">
              {t("description")}
            </p>
            <MainBtn>
              <Link href="/courses">{t("view-all-courses")}</Link>
            </MainBtn>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RewardWidget;