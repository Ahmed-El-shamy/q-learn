import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import ShowTrendedCourses from "./ShowTrendedCourses";
import { trendedCoursesOptions } from "../_quires/trendedCoursesOptions";
const TrendedCoursesSection = async () => {
  const qc = new QueryClient();
  await qc.prefetchQuery(trendedCoursesOptions());
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <ShowTrendedCourses />
    </HydrationBoundary>
  );
};

export default TrendedCoursesSection;
