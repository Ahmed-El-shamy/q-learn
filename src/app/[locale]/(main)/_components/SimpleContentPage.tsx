interface SimpleContentPageProps {
  title: string;
  description: string;
}

export default function SimpleContentPage({
  title,
  description,
}: SimpleContentPageProps) {
  return (
    <>
      <section
        className="bg-[url('/images/about-us/about-hero.webp')] 
             bg-cover bg-center bg-no-repeat
             h-64 w-full text-center"
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold translate-y-24">
          {title}
        </h1>
      </section>

      <section className="containerr py-16">
        <div className="max-w-3xl">
          <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl text-[#202e3b] mb-5">
            {title}
          </h2>
          <p className="text-[#373737] text-lg leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </section>
    </>
  );
}
