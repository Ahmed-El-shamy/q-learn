"use client";
import { useQuery } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import type { CourseCardProps } from "@/_components/common/courses/CourseCard";
import { useSession } from "next-auth/react";
const useGetMyCourses = () => {
  const session = useSession();
  return useQuery({
    queryKey: [Api?.routes?.site?.myCourses],
    queryFn: async () => {
      const response = await api?.get(Api?.routes?.site?.myCourses);
      console.log("response from my courses", response?.data);
      return response?.data as CourseCardProps[];
    },
    enabled: !!session?.data?.user?.token,
  });
};

export default useGetMyCourses;
