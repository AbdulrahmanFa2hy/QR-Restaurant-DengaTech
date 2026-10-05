import React, { useState, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Menu1SubCategory from "./Menu1SubCategory";

const Menu1Category = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const categoryRefs = useRef({});

  const toggleCategory = (categoryId) => {
    const newActiveCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newActiveCategory);

    // Close any open subcategory when category is closed
    if (!newActiveCategory) {
      setActiveSubCategory(null);
    }

    // Scroll to the top of the opened category
    if (newActiveCategory && categoryRefs.current[newActiveCategory]) {
      setTimeout(() => {
        categoryRefs.current[newActiveCategory].scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100); // Small delay to allow animation to start
    }
  };

  const toggleSubCategory = (subCategoryId) => {
    const newActiveSubCategory =
      activeSubCategory === subCategoryId ? null : subCategoryId;
    setActiveSubCategory(newActiveSubCategory);

    // Scroll to the top of the opened subcategory
    if (newActiveSubCategory && categoryRefs.current[newActiveSubCategory]) {
      setTimeout(() => {
        categoryRefs.current[newActiveSubCategory].scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100); // Small delay to allow animation to start
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-2 py-12">
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-firstColor-800 mb-8 text-center animate-in fade-in-50 duration-700">
          فئات قائمتنا
        </h2>

        {categories.map((category, index) => (
          <div
            key={category.id}
            ref={(el) => (categoryRefs.current[category.id] = el)}
            className={`bg-white delay-[${index * 100}ms] ${
              index === 0 ? "mt-0" : "mt-4"
            } rounded-xl shadow-lg  overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02] animate-in slide-in-from-bottom-4`}
          >
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full px-4 sm:px-6 py-5 flex items-center justify-between bg-gradient-to-r from-firstColor-100 to-secondColor-200 hover:from-firstColor-200 hover:to-secondColor-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-firstColor-100 group"
            >
              <div className="text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-firstColor-800 group-hover:scale-105 transition-transform duration-300">
                  {category.name}
                </h3>
              </div>

              <div className="transition-all duration-300 group-hover:scale-110">
                {activeCategory === category.id ? (
                  <ChevronDown className="w-7 h-7 text-firstColor-600 group-hover:text-firstColor-800 transition-colors duration-300" />
                ) : (
                  <ChevronRight className="w-7 h-7 text-firstColor-600 group-hover:text-firstColor-800 transition-colors duration-300" />
                )}
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeCategory === category.id
                  ? "max-h-[5000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-1 pb-3 sm:p-6 bg-thirdColor-50">
                <Menu1SubCategory
                  subcategories={category.subcategories}
                  activeSubCategory={activeSubCategory}
                  onToggleSubCategory={toggleSubCategory}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Menu1Category;
