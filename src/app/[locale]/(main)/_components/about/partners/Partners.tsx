import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ErrorHandler from "@/_components/common/error-handler/ErrorHandler";
import api, { Api } from "@/_lib/api/api";
import type { Partner } from "./partners.types";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";

function safeUrl(url?: string) {
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url.replace(/^\/+/, "")}`;
}

type PartnerLogoCardProps = {
  partner: Partner;
  alt: string;
  ariaLabel: string;
  title: string;
};

const PartnerLogoCard = ({
  partner,
  alt,
  ariaLabel,
  title,
}: PartnerLogoCardProps) => {
  const href = safeUrl(partner?.link);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="
        group relative
        block
        w-[180px] sm:w-[200px] md:w-[220px]
        h-20 sm:h-24
        rounded-2xl
        border border-slate-200/70
        bg-white
        shadow-sm
        transition
        hover:shadow-md
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2
      "
      aria-label={ariaLabel}
      title={title}
    >
      {/* subtle background for modern feel */}
      <div
        className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-br from-slate-50 to-white
          opacity-0 transition-opacity
          group-hover:opacity-100
        "
        aria-hidden="true"
      />

      <div className="relative h-full w-full p-4">
        <div className="relative h-full w-full">
          <Image
            src={partner.image}
            alt={alt}
            fill
            sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 220px"
            className="
              object-contain
              transition
              duration-300
              grayscale opacity-80
              group-hover:grayscale-0 group-hover:opacity-100
            "
            quality={90}
            loading="lazy"
          />
        </div>
      </div>
    </a>
  );
};

const Partners = async () => {
  const t = await getTranslations("partners");
  try {
    const response = await api.get(Api.routes.site.partners);
    if (!response?.status) return null;

    const partners = response.data as Partner[];
    if (!partners?.length) return null;
    const partnerFallback = t("partnerFallback");
    return (
      <section className="mt-28" aria-labelledby="partners-heading">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h3
              id="partners-heading"
              className="text-2xl md:text-3xl font-bold text-slate-900"
            >
              {t("heading")}
            </h3>
            <p className="mt-1 text-sm md:text-base text-slate-600">
              {t("description")}
            </p>
          </div>
        </div>

        <HorizontalCarousel
          ariaLabel={t("carouselLabel")}
          className="py-2"
        >
          {partners.map((partner) => {
            const name = partner?.name ?? partnerFallback;
            return (
              <PartnerLogoCard
                key={partner?.link ?? partner?.name}
                partner={partner}
                alt={t("partnerLogoAlt", { name })}
                ariaLabel={t("openPartner", { name })}
                title={name}
              />
            );
          })}
        </HorizontalCarousel>
      </section>
    );
  } catch {
    return <ErrorHandler />;
  }
};

export default Partners;
