import React, { useState } from "react";
import {
  User,
  Lock,
  Shield,
  Eye,
  EyeOff,
  Save,
  Check,
  X,
  Settings as SettingsIcon,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";

import "leaflet/dist/leaflet.css";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const tabs = [
    { id: "profile", label: "الملف الشخصي", icon: User },
    { id: "password", label: "كلمة المرور", icon: Lock },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSaveStatus("success");
    setTimeout(() => setSaveStatus(null), 3000);
    setIsLoading(false);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="text-center py-16">
        <div className="text-6xl mb-4">⚙️</div>
        <h2 className="text-2xl font-bold mb-4" text-thirdColor-600>
          إعدادات الملف الشخصي
        </h2>
        <p className="text-lg" text-thirdColor-500>
          تم نقل إعدادات الملف الشخصي إلى صفحة منفصلة
        </p>
      </div>
    </div>
  );

  const renderPasswordTab = () => (
    <div className="space-y-6">
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold mb-4" text-thirdColor-600>
          إعدادات كلمة المرور
        </h2>
        <p className="text-lg" text-thirdColor-500>
          تم نقل إعدادات كلمة المرور إلى صفحة منفصلة
        </p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "password":
        return renderPasswordTab();

      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>
              <p className="text-gray-600 mt-2">إدارة حسابك وتفضيلات التطبيق</p>
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

      {/* Horizontal Navigation */}
      <div className="bg-white w-max rounded-2xl shadow-lg border border-gray-200 p-4 m-6 ">
        <div>
          <nav className="flex gap-2 justify-center sm:justify-start min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <CustomButton
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "primary" : "ghost"}
                  size="sm"
                  className="flex-shrink-0 whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium hidden sm:inline">
                    {tab.label}
                  </span>
                  <span className="font-medium sm:hidden">
                    {tab.label.split(" ")[0]}
                  </span>
                </CustomButton>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 m-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
