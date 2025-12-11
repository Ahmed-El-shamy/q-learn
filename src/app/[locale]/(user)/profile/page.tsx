import MainBtn from "@/_components/common/buttons/MainBtn";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import { Lock } from "lucide-react";
import ProfileInfo from "./_components/ProfileInfo";
import ProfilePassword from "./_components/ProfilePassword";

const Page = () => {
  return (
    <>
      <ProfileInfo />

      <ProfilePassword />
    </>
  );
};

export default Page;
