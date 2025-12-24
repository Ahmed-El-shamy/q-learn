import api, { Api } from "@/_lib/api/api";
import { useMutation } from "@tanstack/react-query";

type ChangePasswordBody = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

type ChangePasswordResponse = {
  message?: string;
};

const useChangePasswordApi = () => {
  return useMutation({
    mutationKey: [Api.routes.user.changePassword],
    mutationFn: async (body: ChangePasswordBody) => {
      const res = await api.post<ChangePasswordResponse>(
        Api.routes.user.changePassword,
        body
      );
      if (res) return res.data;
    },
  });
};

export default useChangePasswordApi;
