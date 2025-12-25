"use client";
import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import FilterComponent from "./FilterComponent";
import { Menu, X } from "lucide-react";

const BlogSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block lg:col-span-3">
        <div className="sticky top-6 space-y-5">
          <SearchComponent />
          <FilterComponent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden z-50">
        <div className="flex items-center gap-3 absolute -top-12 start-2">
          <button
            className=" p-1 hover:bg-gray-200 rounded duration-100 cursor-pointer"
            onClick={toggleMenu}
          >
            <Menu stroke="#1f2b40" />
          </button>
          <p className="text-xl text-[#1f2b40]">Search and Filters</p>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-10"
            onClick={() => setIsOpen(false)}
          />
        )}

        <aside
          className={`z-50 bg-white border-l-[#d1d1d1] w-2/3 px-4 py-4 flex flex-col max-w-lg h-screen overflow-y-auto fixed top-0 left-0 duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center border-b border-b-[#d1d1d1] pb-4">
            <p className="text-xl text-[#1f2b40]">Filters</p>
            <button
              onClick={toggleMenu}
              className="cursor-pointer p-1 hover:bg-gray-100 duration-100 rounded"
            >
              <X size={18} stroke="#1f2b40" />
            </button>
          </div>
          <div className="space-y-5">
            <SearchComponent />
            <FilterComponent />
          </div>
        </aside>
      </div>
    </>
  );
};

export default BlogSidebar;

