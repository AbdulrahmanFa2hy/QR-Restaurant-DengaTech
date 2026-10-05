import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StatsCards from "../../components/moderator/StatsCards";
import FilterAndSearch from "../../components/moderator/FilterAndSearch";
import ModeratorRestaurantGrid from "../../components/moderator/ModeratorRestaurantGrid";
import Pagination from "../../components/common/Pagination";
import { getOurRestaurantsData } from "../../store/slices/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
const ModeratorPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const { data } = useSelector((state) => state.restaurant);

  const dispatch = useDispatch();

  // Get URL parameters
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const typeFilter = searchParams.get("type") || "all";
  const searchQuery = searchParams.get("keyword") || "";

  useEffect(() => {
    // Set initial state from URL params
    setSearchTerm(searchQuery);
    setFilterType(typeFilter);
  }, [searchQuery, typeFilter]);

  useEffect(() => {
    // Fetch data with pagination and filters
    const params = {
      page: currentPage,
      limit: 10,
      ...(typeFilter !== "all" && { type: typeFilter }),
      ...(searchQuery && { keyword: searchQuery }),
    };
    dispatch(getOurRestaurantsData(params));
  }, [dispatch, currentPage, typeFilter, searchQuery]);

  const handleTypeFilter = (type) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", type);
    newParams.set("page", "1"); // Reset to first page
    setSearchParams(newParams);
  };

  const handleSearch = (term) => {
    const newParams = new URLSearchParams(searchParams);
    if (term) {
      newParams.set("keyword", term);
    } else {
      newParams.delete("keyword");
    }
    newParams.set("page", "1"); // Reset to first page
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  // No client-side filtering needed - server handles it
  const filteredRestaurants = data || [];

  return (
    <div className="p-3 sm:p-4">
      {/* Header */}
      <div className="mb-6 sm:mb-8 mt-4 sm:mt-0">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-thirdColor-800 mb-2">
          المشرف
        </h1>
        <p className="text-sm sm:text-base text-thirdColor-600">
          إدارة ومراقبة جميع مطاعمك من مكان واحد
        </p>
      </div>

      <div className="mb-6 sm:mb-8">
        <StatsCards restaurants={data} />
      </div>

      <div className="mb-6 sm:mb-8">
        <FilterAndSearch
          searchTerm={searchTerm}
          setSearchTerm={handleSearch}
          filterType={filterType}
          setFilterType={handleTypeFilter}
        />
      </div>

      <ModeratorRestaurantGrid
        filteredRestaurants={filteredRestaurants}
        onClearFilters={handleClearFilters}
      />

      {/* Pagination removed - no longer needed */}
    </div>
  );
};

export default ModeratorPage;
