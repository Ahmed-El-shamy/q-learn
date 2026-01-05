import Image from "next/image";
import ErrorHandler from "@/_components/common/error-handler/ErrorHandler";
import api, { Api } from "@/_lib/api/api";
import type { Partner } from "./partners.types";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";

function safeUrl(url?: string) {
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url.replace(/^\/+/, "")}`;
}

function partnerAlt(partner: Partner) {
  return partner?.name ? `${partner.name} logo` : "Partner logo";
}

type PartnerLogoCardProps = {
  partner: Partner;
};

const PartnerLogoCard = ({ partner }: PartnerLogoCardProps) => {
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
      aria-label={`Open partner: ${partner?.name ?? "Partner"}`}
      title={partner?.name ?? "Partner"}
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
            alt={partnerAlt(partner)}
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
  try {
    const response = await api.get(Api.routes.site.partners);
    if (!response?.status) return null;

    const partners = response.data as Partner[];
    if (!partners?.length) return null;
    console.log("data from partners", partners);
    return (
      <section className="mt-28" aria-labelledby="partners-heading">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h3
              id="partners-heading"
              className="text-2xl md:text-3xl font-bold text-slate-900"
            >
              Our Partners
            </h3>
            <p className="mt-1 text-sm md:text-base text-slate-600">
              Trusted by leading organizations and brands.
            </p>
          </div>
        </div>

        <HorizontalCarousel
          ariaLabel="Partners logos carousel"
          className="py-2"
        >
          {partners.map((partner) => (
            <PartnerLogoCard
              key={partner?.link ?? partner?.name}
              partner={partner}
            />
          ))}
        </HorizontalCarousel>
      </section>
    );
  } catch {
    return <ErrorHandler />;
  }
};

export default Partners;
