import React from "react";

const Menu2Hero = ({ restaurant }) => {
  return (
    <div className="relative mb-12 overflow-hidden bg-[var(--hero-background)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Geometric Shapes */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/3 rounded-full blur-md"></div>

      <div className="relative px-8 py-20 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 p-6 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border border-white/20 will-change-[filter] transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] react:hover:drop-shadow-[0_0_2em_#61dafbaa]">
              <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-inner bg-[var(--hero-background)]">
                <span className="text-white font-bold text-2xl tracking-wider">
                  BV
                </span>
              </div>
            </div>
            <div className="absolute -inset-2 bg-white/20 rounded-full blur-md -z-10"></div>
          </div>
        </div>

        {/* Restaurant Name */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wider drop-shadow-lg text-[var(--hero-title)]">
          {restaurant?.name || "خطأ في اسم المطعم"}
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-8 text-[var(--hero-description)]">
          {restaurant?.description || ""}
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center text-sm font-medium text-[var(--hero-description)] gap-1">
            <div className="w-2 h-2 rounded-full mr-2 animate-pulse bg-green-500"></div>
            مفتوح الآن • طازج يومياً
          </div>
          <div className="hidden sm:block w-px h-4 bg-[var(--hero-description)]"></div>
          <div className="text-sm font-medium text-[var(--hero-description)]">
            ⭐ تقييم 4.9 • أكثر من 1200 تقييم
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu2Hero;
