import Container from "@/_components/common/container/Container";
import { Link } from "@/i18n/navigation";
import React from "react";
import { infoLinks, serviceLinks, supportLinks } from "./data";
import MainBtn from "@/_components/common/buttons/MainBtn";
interface FooterLinksProps {
  websiteTitle?: string;
  slogan?: string;
}
const FooterLinks: React.FC<FooterLinksProps> = ({
  websiteTitle = "",
  slogan = "",
}) => {
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
          <p className="text-sm">
            Choose the most powerful courses and always be on demand
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              placeholder="Enter e-mail Address"
              className="border-0 outline-0 bg-white px-8 py-3 text-sm text-[#373737]"
            />
            <MainBtn title="subscribe" className="uppercase border-0" />
          </div>
        </div>

        <div className="support">
          <h3 className="font-bold text-xl xl:text-2xl mb-5">Support Zone</h3>
          <ul className="space-y-3">
            {supportLinks.map((support, i) => (
              <li key={i}>
                <Link
                  href={support.link}
                  className="text-sm hover:underline"
                  target="_blank"
                >
                  {support.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="info">
          <h3 className="font-bold text-xl xl:text-2xl mb-5">Company Info</h3>
          <ul className="space-y-3">
            {infoLinks.map((info, i) => (
              <li key={i}>
                <Link
                  href={info.link}
                  className="text-sm  hover:underline"
                  target="_blank"
                >
                  {info.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="service">
          <h3 className="font-bold text-xl xl:text-2xl mb-5">
            Explore Services
          </h3>
          <ul className="space-y-3">
            {serviceLinks.map((service, i) => (
              <li key={i}>
                <Link
                  href={service.link}
                  className="text-sm  hover:underline"
                  target="_blank"
                >
                  {service.label}
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
