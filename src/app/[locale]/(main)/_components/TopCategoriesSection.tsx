import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
import CategoryCard from "../category/_components/CategoryCard";
const categories = [
  { id: 1, title: "Blender", courses: 1 },
  { id: 2, title: "3D Design", courses: 1 },
  { id: 3, title: "Mobile", courses: 1 },
  { id: 4, title: "Software", courses: 3 },
  { id: 5, title: "Adobe XD", courses: 1 },
  { id: 6, title: "UI Design", courses: 1 },
  { id: 7, title: "App Design", courses: 1 },
];
const TopCategoriesSection = () => {
  return (
    <section aria-labelledby="top-categories-heading">
      <div>
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2
            id="top-categories-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Top Categories
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Amet minim non deserunt ullamco est sit aliqua dolor do amet sint
            velit officia consequat.
          </p>
        </div>

        {/* Carousel */}
        <HorizontalCarousel ariaLabel="Top categories slider">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.title}
              coursesCount={cat.courses}
            />
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  );
};

export default TopCategoriesSection;
