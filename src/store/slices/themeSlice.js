import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, baseURL } from "../configAPI";
import { handleAsyncThunk } from "../../utils/handleAsyncThunk";

// Font mapping to CSS variables
export const fontMapping = {
  Cairo: "var(--font-family-cairo)",
  Amiri: "var(--font-family-amiri)",
  Changa: "var(--font-family-changa)",
  Tajawal: "var(--font-family-tajawal)",
  "Markazi Text": "var(--font-family-markazi)",
  "El Messiri": "var(--font-family-messiri)",
  "Reem Kufi": "var(--font-family-reem-kufi)",
  "IBM Plex Sans Arabic": "var(--font-family-ibm-plex)",
  Inter: "var(--font-family-inter)",
  "Scheherazade New": "var(--font-family-scheherazade)",
  "Noto Sans Arabic": "var(--font-family-noto-arabic)",
  Almarai: "var(--font-family-almarai)",
  Harmattan: "var(--font-family-harmattan)",
  Lalezar: "var(--font-family-lalezar)",
  Rubik: "var(--font-family-rubik)",
  Vazirmatn: "var(--font-family-vazirmatn)",
  "Baloo Bhaijaan 2": "var(--font-family-baloo)",
  Lateef: "var(--font-family-lateef)",
  Katibeh: "var(--font-family-katibeh)",
};

// Preset themes that match the themeName values
export const presetThemes = {
  red: {
    name: "الأحمر الافتراضي",
    themeName: "red",
    selectedMenu: "main-menu",
    heroBackground: "#B91C1C",
    heroTitle: "#FFFFFF",
    heroDescription: "#F3F4F6",
    gridBackground: "#F9FAFB",
    categoryBackground: "#FFFFFF",
    categoryText: "#B91C1C",
    subcategoryText: "#1F2937",
    productBackground: "#FFFFFF",
    productText: "#1F2937",
    productPrice: "#B91C1C",
    productIngredients: "#6B7280",
    customFont: "Cairo",
  },
  blue: {
    name: "الأزرق المحيطي",
    themeName: "blue",
    selectedMenu: "main-menu",
    heroBackground: "#1E40AF",
    heroTitle: "#FFFFFF",
    heroDescription: "#E0E7FF",
    gridBackground: "#F0F9FF",
    categoryBackground: "#FFFFFF",
    categoryText: "#1E40AF",
    subcategoryText: "#1F2937",
    productBackground: "#FFFFFF",
    productText: "#1F2937",
    productPrice: "#1E40AF",
    productIngredients: "#6B7280",
    customFont: "Cairo",
  },
  green: {
    name: "الأخضر الغابي",
    themeName: "green",
    selectedMenu: "main-menu",
    heroBackground: "#059669",
    heroTitle: "#FFFFFF",
    heroDescription: "#D1FAE5",
    gridBackground: "#ECFDF5",
    categoryBackground: "#FFFFFF",
    categoryText: "#059669",
    subcategoryText: "#1F2937",
    productBackground: "#FFFFFF",
    productText: "#1F2937",
    productPrice: "#059669",
    productIngredients: "#6B7280",
    customFont: "Cairo",
  },
  purple: {
    name: "البنفسجي الملكي",
    themeName: "purple",
    selectedMenu: "main-menu",
    heroBackground: "#7C3AED",
    heroTitle: "#FFFFFF",
    heroDescription: "#E9D5FF",
    gridBackground: "#FAF5FF",
    categoryBackground: "#FFFFFF",
    categoryText: "#7C3AED",
    subcategoryText: "#1F2937",
    productBackground: "#FFFFFF",
    productText: "#1F2937",
    productPrice: "#7C3AED",
    productIngredients: "#6B7280",
    customFont: "Cairo",
  },
  orange: {
    name: "البرتقالي الغروبي",
    themeName: "orange",
    selectedMenu: "main-menu",
    heroBackground: "#EA580C",
    heroTitle: "#FFFFFF",
    heroDescription: "#FED7AA",
    gridBackground: "#FFF7ED",
    categoryBackground: "#FFFFFF",
    categoryText: "#EA580C",
    subcategoryText: "#1F2937",
    productBackground: "#FFFFFF",
    productText: "#1F2937",
    productPrice: "#EA580C",
    productIngredients: "#6B7280",
    customFont: "Cairo",
  },
  dark: {
    name: "الوضع المظلم",
    themeName: "dark",
    selectedMenu: "main-menu",
    heroBackground: "#1F2937",
    heroTitle: "#F9FAFB",
    heroDescription: "#D1D5DB",
    gridBackground: "#111827",
    categoryBackground: "#1F2937",
    categoryText: "#F59E0B",
    subcategoryText: "#F9FAFB",
    productBackground: "#374151",
    productText: "#F9FAFB",
    productPrice: "#F59E0B",
    productIngredients: "#9CA3AF",
    customFont: "Cairo",
  },
};

