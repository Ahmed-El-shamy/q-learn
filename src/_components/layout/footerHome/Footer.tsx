import MainBtn from "@/_components/common/buttons/MainBtn";
import Container from "@/_components/common/container/Container";
import { Link } from "@/i18n/navigation";
import React from "react";
import {
  infoLinks,
  paymentMethods,
  serviceLinks,
  socialMediaLinks,
  supportLinks,
} from "./data";
import { Headset } from "lucide-react";
import RewardWidget from "./RewardWidget";

const Footer = () => {
  return (
    <footer className="bg-[#1e2147] text-white pb-16">
      <RewardWidget />

      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-5 mt-20">
          <div className="about space-y-5 col-span-2">
            <h3 className="font-bold text-xl xl:text-2xl">About</h3>
            <h4 className="font-bold text-xl xl:text-2xl">
              Never Miss A Post!
            </h4>
            <p className="text-sm">
              Choose the most powerful courses and always be on demand
            </p>
            <div className="flex gap-2">
              <input
                placeholder="Enter e-mail Address"
                className="border-0 outline-0 bg-white px-8 py-3 text-sm text-[#373737]"
              />
              <Link
                href={"/subscribe"}
                className="text-sm leading-8 px-5 py-2 bg-linear-to-r from-[#660afb] to-[#b633ff] rounded uppercase font-bold"
              >
                subscribe
              </Link>
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

      <Container>
        <div className="mt-20 py-10 w-full bg-linear-to-r from-[#660afb] via-[#b633ff] to-[#660afb]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-5 items-center px-5">
            <div className="grid grid-cols-2">
              <div className="flex gap-5">
                <Headset className="size-10 xl:size-15" />
                <div className="font-bold text-[16px] xl:text-xl">
                  <h5>Call Us 24/7</h5>
                  <p>+968 9700 2784</p>
                </div>
              </div>

              <div>
                <p className="mb-1">Al Khuwair, Muscat, Oman</p>
                <Link
                  href={""}
                  className="text-[16px] md:text-lg xl:text-xl underline"
                >
                  hello@aorasoft.com
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 xl:gap-5">
              <div>
                <h5 className="text-xl xl:text-2xl font-bold uppercase">
                  Follow Us
                </h5>
                <ul className="flex flex-wrap mt-3 gap-3">
                  {socialMediaLinks.map((social, i) => (
                    <li key={i}>
                      <Link
                        href={social.link}
                        className="bg-white/10 w-8 xl:w-10 h-8 xl:h-10 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#1f2b40]"
                        target="_blank"
                      >
                        <img
                          src={social.icon}
                          alt="social icons"
                          loading="lazy"
                          className="w-4 h-4"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-xl xl:text-2xl uppercase">
                  Payment method
                </h5>
                <div className="flex flex-wrap gap-2 mt-3">
                  {paymentMethods.map((payment, i) => (
                    <div
                      key={i}
                      className="w-8 xl:w-10 h-6 xl:h-8 rounded-sm bg-white"
                    >
                      <img
                        src={payment.image}
                        alt="payment methods"
                        className="w-full h-full object-contain rounded-sm"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <p className="text-center mt-12 text-[16px] md:text-xl">
          Copyright © 2024 qutell. All rights reserved | Made By{" "}
          <Link href={""} className="text-[#660af5]">
            Qutell
          </Link>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
