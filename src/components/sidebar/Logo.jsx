import React from "react";

const Logo = ({ isExpanded }) => {
  return (
    <div className="p-6 border-b border-thirdColor-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-firstColor-100 to-secondColor-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-firstColor-800 font-bold text-lg">QR</span>
        </div>
        <div
          className={`transition-all duration-300 ${
            isExpanded
              ? "opacity-100 translate-x-0"
              : "lg:opacity-100 lg:translate-x-0 opacity-0 -translate-x-2"
          }`}
        >
          <h1 className="text-xl font-bold text-firstColor-800">QR Hub</h1>
          <p className="text-xs text-thirdColor-600">لوحة التحكم</p>
        </div>
      </div>
    </div>
  );
};

export default Logo;
