import React from "react";
import Menu2ProductCard from "./Menu2ProductCard";

const Menu2Grid = ({ subcategories, activeTab }) => {
  if (subcategories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-500 text-6xl mb-4">📋</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          لا توجد منتجات في هذه الفئة
        </h2>
        <p className="text-gray-600">
          لم يتم إضافة أي منتجات في فئة "{activeTab}" بعد
        </p>
      </div>
    );
  }

  return (
    <>
      {subcategories.map((subcategory, index) => (
        <div key={index} className="mb-12">
          {/* Subcategory Title */}
          <h2 className="text-2xl font-bold mb-6 text-center text-[var(--subcategory-text)]">
            {subcategory.category}
          </h2>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subcategory.items.map((item) => (
              <Menu2ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Menu2Grid;
