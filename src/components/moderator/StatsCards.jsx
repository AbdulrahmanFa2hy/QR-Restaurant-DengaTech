import React from "react";

const StatsCards = ({ restaurants }) => {
  const statusCounts = {
    all: restaurants?.length || 0,
    active: restaurants?.filter((r) => r.isActive === "active").length || 0,
    inactive: restaurants?.filter((r) => r.isActive === "inactive").length || 0,
    maintenance:
      restaurants?.filter((r) => r.isActive === "maintenance").length || 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg p-6 border border-thirdColor-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-thirdColor-600">إجمالي المطاعم</p>
            <p className="text-2xl font-bold text-thirdColor-800">
              {statusCounts.all}
            </p>
          </div>
          <div className="w-12 h-12 bg-firstColor-100 rounded-lg flex items-center justify-center">
            <span className="text-firstColor-800 font-bold text-lg">🏪</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-thirdColor-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-thirdColor-600">نشط</p>
            <p className="text-2xl font-bold text-green-600">
              {statusCounts.active}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 font-bold text-lg">✓</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-thirdColor-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-thirdColor-600">غير نشط</p>
            <p className="text-2xl font-bold text-red-600">
              {statusCounts.inactive}
            </p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-red-600 font-bold text-lg">✗</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-thirdColor-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-thirdColor-600">صيانة</p>
            <p className="text-2xl font-bold text-yellow-600">
              {statusCounts.maintenance}
            </p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <span className="text-yellow-600 font-bold text-lg">⚠</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
