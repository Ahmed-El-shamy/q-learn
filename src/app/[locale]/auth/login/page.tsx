import Link from "next/link";
import LoginForm from "./_components/LoginForm";

const Page = () => {
  return (
    <div className="w-full p-4 flex justify-center items-center flex-col gap-2">
      <div className="max-w-lg w-full">
        <LoginForm />
        <Link href="../auth/forget-password" className="text-primary mt-2 block hover:underline cursor-pointer self-stretch">
          Forget Your Password
        </Link>
      </div>
    </div>
  );
};

export default Page;
