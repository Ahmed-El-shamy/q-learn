import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { blogsOptions } from "../../blogs/_quires/blogsOptions";
import ShowBlogs from "./ShowBlogs";
const BlogsSection = async () => {
  const qc = new QueryClient();
  await qc.prefetchQuery(blogsOptions());
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <ShowBlogs />
    </HydrationBoundary>
  );
};

export default BlogsSection;
