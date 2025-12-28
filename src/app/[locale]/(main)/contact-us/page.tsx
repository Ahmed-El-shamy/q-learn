import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { contactSettingsOptions } from "./queries/contactSettingsOptions";
import ContactDetails from "./_components/ContactDetails";
import ContactForm from "./_components/ContactForm";

const Page = async () => {
  const qc = new QueryClient();
  await qc.prefetchQuery(contactSettingsOptions());

  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#660afb" />
            <stop offset="50%" stopColor="#b633ff" />
            <stop offset="100%" stopColor="#660afb" />
          </linearGradient>
        </defs>
      </svg>

      <section
        className="bg-[url('/images/about-us/about-hero.webp')] 
             bg-cover bg-center bg-no-repeat
             h-64 w-full text-center"
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold translate-y-24">
          We're here with you every step way
        </h1>
      </section>
      <HydrationBoundary state={dehydrate(qc)}>
        <ContactDetails />
      </HydrationBoundary>
      <ContactForm />
    </>
  );
};

export default Page;
