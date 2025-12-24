import React from "react";
import { FaImage } from "react-icons/fa";

const CourseSkelton: React.FC = () => {
  return (
    <div className="animate-pulse p-4 border border-[#d1d1d1] bg-white w-full h-[510px] flex flex-col">
      {/* Thumbnail Area */}
      <div className="bg-gray-200 h-[45%] w-full mb-4 flex items-center justify-center relative">
        <FaImage size={50} className="text-gray-300" />
      </div>

      <div className="p-1 flex flex-col flex-1">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />

        {/* Ratings & Students */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
        </div>

        {/* Description Lines */}
        <div className="space-y-2 mb-auto">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Footer (Price & Cart) */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
          <div className="h-8 bg-gray-200 rounded w-24" />
          <div className="h-10 w-10 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CourseSkelton;
