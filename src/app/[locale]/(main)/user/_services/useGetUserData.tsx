"use client";
import { useQuery } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import { useSession } from "next-auth/react";
import { User } from "@/types/user.types";
const useGetUserData = () => {
  const session = useSession();

  return useQuery({
    queryKey: [Api?.routes?.user?.me],
    queryFn: async () => {
      const response = await api.get(Api.routes?.user?.me);
      console.log("data from user", response?.data);
      return response?.data as User;
    },
    enabled: !!session?.data?.user?.token,
  });
};

export default useGetUserData;
