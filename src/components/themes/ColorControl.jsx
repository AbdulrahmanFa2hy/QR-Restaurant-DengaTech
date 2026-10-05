import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Palette } from "lucide-react";
import {
  updateThemeProperty,
  applyPresetTheme,
  updateRestaurantTheme,
  presetThemes,
  applyFontToComponents,
} from "../../store/slices/themeSlice";
import { getMyRestaurantData } from "../../store/slices/restaurantSlice";

const ColorControl = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Get theme data from Redux store
  const { data: currentTheme, loading } = useSelector((state) => state.theme);
  const { data } = useSelector((state) => state.restaurant);

  // Get restaurant ID from restaurant data
  const restaurantId = data?._id;

  // Handle theme property updates
  const handleThemeUpdate = (property, value) => {
    dispatch(updateThemeProperty({ property, value }));
  };

  // Handle theme save
  const handleSaveTheme = async () => {
    if (restaurantId && currentTheme) {
      const hexThemeData = {
        selectedMenu: currentTheme.selectedMenu || "main-menu",
        heroBackground: currentTheme.heroBackground,
        heroTitle: currentTheme.heroTitle,
        heroDescription: currentTheme.heroDescription,
        gridBackground: currentTheme.gridBackground,
        categoryBackground: currentTheme.categoryBackground,
        categoryText: currentTheme.categoryText,
        subcategoryText: currentTheme.subcategoryText,
        productBackground: currentTheme.productBackground,
        productText: currentTheme.productText,
        productPrice: currentTheme.productPrice,
        productIngredients: currentTheme.productIngredients,
        customFont: currentTheme.customFont || "Cairo",
        themeName: "static",
      };

      await dispatch(
        updateRestaurantTheme({
          restaurantId,
          themeData: hexThemeData,
        })
      ).unwrap();

      // Refresh restaurant data to get updated theme
      dispatch(getMyRestaurantData(restaurantId));
    }
  };

  const applyTheme = (theme) => {
    dispatch(applyPresetTheme(theme));
  };

  // Apply font when theme changes or component mounts
  useEffect(() => {
    if (currentTheme?.customFont) {
      applyFontToComponents(currentTheme.customFont);
    }
  }, [currentTheme]);

  // Apply font on component mount
  useEffect(() => {
    if (currentTheme?.customFont) {
      applyFontToComponents(currentTheme.customFont);
    }
  }, [currentTheme?.customFont]);

  const colorControls = [
    {
      label: "خلفية الجزء العلوي",
      value: currentTheme?.heroBackground || "#B91C1C",
      setter: (value) => handleThemeUpdate("heroBackground", value),
    },
    {
      label: "عنوان الجزء العلوي",
      value: currentTheme?.heroTitle || "#FFFFFF",
      setter: (value) => handleThemeUpdate("heroTitle", value),
    },
    {
      label: "وصف الجزء العلوي",
      value: currentTheme?.heroDescription || "#FFFFFF",
      setter: (value) => handleThemeUpdate("heroDescription", value),
    },
    {
      label: "خلفية الجزء السفلي",
      value: currentTheme?.gridBackground || "#FFFFFF",
      setter: (value) => handleThemeUpdate("gridBackground", value),
    },
    {
      label: "خلفية الفئة الاساسية",
      value: currentTheme?.categoryBackground || "#FFFFFF",
      setter: (value) => handleThemeUpdate("categoryBackground", value),
    },
    {
      label: "نص الفئة الاساسية",
      value: currentTheme?.categoryText || "#000000",
      setter: (value) => handleThemeUpdate("categoryText", value),
    },
    {
      label: "نص الفئة الفرعية",
      value: currentTheme?.subcategoryText || "#000000",
      setter: (value) => handleThemeUpdate("subcategoryText", value),
    },
    {
      label: "خلفية الوجبة",
      value: currentTheme?.productBackground || "#FFFFFF",
      setter: (value) => handleThemeUpdate("productBackground", value),
    },
    {
      label: "نص الوجبة",
      value: currentTheme?.productText || "#000000",
      setter: (value) => handleThemeUpdate("productText", value),
    },
    {
      label: "سعر الوجبة",
      value: currentTheme?.productPrice || "#B91C1C",
      setter: (value) => handleThemeUpdate("productPrice", value),
    },
    {
      label: "مكونات الوجبة",
      value: currentTheme?.productIngredients || "#6B7280",
      setter: (value) => handleThemeUpdate("productIngredients", value),
    },
    {
      label: "نوع الخط",
      value: currentTheme?.customFont || "Cairo",
      setter: (value) => handleThemeUpdate("customFont", value),
    },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 bg-[var(--category-text)] text-[var(--category-background)]"
        title="Color Controls"
      >
        <Palette className="w-6 h-6" />
      </button>

      {/* Control Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-[color-mix(in_srgb,var(--hero-background)_50%,transparent_50%)]"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Panel */}
          <div
            id="color-control"
            className="relative bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">أدوات التحكم في الألوان</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveTheme}
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "جاري الحفظ..." : "حفظ الثيم"}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>

            {/* Success/Error Messages */}
            {/* Preset Themes */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3 text-gray-700">
                الثيمات الجاهزة
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(presetThemes).map((theme, index) => (
                  <button
                    key={index}
                    onClick={() => applyTheme(theme)}
                    className="p-3 rounded-lg border text-left text-sm font-medium transition-all duration-200 hover:scale-105 border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: theme.heroBackground,
                        }}
                      ></div>
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: theme.categoryText }}
                      ></div>
                    </div>
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Inputs */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colorControls
                  .filter((control) => control.label !== "نوع الخط")
                  .map((control, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium mb-2">
                        {control.label}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={control.value}
                          onChange={(e) => control.setter(e.target.value)}
                          className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={control.value}
                          onChange={(e) => control.setter(e.target.value)}
                          className="flex-1 px-2 py-2 rounded-lg border border-gray-300 font-mono text-xs"
                        />
                      </div>
                    </div>
                  ))}
                {/* Font Control */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    نوع الخط
                  </label>
                  <select
                    value={currentTheme?.customFont || "Cairo"}
                    onChange={(e) =>
                      handleThemeUpdate("customFont", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm"
                  >
                    <option value="Cairo">Cairo - قاهرة</option>
                    <option value="Amiri">Amiri - أميري</option>
                    <option value="Changa">Changa - شانجا</option>
                    <option value="Tajawal">Tajawal - تجوال</option>
                    <option value="Markazi Text">Markazi Text - مركزي</option>
                    <option value="El Messiri">El Messiri - المسيري</option>
                    <option value="Reem Kufi">Reem Kufi - ريم كوفي</option>
                    <option value="IBM Plex Sans Arabic">
                      IBM Plex Sans Arabic
                    </option>
                    <option value="Inter">Inter - إنتر</option>
                    <option value="Scheherazade New">
                      Scheherazade New - شهرزاد
                    </option>
                    <option value="Noto Sans Arabic">Noto Sans Arabic</option>
                    <option value="Almarai">Almarai - المراعي</option>
                    <option value="Harmattan">Harmattan - هارماتان</option>
                    <option value="Lalezar">Lalezar - لالزار</option>
                    <option value="Rubik">Rubik - روبيك</option>
                    <option value="Vazirmatn">Vazirmatn - وزيرمتن</option>
                    <option value="Baloo Bhaijaan 2">
                      Baloo Bhaijaan 2 - بالو باجان
                    </option>
                    <option value="Lateef">Lateef - لطيف</option>
                    <option value="Katibeh">Katibeh - كاتب</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ColorControl;
