"use client";

import Container from "@/_components/common/container/Container";
import { Headset } from "lucide-react";
import { useTranslations } from "next-intl";
import { paymentMethods } from "./data";

interface FooterContactProps {
  hotLine?: string;
  email?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  x?: string;
}
const FooterContact: React.FC<FooterContactProps> = ({
  hotLine = "",
  email = "",
  address = "",
  facebook = "",
  instagram = "",
  linkedin = "",
  x = "",
}) => {
  const t = useTranslations("footer");
  const socialAlt = t("socialIconsAlt");
  const paymentAlt = t("paymentMethodsAlt");
  return (
    <Container>
      <div className="mt-20 py-10 w-full bg-linear-to-r from-[#00C950] via-[#007A33] to-[#00C950]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-5 items-center px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-0">
            {hotLine && (
              <div className="flex gap-5">
                <Headset className="size-10 xl:size-15" />
                <div className="font-semibold text-[16px] xl:text-xl">
                  <h5>{t("callUs24_7")}</h5>

                  <a dir="ltr" href={`tel:${hotLine}`}>
                    {hotLine}
                  </a>
                </div>
              </div>
            )}

            <div>
              {address && <p className="mb-1">{address}</p>}
              {email && (
                <a
                  href={`mailto:${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[16px] md:text-lg xl:text-xl underline"
                >
                  {email}
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 xl:gap-5">
            <div>
              <h5 className="text-xl xl:text-2xl font-bold uppercase">
                {t("followUs")}
              </h5>
              <ul className="flex flex-wrap mt-3 gap-3">
                {/* {socialMediaLinks.map((social, i) => (
                 
                ))} */}
                {facebook && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={facebook}
                      className="bg-white/10 w-8 xl:w-10 h-8 xl:h-10 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#0B2F1B]"
                    >
                      <img
                        src="/images/footer/facebook.svg"
                        alt={socialAlt}
                        loading="lazy"
                        className="w-4 h-4"
                      />
                    </a>
                  </li>
                )}
                {x && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={x}
                      className="bg-white/10 w-8 xl:w-10 h-8 xl:h-10 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#0B2F1B]"
                    >
                      <img
                        src="/images/footer/twitter.svg"
                        alt={socialAlt}
                        loading="lazy"
                        className="w-4 h-4"
                      />
                    </a>
                  </li>
                )}
                {linkedin && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={linkedin}
                      className="bg-white/10 w-8 xl:w-10 h-8 xl:h-10 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#0B2F1B]"
                    >
                      <img
                        src="/images/footer/linkedin.svg"
                        alt={socialAlt}
                        loading="lazy"
                        className="w-4 h-4"
                      />
                    </a>
                  </li>
                )}
                {instagram && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={instagram}
                      className="bg-white/10 w-8 xl:w-10 h-8 xl:h-10 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#0B2F1B]"
                    >
                      <img
                        src="/images/instagram.png"
                        alt={socialAlt}
                        loading="lazy"
                        className="w-4 h-4"
                      />
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-xl xl:text-2xl uppercase">
                {t("paymentMethod")}
              </h5>
              <div className="flex flex-wrap gap-2 mt-3">
                {paymentMethods.map((payment, i) => (
                  <div
                    key={i}
                    className="w-8 xl:w-10 h-6 xl:h-8 rounded-sm bg-white"
                  >
                    <img
                      src={payment.image}
                      alt={paymentAlt}
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
