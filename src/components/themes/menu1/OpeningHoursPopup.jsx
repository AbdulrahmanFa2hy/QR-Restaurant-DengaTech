import React from "react";
import { Clock } from "lucide-react";
import { restaurantHours } from "../../../data/menuData";
import CustomModal from "../../common/CustomModal";

const OpeningHoursPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const days = [
    { key: "saturday", label: "السبت" },
    { key: "sunday", label: "الأحد" },
    { key: "monday", label: "الاثنين" },
    { key: "tuesday", label: "الثلاثاء" },
    { key: "wednesday", label: "الأربعاء" },
    { key: "thursday", label: "الخميس" },
    { key: "friday", label: "الجمعة" },
  ];

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-firstColor-100 to-secondColor-200 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-firstColor-800" />
          </div>
          <h2 className="text-xl font-bold text-thirdColor-800">ساعات العمل</h2>
        </div>

        {/* Hours List */}
        <div className="space-y-4">
          {days.map((day) => {
            const hours = restaurantHours[day.key];
            const isToday =
              new Date()
                .toLocaleDateString("en-US", { weekday: "long" })
                .toLowerCase() === day.key;

            return (
              <div
                key={day.key}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                  isToday
                    ? "bg-gradient-to-r from-firstColor-100/20 to-secondColor-200/20 border border-firstColor-400"
                    : "bg-thirdColor-50 hover:bg-firstColor-100/10"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-sm font-medium ${
                      isToday ? "text-firstColor-800" : "text-thirdColor-800"
                    }`}
                  >
                    {day.label}
                  </span>
                  {isToday && (
                    <span className="text-xs bg-firstColor-100 text-firstColor-800 px-2 py-1 rounded-full font-semibold">
                      اليوم
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-semibold ${
                      isToday ? "text-firstColor-800" : "text-thirdColor-800"
                    }`}
                  >
                    {hours.open} - {hours.close}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-thirdColor-200">
          <div className="text-center">
            <p className="text-sm text-thirdColor-600 mb-2">نحن هنا لخدمتك!</p>
            <div className="flex items-center justify-center space-x-2 text-xs text-firstColor-800">
              <Clock className="w-3 h-3" />
              <span>قد تختلف الساعات في العطلات</span>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default OpeningHoursPopup;
