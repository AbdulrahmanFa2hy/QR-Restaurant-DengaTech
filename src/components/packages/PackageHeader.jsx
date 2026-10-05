import React from "react";
import { Plus } from "lucide-react";
import CustomButton from "../common/CustomButton";

const PackageHeader = ({ onAddPackage }) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-thirdColor-800 mb-2">
            إدارة الباقات
          </h1>
          <p className="text-sm sm:text-base text-thirdColor-600">
            إدارة باقات الاشتراك والميزات المتاحة لعملائك
          </p>
        </div>

        <div className="flex justify-start lg:justify-end">
          <CustomButton onClick={onAddPackage} variant="primary" size="md">
            <Plus className="w-5 h-5" />
            <span>إضافة باقة جديدة</span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default PackageHeader;
