import Container from "@/_components/common/container/Container";
import { Link } from "@/i18n/navigation";
import { Headset } from "lucide-react";
import React from "react";
import { paymentMethods, socialMediaLinks } from "./data";

const FooterContact = () => {
  return (
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
  );
};

export default FooterContact;
