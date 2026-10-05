import React from "react";
import { Package } from "lucide-react";

const EmptyPackageState = () => {
  return (
    <div className="bg-white rounded-lg p-8 border border-thirdColor-200 shadow-sm text-center max-w-2xl mx-auto">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="w-16 h-16 bg-firstColor-100 rounded-lg flex items-center justify-center mx-auto transform hover:rotate-12 transition-all duration-500 shadow-sm">
          <Package className="w-8 h-8 text-firstColor-800 animate-pulse" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-firstColor-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-secondColor-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/2 -left-4 w-3 h-3 bg-sixthColor-400 rounded-full animate-bounce opacity-60"></div>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-thirdColor-800">
          لا توجد باقات
        </h2>
        <p className="text-thirdColor-600 max-w-md mx-auto leading-relaxed">
          ابدأ بإضافة باقة جديدة لإدارة الاشتراكات
        </p>
      </div>
    </div>
  );
};

export default EmptyPackageState;