// Function to apply font to specific components
export const applyFontToComponents = (fontName) => {
  const fontFamily = fontMapping[fontName] || fontMapping.Cairo;

  // Apply to Menu2Page
  const menu2Page = document.getElementById("menu2-page");
  if (menu2Page) {
    menu2Page.style.fontFamily = fontFamily;
  }

  // Apply to ColorControl
  const colorControl = document.getElementById("color-control");
  if (colorControl) {
    colorControl.style.fontFamily = fontFamily;
  }
};

// Update restaurant theme
export const updateRestaurantTheme = createAsyncThunk(
  "theme/updateRestaurantTheme",
  async ({ restaurantId, themeData }, { rejectWithValue }) => {
    try {
      console.log(themeData);
      const { data } = await api.put(
        `${baseURL}/restaurant/theme/${restaurantId}`,
        themeData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: {
    selectedMenu: "main-menu",
    heroBackground: "#EA580C",
    heroTitle: "#FFFFFF",
    heroDescription: "#FED7AA",
    gridBackground: "#FFF7ED",
    categoryBackground: "#FFFFFF",
    categoryText: "#EA580C",
    subcategoryText: "#1F2937",
    productBackground: "#FFFFFF",
    productText: "#1F2937",
    productPrice: "#EA580C",
    productIngredients: "#6B7280",
    customFont: "Cairo",
    themeName: "static",
  },
  loading: false,
  error: null,
  complete: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = initialState.data;
      state.loading = false;
      state.error = null;
      state.complete = false;
    },
    // Set theme data from restaurant data
    setThemeData(state, action) {
      if (action.payload) {
        state.data = {
          selectedMenu: action.payload.selectedMenu || "main-menu",
          heroBackground:
            action.payload.heroBackground || state.data.heroBackground,
          heroTitle: action.payload.heroTitle || state.data.heroTitle,
          heroDescription:
            action.payload.heroDescription || state.data.heroDescription,
          gridBackground:
            action.payload.gridBackground || state.data.gridBackground,
          categoryBackground:
            action.payload.categoryBackground || state.data.categoryBackground,
          categoryText: action.payload.categoryText || state.data.categoryText,
          subcategoryText:
            action.payload.subcategoryText || state.data.subcategoryText,
          productBackground:
            action.payload.productBackground || state.data.productBackground,
          productText: action.payload.productText || state.data.productText,
          productPrice: action.payload.productPrice || state.data.productPrice,
          productIngredients:
            action.payload.productIngredients || state.data.productIngredients,
          customFont: action.payload.customFont || state.data.customFont,
          themeName: "static",
        };

        // Apply font changes
        applyFontToComponents(state.data.customFont);
      }
    },

    // Update individual theme properties
    updateThemeProperty(state, action) {
      const { property, value } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state.data, property)) {
        state.data[property] = value;
        // Set themeName to "static" when individual properties are updated
        state.data.themeName = "static";

        // Apply font changes if the property is customFont
        if (property === "customFont") {
          applyFontToComponents(value);
        }
      }
    },

    // Apply preset theme
    applyPresetTheme(state, action) {
      const presetTheme = action.payload;
      state.data = {
        ...state.data,
        selectedMenu: presetTheme.selectedMenu || state.data.selectedMenu,
        heroBackground: presetTheme.heroBackground || state.data.heroBackground,
        heroTitle: presetTheme.heroTitle || state.data.heroTitle,
        heroDescription:
          presetTheme.heroDescription || state.data.heroDescription,
        gridBackground: presetTheme.gridBackground || state.data.gridBackground,
        categoryBackground:
          presetTheme.categoryBackground || state.data.categoryBackground,
        categoryText: presetTheme.categoryText || state.data.categoryText,
        subcategoryText:
          presetTheme.subcategoryText || state.data.subcategoryText,
        productBackground:
          presetTheme.productBackground || state.data.productBackground,
        productText: presetTheme.productText || state.data.productText,
        productPrice: presetTheme.productPrice || state.data.productPrice,
        productIngredients:
          presetTheme.productIngredients || state.data.productIngredients,
        customFont: presetTheme.customFont || state.data.customFont,
        themeName: "static",
      };

      // Apply font changes
      applyFontToComponents(state.data.customFont);
    },

    // Reset theme to default
  },
  extraReducers: (builder) => {
    // Update Restaurant Theme
    handleAsyncThunk(builder, updateRestaurantTheme, {
      onSuccess: (state, action) => {
        state.success = true;
        state.data = action.payload;
        // Update current theme with the response data if available
        if (action.payload?.data) {
          state.data = {
            ...state.data,
            ...action.payload.data,
          };
        }
      },
    });
  },
});

export const {
  setThemeData,
  updateThemeProperty,
  applyPresetTheme,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
