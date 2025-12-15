'use client';

import { useForm } from "react-hook-form";
import qaSchema, { QAPayload } from "../_schemas/qaSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const useQA = () => {
  const methods = useForm<QAPayload>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(qaSchema),
    defaultValues: {
      text: "",
    },
  });

  function handleSubmit(payload: QAPayload) {
    // TODO: integrate with API to submit question for the course
    // eslint-disable-next-line no-console
    console.log("QA question submitted", payload);
  }

  return {
    methods,
    submit: methods.handleSubmit(handleSubmit),
  };
};

export default useQA;


