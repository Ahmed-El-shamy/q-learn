const FilterSkelton: React.FC = () => {
  return (
    <div className="animate-pulse p-6 rounded-lg border border-gray-200 bg-white w-full">
      {/* Title placeholder */}
      <div className="h-5 bg-gray-200 rounded w-1/2 mb-6" />

      {/* Checkboxes placeholders */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-100 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSkelton;
