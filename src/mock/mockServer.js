// ============================================================
// Mock API server (frontend-only demo mode)
// ------------------------------------------------------------
// Implements an axios adapter that intercepts every request the app
// makes and answers it from an in-memory database seeded with demo
// data (see ./demoData.js). Changes are persisted in localStorage so
// CRUD operations survive page reloads.
//
// To reset the demo data run in the browser console:
//   window.resetDemoData()
// ============================================================
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createSeedDB, DEMO_PASSWORD } from "./demoData";

const STORAGE_KEY = "qr_demo_db_v1";
const LATENCY_MS = 350;

// ---------- DB persistence ----------
const loadDB = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return createSeedDB();
};

let db = loadDB();

const saveDB = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    /* ignore quota errors */
  }
};

if (typeof window !== "undefined") {
  window.resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    db = createSeedDB();
    window.location.reload();
  };
}

// ---------- Helpers ----------
const uid = (prefix) =>
  `${prefix}_${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 7)}`;

const clone = (v) => JSON.parse(JSON.stringify(v));

const slugify = (str = "") =>
  str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "") || uid("r");

const stripPassword = (user) => {
  if (!user) return user;
  // eslint-disable-next-line no-unused-vars
  const { password, ...rest } = user;
  return rest;
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const notFound = (what = "العنصر") => {
  throw new HttpError(404, `${what} غير موجود`);
};

const parseBody = (data) => {
  if (!data) return {};
  if (typeof FormData !== "undefined" && data instanceof FormData) {
    const obj = {};
    data.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  return data;
};

const getAuthUser = (config) => {
  const header =
    config.headers?.Authorization ||
    config.headers?.authorization ||
    (typeof config.headers?.get === "function"
      ? config.headers.get("Authorization")
      : null);
  const token = header?.toString().replace(/^Bearer\s+/i, "");
  if (!token || !token.startsWith("demo-token-")) return null;
  const userId = token.replace("demo-token-", "");
  return db.users.find((u) => u._id === userId) || null;
};

const requireAuth = (config) => {
  const user = getAuthUser(config);
  if (!user) throw new HttpError(401, "غير مصرح");
  return user;
};

const findRestaurant = (idOrSlug) =>
  db.restaurants.find((r) => r._id === idOrSlug || r.slug === idOrSlug);

// The restaurant that the current (owner) user manages
const myRestaurantId = (user) => user?.organization?.id || user?.restaurant;

// ---------- Populate helpers (mimic mongoose .populate) ----------
const populateSubcategory = (sub) => {
  const category = db.categories.find((c) => c._id === sub.category);
  return {
    ...sub,
    category: category ? { _id: category._id, name: category.name } : null,
  };
};

const populateProduct = (product) => {
  const sub = db.subcategories.find((s) => s._id === product.subCategory);
  return {
    ...product,
    subCategory: sub ? { _id: sub._id, name: sub.name } : null,
  };
};

const restaurantCategories = (restaurantId) =>
  db.categories.filter((c) => c.restaurant === restaurantId);

const restaurantSubcategories = (restaurantId) => {
  const catIds = new Set(restaurantCategories(restaurantId).map((c) => c._id));
  return db.subcategories.filter((s) => catIds.has(s.category));
};

const restaurantProducts = (restaurantId) => {
  const subIds = new Set(
    restaurantSubcategories(restaurantId).map((s) => s._id)
  );
  return db.products.filter((p) => subIds.has(p.subCategory));
};

const buildRestaurantAllData = (restaurant) => ({
  ...restaurant,
  categories: restaurantCategories(restaurant._id).map((cat) => ({
    ...cat,
    subcategories: db.subcategories
      .filter((s) => s.category === cat._id)
      .map((sub) => ({
        ...sub,
        products: db.products.filter((p) => p.subCategory === sub._id),
      })),
  })),
});

// ---------- Route definitions ----------
// Each handler receives ({ params, query, body, config }) and returns
// the response payload (or throws HttpError).
const routes = [];
const route = (method, pattern, handler) => {
  const keys = [];
  const regex = new RegExp(
    "^" +
      pattern.replace(/:(\w+)/g, (_, key) => {
        keys.push(key);
        return "([^/]+)";
      }) +
      "/?$"
  );
  routes.push({ method, regex, keys, handler });
};

// ===== Auth =====
route("post", "/auth/login", ({ body }) => {
  const email = (body.email || "").trim().toLowerCase();
  const user = db.users.find((u) => u.email.toLowerCase() === email);
  const expectedPassword = user?.password || DEMO_PASSWORD;
  if (!user || body.password !== expectedPassword) {
    throw new HttpError(400, "البريد الإلكتروني أو كلمة المرور غير صحيحة");
  }
  return {
    status: "success",
    token: `demo-token-${user._id}`,
    user: stripPassword(user),
  };
});

route("post", "/auth/logout", () => ({ status: "success" }));

route("post", "/auth/refresh", () => {
  throw new HttpError(401, "انتهت الجلسة");
});

route("get", "/auth/getMe", ({ config }) => {
  const user = requireAuth(config);
  return { status: "success", user: stripPassword(user) };
});

route("put", "/auth/updatePassword", ({ config, body }) => {
  const user = requireAuth(config);
  if (body.newPassword || body.password) {
    user.password = body.newPassword || body.password;
    saveDB();
  }
  return { status: "success" };
});

// ===== Restaurants =====
route("get", "/restaurant", ({ query }) => {
  let list = [...db.restaurants];
  if (query.type && query.type !== "all") {
    list = list.filter((r) => r.type === query.type);
  }
  if (query.keyword) {
    const kw = query.keyword.toString().toLowerCase();
    list = list.filter(
      (r) =>
        r.name.toLowerCase().includes(kw) ||
        r.description?.toLowerCase().includes(kw) ||
        r.address?.toLowerCase().includes(kw)
    );
  }
  return { status: "success", results: list.length, data: list };
});

route("post", "/restaurant", ({ body }) => {
  const { userData = {}, restaurantData = {} } = body;
  if (
    userData.email &&
    db.users.some(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    )
  ) {
    throw new HttpError(409, "البريد الإلكتروني مستخدم بالفعل");
  }

  const restaurantId = uid("rest");
  const userId = uid("user");

  const restaurant = {
    _id: restaurantId,
    name: restaurantData.name,
    slug: slugify(restaurantData.name),
    description: restaurantData.description || "",
    address: restaurantData.address || "",
    phone: restaurantData.phone || "",
    whatsApp: restaurantData.phone || "",
    type: restaurantData.type || "fastfood",
    isActive: "active",
    logo: null,
    image: null,
    owner: userId,
    location: { latitude: 30.0444, longitude: 31.2357 },
    package: {
      packageId: restaurantData.package?.packageId || db.packages[0]?._id,
      isActive: true,
      packageStart: new Date().toISOString().slice(0, 10),
    },
    customMenu: clone(db.restaurants[0]?.customMenu || {}),
    createdAt: new Date().toISOString(),
  };

  const user = {
    _id: userId,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
    role: "owner",
    status: "active",
    restaurant: restaurantId,
    organization: { id: restaurantId },
    createdAt: new Date().toISOString(),
  };

  db.restaurants.push(restaurant);
  db.users.push(user);
  saveDB();
  return {
    status: "success",
    data: { restaurant, user: stripPassword(user) },
  };
});

route("get", "/restaurant/allData/:id", ({ params }) => {
  const restaurant = findRestaurant(params.id) || notFound("المطعم");
  return { status: "success", data: buildRestaurantAllData(restaurant) };
});

route("put", "/restaurant/theme/:id", ({ params, body }) => {
  const restaurant = findRestaurant(params.id) || notFound("المطعم");
  restaurant.customMenu = { ...restaurant.customMenu, ...body };
  saveDB();
  return { status: "success", data: restaurant.customMenu };
});

route("get", "/restaurant/:id", ({ params }) => {
  const restaurant = findRestaurant(params.id) || notFound("المطعم");
  return { status: "success", data: restaurant };
});

route("put", "/restaurant/:id", ({ params, body }) => {
  const restaurant = findRestaurant(params.id) || notFound("المطعم");
  Object.assign(restaurant, body);
  saveDB();
  return { status: "success", data: restaurant };
});

route("delete", "/restaurant/:id", ({ params }) => {
  db.restaurants = db.restaurants.filter((r) => r._id !== params.id);
  saveDB();
  return { status: "success" };
});

// ===== Categories =====
route("get", "/category/myCategory", ({ config }) => {
  const user = requireAuth(config);
  return {
    status: "success",
    data: restaurantCategories(myRestaurantId(user)),
  };
});

route("get", "/category/:id", ({ params }) => {
  const cat =
    db.categories.find((c) => c._id === params.id) || notFound("الفئة");
  return { status: "success", data: cat };
});

route("post", "/category", ({ body, config }) => {
  const user = requireAuth(config);
  const cat = {
    _id: uid("cat"),
    name: body.name,
    restaurant: body.restaurant || myRestaurantId(user),
  };
  db.categories.push(cat);
  saveDB();
  return { status: "success", data: cat };
});

route("put", "/category/:id", ({ params, body }) => {
  const cat =
    db.categories.find((c) => c._id === params.id) || notFound("الفئة");
  if (body.name !== undefined) cat.name = body.name;
  saveDB();
  return { status: "success", data: cat };
});

route("delete", "/category/:id", ({ params }) => {
  const subIds = db.subcategories
    .filter((s) => s.category === params.id)
    .map((s) => s._id);
  db.products = db.products.filter((p) => !subIds.includes(p.subCategory));
  db.subcategories = db.subcategories.filter((s) => s.category !== params.id);
  db.categories = db.categories.filter((c) => c._id !== params.id);
  saveDB();
  return { status: "success" };
});

// ===== Subcategories =====
const toImageUrl = (image) => {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  try {
    return URL.createObjectURL(image);
  } catch {
    return undefined;
  }
};

route("get", "/subcategory/mySubcategory", ({ config }) => {
  const user = requireAuth(config);
  return {
    status: "success",
    data: restaurantSubcategories(myRestaurantId(user)).map(
      populateSubcategory
    ),
  };
});

route("get", "/subcategory/:id", ({ params }) => {
  const sub =
    db.subcategories.find((s) => s._id === params.id) ||
    notFound("الفئة الفرعية");
  return { status: "success", data: populateSubcategory(sub) };
});

route("post", "/subcategory", ({ body }) => {
  const sub = {
    _id: uid("sub"),
    name: body.name,
    category: body.category,
    image: toImageUrl(body.image) || null,
  };
  db.subcategories.push(sub);
  saveDB();
  return { status: "success", data: populateSubcategory(sub) };
});

route("put", "/subcategory/:id", ({ params, body }) => {
  const sub =
    db.subcategories.find((s) => s._id === params.id) ||
    notFound("الفئة الفرعية");
  if (body.name !== undefined) sub.name = body.name;
  if (body.category) sub.category = body.category;
  const img = toImageUrl(body.image);
  if (img) sub.image = img;
  saveDB();
  return { status: "success", data: populateSubcategory(sub) };
});

route("delete", "/subcategory/:id", ({ params }) => {
  db.products = db.products.filter((p) => p.subCategory !== params.id);
  db.subcategories = db.subcategories.filter((s) => s._id !== params.id);
  saveDB();
  return { status: "success" };
});

// ===== Products =====
route("get", "/product/myProduct", ({ config }) => {
  const user = requireAuth(config);
  return {
    status: "success",
    data: restaurantProducts(myRestaurantId(user)).map(populateProduct),
  };
});

route("get", "/product/:id", ({ params }) => {
  const p = db.products.find((x) => x._id === params.id) || notFound("المنتج");
  return { status: "success", data: populateProduct(p) };
});

route("post", "/product", ({ body }) => {
  const product = {
    _id: uid("prod"),
    name: body.name,
    price: Number(body.price) || 0,
    ingredients: Array.isArray(body.ingredients) ? body.ingredients : [],
    subCategory: body.subCategory,
  };
  db.products.push(product);
  saveDB();
  return { status: "success", data: populateProduct(product) };
});

route("put", "/product/:id", ({ params, body }) => {
  const p = db.products.find((x) => x._id === params.id) || notFound("المنتج");
  if (body.name !== undefined) p.name = body.name;
  if (body.price !== undefined) p.price = Number(body.price) || 0;
  if (Array.isArray(body.ingredients)) p.ingredients = body.ingredients;
  if (body.subCategory) p.subCategory = body.subCategory;
  saveDB();
  return { status: "success", data: populateProduct(p) };
});

route("delete", "/product/:id", ({ params }) => {
  db.products = db.products.filter((p) => p._id !== params.id);
  saveDB();
  return { status: "success" };
});

// ===== Packages =====
const normalizePackage = (body) => ({
  ...(body.name !== undefined && { name: body.name }),
  ...(body.price !== undefined && { price: Number(body.price) || 0 }),
  ...(body.durationDays !== undefined && {
    durationDays: Number(body.durationDays) || 0,
  }),
  ...(body.features !== undefined && {
    features: Array.isArray(body.features)
      ? body.features
      : String(body.features)
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
  }),
});

route("get", "/package", () => ({ status: "success", data: db.packages }));

route("get", "/package/:id", ({ params }) => {
  const pkg =
    db.packages.find((p) => p._id === params.id) || notFound("الباقة");
  return { status: "success", data: pkg };
});

route("post", "/package", ({ body }) => {
  const pkg = {
    _id: uid("pkg"),
    name: "",
    price: 0,
    durationDays: 30,
    features: [],
    ...normalizePackage(body),
  };
  db.packages.push(pkg);
  saveDB();
  return { status: "success", data: pkg };
});

route("put", "/package/:id", ({ params, body }) => {
  const pkg =
    db.packages.find((p) => p._id === params.id) || notFound("الباقة");
  Object.assign(pkg, normalizePackage(body));
  saveDB();
  return { status: "success", data: pkg };
});

route("delete", "/package/:id", ({ params }) => {
  db.packages = db.packages.filter((p) => p._id !== params.id);
  saveDB();
  return { status: "success" };
});

// ===== Users =====
route("get", "/user", ({ query }) => {
  let list = db.users.map(stripPassword);
  if (query.role && query.role !== "all") {
    list = list.filter((u) => u.role === query.role);
  }
  if (query.search) {
    const s = query.search.toString().toLowerCase();
    list = list.filter(
      (u) =>
        u.name?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s) ||
        u.phone?.includes(s)
    );
  }
  return { status: "success", results: list.length, data: list };
});

// ---------- Adapter ----------
const resolvePath = (config) => {
  let url = config.url || "";
  if (!/^https?:\/\//i.test(url)) {
    url = (config.baseURL || "").replace(/\/$/, "") + "/" + url.replace(/^\//, "");
  }
  return url
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\/api\/v1/, "")
    .split("?")[0];
};

const resolveQuery = (config) => {
  const query = {};
  const qs = (config.url || "").split("?")[1];
  if (qs) new URLSearchParams(qs).forEach((v, k) => (query[k] = v));
  Object.entries(config.params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") query[k] = v;
  });
  return query;
};

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const mockAdapter = async (config) => {
  await delay(LATENCY_MS);

  const method = (config.method || "get").toLowerCase();
  const path = resolvePath(config);
  const query = resolveQuery(config);
  const body = parseBody(config.data);

  const buildResponse = (status, data) => ({
    data,
    status,
    statusText: status < 400 ? "OK" : "Error",
    headers: { "content-type": "application/json" },
    config,
    request: { responseURL: path },
  });

  let matched = null;
  for (const r of routes) {
    if (r.method !== method) continue;
    const m = path.match(r.regex);
    if (m) {
      const params = {};
      r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
      matched = { handler: r.handler, params };
      break;
    }
  }

  try {
    if (!matched) {
      throw new HttpError(404, `Demo API: لا يوجد مسار ${method.toUpperCase()} ${path}`);
    }
    const data = matched.handler({
      params: matched.params,
      query,
      body,
      config,
    });
    // eslint-disable-next-line no-console
    console.debug(`[demo-api] ${method.toUpperCase()} ${path}`, { query, body, data });
    return buildResponse(method === "post" ? 201 : 200, clone(data));
  } catch (err) {
    const status = err instanceof HttpError ? err.status : 500;
    const response = buildResponse(status, {
      status: "fail",
      message: err.message,
    });
    // Login/logout use plain axios instances without the app's
    // interceptors, so surface the error toast here for them.
    if (path.startsWith("/auth/login")) toast.error(err.message);
    // eslint-disable-next-line no-console
    console.warn(`[demo-api] ${method.toUpperCase()} ${path} → ${status}`, err.message);
    throw new AxiosError(
      err.message,
      status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
      config,
      null,
      response
    );
  }
};
