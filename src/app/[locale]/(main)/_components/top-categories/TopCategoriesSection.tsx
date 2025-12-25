import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { categoriesOptions } from "./queries/categoriesOptions";
import ShowCategories from "./ShowCategories";

const TopCategoriesSection = async () => {
  const qc = new QueryClient();
  await qc.prefetchQuery(categoriesOptions());
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <ShowCategories />
    </HydrationBoundary>
  );
};

export default TopCategoriesSection;
