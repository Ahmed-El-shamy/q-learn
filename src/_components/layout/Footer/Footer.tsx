import Image from "next/image";
import Link from "next/link";
import { socialMediaLinks, footerSections } from "./data";
import NewsLetter from "../../NewsLetter/NewLetter";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-t-primary">
      <div className="max-w-[1700px] mx-auto text-black py-20 px-4 flex flex-col gap-8">
        <Image
          src="/logo-placeholder.jpg"
          alt="logo"
          width={200}
          height={200}
        />
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-2">
          <div className="flex-col flex justify-between md:w-fit w-full min-w-1/3 gap-4 md:gap-none">
            <div className="grid grid-cols-2 sm:flex items-center gap-x-3 flex-wrap gap-y-2">
              {socialMediaLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative opacity-70 w-fit hover:opacity-100 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-black after:w-0 hover:after:w-full after:transition-all after:duration-300 duration-300 after:ease-out"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <NewsLetter />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 min-w-1/2">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col">
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <div className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.link}
                      className="relative after:absolute w-fit after:bottom-0 after:left-0 after:h-px after:bg-primary after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-out"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
