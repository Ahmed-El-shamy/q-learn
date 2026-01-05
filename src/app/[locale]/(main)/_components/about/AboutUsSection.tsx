import Image from "next/image";
import { CircleCheckBig } from "lucide-react";

import api, { Api } from "@/_lib/api/api";
import ErrorHandler from "@/_components/common/error-handler/ErrorHandler";
import type { SimpleSection } from "@/types/simpleSection.types";
import HtmlContent from "@/_components/common/HtmlContent";
import Partners from "./partners/Partners";
import MainBtn from "@/_components/common/buttons/MainBtn";
import Container from "@/_components/common/container/Container";

const AboutUsSection = async () => {
  try {
    const response = await api.get(Api.routes.site.about);
    if (!response?.status) return null;

    const data = response.data as SimpleSection;
    return (
      <section aria-labelledby="about-heading" className="py-12 md:py-16">
        {/* Wrapper */}
        <Container>
          {/* Grid */}
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Text side */}
            <div className="text-start">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                About our institute
              </p>

              <h2
                id="about-heading"
                className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl"
              >
                {data?.title}
              </h2>

              {data?.description && (
                <div className="mt-4 text-slate-600">
                  {/* لو عندك tailwind typography هتبقى جميلة جدًا */}
                  <div className="prose prose-slate max-w-none prose-p:leading-relaxed">
                    <HtmlContent html={data.description} />
                  </div>
                </div>
              )}

              {/* Feature bullets (static but perfect for education sites) */}
              <ul
                className="mt-6 grid gap-3 sm:grid-cols-2"
                aria-label="Key highlights"
              >
                <li className="flex items-start gap-2 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
                  <CircleCheckBig
                    className="mt-0.5 h-5 w-5 text-slate-900"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      Expert-led courses
                    </p>
                    <p className="text-xs text-slate-600">
                      Learn from instructors with real industry experience.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-2 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
                  <CircleCheckBig
                    className="mt-0.5 h-5 w-5 text-slate-900"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      Flexible learning
                    </p>
                    <p className="text-xs text-slate-600">
                      Study anytime with mobile-friendly lessons.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-2 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
                  <CircleCheckBig
                    className="mt-0.5 h-5 w-5 text-slate-900"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      Practical outcomes
                    </p>
                    <p className="text-xs text-slate-600">
                      Hands-on projects designed for real skills.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-2 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
                  <CircleCheckBig
                    className="mt-0.5 h-5 w-5 text-slate-900"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      Trusted partners
                    </p>
                    <p className="text-xs text-slate-600">
                      Collaborations that support your journey.
                    </p>
                  </div>
                </li>
              </ul>

              {/* CTA */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {/* لو MainBtn عندك بيدعم asChild أو href استخدمه، وإلا استخدم Link */}
                <MainBtn title="Explore courses" />
              </div>
            </div>

            {/* Media side */}
            <div className="relative">
              <div
                className="
                  relative overflow-hidden rounded-3xl
                  border border-slate-200/70 bg-slate-100
                  shadow-sm
                "
              >
                {/* Decorative gradient */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-indigo-500/10"
                  aria-hidden="true"
                />

                <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                  <Image
                    src={data?.image}
                    alt={data?.title || "About image"}
                    fill
                    priority={false}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover"
                  />
                </div>

                {/* Bottom overlay card */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-2xl bg-white/90 backdrop-blur border border-slate-200/70 px-4 py-3 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                      Learn smarter, grow faster.
                    </p>
                    <p className="mt-0.5 text-xs text-slate-600 line-clamp-2">
                      Build skills with structured learning paths, real
                      practice, and support.
                    </p>
                  </div>
                </div>
              </div>

              {/* Small decorative blob */}
              <div
                className="pointer-events-none absolute -z-10 -right-8 -top-8 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Partners */}
          <div className="mt-10">
            <Partners />
          </div>
        </Container>
      </section>
    );
  } catch {
    return <ErrorHandler />;
  }
};

export default AboutUsSection;
