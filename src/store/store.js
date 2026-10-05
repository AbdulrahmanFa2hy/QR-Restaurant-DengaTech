import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import getMeReducer from "./slices/getMeSlice";
import usersReducer from "./slices/usersSlice";
import restaurantReducer from "./slices/restaurantSlice";
import restaurantAndOwnerReducer from "./slices/RestaurantAndOwnerSlice";
import packageReducer from "./slices/packageSlice";
import themeReducer from "./slices/themeSlice";
import categoryReducer from "./slices/categorySlice";
import subcategoryReducer from "./slices/subcategorySlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    getMe: getMeReducer,
    users: usersReducer,
    restaurant: restaurantReducer,
    restaurantAndOwner: restaurantAndOwnerReducer,
    package: packageReducer,
    theme: themeReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    product: productReducer,
  },
});

export default store;
