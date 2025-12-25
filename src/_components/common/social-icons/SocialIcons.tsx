// SocialIconRenderer.tsx
import type { FC } from "react";
import Image from "next/image";
import {
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  MessageCircle,
  Music2,
} from "lucide-react";

type Props = {
  icon: string;
  type: string;
  alt: string;
};

function isAbsoluteUrl(v: string) {
  if (!v) return false;
  return /^https?:\/\//i.test(v);
}

function pickFallback(type: string, icon: string) {
  const t = (type || "").toLowerCase();
  const i = (icon || "").toLowerCase();

  if (t.includes("instagram") || i.includes("instagram")) return Instagram;
  if (t.includes("facebook") || i.includes("facebook")) return Facebook;
  if (t.includes("linkedin") || i.includes("linkedin")) return Linkedin;
  if (t.includes("youtube") || i.includes("youtube")) return Youtube;
  if (t.includes("twitter") || t === "x" || i.includes("twitter"))
    return Twitter;
  if (t.includes("whatsapp") || i.includes("whatsapp")) return MessageCircle;
  if (t.includes("tiktok") || i.includes("tiktok")) return Music2;

  // heroicon-o-globe-alt, website, unknown …
  return Globe;
}

const SocialIconRenderer: FC<Props> = ({ icon, type, alt }) => {
  if (isAbsoluteUrl(icon)) {
    return (
      <span className="relative h-5 w-5">
        <Image
          src={icon}
          alt={alt}
          fill
          sizes="20px"
          className="object-contain"
        />
      </span>
    );
  }

  const Icon = pickFallback(type, icon);
  return <Icon className="h-5 w-5" aria-hidden="true" />;
};

export default SocialIconRenderer;
