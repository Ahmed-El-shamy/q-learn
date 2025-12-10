import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
import TeacherCard from "./TeacherCard";

const teachers = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior IT Specialist",
    photo: "/images/teachers/te-01.jpg",
    gradient: "blue" as const,
  },
  {
    id: 2,
    name: "Alice Johnson",
    title: "Software Engineer",
    photo: "/images/teachers/te-02.jpg",
    gradient: "purple" as const,
  },
  {
    id: 3,
    name: "Bob Williams",
    title: "Cloud Architect",
    photo: "/images/teachers/te-03.jpg",
    gradient: "blue" as const,
  },
  {
    id: 4,
    name: "Michael Brown",
    title: "Data Science Specialist",
    photo: "/images/teachers/te-01.jpg",
    gradient: "pink" as const,
  },
  {
    id: 5,
    name: "John Doe",
    title: "Senior IT Specialist",
    photo: "/images/teachers/te-01.jpg",
    gradient: "blue" as const,
  },
  {
    id: 6,
    name: "Alice Johnson",
    title: "Software Engineer",
    photo: "/images/teachers/te-02.jpg",
    gradient: "purple" as const,
  },
  {
    id: 7,
    name: "Bob Williams",
    title: "Cloud Architect",
    photo: "/images/teachers/te-03.jpg",
    gradient: "blue" as const,
  },
  {
    id: 8,
    name: "Michael Brown",
    title: "Data Science Specialist",
    photo: "/images/teachers/te-01.jpg",
    gradient: "pink" as const,
  },
];
const TeachersSection = () => {
  return (
    <section aria-labelledby="teachers-heading">
      <div>
        {/* العنوان الرئيسي لو حابب */}
        <div className="text-center mb-10 md:mb-12">
          <h2
            id="teachers-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Expert Teachers
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Here is short details about our institute, Also you can see how we
            work
          </p>
        </div>

        {/* السلايدر */}
        <HorizontalCarousel ariaLabel="Students testimonials slider">
          {teachers.map((item) => (
            <TeacherCard
              key={item.id}
              name={item.name}
              title={item.title}
              photo={item.photo}
              gradient={item.gradient}
              socialLinks={[
                { platform: "facebook", href: "https://facebook.com" },
                { platform: "twitter", href: "https://x.com" },
                { platform: "linkedin", href: "https://linkedin.com" },
              ]}
            />
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  );
};

export default TeachersSection;
