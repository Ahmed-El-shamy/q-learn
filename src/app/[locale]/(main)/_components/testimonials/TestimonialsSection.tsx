import type { FC } from "react";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    quote:
      "Kissmetrics customer describes how the software helped him achieve his goals. Notice how he highlights different features that Kissmetrics offers and how they directly impacted his growth.",
    name: "Spence Monn",
    role: "LucidChart",
    company: "LucidChart",
    initials: "SM",
  },
  {
    id: 2,
    quote:
      "Working in conjunction with humanitarian aid agencies, we have supported programmes to help alleviate human suffering through.",
    name: "Mickel Clark",
    role: "Cricketer",
    initials: "MC",
  },
  {
    id: 3,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    name: "Steve Smith",
    role: "Cricketer",
    initials: "SS",
  },
  {
    id: 4,
    quote:
      "Working in conjunction with humanitarian aid agencies, we have supported programmes to help alleviate human suffering through.",
    name: "Micky Mouse",
    role: "Photographer",
    initials: "MM",
  },
];

const TestimonialsSection: FC = () => {
  return (
    <section aria-labelledby="testimonials-heading">
      <div>
        {/* العنوان الرئيسي لو حابب */}
        <div className="text-center mb-10 md:mb-12">
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            What Our Students Say
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Amet minim non deserunt ullamco est sit aliqua dolor do amet sint
            velit officia consequat. Testimonials about course quality.
          </p>
        </div>

        {/* السلايدر */}
        <HorizontalCarousel ariaLabel="Students testimonials slider">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              quote={item.quote}
              name={item.name}
              role={item.role}
              company={item.company}
              initials={item.initials}
              rating={5}
            />
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
