import { useMutation } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";

export type CheckoutPayload = {
  courses: { course_id: string }[];
  coupon_code?: string;
};

const useCheckout = () => {
  return useMutation({
    mutationKey: [Api.routes.site.enrollments],
    mutationFn: async (payload: CheckoutPayload) => {
      const formData = new FormData();

      // courses[]
      payload.courses.forEach((course, index) => {
        formData.append(`courses[${index}][course_id]`, course.course_id);
      });

      if (payload.coupon_code) {
        formData.append("coupon_code", payload.coupon_code);
      }

      const res = await api.post(Api.routes.site.enrollments, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res) {
        throw new Error("Failed to complete checkout");
      }

      return res.data;
    },
  });
};

export default useCheckout;
