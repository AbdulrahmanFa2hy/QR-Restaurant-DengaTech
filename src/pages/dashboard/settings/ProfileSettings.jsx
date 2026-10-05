import React, { useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Info,
  Type as TypeIcon,
  Hash,
  Check,
  Image as ImageIcon,
  Building2,
  Calendar,
  Package,
  Palette,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getMyRestaurantData } from "../../../store/slices/restaurantSlice";
import { useParams } from "react-router-dom";

const DisplayField = ({ label, value, icon: Icon, className = "" }) => (
  <div
    className={`bg-white rounded-xl p-4 border border-thirdColor-200 hover:border-firstColor-400 transition-all duration-300 group ${className}`}
  >
    <div className="flex items-center space-x-3 mb-2">
      {Icon && (
        <div className="w-8 h-8 bg-gradient-to-br from-firstColor-100 to-secondColor-200 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-firstColor-800" />
        </div>
      )}
      <span className="text-sm font-semibold text-thirdColor-600 group-hover:text-firstColor-800 transition-colors duration-300">
        {label}
      </span>
    </div>
    <span className="text-thirdColor-800 font-medium block">
      {value || "—"}
    </span>
  </div>
);

const ProfileSettings = () => {
  const { data } = useSelector((state) => state.restaurant);
  const { data: user } = useSelector((state) => state.getMe);
  const { restaurantId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurantId) dispatch(getMyRestaurantData(restaurantId));
  }, [dispatch, restaurantId]);

  return (
    <div className="min-h-screen  my-4">
      {/* Restaurant Header Card */}
      <div className="max-w-7xl mx-auto px-3  mb-2">
        <div className="bg-white rounded-2xl shadow-lg border border-thirdColor-200 p-6">
          <div className="flex items-center gap-6">
            {data?.image ? (
              <img
                src={data.image}
                alt="صورة المطعم"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-thirdColor-200 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-firstColor-100 to-secondColor-200 flex items-center justify-center border-2 border-thirdColor-200 shadow-lg">
                <Building2 className="w-12 h-12 text-firstColor-800" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-thirdColor-800 mb-2">
                {data?.name || "اسم المطعم"}
              </h2>
              <p className="text-thirdColor-600 mb-3">
                {user?.email || "البريد الإلكتروني غير محدد"}
              </p>
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    data?.isActive === "active"
                      ? "bg-green-100 text-green-800"
                      : data?.isActive === "inactive"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full me-2 ${
                      data?.isActive === "active"
                        ? "bg-green-500 animate-pulse"
                        : data?.isActive === "inactive"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  {data?.isActive === "active"
                    ? "نشط"
                    : data?.isActive === "inactive"
                    ? "غير نشط"
                    : "صيانة"}
                </span>
                {data?.type && (
                  <span className="text-sm text-thirdColor-600 bg-thirdColor-50 px-3 py-1 rounded-full">
                    {data.type}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3  pb-8">
        <div className="space-y-2">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-thirdColor-200 p-6">
            <h3 className="text-xl font-bold text-thirdColor-800 mb-6 flex items-center">
              <Info className="w-5 h-5 me-2 text-firstColor-800" />
              معلومات المطعم
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DisplayField
                label="العنوان"
                value={data?.address}
                icon={MapPin}
              />
              <DisplayField
                label="رقم الهاتف"
                value={data?.phone}
                icon={Phone}
              />
              <DisplayField
                label="واتساب"
                value={data?.whatsApp}
                icon={Phone}
              />
              <DisplayField
                label="الموقع الإلكتروني"
                value="https://restaurant.com"
                icon={Globe}
              />
              <DisplayField
                label="الوصف"
                value={data?.description}
                icon={Info}
              />
              <DisplayField
                label="نوع المطعم"
                value={data?.type}
                icon={TypeIcon}
              />
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-thirdColor-200 p-6">
            <h3 className="text-xl font-bold text-thirdColor-800 mb-6 flex items-center">
              <User className="w-5 h-5 me-2 text-firstColor-800" />
              معلومات المالك
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DisplayField label="اسم المالك" value={user?.name} icon={User} />
              <DisplayField
                label="البريد الإلكتروني"
                value={user?.email}
                icon={Mail}
              />
              <DisplayField
                label="رقم الهاتف"
                value={user?.phone}
                icon={Phone}
              />
            </div>
          </div>
          {/* Location Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-thirdColor-200 p-6">
            <h3 className="text-xl font-bold text-thirdColor-800 mb-6 flex items-center">
              <MapPin className="w-5 h-5 me-2 text-firstColor-800" />
              معلومات الموقع
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DisplayField
                label="خط العرض (Latitude)"
                value={data?.location?.latitude}
                icon={MapPin}
              />
              <DisplayField
                label="خط الطول (Longitude)"
                value={data?.location?.longitude}
                icon={MapPin}
              />
            </div>
          </div>

          {/* Package Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-thirdColor-200 p-6">
            <h3 className="text-xl font-bold text-thirdColor-800 mb-6 flex items-center">
              <Package className="w-5 h-5 me-2 text-firstColor-800" />
              معلومات الباقة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DisplayField
                label="Package ID"
                value={data?.package?.packageId}
                icon={Hash}
              />
              <DisplayField
                label="Package Active"
                value={data?.package?.isActive ? "نعم" : "لا"}
                icon={Check}
              />
              <DisplayField
                label="Package Start"
                value={data?.package?.packageStart}
                icon={Calendar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
