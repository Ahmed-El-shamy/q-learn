"use client";

import MainBtn from "@/_components/common/buttons/MainBtn";
import useContact from "../_hook/useContact";
import ContactInput from "./ContactInput";
import ContactTextarea from "./ContactTextarea";

const ContactForm = () => {
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
        Send us Message
      </h2>

      <form
        onSubmit={onSubmit}
        aria-busy={isSubmitting}
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

        <div className="w-full flex-center">
          <MainBtn
            isLoading={isSubmitting}
            title={isSubmitting ? "Sending..." : "Send Message"}
            size="large"
            type="submit"
            disabled={isSubmitting || !isValid}
            aria-disabled={isSubmitting || !isValid}
          />
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
