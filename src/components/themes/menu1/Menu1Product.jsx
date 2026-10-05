import React from "react";

const Menu1Product = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`bg-thirdColor-50 rounded-lg p-2 sm:p-5 border-r-4 border-firstColor-400 hover:bg-thirdColor-100 transition-all duration-500 delay-[${
            index * 150
          }ms] hover:shadow-lg hover:scale-[1.02] hover:border-firstColor-800 group animate-in slide-in-from-right-2 fade-in-0`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h5 className="sm:text-2xl font-semibold text-thirdColor-800 mb-2 group-hover:text-firstColor-800 transition-all duration-300 group-hover:translate-x-1">
                {item.name}
              </h5>
            </div>

            <div className="mr-6 text-left">
              <span className="sm:text-3xl font-bold text-firstColor-600 group-hover:text-firstColor-800 group-hover:scale-110 transition-all duration-300 group-hover:drop-shadow-lg">
                ${item.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu1Product;
