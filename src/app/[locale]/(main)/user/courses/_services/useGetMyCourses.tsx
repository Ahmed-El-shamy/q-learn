"use client";
import { useQuery } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import { useSession } from "next-auth/react";
import { Course } from "../../../courses/_types/course.types";
const useGetMyCourses = () => {
  const session = useSession();
  return useQuery({
    queryKey: [Api?.routes?.site?.myCourses],
    queryFn: async () => {
      const response = await api?.get<Course[]>(Api?.routes?.site?.myCourses);
      console.log("response from my courses", response?.data);
      return response?.data;
    },
    enabled: !!session?.data?.user?.token,
  });
};

export default useGetMyCourses;
