import Link from "next/link";
import LoginForm from "./_components/LoginForm";

const Page = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-2">
      <div className="max-w-lg w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
