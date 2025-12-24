"use client";

import MainTextArea from "@/_components/common/inputs/mainInput/MainTextArea";
import MainBtn from "@/_components/common/buttons/MainBtn";
import useQA from "../_hooks/useQA";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

const CourseQAInput = () => {
  const t = useTranslations();
  const {
    methods: {
      formState: { errors },
      register,
      watch,
    },
    submit,
  } = useQA();

  return (
    <form
      onSubmit={submit}
      className="w-full flex flex-col gap-3 sm:gap-4"
    >
      <MainTextArea
        {...register("text")}
        label={t("courses.qa-dialog-label")}
        placeholder={t("courses.qa-dialog-placeholder")}
        error={errors.text?.message}
        rows={4}
        value={watch("text")}
      />
      <div className="flex justify-end">
        <MainBtn
          type="submit"
          size="small"
          className="flex items-center flex-row gap-2 text-xs sm:text-sm md:text-base"
        >
          <MessageCircle size={16} />
          <div>{t("courses.qa-dialog-submit")}</div>
        </MainBtn>
      </div>
    </form>
  );
};

export default CourseQAInput;




