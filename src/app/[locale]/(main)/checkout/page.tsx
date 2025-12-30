import React from "react";
import PaymentMethods from "./_components/PaymentMethods";

const page = () => {
  return (
    <>
      <section
        className="bg-[url('/images/about-us/about-hero.webp')] 
             bg-cover bg-center bg-no-repeat
             h-64 w-full text-center"
      >
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold translate-y-24">
          Complete Your Purchase
        </h1>
      </section>

      <section className="containerr">
        <div className="my-15">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-7">
              <PaymentMethods />
            </div>
            <div className="col-span-5 bg-green-500"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
