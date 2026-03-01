"use client";

import { useTranslations } from "next-intl";
import MainBtn from "@/_components/common/buttons/MainBtn";
import useContact from "../_hook/useContact";
import ContactInput from "./ContactInput";
import ContactTextarea from "./ContactTextarea";

const ContactForm = () => {
  const t = useTranslations("contact");
  const {
    methods: {
      register,
      formState: { errors, isValid },
    },
    onSubmit,
    isSubmitting,
  } = useContact();

  return (
    <section className="containerr text-center my-20">
      <h2 className="text-2xl md:text-4xl text-[#1f2b40] font-bold">
        {t("formTitle")}
      </h2>

      <form
        onSubmit={onSubmit}
        aria-busy={isSubmitting}
        className="w-full md:w-[85%] lg:w-[75%] mx-auto space-y-8 mt-10"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <ContactInput
            type="text"
            label={t("labelName")}
            error={errors.name?.message}
            {...register("name")}
          />
          <ContactInput
            type="email"
            label={t("labelEmail")}
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <ContactInput
          type="text"
          label={t("labelSubject")}
          error={errors.subject?.message}
          {...register("subject")}
        />

        <ContactTextarea
          label={t("labelMessage")}
          error={errors.message?.message}
          {...register("message")}
        />

        <div className="w-full flex-center">
          <MainBtn
            isLoading={isSubmitting}
            size="large"
            type="submit"
            disabled={isSubmitting || !isValid}
            aria-disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? t("sending") : t("sendMessage")}
          </MainBtn>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
