import React from "react";
import { Edit, Trash2, Package, Clock, Check, Star, Zap } from "lucide-react";

const PackageCard = ({ pkg, onEdit, onDelete, isPopular = false }) => {
  // Define different gradient colors for different package types
  const getHeaderGradient = (packageName) => {
    if (packageName?.includes("الشركات") || packageName?.includes("المؤسسات")) {
      return "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600";
    } else if (
      packageName?.includes("الأساسية") ||
      packageName?.includes("Basic")
    ) {
      return "bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500";
    } else if (
      packageName?.includes("المميزة") ||
      packageName?.includes("Premium")
    ) {
      return "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600";
    } else {
      return "bg-gradient-to-br from-firstColor-100 via-secondColor-200 to-secondColor-400";
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden w-80 sm:w-96  h-[720px] flex flex-col border border-gray-100">
      {/* Popular Badge - Only show if isPopular is true */}
      {isPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-red-700 to-red-800 text-white px-4 py-1 text-xs font-bold rounded-bl-lg rounded-tr-2xl z-20">
          الأكثر شعبية
        </div>
      )}

      {/* Gradient Header */}
      <div
        className={`relative ${getHeaderGradient(pkg.name)} p-8 text-center`}
      >
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
          <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute bottom-4 left-8 w-6 h-6 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-8 right-4 w-3 h-3 bg-white rounded-full"></div>
        </div>

        {/* Package Icon */}
        <div className="relative z-10 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">
            {pkg.name}
          </h3>
          <div className="flex items-center justify-center gap-1 text-white/90 text-sm">
            <Clock className="w-4 h-4" />
            <span>صالح لمدة {pkg.durationDays} يوم</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="relative z-10">
          <div className="text-4xl font-black text-white mb-1 group-hover:scale-105 transition-transform duration-300">
            {pkg.price}
            <span className="text-lg font-medium text-white/90 mr-1">ج.م</span>
          </div>
          <div className="text-white/80 text-sm">للشهر الواحد</div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Features Header */}
        <div className="text-center mb-6">
          <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-firstColor-800" />
            الميزات المتاحة
          </h4>
          <div className="w-12 h-1 bg-gradient-to-r from-firstColor-800 to-secondColor-400 rounded-full mx-auto"></div>
        </div>

        {/* Features List */}
        <div className="flex-1 space-y-2 mb-6">
          {pkg.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-firstColor-100/10 hover:to-secondColor-200/10 transition-all duration-200 group/feature"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-firstColor-800 to-secondColor-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/feature:scale-110 transition-transform duration-200">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 leading-relaxed group-hover/feature:text-gray-900 transition-colors duration-200">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(pkg)}
            className="flex-1 bg-gradient-to-r from-firstColor-800 to-secondColor-400 text-white py-3 px-4 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            title="تعديل الباقة"
          >
            <Edit className="w-4 h-4" />
            تعديل
          </button>
          <button
            onClick={() => onDelete(pkg)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            title="حذف الباقة"
          >
            <Trash2 className="w-4 h-4" />
            حذف
          </button>
        </div>
      </div>

      {/* Bottom Gradient Accent */}
      <div className="h-1 bg-gradient-to-r from-firstColor-800 via-secondColor-400 to-firstColor-800"></div>
    </div>
  );
};

export default PackageCard;
