import api, { Api } from "@/_lib/api/api";

export const validateCoupon = async (code: string) => {
  const response = await api.post(Api.routes.site.coupon, {
    code,
  });
  return response?.data;
};
