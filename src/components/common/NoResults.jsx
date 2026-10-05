import React from "react";

const NoResults = ({
  onClearFilters,
  className = "",
  title = "لم يتم العثور على المطعم",
  description = "جرب تعديل معايير البحث أو التصفية",
  buttonText = "مسح البحث والتصفية",
  showButton = true,
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-24 h-24 bg-thirdColor-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-6xl text-thirdColor-600">🔍</span>
      </div>
      <h3 className="text-lg font-medium text-thirdColor-800 mb-2">{title}</h3>
      <p className="text-thirdColor-600 mb-4">{description}</p>
      {showButton && onClearFilters && (
        <button
          onClick={onClearFilters}
          className="bg-gradient-to-r from-firstColor-100 to-secondColor-200 hover:from-firstColor-200 hover:to-secondColor-300 text-firstColor-800 font-medium py-2 px-6 rounded-full transition-all duration-300 border border-firstColor-400 hover:border-firstColor-600 hover:scale-105 transform text-sm"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default NoResults;
