import MainBtn from "@/_components/common/buttons/MainBtn";
import Container from "@/_components/common/container/Container";
import { Link } from "@/i18n/navigation";
import React from "react";
import {
  infoLinks,
  paymentMethods,
  serviceLinks,
  socialMediaLinks,
  supportLinks,
} from "./data";
import { Headset } from "lucide-react";
import RewardWidget from "./RewardWidget";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import CopyRights from "./CopyRights";

const Footer = () => {
  return (
    <footer className="bg-[#1e2147] text-white pb-16 mt-52 md:mt-96">
      <RewardWidget />

      <FooterLinks />

      <FooterContact />

      <CopyRights />
    </footer>
  );
};

export default Footer;
