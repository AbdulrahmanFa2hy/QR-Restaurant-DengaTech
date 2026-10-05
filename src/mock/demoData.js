// ============================================================
// Demo seed data — used by the mock API (src/mock/mockServer.js)
// instead of the real backend.
// ============================================================

export const DEMO_PASSWORD = "123456";

// ---------- Packages ----------
const packages = [
  {
    _id: "pkg_basic",
    name: "الباقة الأساسية",
    price: 199,
    durationDays: 30,
    features: [
      "منيو إلكتروني واحد",
      "حتى 50 منتج",
      "باركود QR قابل للتحميل",
      "دعم فني عبر البريد",
    ],
  },
  {
    _id: "pkg_premium",
    name: "الباقة المميزة",
    price: 399,
    durationDays: 30,
    features: [
      "منتجات غير محدودة",
      "تخصيص كامل للألوان والخطوط",
      "باركود QR بجودة عالية",
      "دعم فني عبر واتساب",
      "إحصائيات الزيارات",
    ],
  },
  {
    _id: "pkg_enterprise",
    name: "باقة الشركات",
    price: 899,
    durationDays: 30,
    features: [
      "عدد غير محدود من الفروع",
      "كل مميزات الباقة المميزة",
      "مدير حساب مخصص",
      "ربط مع أنظمة نقاط البيع",
      "تقارير شهرية مفصلة",
      "دعم فني 24/7",
    ],
  },
];

// ---------- Restaurants ----------
const defaultCustomMenu = {
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
};

const makeRestaurant = (r) => ({
  logo: null,
  image: null,
  isActive: "active",
  location: { latitude: 30.0444, longitude: 31.2357 },
  package: {
    packageId: "pkg_premium",
    isActive: true,
    packageStart: "2026-09-01",
  },
  customMenu: { ...defaultCustomMenu },
  createdAt: "2026-09-01T10:00:00.000Z",
  ...r,
  whatsApp: r.whatsApp || r.phone,
});

const restaurants = [
  makeRestaurant({
    _id: "rest_roma",
    name: "بيتزا روما",
    slug: "pizza-roma",
    description:
      "أشهى البيتزا الإيطالية المخبوزة في فرن الحطب، باستا طازجة وحلويات إيطالية أصلية.",
    address: "15 شارع التحرير، الدقي، الجيزة",
    phone: "+201001234567",
    type: "italian",
    owner: "user_owner",
  }),
  makeRestaurant({
    _id: "rest_grill",
    name: "مشويات أبو علي",
    slug: "abu-ali-grill",
    description: "كباب وكفتة وريش ضاني على الفحم بالطريقة الشرقية الأصيلة.",
    address: "42 شارع عباس العقاد، مدينة نصر، القاهرة",
    phone: "+201112345678",
    type: "grill",
    owner: "user_owner2",
    customMenu: {
      ...defaultCustomMenu,
      themeName: "red",
    },
  }),
  makeRestaurant({
    _id: "rest_cafe",
    name: "كافيه النخبة",
    slug: "elite-cafe",
    description: "قهوة مختصة، مشروبات باردة وساخنة ومخبوزات طازجة يومياً.",
    address: "8 شارع 9، المعادي، القاهرة",
    phone: "+201223456789",
    type: "cafe",
    owner: "user_owner3",
    customMenu: { ...defaultCustomMenu, themeName: "dark" },
  }),
  makeRestaurant({
    _id: "rest_sea",
    name: "أسماك البحر الأحمر",
    slug: "red-sea-fish",
    description: "أطزج المأكولات البحرية: جمبري، كاليماري، وسمك مشوي وسنجاري.",
    address: "الكورنيش، الإسكندرية",
    phone: "+201034567890",
    type: "seafood",
    isActive: "maintenance",
    customMenu: { ...defaultCustomMenu, themeName: "blue" },
  }),
  makeRestaurant({
    _id: "rest_sweets",
    name: "حلواني الشرق",
    slug: "east-sweets",
    description: "كنافة، بسبوسة، بقلاوة وجميع أنواع الحلويات الشرقية.",
    address: "شارع الهرم، الجيزة",
    phone: "+201145678901",
    type: "sweets",
    isActive: "inactive",
  }),
  makeRestaurant({
    _id: "rest_burger",
    name: "برجر تاون",
    slug: "burger-town",
    description: "برجر لحم بقري مشوي، ساندوتشات دجاج مقرمش، وبطاطس محمرة.",
    address: "مول العرب، 6 أكتوبر",
    phone: "+201256789012",
    type: "fastfood",
    customMenu: { ...defaultCustomMenu, themeName: "green" },
  }),
  makeRestaurant({
    _id: "rest_bakery",
    name: "مخبز الفلاحين",
    slug: "farmers-bakery",
    description: "عيش بلدي وفينو ومخبوزات بالسمن البلدي طازجة كل صباح.",
    address: "شارع الجمهورية، المنصورة",
    phone: "+201067890123",
    type: "bakery",
  }),
  makeRestaurant({
    _id: "rest_home",
    name: "مطبخ ست الحبايب",
    slug: "mama-kitchen",
    description: "أكل بيتي على أصوله: محشي، ملوخية، فتة وطواجن.",
    address: "شارع فيصل، الجيزة",
    phone: "+201178901234",
    type: "homemade",
    customMenu: { ...defaultCustomMenu, themeName: "purple" },
  }),
];

