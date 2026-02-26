"use client";

import Container from "@/_components/common/container/Container";
import { Link } from "@/i18n/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import { infoLinks, serviceLinks, supportLinks } from "./data";
import NewsLetter from "@/_components/NewsLetter/NewLetter";

interface FooterLinksProps {
  websiteTitle?: string;
  slogan?: string;
}

const FooterLinks: React.FC<FooterLinksProps> = ({
  websiteTitle = "",
  slogan = "",
}) => {
  const t = useTranslations("footer");
  const linkLabel = (link: (typeof supportLinks)[0]) =>
    link.labelKey ? t(link.labelKey) : link.label ?? "";

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-5 mt-20">
        <div className="about space-y-5 col-span-2">
          {websiteTitle && (
            <h3 className="font-bold text-xl xl:text-2xl">{websiteTitle}</h3>
          )}
          {slogan && (
            <h5 className="font-bold text-xl xl:text-2xl">{slogan}</h5>
          )}
          <NewsLetter />
        </div>

        <div className="support">
          <h3 className="font-bold text-xl xl:text-2xl mb-5">
            {t("supportZone")}
          </h3>
          <ul className="space-y-3">
            {supportLinks.map((support, i) => (
              <li key={i}>
                <Link
                  href={support.link}
                  className="text-sm hover:underline"
                  target="_blank"
                >
                  {linkLabel(support)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="info">
          <h3 className="font-bold text-xl xl:text-2xl mb-5">
            {t("companyInfo")}
          </h3>
          <ul className="space-y-3">
            {infoLinks.map((info, i) => (
              <li key={i}>
                <Link
                  href={info.link}
                  className="text-sm hover:underline"
                  target="_blank"
                >
                  {linkLabel(info)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="service">
          <h3 className="font-bold text-xl xl:text-2xl mb-5">
            {t("exploreServices")}
          </h3>
          <ul className="space-y-3">
            {serviceLinks.map((service, i) => (
              <li key={i}>
                <Link
                  href={service.link}
                  className="text-sm hover:underline"
                  target="_blank"
                >
                  {linkLabel(service)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default FooterLinks;
