import React, { useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Menu1Product from "./Menu1Product";
import PizzaImg from "../../../assets/pizza.jpg";

const SubCategory = ({
  subcategories,
  activeSubCategory,
  onToggleSubCategory,
}) => {
  const subCategoryRefs = useRef({});

  const handleToggleSubCategory = (subCategoryId) => {
    onToggleSubCategory(subCategoryId);
  };

  return (
    <div className="space-y-2">
      {subcategories.map((subCategory) => (
        <div
          key={subCategory.id}
          ref={(el) => (subCategoryRefs.current[subCategory.id] = el)}
          className="bg-white rounded-lg shadow-md border border-thirdColor-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <button
            onClick={() => handleToggleSubCategory(subCategory.id)}
            className="w-full px-2 sm:px-6 py-2 flex items-center justify-between hover:bg-thirdColor-50 transition-all duration-300 focus:outline-none  rounded-lg group"
          >
            <div className="flex items-center space-x-4">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={PizzaImg}
                  alt={subCategory.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
              <div className="text-right">
                <h4 className="text-base sm:text-xl font-semibold text-thirdColor-800 group-hover:text-firstColor-800 transition-colors duration-300">
                  {subCategory.name}
                </h4>
              </div>
            </div>

            <div className="transition-transform duration-300 group-hover:scale-110">
              {activeSubCategory === subCategory.id ? (
                <ChevronDown className="w-6 h-6 text-thirdColor-600 group-hover:text-firstColor-800 transition-colors duration-300" />
              ) : (
                <ChevronRight className="w-6 h-6 text-thirdColor-600 group-hover:text-firstColor-800 transition-colors duration-300" />
              )}
            </div>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeSubCategory === subCategory.id
                ? "max-h-[3000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="pe-2 ps-1 sm:px-6 pb-6">
              <div className="border-t border-thirdColor-200 pt-4">
                <Menu1Product items={subCategory.items} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubCategory;