// ---------- Users ----------
const users = [
  {
    _id: "user_moderator",
    name: "مدير النظام",
    email: "admin@demo.com",
    phone: "+201000000000",
    role: "moderator",
    status: "active",
    createdAt: "2026-08-15T09:00:00.000Z",
  },
  {
    _id: "user_owner",
    name: "أحمد محمد",
    email: "owner@demo.com",
    phone: "+201001234567",
    role: "owner",
    status: "active",
    restaurant: "rest_roma",
    organization: { id: "rest_roma" },
    createdAt: "2026-09-01T10:00:00.000Z",
  },
  {
    _id: "user_owner2",
    name: "علي حسن",
    email: "ali@demo.com",
    phone: "+201112345678",
    role: "owner",
    status: "active",
    restaurant: "rest_grill",
    organization: { id: "rest_grill" },
    createdAt: "2026-09-05T12:30:00.000Z",
  },
  {
    _id: "user_owner3",
    name: "سارة إبراهيم",
    email: "sara@demo.com",
    phone: "+201223456789",
    role: "owner",
    status: "active",
    restaurant: "rest_cafe",
    organization: { id: "rest_cafe" },
    createdAt: "2026-09-10T08:15:00.000Z",
  },
  {
    _id: "user_moderator2",
    name: "محمود سامي",
    email: "mahmoud@demo.com",
    phone: "+201099999999",
    role: "moderator",
    status: "active",
    createdAt: "2026-09-12T14:00:00.000Z",
  },
];

