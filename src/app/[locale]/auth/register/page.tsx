import RegisterForm from "./_components/RegisterForm";

const page = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-2">
      <div className="max-w-lg w-full">
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;
