import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Menu,
  X,
} from "lucide-react";
import SocialIcon from "./SocialIcon";

const SocialIconsContainer = ({ restaurant, onHoursClick }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Social media and contact handlers
  const handlePhoneClick = () => {
    window.open(`tel:${restaurant?.phoneNumber || "+15551234567"}`, "_self");
  };

  const handleWhatsAppClick = () => {
    const message = `Hello! I'm interested in ${
      restaurant?.name || "Bella Vista"
    } restaurant. Can you provide more information?`;
    const phoneNumber =
      restaurant?.phoneNumber?.replace(/[^\d]/g, "") || "15551234567";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleLocationClick = () => {
    if (restaurant?.name) {
      const restaurantName = restaurant.name.toLowerCase().replace(/\s+/g, "-");
      navigate(`/restaurant/${restaurantName}/location`);
    } else {
      // Fallback to default location
      navigate("/restaurant/bella-vista/location");
    }
  };

  const handleFacebookClick = () => {
    window.open("https://facebook.com/bellavista", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://instagram.com/bellavista", "_blank");
  };

  const handleTwitterClick = () => {
    window.open("https://twitter.com/bellavista", "_blank");
  };

  return (
    <>
      {/* Social Media Icons - Desktop Only */}
      <div className="hidden lg:block absolute bottom-6 left-6 z-10">
        <div className="flex flex-col space-y-3">
          <SocialIcon
            icon={Clock}
            onClick={onHoursClick}
            title="View Opening Hours"
            className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
            size="w-5 h-5"
          />
          <SocialIcon
            icon={Phone}
            onClick={handlePhoneClick}
            title="Call Us"
            className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
            size="w-5 h-5"
          />
          <SocialIcon
            icon={MessageCircle}
            onClick={handleWhatsAppClick}
            title="WhatsApp"
            className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
            size="w-5 h-5"
          />
          <SocialIcon
            icon={MapPin}
            onClick={handleLocationClick}
            title="Find Us"
            className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
            size="w-5 h-5"
          />
          <SocialIcon
            icon={Facebook}
            onClick={handleFacebookClick}
            title="Facebook"
            className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
            size="w-5 h-5"
          />
          {/* <SocialIcon
            icon={Instagram}
            onClick={handleInstagramClick}
            title="Instagram"
            className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
            size="w-5 h-5"
          />
          <SocialIcon
            icon={Twitter}
            onClick={handleTwitterClick}
            title="Twitter"
            className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
            size="w-5 h-5"
          /> */}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleMobileToggle}
        ></div>
      )}

      {/* Mobile Social Icons */}
      <div
        className={`lg:hidden fixed bottom-20 left-4 z-50 transform transition-all duration-300 ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white rounded-2xl p-4 sm:pb-9 shadow-2xl border border-thirdColor-200">
          {/* Social Media Icons */}
          <div className="flex flex-col space-y-3">
            <SocialIcon
              icon={Clock}
              onClick={onHoursClick}
              title="View Opening Hours"
              className="w-10 h-10 bg-thirdColor-50 rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
              size="w-5 h-5"
            />
            <SocialIcon
              icon={Phone}
              onClick={handlePhoneClick}
              title="Call Us"
              className="w-10 h-10 bg-thirdColor-50 rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
              size="w-5 h-5"
            />
            <SocialIcon
              icon={MessageCircle}
              onClick={handleWhatsAppClick}
              title="WhatsApp"
              className="w-10 h-10 bg-thirdColor-50 rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
              size="w-5 h-5"
            />
            <SocialIcon
              icon={MapPin}
              onClick={handleLocationClick}
              title="Find Us"
              className="w-10 h-10 bg-thirdColor-50 rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
              size="w-5 h-5"
            />
            <SocialIcon
              icon={Facebook}
              onClick={handleFacebookClick}
              title="Facebook"
              className="w-10 h-10 bg-thirdColor-50 rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
              size="w-5 h-5"
            />
            {/* <SocialIcon
              icon={Instagram}
              onClick={handleInstagramClick}
              title="Instagram"
              className="w-10 h-10 bg-thirdColor-50 rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
              size="w-5 h-5"
            />
            <SocialIcon
              icon={Twitter}
              onClick={handleTwitterClick}
              title="Twitter"
              className="w-10 h-10 bg-thirdColor-50 rounded-full shadow-lg hover:shadow-xl border border-thirdColor-200 hover:border-firstColor-400"
              size="w-5 h-5"
            /> */}
          </div>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <div className="lg:hidden absolute bottom-6 left-4 z-50">
        <button
          onClick={handleMobileToggle}
          className="w-14 h-14 bg-gradient-to-r from-firstColor-100 to-secondColor-200 hover:from-firstColor-200 hover:to-secondColor-300 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border border-firstColor-400"
          title={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-firstColor-800" />
          ) : (
            <Menu className="w-6 h-6 text-firstColor-800" />
          )}
        </button>
      </div>
    </>
  );
};

export default SocialIconsContainer;
