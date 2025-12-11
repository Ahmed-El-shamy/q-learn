import { Link } from "@/i18n/navigation";

interface AuthBtnProp {
  text: string;
  href?: string;
  classname?: string;
  onClick?: () => void;
}

const AuthBtn = ({ text, href, classname, onClick }: AuthBtnProp) => {
  return (
    <Link
      href={href || "#"}
      className={`bg-linear-to-r hover:bg-linear-to-l duration-500 transition-all from-[#660afb] to-[#b633ff] text-white text-center font-bold py-3 rounded-sm cursor-pointer ${classname}`}
    >
      {text}
    </Link>
  );
};

export default AuthBtn;
