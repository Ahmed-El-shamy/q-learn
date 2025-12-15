"use client";
import { usePathname } from "@/i18n/navigation";
import RewardWidget from "./RewardWidget";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import CopyRights from "./CopyRights";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="bg-[#1e2147] text-white pb-16">
      {pathname === "/" && <RewardWidget />}

      <FooterLinks />

      <FooterContact />

      <CopyRights />
    </footer>
  );
};

export default Footer;