// ---------- Menus (categories → subcategories → products) ----------
// Compact definition that gets expanded into flat collections below.
const menus = {
  rest_roma: [
    {
      name: "البيتزا",
      subs: [
        {
          name: "بيتزا كلاسيك",
          products: [
            ["مارجريتا", 120, ["صلصة طماطم", "موتزاريلا", "ريحان"]],
            ["بيبروني", 150, ["صلصة طماطم", "موتزاريلا", "بيبروني"]],
            ["خضروات", 130, ["فلفل", "زيتون", "مشروم", "بصل"]],
          ],
        },
        {
          name: "بيتزا مميزة",
          products: [
            ["فور تشيز", 175, ["موتزاريلا", "شيدر", "بارميزان", "جورجونزولا"]],
            ["سي فود", 210, ["جمبري", "كاليماري", "سبيط"]],
            ["باربكيو تشيكن", 180, ["دجاج مشوي", "صوص باربكيو", "بصل أحمر"]],
          ],
        },
      ],
    },
    {
      name: "الباستا",
      subs: [
        {
          name: "باستا بالصلصة الحمراء",
          products: [
            ["بينا أرابياتا", 95, ["صلصة طماطم حارة", "ثوم", "بقدونس"]],
            ["سباجيتي بولونيز", 115, ["لحم مفروم", "صلصة طماطم"]],
          ],
        },
        {
          name: "باستا بالصلصة البيضاء",
          products: [
            ["فيتوتشيني ألفريدو", 125, ["كريمة", "بارميزان", "دجاج"]],
            ["بينا مشروم", 110, ["كريمة", "مشروم", "ثوم"]],
          ],
        },
      ],
    },
    {
      name: "المشروبات",
      subs: [
        {
          name: "مشروبات باردة",
          products: [
            ["عصير برتقال فريش", 45, []],
            ["ليمون نعناع", 40, []],
            ["مياه غازية", 25, []],
          ],
        },
        {
          name: "مشروبات ساخنة",
          products: [
            ["إسبريسو", 35, []],
            ["كابتشينو", 50, ["إسبريسو", "حليب مبخر"]],
          ],
        },
      ],
    },
    {
      name: "الحلويات",
      subs: [
        {
          name: "حلويات إيطالية",
          products: [
            ["تيراميسو", 85, ["ماسكاربوني", "قهوة", "كاكاو"]],
            ["بانا كوتا", 70, ["كريمة", "صوص فراولة"]],
          ],
        },
      ],
    },
  ],
  rest_grill: [
    {
      name: "المشويات",
      subs: [
        {
          name: "لحوم",
          products: [
            ["كباب (ربع كيلو)", 220, ["كباب ضاني", "طحينة", "سلطة"]],
            ["كفتة (ربع كيلو)", 180, ["كفتة بلدي", "عيش", "طحينة"]],
            ["ريش ضاني", 320, ["ريش ضاني متبلة"]],
          ],
        },
        {
          name: "فراخ",
          products: [
            ["فرخة مشوية كاملة", 260, ["أرز", "سلطة", "ثومية"]],
            ["شيش طاووق", 160, ["صدور دجاج", "ثومية"]],
          ],
        },
      ],
    },
    {
      name: "المقبلات",
      subs: [
        {
          name: "سلطات",
          products: [
            ["طحينة", 20, []],
            ["بابا غنوج", 25, ["باذنجان", "طحينة"]],
            ["سلطة خضراء", 20, []],
          ],
        },
      ],
    },
  ],
  rest_cafe: [
    {
      name: "القهوة",
      subs: [
        {
          name: "قهوة ساخنة",
          products: [
            ["لاتيه", 60, ["إسبريسو", "حليب"]],
            ["فلات وايت", 65, ["دبل إسبريسو", "حليب"]],
            ["قهوة تركي", 35, []],
          ],
        },
        {
          name: "قهوة باردة",
          products: [
            ["آيس لاتيه", 70, ["إسبريسو", "حليب", "ثلج"]],
            ["كولد برو", 75, []],
          ],
        },
      ],
    },
    {
      name: "المخبوزات",
      subs: [
        {
          name: "كرواسون",
          products: [
            ["كرواسون زبدة", 45, []],
            ["كرواسون شوكولاتة", 55, ["شوكولاتة بلجيكي"]],
          ],
        },
      ],
    },
  ],
};

// Expand menus into flat collections (like the backend would store them)
const categories = [];
const subcategories = [];
const products = [];

Object.entries(menus).forEach(([restaurantId, cats]) => {
  cats.forEach((cat, ci) => {
    const categoryId = `cat_${restaurantId}_${ci}`;
    categories.push({
      _id: categoryId,
      name: cat.name,
      restaurant: restaurantId,
    });

    cat.subs.forEach((sub, si) => {
      const subId = `sub_${restaurantId}_${ci}_${si}`;
      subcategories.push({
        _id: subId,
        name: sub.name,
        category: categoryId,
        image: null,
      });

      sub.products.forEach(([name, price, ingredients], pi) => {
        products.push({
          _id: `prod_${restaurantId}_${ci}_${si}_${pi}`,
          name,
          price,
          ingredients,
          subCategory: subId,
        });
      });
    });
  });
});

export const createSeedDB = () =>
  JSON.parse(
    JSON.stringify({
      users,
      restaurants,
      packages,
      categories,
      subcategories,
      products,
    })
  );
