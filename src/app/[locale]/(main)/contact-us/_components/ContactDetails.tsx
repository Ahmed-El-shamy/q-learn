"use client";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { contactSettingsOptions } from "../queries/contactSettingsOptions";
import { MapPin, PhoneCall, Mail } from "lucide-react";

/**
 * 
 * @returns const contactInfo = [
  {
    icon: PhoneCall,
    title: "Contact Us",
    info: "Mobile: +0212121212",
    email: "Email: Qutell@qutell.com",
  },
  {
    icon: Clock,
    title: "Support Hour",
    info: "Monday - Friday: 09:00 - 17:00",
  },
  {
    icon: MapPin,
    title: "Address",
    info: "Al Khuwair, Muscat, Oman",
  },
];

 */
const ContactDetails = () => {
  const queryResult = useQuery(contactSettingsOptions());
  const t = useTranslations();
  return (
    <>
      <section className="containerr mt-20 relative z-1">
        <div
          className="
            m-auto
            main-background
            w-full sm:w-[80%] md:w-[80%] lg:w-[88%] xl:w-[75%]
            h-full md:h-[90%] lg:h-[80%]
            rounded-[5rem] lg:rounded-[4rem] xl:rounded-4xl
            py-1
        "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-10 lg:px-16 py-10 h-full bg-white rounded-[5rem] lg:rounded-[4rem] xl:rounded-4xl">
            <div className="flex flex-col gap-3">
              <PhoneCall
                size={45}
                stroke="url(#icon-gradient)"
                strokeWidth={1}
                fill="#d7e0ff"
                fillOpacity={0.6}
              />
              <h2 className="text-2xl text-[#202e3b]">{t("phone")}</h2>
              <a
                href={`https://wa.me/${queryResult?.data?.contact_phone}`}
                dir="ltr"
                target="_blank"
                rel="noreferrer noopener"
                className="text-lg text-[#676c7d] w-full lg:w-52"
              >
                {queryResult?.data?.contact_phone}
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <Mail
                size={45}
                stroke="url(#icon-gradient)"
                strokeWidth={1}
                fill="#d7e0ff"
                fillOpacity={0.6}
              />
              <h2 className="text-2xl text-[#202e3b]">{t("email")}</h2>
              <a
                href={`mailto:${queryResult?.data?.contact_email}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-lg text-[#676c7d] w-full lg:w-52"
              >
                {queryResult?.data?.contact_email}
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <MapPin
                size={45}
                stroke="url(#icon-gradient)"
                strokeWidth={1}
                fill="#d7e0ff"
                fillOpacity={0.6}
              />
              <h2 className="text-2xl text-[#202e3b]">{t("address")}</h2>
              <p className="text-lg text-[#676c7d] w-full lg:w-52">
                {queryResult?.data?.contact_address}
              </p>
            </div>
          </div>
        </div>
      </section>
      {queryResult?.data?.iframe && (
        <section className="containerr mt-10 xl:-mt-20">
          <div className="relative mx-auto w-full sm:w-[80%] md:w-[75%] lg:w-[80%] h-[300px] rounded-4xl overflow-hidden">
            <div
              className="w-full h-full rounded-4xl"
              dangerouslySetInnerHTML={{ __html: queryResult?.data?.iframe }}
            />

            <div className="absolute inset-0 bg-black/50 pointer-events-none rounded-4xl" />
          </div>
        </section>
      )}
    </>
  );
};

export default ContactDetails;
