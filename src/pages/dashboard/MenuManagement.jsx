import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import MenuSidebar from "../../components/menu-settings/MenuSidebar";
import ProductsDisplay from "../../components/menu-settings/ProductsDisplay";
import CategoryModals from "../../components/menu-settings/CategoryModals";
import SubcategoryModals from "../../components/menu-settings/SubcategoryModals";
import ProductModals from "../../components/menu-settings/ProductModals";
import MobileMenuButton from "../../components/sidebar/MobileMenuButton";
import { LayoutList } from "lucide-react";
import { getAllCategories } from "../../store/slices/categorySlice";
import { getAllMySubcategories } from "../../store/slices/subcategorySlice";
import { getAllMyProducts } from "../../store/slices/productSlice";

const MenuManagement = () => {
  const dispatch = useDispatch();

  // Menu sidebar state - open by default on small screens
  const [isMenuSidebarOpen, setIsMenuSidebarOpen] = useState(
    window.innerWidth < 1024
  );

  // Load data on component mount
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllMySubcategories());
    dispatch(getAllMyProducts());
  }, [dispatch]);

  // Get component instances
  const categoryModals = CategoryModals();
  const subcategoryModals = SubcategoryModals();
  const productModals = ProductModals();
  const productsDisplay = ProductsDisplay({
    onAddProduct: () => productModals.setIsAddProductModalOpen(true),
    onProductClick: productModals.handleProductClick,
  });

  // Handle subcategory selection
  const handleSubcategoryClick = (subcategory) => {
    productsDisplay.setSelectedSubcategory(subcategory);
    productModals.setSelectedSubcategory(subcategory);
  };

  return (
    <div className="flex min-h-screen">
      {/* Menu Sidebar Toggle Button */}
      <MobileMenuButton
        isOpen={isMenuSidebarOpen}
        onToggle={() => setIsMenuSidebarOpen(!isMenuSidebarOpen)}
        position="left"
        className="top-20 left-4 "
        Icon={LayoutList}
      />

      {/* Main Content */}
      <div className="ml-0 lg:ml-60 w-full transition-all duration-300">
        {productsDisplay.display}
      </div>

      <MenuSidebar
        onSubcategoryClick={handleSubcategoryClick}
        onAddCategory={() => categoryModals.setIsAddCategoryModalOpen(true)}
        onAddSubcategory={subcategoryModals.handleAddSubcategory}
        onEditCategory={categoryModals.handleEditCategory}
        onDeleteCategory={categoryModals.handleDeleteCategory}
        onEditSubcategory={subcategoryModals.handleEditSubcategory}
        onDeleteSubcategory={subcategoryModals.handleDeleteSubcategory}
        isMenuSidebarOpen={isMenuSidebarOpen}
        onMenuSidebarClose={() => setIsMenuSidebarOpen(false)}
      />

      {/* Category Modals */}
      {categoryModals.modals}

      {/* Subcategory Modals */}
      {subcategoryModals.modals}

      {/* Product Modals */}
      {productModals.modals}
    </div>
  );
};

export default MenuManagement;
