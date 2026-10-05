import React, { useState } from "react";
import { Plus, Filter, Search } from "lucide-react";
import CustomSelect from "../common/CustomSelect";
import CustomButton from "../common/CustomButton";
import AddRestaurantAndOwner from "./AddRestaurantAndOwner";
import CustomInput from "../common/CustomInput";
import { restaurantTypesData } from "../../data/restaurantTypesData";

const FilterAndSearch = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddRestaurant = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-thirdColor-200 mb-8">
      {/* Large screens: All in one line */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <CustomInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
            className="ltr"
            placeholder="ابحث عن المطاعم..."
          />
        </div>

        <div className="flex justify-center items-center space-x-2 min-w-[180px]">
          <Filter className="w-5 h-5 max-w-5 max-h-5 text-thirdColor-600" />
          <div className="w-full md:w-40">
            <CustomSelect
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              options={restaurantTypesData}
              className="text-sm"
            />
          </div>
        </div>

        <CustomButton
          onClick={handleAddRestaurant}
          size="md"
          className="lg:mr-auto flex justify-center items-center space-x-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة مطعم جديد</span>
        </CustomButton>
      </div>

      <div className="hidden md:flex lg:hidden flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomInput
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              className="ltr"
              placeholder="ابحث عن المطاعم..."
            />
          </div>

          <div className="flex items-center space-x-2 min-w-[250px]">
            <Filter className="w-20 h-20 text-thirdColor-600" />
            <div className="w-full md:w-48">
              <CustomSelect
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                options={[
                  { value: "all", label: "جميع الأنواع" },
                  { value: "cafe", label: "مقهى" },
                  { value: "sweets", label: "حلويات" },
                  { value: "grill", label: "مشاوي" },
                  { value: "seafood", label: "مأكولات بحرية" },
                  { value: "fastfood", label: "وجبات سريعة" },
                  { value: "italian", label: "إيطالي" },
                  { value: "bakery", label: "مخبز" },
                  { value: "homemade", label: "أكل بيتي" },
                ]}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        <CustomButton
          onClick={handleAddRestaurant}
          size="sm"
          className="flex justify-center items-center space-x-2 w-full sm:w-auto sm:self-start"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة مطعم جديد</span>
        </CustomButton>
      </div>

      {/* Small screens: Stacked layout */}
      <div className="flex md:hidden flex-col gap-4">
        <div className="w-full">
          <CustomInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
            className="ltr"
            placeholder="ابحث عن المطاعم..."
          />
        </div>

        <div className="w-full">
          <CustomSelect
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { value: "all", label: "جميع الأنواع" },
              { value: "cafe", label: "مقهى" },
              { value: "sweets", label: "حلويات" },
              { value: "grill", label: "مشاوي" },
              { value: "seafood", label: "مأكولات بحرية" },
              { value: "fastfood", label: "وجبات سريعة" },
              { value: "italian", label: "إيطالي" },
              { value: "bakery", label: "مخبز" },
              { value: "homemade", label: "أكل بيتي" },
            ]}
            className="text-sm"
          />
        </div>

        <CustomButton
          onClick={handleAddRestaurant}
          size="sm"
          className="flex justify-center items-center space-x-2 w-full"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة مطعم جديد</span>
        </CustomButton>
      </div>

      {/* Add Restaurant and Owner Modal */}
      <AddRestaurantAndOwner isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default FilterAndSearch;
