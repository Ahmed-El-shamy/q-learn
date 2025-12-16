import React from "react";

const categories = [
  "Web Development",
  "PHP",
  "Laravel",
  "Python",
  "Data Science",
  "Machine Learning",
];

const FilterComponent = () => {
  return (
    <div className="border border-[#d1d1d1] p-4">
      <h2 className="text-xl text-[#202e3b] font-semibold">Blog Categories</h2>

      <div className="mt-5 space-y-4 pb-5">
        {categories.map((cat, i) => (
          <label
            key={i}
            className="custom-checkbox-container flex items-center gap-3"
          >
            <input type="checkbox" name="skill-web-dev" />

            <span className="custom-checkmark cursor-pointer"></span>
            <span className="text-sm text-[#202e3b]">{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
