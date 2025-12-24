import api from "@/_lib/api/api";
import { Api } from "@/_lib/api/api";
import { useMutation } from "@tanstack/react-query";
import type { User } from "@/types/user.types";

type EditProfileResponse = {
  user?: User; // لو الـ backend بيرجع user
  message?: string;
};

const useEditProfile = () => {
  return useMutation({
    mutationKey: [Api.routes.user.update],
    mutationFn: async (data: FormData) => {
      const response = await api.put<EditProfileResponse>(
        Api.routes.user.update,
        data
      );
      return response;
    },
  });
};

export default useEditProfile;
