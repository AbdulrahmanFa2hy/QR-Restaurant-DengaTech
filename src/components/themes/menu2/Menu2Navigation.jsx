import React from "react";

const Menu2Navigation = ({ tabs, activeTab, onTabChange }) => {
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 px-2">
      <div className="flex md:justify-center">
        <div className="flex gap-1 rounded-lg p-1 shadow-sm overflow-x-auto scrollbar-hide min-w-full md:min-w-0 md:max-w-full bg-[var(--category-background)]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 sm:px-8 py-3 rounded-md text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[var(--category-text)] text-[var(--category-background)] shadow-md"
                  : "text-[var(--category-text)] bg-transparent opacity-70 hover:opacity-100 hover:bg-black/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu2Navigation;
