import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu1Category from "../../components/themes/menu1/Menu1Category";
import Menu1Hero from "../../components/themes/menu1/Menu1Hero";
import Menu1Footer from "../../components/themes/menu1/Menu1Footer";
import { useDispatch, useSelector } from "react-redux";
import { getMyRestaurantData } from "../../store/slices/restaurantSlice";
import CustomLoadingSpinner from "../../components/common/CustomLoadingSpinner";

const Menu1Page = () => {
  const { restaurantName } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(getMyRestaurantData(restaurantName));
  }, [dispatch, restaurantName]);

  if (loading) {
    return (
      <CustomLoadingSpinner
        size="xl"
        message="جاري تحميل قائمة المطعم..."
        showBackground={true}
      />
    );
  }

  if (!data || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-thirdColor-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-thirdColor-800 mb-2">
            المطعم غير موجود
          </h2>
          <p className="text-thirdColor-600">المطعم الذي تبحث عنه غير موجود.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-firstColor-100 to-secondColor-200">
      <Menu1Hero restaurant={data} />
      <Menu1Category categories={data.categories || []} />
      <Menu1Footer />
    </div>
  );
};

export default Menu1Page;
