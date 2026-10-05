import React, { useState } from "react";
import { Lock, Eye, EyeOff, Save, Check, X, Shield } from "lucide-react";
import CustomButton from "../../../components/common/CustomButton";

const PasswordSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSaveStatus("success");
    setTimeout(() => setSaveStatus(null), 3000);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-thirdColor-800">
                كلمة المرور
              </h1>
              <p className="text-thirdColor-600 mt-2">
                تغيير كلمة المرور الخاصة بك
              </p>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              {saveStatus === "success" && (
                <div className="flex items-center space-x-2 space-x-reverse text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">تم الحفظ بنجاح</span>
                </div>
              )}
              {saveStatus === "error" && (
                <div className="flex items-center space-x-2 space-x-reverse text-red-600">
                  <X className="w-5 h-5" />
                  <span className="text-sm">حدث خطأ</span>
                </div>
              )}
              <CustomButton
                onClick={handleSave}
                disabled={isLoading}
                loading={isLoading}
                loadingText="جاري الحفظ..."
                variant="primary"
                size="md"
              >
                <Save className="w-5 h-5" />
                <span>حفظ</span>
              </CustomButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-thirdColor-200 p-6 m-6">
        <div className="space-y-6">
          <div className="bg-sixthColor-50 border border-sixthColor-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Shield className="w-5 h-5 text-sixthColor-600" />
              <p className="text-sixthColor-800 text-sm">
                لحماية حسابك، تأكد من استخدام كلمة مرور قوية
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-thirdColor-800 mb-2">
                كلمة المرور الحالية
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 pr-12 border border-thirdColor-200 rounded-xl focus:ring-2 focus:ring-firstColor-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-thirdColor-400 hover:text-thirdColor-600"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-thirdColor-800 mb-2">
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 pr-12 border border-thirdColor-200 rounded-xl focus:ring-2 focus:ring-firstColor-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-thirdColor-400 hover:text-thirdColor-600"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-thirdColor-800 mb-2">
                تأكيد كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 pr-12 border border-thirdColor-200 rounded-xl focus:ring-2 focus:ring-firstColor-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-thirdColor-400 hover:text-thirdColor-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSettings;
