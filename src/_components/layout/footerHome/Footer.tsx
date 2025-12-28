"use client";
import { usePathname } from "@/i18n/navigation";
import RewardWidget from "./RewardWidget";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import CopyRights from "./CopyRights";
interface FooterProps {
  hotLine: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  x: string;
  websiteTitle: string;
  slogan: string;
  copyRight: string;
}
const Footer: React.FC<FooterProps> = ({
  hotLine,
  email,
  address,
  facebook,
  instagram,
  linkedin,
  x,
  websiteTitle,
  slogan,
  copyRight,
}) => {
  const pathname = usePathname();
  return (
    <footer className="bg-[#1e2147] text-white pb-16">
      {pathname === "/" && <RewardWidget />}

      <FooterLinks websiteTitle={websiteTitle} slogan={slogan} />

      <FooterContact
        hotLine={hotLine}
        email={email}
        address={address}
        facebook={facebook}
        instagram={instagram}
        linkedin={linkedin}
        x={x}
      />

      <CopyRights copyRight={copyRight} />
    </footer>
  );
};

export default Footer;
