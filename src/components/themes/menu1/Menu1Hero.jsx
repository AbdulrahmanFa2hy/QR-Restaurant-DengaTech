import React, { useState } from "react";
import OpeningHoursPopup from "./OpeningHoursPopup";
import SocialIconsContainer from "../../common/SocialIconsContainer";

const Menu1Hero = ({ restaurant }) => {
  const [isHoursPopupOpen, setIsHoursPopupOpen] = useState(false);

  const handleHoursClick = () => {
    setIsHoursPopupOpen(true);
  };

  const handleCloseHours = () => {
    setIsHoursPopupOpen(false);
  };

  return (
    <section className="relative bg-gradient-to-br from-fourthColor-900 via-firstColor-800 to-secondColor-800 text-white  py-20 pt-8 sm:pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-orange-600/30"></div>

      <div className="relative max-w-7xl mx-auto px-4 lg:pr-40 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-firstColor-200 to-secondColor-300 bg-clip-text text-transparent leading-tight">
                {restaurant?.name || "Bella Vista"}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-firstColor-400 to-secondColor-500 rounded-full"></div>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-firstColor-100 leading-relaxed max-w-lg">
              {restaurant?.description ||
                "استمتع بالمطبخ الإيطالي الأصيل المصنوع بالشغف والتقاليد. من المعكرونة المصنوعة يدوياً إلى البيتزا المشوية بالخشب، كل طبق يحكي قصة من إيطاليا."}
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-48 h-48 bg-gradient-to-br from-firstColor-400 to-secondColor-500 rounded-full flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="text-white font-bold text-4xl tracking-wider">
                  {restaurant?.name
                    ? restaurant.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                    : "BV"}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-secondColor-400 to-fifthColor-400 rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-firstColor-400 to-sixthColor-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Icons Component */}
      <SocialIconsContainer
        restaurant={restaurant}
        onHoursClick={handleHoursClick}
      />

      {/* Opening Hours Popup */}
      <OpeningHoursPopup isOpen={isHoursPopupOpen} onClose={handleCloseHours} />
    </section>
  );
};

export default Menu1Hero;
