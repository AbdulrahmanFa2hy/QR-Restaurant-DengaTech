import React from "react";

const Menu2ProductCard = ({ item }) => {
  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 bg-[var(--product-background)]">
      {/* Item Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2 text-[var(--product-text)]">
          {item.name}
        </h3>

        <p className="text-sm mb-3 text-[var(--product-ingredients)]">
          {item.ingredients}
        </p>

        <span className="text-xl font-bold text-[var(--product-price)]">
          ${item.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Menu2ProductCard;
