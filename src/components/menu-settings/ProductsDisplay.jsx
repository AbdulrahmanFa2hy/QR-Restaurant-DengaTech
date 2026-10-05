import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProductsDisplay = ({ onAddProduct, onProductClick }) => {
  // Redux state
  const { data: products } = useSelector((state) => state.product);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Get products for current subcategory
  const currentSubcategoryProducts = selectedSubcategory
    ? products.filter((product) => {
        return product?.subCategory?._id === selectedSubcategory._id;
      })
    : [];

  const subcategoryName = selectedSubcategory?.name || "";

  return {
    selectedSubcategory,
    setSelectedSubcategory,
    currentSubcategoryProducts,
    subcategoryName,

    // JSX
    display: (
      <>
        {/* Show empty state only if no subcategory is selected */}
        {!subcategoryName ? (
          <div className="flex-1 p-8">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚙️</div>
              <h2 className="text-2xl font-bold mb-4 text-thirdColor-600">
                مرحباً بك في إعدادات القائمة
              </h2>
              <p className="text-lg text-thirdColor-500">
                اختر فئة من الشريط الجانبي لإدارة المنتجات
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full p-2">
            <div className="mb-4">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-2 sm:gap-4">
                <h2 className="text-3xl font-bold text-firstColor-800">
                  <span className="hidden sm:inline-block">إدارة منتجات:</span>{" "}
                  {subcategoryName}
                </h2>
                <button
                  onClick={onAddProduct}
                  className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer bg-gradient-to-br from-firstColor-600 to-secondColor-600 hover:from-secondColor-600 hover:to-firstColor-600 hover:shadow-[0_4px_15px_rgba(217,119,6,0.3)]"
                >
                  + إضافة منتج جديد
                </button>
              </div>
              <div className="w-20 hidden lg:block h-1 rounded-full bg-firstColor-500"></div>
            </div>

            {currentSubcategoryProducts &&
            currentSubcategoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-3">
                {currentSubcategoryProducts.map((product) => (
                  <div
                    key={product._id}
                    className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 bg-white border border-thirdColor-200 hover:border-firstColor-400 hover:shadow-[0_6px_20px_rgba(217,119,6,0.1)] cursor-pointer"
                    onClick={() => onProductClick(product)}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2 text-firstColor-800">
                        {product.name}
                      </h3>
                      {product.ingredients &&
                        product.ingredients.length > 0 && (
                          <p className="text-sm leading-relaxed mb-4 text-thirdColor-600">
                            المكونات: {product.ingredients.join(", ")}
                          </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-2xl font-bold text-firstColor-600">
                        {product.price} ج.م
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-bold mb-4 text-thirdColor-600">
                  لا توجد منتجات في {subcategoryName}
                </h3>
                <p className="text-lg text-thirdColor-500">
                  اضغط على "إضافة منتج جديد" لبدء إضافة المنتجات
                </p>
              </div>
            )}
          </div>
        )}
      </>
    ),
  };
};

export default ProductsDisplay;
