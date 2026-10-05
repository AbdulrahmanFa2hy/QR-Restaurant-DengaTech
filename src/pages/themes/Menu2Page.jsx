import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ColorControl from "../../components/themes/ColorControl";
import { getMyRestaurantData } from "../../store/slices/restaurantSlice";
import Menu2Hero from "../../components/themes/menu2/Menu2Hero";
import Menu2Navigation from "../../components/themes/menu2/Menu2Navigation";
import Menu2Grid from "../../components/themes/menu2/Menu2Grid";
import Menu2Error from "../../components/themes/menu2/Menu2Error";
import Menu2EmptyState from "../../components/themes/menu2/Menu2EmptyState";
import CustomLoadingSpinner from "../../components/common/CustomLoadingSpinner";
import {
  setThemeData,
  applyPresetTheme,
  presetThemes,
  applyFontToComponents,
} from "../../store/slices/themeSlice";
import "./Menu.css";

function Menu2Page() {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const [activeTab, setActiveTab] = useState("");

  // Get restaurant data from Redux store
  const { loading, error, data } = useSelector((state) => state.restaurant);
  const { data: currentTheme } = useSelector((state) => state.theme);
  console.log(restaurantId);
  // Fetch restaurant data when component mounts
  useEffect(() => {
    if (restaurantId) {
      dispatch(getMyRestaurantData(restaurantId));
    }
  }, [dispatch, restaurantId]);

  // Set active tab when categories are loaded
  useEffect(() => {
    if (data?.categories && data.categories.length > 0 && !activeTab) {
      setActiveTab(data.categories[0].name);
    }
  }, [data, activeTab]);

  // Handle theme logic based on themeName
  useEffect(() => {
    if (data?.customMenu) {
      const customMenu = data.customMenu;

      // If themeName is "static", apply the custom theme from API
      if (customMenu.themeName === "static") {
        dispatch(setThemeData(customMenu));
      }
      // If themeName is not "static", apply the corresponding preset theme
      else if (customMenu.themeName && presetThemes[customMenu.themeName]) {
        dispatch(applyPresetTheme(presetThemes[customMenu.themeName]));
      }
      // Fallback: if no themeName or invalid themeName, apply custom theme
      else {
        dispatch(setThemeData(customMenu));
      }
    }
  }, [data, dispatch]);

  // Apply font when theme changes or component mounts
  useEffect(() => {
    if (currentTheme?.customFont) {
      applyFontToComponents(currentTheme.customFont);
    }
  }, [currentTheme]);

  // Update CSS variables when theme changes
  useEffect(() => {
    if (currentTheme) {
      document.documentElement.style.setProperty(
        "--hero-background",
        currentTheme.heroBackground
      );
      document.documentElement.style.setProperty(
        "--hero-title",
        currentTheme.heroTitle
      );
      document.documentElement.style.setProperty(
        "--hero-description",
        currentTheme.heroDescription
      );
      document.documentElement.style.setProperty(
        "--grid-background",
        currentTheme.gridBackground
      );
      document.documentElement.style.setProperty(
        "--category-background",
        currentTheme.categoryBackground
      );
      document.documentElement.style.setProperty(
        "--category-text",
        currentTheme.categoryText
      );
      document.documentElement.style.setProperty(
        "--subcategory-text",
        currentTheme.subcategoryText
      );
      document.documentElement.style.setProperty(
        "--product-background",
        currentTheme.productBackground
      );
      document.documentElement.style.setProperty(
        "--product-text",
        currentTheme.productText
      );
      document.documentElement.style.setProperty(
        "--product-price",
        currentTheme.productPrice
      );
      document.documentElement.style.setProperty(
        "--product-ingredients",
        currentTheme.productIngredients
      );
      document.documentElement.style.setProperty(
        "--font-family",
        currentTheme.customFont
      );
    }
  }, [currentTheme]);

  // Get dynamic tabs from categories
  const tabs = data?.categories?.map((category) => category.name) || [];

  // Get current category data
  const currentCategory = data?.categories?.find(
    (category) => category.name === activeTab
  );

  // Transform subcategories to match the expected format
  const currentSubcategories =
    currentCategory?.subcategories?.map((subcategory) => ({
      category: subcategory.name,
      items:
        subcategory.products?.map((product) => ({
          id: product._id,
          name: product.name,
          ingredients: Array.isArray(product.ingredients)
            ? product.ingredients.join("، ")
            : product.ingredients || "",
          price: product.price,
        })) || [],
    })) || [];

  // Show loading state
  if (loading) {
    return (
      <CustomLoadingSpinner size="xl" message="جاري تحميل بيانات المطعم..." />
    );
  }

  // Show error state
  if (error) {
    return (
      <Menu2Error
        error={error}
        onRetry={() => dispatch(getMyRestaurantData(restaurantId))}
      />
    );
  }

  return (
    <div id="menu2-page" className="min-h-screen bg-[var(--grid-background)]">
      <ColorControl />
      <div className="max-w-8xl mx-auto">
        <Menu2Hero restaurant={data} restaurantId={restaurantId} />

        <Menu2Navigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="px-2 pb-16">
          {tabs.length === 0 ? (
            <Menu2EmptyState />
          ) : (
            <Menu2Grid
              subcategories={currentSubcategories}
              activeTab={activeTab}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu2Page;
