import { NavbarProps } from "../types/navbar";
import { NavLinks } from "../data/navbarLinks";
import MobileSidebar from "./MobileSidebar";
import { Link } from "@/i18n/navigation";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CartIcon from "./CartIcon";
import UserIcon from "./UserIcon";

async function Navbar({
  links = [],
  logoText = "Logo",
  logoImg = "https://placehold.co/80x80",
}: NavbarProps) {
  const t = await getTranslations("auth");
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav className="w-full p-4 bg-white shadow-md">
        <div className="w-[90%] mx-auto flex justify-between items-center">
          <div className="flex justify-center items-center gap-8">
            <div className="flex items-center gap-3">
              {logoImg ? (
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={logoImg}
                    alt="Logo Image"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <p className="font-bold text-xl">{logoText}</p>
              )}
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
            {session ? (
              <>
                <UserIcon />
                <CartIcon />
              </>
            ) : (
              // <span className="text-sm text-gray-600">User is signed in</span>
              <>
                <Link href="/auth/login">
                  <MainBtn>{t("login.button")}</MainBtn>
                </Link>
                <Link href="/auth/register">
                  <MainBtn variant="outlined">{t("signup")}</MainBtn>
                </Link>
                <CartIcon />
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
