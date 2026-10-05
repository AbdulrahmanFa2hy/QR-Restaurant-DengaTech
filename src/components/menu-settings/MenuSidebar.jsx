import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ArrowDown } from "lucide-react";

const MenuSidebar = ({
  onSubcategoryClick,
  onAddCategory,
  onAddSubcategory,
  onEditCategory,
  onDeleteCategory,
  onEditSubcategory,
  onDeleteSubcategory,
  isMenuSidebarOpen,
  onMenuSidebarClose,
}) => {
  // Redux state
  const { data: categories } = useSelector((state) => state.category);
  const { data: subcategories } = useSelector((state) => state.subcategory);
  const { data: products } = useSelector((state) => state.product);

  // Debug logging
  console.log("Categories:", categories);
  console.log("Subcategories:", subcategories);
  console.log("Products:", products);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollContainerRef = useRef(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleSubcategoryClick = (subcategory) => {
    onSubcategoryClick(subcategory);
    // Close sidebar on small screens after selecting subcategory
    if (window.innerWidth < 1024) {
      onMenuSidebarClose();
    }
  };

  const handleAddSubcategory = (categoryId) => {
    onAddSubcategory(categoryId);
  };

  // Check if content is scrollable and if at bottom
  const checkScrollable = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight, scrollTop } =
        scrollContainerRef.current;
      const isScrollable = scrollHeight > clientHeight;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 5; // 5px tolerance

      setShowScrollButton(isScrollable && !atBottom);
    }
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Check scrollable on mount and when categories change
  useEffect(() => {
    checkScrollable();
  }, [categories, subcategories, expandedCategory]);

  // Add resize observer to check scrollable on window resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(checkScrollable, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollable);
      return () =>
        scrollContainer.removeEventListener("scroll", checkScrollable);
    }
  }, []);

  // Get subcategories for a specific category
  const getSubcategoriesForCategory = (categoryId) => {
    const filtered = subcategories.filter(
      (sub) => sub?.category?._id === categoryId
    );
    console.log(`Subcategories for category ${categoryId}:`, filtered);
    return filtered;
  };

  // Get product count for a subcategory
  const getProductCountForSubcategory = (subcategoryId) => {
    return products.filter((product) => {
      return product?.subCategory?._id === subcategoryId;
    }).length;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMenuSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onMenuSidebarClose}
        />
      )}

      {/* Menu Sidebar */}
      <div
        className={`absolute bg-white h-dvh shadow-2xl border-l border-thirdColor-200 transition-all duration-300 ${
          isMenuSidebarOpen
            ? " lg:translate-x-0 fixed left-0 top-0 z-50 translate-x-0 w-72"
            : " lg:translate-x-0 fixed left-0 top-0 z-50 -translate-x-full w-60 overflow-hidden"
        }`}
      >
        <div
          ref={scrollContainerRef}
          className="p-2 overflow-y-auto scrollbar-hide h-full"
        >
          <div className="space-y-1 overflow-visible">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-thirdColor-600">
                الفئات الرئيسية
              </h3>
              <button
                onClick={onAddCategory}
                className="py-2 px-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer bg-gradient-to-br from-firstColor-600 to-secondColor-600 hover:from-secondColor-600 hover:to-firstColor-600 hover:shadow-[0_4px_15px_rgba(217,119,6,0.3)]"
              >
                + إضافة فئة
              </button>
            </div>

            {categories.map((category) => {
              const categorySubcategories = getSubcategoriesForCategory(
                category._id
              );
              return (
                <div
                  key={category._id}
                  className="border border-gray-200 rounded-lg overflow-visible"
                >
                  {/* Category Header */}
                  <div className="p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:-translate-y-0.5 bg-gradient-to-br from-firstColor-100 to-secondColor-200 border-2 border-thirdColor-200 hover:from-firstColor-200 hover:to-secondColor-300 hover:border-firstColor-400 hover:shadow-[0_8px_25px_rgba(217,119,6,0.15)]">
                    <div
                      className="flex-1 flex items-center"
                      onClick={() => toggleCategory(category._id)}
                    >
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-firstColor-800">
                          {category.name}
                        </h4>
                        <p className="text-sm text-thirdColor-600">
                          {categorySubcategories.length} فئة فرعية
                        </p>
                      </div>
                    </div>

                    {/* 3 Dots Menu */}
                    <div className="relative group">
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <div className="flex flex-col space-y-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute left-0 top-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                        <button
                          className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 rounded-t-lg text-firstColor-800"
                          onClick={() => onEditCategory(category)}
                        >
                          تعديل
                        </button>
                        <button
                          className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 rounded-b-lg text-fifthColor-400"
                          onClick={() => onDeleteCategory(category)}
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subcategories Accordion */}
                  {expandedCategory === category._id && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      {categorySubcategories.map((subcategory) => (
                        <div
                          key={subcategory._id}
                          className="p-3 mx-2 my-2 rounded-lg flex items-center justify-between cursor-pointer transition-all duration-300 hover:-translate-y-0.5 bg-white border-2 border-thirdColor-200 hover:border-firstColor-400 hover:bg-firstColor-100 hover:shadow-[0_4px_15px_rgba(217,119,6,0.1)]"
                          onClick={() => handleSubcategoryClick(subcategory)}
                        >
                          <div className="flex-1">
                            <h5 className="font-semibold text-firstColor-800">
                              {subcategory.name}
                            </h5>
                            <p className="text-xs text-thirdColor-600">
                              {getProductCountForSubcategory(subcategory._id)}{" "}
                              منتج
                            </p>
                          </div>

                          {/* 3 Dots Menu for Subcategory */}
                          <div className="relative group">
                            <button
                              className="p-1 hover:bg-gray-100 rounded-full"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex flex-col space-y-0.5">
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              </div>
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[70]">
                              <button
                                className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 rounded-t-lg text-firstColor-800"
                                onClick={() => onEditSubcategory(subcategory)}
                              >
                                تعديل
                              </button>
                              <button
                                className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 rounded-b-lg text-fifthColor-400"
                                onClick={() => onDeleteSubcategory(subcategory)}
                              >
                                حذف
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add Subcategory Button */}
                      <div className="p-2">
                        <button
                          onClick={() => handleAddSubcategory(category._id)}
                          className="w-full py-2 px-3 text-sm border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-thirdColor-600"
                        >
                          + إضافة فئة فرعية
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 z-10 cursor-pointer"
            title="الانتقال إلى الأسفل"
          >
            <ArrowDown className="w-8 h-8 text-firstColor-800 transition-all duration-300 animate-bounce hover:bg-white rounded-full p-1" />
          </button>
        )}
      </div>
    </>
  );
};

export default MenuSidebar;
