"use client";
import { useQuery } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import type { CourseCardProps } from "@/_components/common/courses/CourseCard";
import { useSession } from "next-auth/react";
const useGetMyWhishlist = () => {
  const session = useSession();
  return useQuery({
    queryKey: [Api?.routes?.site?.myWishlists],
    queryFn: async () => {
      const response = await api?.get(Api?.routes?.site?.myWishlists);
      return response?.data as CourseCardProps[];
    },
    enabled: !!session?.data?.user?.token,
  });
};

export default useGetMyWhishlist;
