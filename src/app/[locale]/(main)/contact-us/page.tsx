"use client";
import { Clock, MapPin, PhoneCall } from "lucide-react";
import React, { useState } from "react";
import ContactInput from "./_components/ContactInput";
import ContactTextarea from "./_components/ContactTextarea";
import MainBtn from "@/_components/common/buttons/MainBtn";
import useContact from "./_hook/useContact";

const contactInfo = [
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

const Page = () => {
  const {
    methods: {
      control,
      register,
      formState: { errors },
      watch,
    },
    handleSubmit,
  } = useContact();

  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#660afb" />
            <stop offset="50%" stopColor="#b633ff" />
            <stop offset="100%" stopColor="#660afb" />
          </linearGradient>
        </defs>
      </svg>

      <section
        className="bg-[url('/images/about-us/about-hero.webp')] 
             bg-cover bg-center bg-no-repeat
             h-64 w-full text-center"
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold translate-y-24">
          We're here with you every step way
        </h1>
      </section>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-10 lg:px-16 py-10 h-full bg-white rounded-[5rem] lg:rounded-[4rem] xl:rounded-4xl">
            {contactInfo.map((contact, i) => (
              <div key={i} className="flex flex-col gap-5">
                <contact.icon
                  size={45}
                  stroke="url(#icon-gradient)"
                  strokeWidth={1}
                  fill="#d7e0ff"
                  fillOpacity={0.6}
                />
                <h2 className="text-2xl text-[#202e3b]">{contact.title}</h2>
                <p className="text-lg text-[#676c7d] w-full lg:w-52">
                  {contact.info}
                </p>
                {contact.email && (
                  <p className="text-lg text-[#676c7d] w-full lg:w-52">
                    {contact.email}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="containerr mt-10 xl:-mt-20">
        <div className="relative mx-auto w-full sm:w-[80%] md:w-[75%] lg:w-[80%] h-100">
          <iframe
            className="rounded-4xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.150556019484!2d39.173908915099!3d21.536750184469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3cfde6b3fef2b%3A0xa53910df801b48b5!2sSaleh%20Al%20Tounesi%2C%20Al-Hamra'a%2C%20Jeddah%2023324%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1733078400000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 pointer-events-none rounded-4xl"></div>
        </div>
      </section>

      <section className="containerr text-center my-20">
        <h2 className="text-2xl md:text-4xl text-[#1f2b40] font-bold">
          Send us Message
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[85%] lg:w-[75%] mx-auto space-y-8 mt-10"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <ContactInput
              type="text"
              label="Name"
              error={errors.name?.message}
              {...register("name")}
            />
            <ContactInput
              type="email"
              label="Email Address"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <ContactInput
            type="text"
            label="Subject"
            error={errors.subject?.message}
            {...register("subject")}
          />
          <ContactTextarea
            label="Message"
            error={errors.message?.message}
            {...register("message")}
          />

          <MainBtn
            title="Send Message"
            size="large"
            className="block w-full py-5 mt-10 md:mt-20"
            type="submit"
          />
        </form>
      </section>
    </>
  );
};

export default Page;
