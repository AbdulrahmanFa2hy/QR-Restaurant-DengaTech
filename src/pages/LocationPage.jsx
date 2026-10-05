import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Navigation,
  MessageCircle,
} from "lucide-react";
import { restaurantsData } from "../data/restaurantsData";

const LocationPage = () => {
  const { restaurantName } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    // Find restaurant by name (convert URL format to actual name)
    const actualName = restaurantName.replace(/-/g, " ");
    const foundRestaurant = restaurantsData.find(
      (r) => r.name.toLowerCase() === actualName.toLowerCase()
    );
    setRestaurant(foundRestaurant);
  }, [restaurantName]);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[var(--color-bg-gradient-start)] rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-firstColor-800" />
          </div>
          <h2 className="text-2xl font-bold text-thirdColor-800 mb-2">
            المطعم غير موجود
          </h2>
          <p className="text-thirdColor-600 mb-6">
            المطعم الذي تبحث عنه غير موجود.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[var(--color-bg-gradient-start)] hover:bg-firstColor-200 text-firstColor-800 font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            العودة للمطاعم
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] shadow-xl border-b border-thirdColor-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-gradient-start)]/5 to-[var(--color-bg-gradient-end)]/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={() => navigate(`/restaurant/${restaurantName}`)}
                className="w-8 sm:w-12 h-8 sm:h-12 bg-thirdColor-50 hover:bg-firstColor-100 rounded-2xl flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ArrowLeft className="w-6 h-6 text-thirdColor-600 group-hover:text-firstColor-800" />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-thirdColor-800 mb-1">
                  {restaurant.name}
                </h1>
                <p className="text-thirdColor-600 text-sm sm:text-lg">
                  الموقع والاتجاهات
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center space-x-3 bg-white px-2 sm:px-4 py-2 rounded-full shadow-lg border border-thirdColor-200">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-thirdColor-600">
                موقع مباشر
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl border border-thirdColor-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              <div className="p-3 sm:p-6 border-b border-thirdColor-200 bg-gradient-to-r from-[var(--color-bg-gradient-start)]/10 to-[var(--color-bg-gradient-end)]/10">
                <h2 className="text-lg sm:text-2xl font-bold text-thirdColor-800 flex items-center">
                  <div className="w-8 h-8 bg-[var(--color-bg-gradient-start)] rounded-full flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5 text-firstColor-800" />
                  </div>
                  خريطة تفاعلية
                </h2>
                <p className="text-sm sm:text-base text-thirdColor-600 mt-2">
                  ابحث عنا على الخريطة واحصل على الاتجاهات
                </p>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-b-3xl"></div>
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d${restaurant.longitude}!3d${restaurant.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzA3LjkiTiAxMTjCsDE0JzM3LjMiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[450px]"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Restaurant Info */}
          {/* Restaurant Details */}
          <div className="bg-white rounded-3xl shadow-xl border border-thirdColor-200 p-4 sm:p-6 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-[var(--color-bg-gradient-start)] rounded-2xl flex items-center justify-center mr-3">
                <MapPin className="w-6 h-6 text-firstColor-800" />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-thirdColor-800">
                معلومات المطعم
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-4 bg-thirdColor-50 rounded-2xl border border-thirdColor-200">
                <div className="w-8 h-8 bg-[var(--color-bg-gradient-start)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-firstColor-800" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-thirdColor-800 mb-1">
                    العنوان
                  </p>
                  <p className="text-sm text-thirdColor-600 leading-relaxed">
                    {restaurant.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-thirdColor-50 rounded-2xl border border-thirdColor-200">
                <div className="w-8 h-8 bg-[var(--color-bg-gradient-start)] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-firstColor-800" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-thirdColor-800 mb-1">
                    الهاتف
                  </p>
                  <a
                    href={`tel:${restaurant.phoneNumber}`}
                    className="text-sm text-firstColor-800 hover:underline font-medium"
                  >
                    {restaurant.phoneNumber}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-thirdColor-50 rounded-2xl border border-thirdColor-200">
                <div className="w-8 h-8 bg-[var(--color-bg-gradient-start)] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-firstColor-800" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-thirdColor-800 mb-1">
                    الحالة
                  </p>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        restaurant.isActive
                          ? "bg-green-500 animate-pulse"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-sm font-medium text-thirdColor-600">
                      {restaurant.isActive ? "مفتوح الآن" : "مغلق"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() =>
                  window.open(`tel:${restaurant.phoneNumber}`, "_self")
                }
                className="w-full bg-gradient-to-r from-firstColor-100 to-secondColor-200 hover:from-firstColor-200 hover:to-secondColor-300 text-firstColor-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                <span>اتصل بالمطعم</span>
              </button>
              <button
                onClick={() => {
                  const message = `مرحباً! أنا مهتم بمطعم ${restaurant.name}. هل يمكنك تقديم المزيد من المعلومات؟`;
                  const whatsappUrl = `https://wa.me/${restaurant.phoneNumber.replace(
                    /[^\d]/g,
                    ""
                  )}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="w-full bg-gradient-to-r from-firstColor-100 to-secondColor-200 hover:from-firstColor-200 hover:to-secondColor-300 text-firstColor-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>واتساب</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
