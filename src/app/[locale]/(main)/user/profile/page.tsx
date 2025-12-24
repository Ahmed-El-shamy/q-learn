"use client";
import useGetUserData from "../_services/useGetUserData";
import ProfileInfo from "./_components/ProfileInfo";
import ProfilePassword from "./_components/ProfilePassword";
import FetchHandler from "@/_components/common/fetchHandler/FetchHandler";
const Page = () => {
  const queryResult = useGetUserData();
  return (
    <FetchHandler queryResult={queryResult} skeletonType="profile">
      {queryResult && queryResult?.data && (
        <ProfileInfo user={queryResult?.data} />
      )}
      <ProfilePassword />
    </FetchHandler>
  );
};

export default Page;
