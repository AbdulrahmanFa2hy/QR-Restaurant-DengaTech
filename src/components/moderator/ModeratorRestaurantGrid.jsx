import React from "react";
import CustomRestaurantCard from "../common/CustomRestaurantCard";
import NoResults from "../common/NoResults";

const ModeratorRestaurantGrid = ({ filteredRestaurants, onClearFilters }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {filteredRestaurants?.map((restaurant) => (
          <CustomRestaurantCard
            key={restaurant.id || restaurant._id}
            restaurant={restaurant}
            buttonText="إدارة المطعم"
          />
        ))}
      </div>

      {filteredRestaurants?.length === 0 && (
        <NoResults onClearFilters={onClearFilters} />
      )}
    </>
  );
};

export default ModeratorRestaurantGrid;
