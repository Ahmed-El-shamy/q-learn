'use client';

import { useForm } from "react-hook-form";
import qaSchema, { QAPayload } from "../_schemas/qaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import { toast } from "sonner";
import toastErrorMessage from "@/_lib/api/toastErrorMessage";
import { courseQAQuery } from "../_data/CourseDetailsQuery";

const useQA = () => {
  const params: {id: string} = useParams();
  const queryClient = useQueryClient();
  const methods = useForm<QAPayload>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(qaSchema),
    defaultValues: {
      body: "",
    },
  });

  const QAMutation = useMutation({
    mutationKey: [Api.routes.site.courses_qa, params.id],
    mutationFn: async (payload: QAPayload) => {
      const response = await api.post(`${Api.routes.site.courses_qa}/${params.id}`, payload);
      return response;
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({queryKey: courseQAQuery(params.id).queryKey});
      toast.success(response?.message);
      methods.reset();
    },
    onError: (err: unknown) => toastErrorMessage(err)
  })

  async function handleSubmit(payload: QAPayload) {
    await QAMutation.mutateAsync(payload);
  }

  return {
    methods,
    submit: methods.handleSubmit(handleSubmit),
    QAMutation,
  };
};

export default useQA;