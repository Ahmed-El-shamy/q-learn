import api from "@/_lib/api/api";
import { Api } from "@/_lib/api/api";
import { useMutation } from "@tanstack/react-query";
import type { User } from "@/types/user.types";
import { ChangeUserInfo } from "../profile/_schema/ProfileInfoSchema";

type EditProfileResponse = {
  user?: User; // لو الـ backend بيرجع user
  message?: string;
};

const useEditProfile = () => {
  return useMutation({
    mutationKey: [Api.routes.user.update],
    mutationFn: async (data: ChangeUserInfo) => {
      const response = await api.post<EditProfileResponse>(
        Api.routes.user.update,
        {
          ...data,
          _method: "PUT"
        }
      );
      return response;
    },
  });
};

export default useEditProfile;
