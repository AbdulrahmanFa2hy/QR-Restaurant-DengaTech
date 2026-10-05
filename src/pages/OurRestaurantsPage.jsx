import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CustomRestaurantCard from "../components/common/CustomRestaurantCard";
import CustomSelect from "../components/common/CustomSelect";
import Pagination from "../components/common/Pagination";
import NoResults from "../components/common/NoResults";
import { useDispatch, useSelector } from "react-redux";
import { getOurRestaurantsData } from "../store/slices/restaurantSlice";
import CustomLoadingSpinner from "../components/common/CustomLoadingSpinner";
import { Search } from "lucide-react";
import CustomInput from "../components/common/CustomInput";
import { restaurantTypesData } from "../data/restaurantTypesData";

const OurRestaurantsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.restaurant);

  // Get URL parameters
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const typeFilter = searchParams.get("type") || "all";
  const searchQuery = searchParams.get("keyword") || "";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // مزامنة الحالة الداخلية مع الـ URL
  useEffect(() => {
    setSearchTerm(searchQuery);
    setFilterType(typeFilter);
  }, [searchQuery, typeFilter]);

  // جلب البيانات عند تغيّر بارامترات الـ URL فقط
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 12,
      ...(typeFilter !== "all" && { type: typeFilter }),
      ...(searchQuery && { keyword: searchQuery }),
    };
    dispatch(getOurRestaurantsData(params));
  }, [dispatch, currentPage, typeFilter, searchQuery]);

  // تغيير نوع الفلتر
  const handleTypeFilter = (type) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", type);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  // تحديث الـ URL بناءً على كلمة البحث
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = (term) => {
    const newParams = new URLSearchParams(searchParams);
    if (term) {
      newParams.set("keyword", term);
    } else {
      newParams.delete("keyword");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  // مسح الفلاتر
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (searchTerm === searchQuery) return;

    const id = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500);

    return () => clearTimeout(id);
  }, [searchTerm, searchQuery, handleSearch]);

  const filteredRestaurants = data || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-firstColor-100 to-secondColor-200">
      <div>
        <div
          className="rounded-xl"
          style={{
            backgroundImage:
              "url(https://cdn.al-ain.com/lg/images/2019/9/30/62-145057-dubai-beach-sea-restaurants-view-5.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`mb-8 transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-firstColor-400 bg-clip-text py-4 text-transparent mb-4 animate-pulse">
                كيو آر منيو - العريش
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-firstColor-100 to-secondColor-200 mx-auto rounded-full mb-6"></div>
            </div>
          </div>

          {/* Enhanced Search Bar with Status Filter */}
          <div
            className={`mb-10 transform transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="rounded-2xl p-4 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium text-white mb-2">
                    اكتشف جميع مطاعمنا وعروضها الفريدة
                  </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div className="flex-1 w-full md:max-w-md">
                    <CustomInput
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} // <-- بدلًا من handleSearch
                      icon={Search}
                      className="ltr"
                      placeholder="ابحث  عن المطعم بالاسم أو الوصف"
                    />
                  </div>

                  <div className="w-full md:w-48">
                    <CustomSelect
                      value={filterType}
                      onChange={(e) => handleTypeFilter(e.target.value)}
                      options={restaurantTypesData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid p-4 px-2 sm:p-4 md:p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 gap-x-3 sm:gap-y-5 sm:gap-x-3 pb-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-16">
              <CustomLoadingSpinner
                size="xl"
                message="جاري تحميل المطاعم..."
                showBackground={false}
              />
            </div>
          ) : data?.length === 0 ? (
            <div className="col-span-full">
              <NoResults
                onClearFilters={handleClearFilters}
                className={`transform transition-all duration-1000 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                title="لايوجد مطاعم متاحة"
                description="لم يتم اضافة مطاعم حتي الان"
                buttonText="اعادة تحميل"
              />
            </div>
          ) : filteredRestaurants.length === 0 && !loading ? (
            <div className="col-span-full">
              <NoResults
                onClearFilters={handleClearFilters}
                className={`transform transition-all duration-1000 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                title="لم يتم العثور على المطعم"
                description="جرب تعديل معايير البحث أو تصفح جميع مطاعمنا"
                buttonText="مسح البحث والتصفية"
              />
            </div>
          ) : (
            data?.map((restaurant, index) => (
              <div
                key={restaurant._id}
                className={`transform transition-all duration-700 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CustomRestaurantCard
                  restaurant={restaurant}
                  buttonText="عرض القائمة"
                />
              </div>
            ))
          )}
        </div>

        {/* Pagination removed - no longer needed */}

        {filteredRestaurants.length > 0 && (
          <div
            className={`mt-16 text-center transform transition-all duration-1000 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          ></div>
        )}
      </div>
    </div>
  );
};

export default OurRestaurantsPage;
