import React from "react";
import { MapPin, Phone, MessageSquareMore } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { restaurantTypesData } from "../../data/restaurantTypesData";

const CustomRestaurantCard = ({
  restaurant,
  buttonText = "عرض القائمة",
  onButtonClick,
  showWhatsApp = true,
  showPhone = true,
  showAddress = true,
}) => {
  const navigate = useNavigate();
  const {
    name,
    logo,
    description,
    isActive,
    address,
    phone,
    type,
    _id,
    id,
    slug, // fallback for moderator cards
  } = restaurant;

  // Function to convert English type to Arabic
  const getArabicType = (englishType) => {
    return (
      restaurantTypesData.find((item) => item.value === englishType)?.label ||
      englishType
    );
  };

  const restaurantId = _id || id;

  // Function to handle phone call
  const handlePhoneClick = () => {
    if (phone) {
      window.open(`tel:${phone}`, "_blank");
    }
  };

  // Function to handle WhatsApp click
  const handleWhatsAppClick = () => {
    if (phone) {
      const message = `مرحباً! أنا مهتم بمطعم ${name}. هل يمكنك تقديم المزيد من المعلومات؟`;
      const whatsappUrl = `https://wa.me/${phone.replace(
        /[^\d]/g,
        ""
      )}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  // Function to handle address click - navigate to location page
  const handleAddressClick = () => {
    if (address) {
      const restaurantName = name.toLowerCase().replace(/\s+/g, "-");
      navigate(`/restaurant/${restaurantName}/location`);
    }
  };

  // Function to handle button click
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick(restaurant);
    } else {
      navigate(`/restaurant/${slug}`);
    }
  };

  return (
    <div className="  rounded-2xl shadow-md border border-thirdColor-200 hover:shadow-xl transition-all duration-300 hover:border-firstColor-400 group overflow-hidden transform hover:scale-[1.01] hover:-translate-y-2 bg-white">
      <div className="backdrop-blur-[4px]">
        <div className="p-4 border-b border-thirdColor-200 relative  ">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-firstColor-100 to-secondColor-200 rounded-xl flex items-center justify-center border-2 border-thirdColor-200 group-hover:border-firstColor-400 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              {!logo ? (
                <img
                  src={
                    "https://png.pngtree.com/png-vector/20220701/ourmid/pngtree-restaurant-logo-png-image_5579911.png"
                  }
                  alt={`${name} logo`}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              ) : (
                <span className="text-2xl font-bold text-firstColor-800 group-hover:scale-110 transition-transform duration-300">
                  {name.charAt(0)}
                </span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-thirdColor-800 group-hover:text-firstColor-800 transition-colors duration-300 mb-2">
                {name}
              </h3>
              <div className="flex items-center justify-between space-x-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive === "active"
                      ? "bg-green-100 text-green-800 group-hover:bg-green-200"
                      : isActive === "inactive"
                      ? "bg-red-100 text-red-800 group-hover:bg-red-200"
                      : "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full me-2 ${
                      isActive === "active"
                        ? "bg-green-500 animate-pulse"
                        : isActive === "inactive"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  {isActive === "active"
                    ? "نشط"
                    : isActive === "inactive"
                    ? "غير نشط"
                    : "صيانة"}
                </span>
                {type && (
                  <span className="text-sm text-thirdColor-600">
                    {getArabicType(type)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Description */}
        <div className="p-4 md:p-6 ">
          {description && (
            <p className="text-sm text-thirdColor-600 font-bold mb-6 line-clamp-3 leading-relaxed">
              {description}
            </p>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            {/* Address - Clickable for Google Maps */}
            {showAddress && address && (
              <div
                className="flex items-start space-x-3 group/address"
                // onClick={handleAddressClick}
                title="عرض الموقع والخريطة"
              >
                <MapPin className="w-5 h-5 text-firstColor-400 group-hover/address:text-firstColor-800 transition-colors duration-300 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-thirdColor-600 group-hover/address:text-firstColor-800 transition-colors duration-300 leading-relaxed">
                  {address}
                </span>
              </div>
            )}

            {/* Phone - Clickable for calling */}
            {showPhone && phone && (
              <div className="flex justify-between items-center">
                <div
                  className="flex items-center space-x-3 cursor-pointer group/phone"
                  onClick={handlePhoneClick}
                  title="انقر للاتصال"
                >
                  <Phone className="w-5 h-5 text-firstColor-400 group-hover/phone:text-firstColor-800 transition-colors duration-300" />
                  <span className="text-sm text-thirdColor-600 group-hover/phone:text-firstColor-800 transition-colors duration-300 font-medium">
                    {phone}
                  </span>
                </div>
                {showWhatsApp && (
                  <button
                    onClick={handleWhatsAppClick}
                    className="rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-120 group/wa"
                    title="التواصل عبر واتساب"
                  >
                    {/* <MessageSquareMore className="w-6 h-6 text-[var(--color-text-brand-lighter)] hover:text-[var(--color-text-brand)] transition-colors duration-300 font-medium cursor-pointer" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-whatsapp w-6 h-6 text-firstColor-400 hover:text-firstColor-800 transition-colors duration-300 font-medium cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="px-4 md:px-6 pb-4 md:pb-6">
          <CustomButton onClick={handleButtonClick} className="w-full">
            {buttonText}
          </CustomButton>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-firstColor-100/5 to-secondColor-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CustomRestaurantCard;
