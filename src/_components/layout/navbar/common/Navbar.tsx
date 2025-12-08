import { NavbarProps } from "../types/navbar";
import { NavLinks } from "../data/navbarLinks";
import MobileSidebar from "./MobileSidebar";
import { Link } from "@/i18n/navigation";
const Navbar: React.FC<NavbarProps> = ({
  links = [],
  logoText = "Logo",
  logoImg = "https://placehold.co/80x80",
}) => {
  return (
    <>
      <nav className="w-full p-4 bg-white shadow-md">
        <div className="w-[90%] mx-auto flex justify-between items-center">
          <div className="flex justify-center items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={logoImg}
                  alt="Logo Image"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-bold text-xl">{logoText}</p>
            </div>

            <ul className="hidden lg:flex items-center justify-center gap-5">
              {NavLinks.concat(links).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="capitalize">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <MobileSidebar logoText={logoText} links={links} />

          <div className="hidden lg:flex items-center gap-5">
            <button className="px-6 py-2 bg-gray-400 text-white rounded-lg">
              Login
            </button>
            <button className="px-6 py-2 bg-gray-400 text-white rounded-lg">
              Sign up
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
