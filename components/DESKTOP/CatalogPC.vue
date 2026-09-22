<template>
  <!-- Filter DIV -->
  <div
    @click.self="closeFilter"
    class="filtersDivPC invisible opacity-0 h-[100vh] w-screen bg-black bg-opacity-[.8] fixed top-0 left-0 z-[999] backdrop-blur-[12px] flex pt-[8rem] justify-center font-outfit"
  >
    <div
      class="h-max w-[36%] bg-white rounded-md flex flex-col px-[1rem] py-[1rem] flex gap-[2rem]"
    >
      <div class="h-max w-full flex justify-between">
        <span class="text-[1.2rem]">Filters</span>
        <span @click="closeFilter" class="text-[.8rem] cursor-pointer"
          >CLOSE</span
        >
      </div>
      <div class="h-max w-full flex flex-col gap-[1rem]">
        <div
          v-for="(dropdown, idx) in dropdowns"
          :key="idx"
          class="flex flex-col"
        >
          <label class="mb-1 text-sm font-[400]">{{ dropdown.label }}</label>
          <select
            v-model="selectedFilters[dropdown.label]"
            class="border rounded px-2 py-1 text-sm bg-[#f5f5f5]"
          >
            <option value="">All</option>
            <!-- Optional: allows clearing filter -->
            <option v-for="(item, i) in dropdown.items" :key="i" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <div class="h-max w-full pt-[1rem]">
        <button
          @click="applyFilters"
          class="text-center w-full h-max py-[1rem] text-[#f1f1f1] bg-[#111] rounded-sm"
        >
          Show Results
        </button>
      </div>
    </div>
  </div>

  <!-- <UnderDev /> -->
  <div class="p-8 max-[990px]:hidden">
    <div
      v-if="loading"
      class="loadingIcon h-[40rem] w-screen flex items-center justify-center absolute left-0 top-0 z-10"
    >
      <Icon class="text-[2rem] text-black" icon="eos-icons:bubble-loading" />
    </div>

    <div class="h-max w-full px-[4vw] flex justify-between font-outfit">
      <nav
        class="breadcrumb w-max text-[1rem] text-gray-500 py-[.4rem] rounded-md"
      >
        <a class="hover:underline" href="/">Home</a> &nbsp;> &nbsp;
        <a class="hover:underline" href="/flooring">Flooring</a>&nbsp; > &nbsp;
        <a class="hover:underline cursor-pointer" @click="goHome">{{ type }}</a
        >&nbsp; > &nbsp;
        <a class="hover:underline cursor-pointer" @click="goHome">{{
          category
        }}</a>
      </nav>
      <div
        class="h-max w-max gap-[2vw] flex items-center gap-[2vw] justify-center"
      >
        <!-- <div class="h-max w-max px-[1vw] py-[.4rem] flex items-center gap-2">
          <span class="text-sm">Filter:</span>
          <select
            v-model="sortBy"
            @change="sortProducts"
            class="border bg-[#ededed] rounded px-2 py-1 text-sm"
          >
            <option value="materialClassification">
              Material Classification
            </option>
            <option value="subCategory">Sub-Category</option>
            <option value="color">Color</option>
            <option value="price">Price</option>
          </select>
        </div> -->

        <button
          @click="openFilter"
          class="text-[.8rem] bg-[#ececec] rounded-md text-[#222] px-[.8rem] flex items-center gap-1 py-[.2rem]"
        >
          <Icon icon="material-symbols:filter-alt" class="text-[1rem]" />
          Filters
        </button>
        <CountryDetailsPC />
      </div>
    </div>

    <!-- SHOW EMPTY STATE WHEN THERE ARE NO PRODUCTS TO DISPLAY -->
    <div
      v-if="!loading && filteredProducts.length === 0 && products.length === 0"
      class="h-[40vh] w-full flex items-center justify-center"
    >
      <span class="text-[1.6rem] text-[#999] font-outfit"
        >No products available.</span
      >
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-x-[2.4rem] gap-y-[2.4rem] pt-[4rem] px-[4vw]"
    >
      <ProductCardPC
        v-for="product in filteredProducts.length > 0
          ? filteredProducts
          : products"
        :key="product.id"
        :image="product.variants[0].image"
        :price="product.variants[0].price"
        :currency="product.currency"
        :catalogTitle="product.title"
        :title="
          product.brand && product.brand.trim()
            ? product.brand
            : (product.variants?.[0]?.variantName || '').split(' ')[0]
        "
        :colors="product.variants.length"
        :description="'Product ID: ' + product.id"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue/dist/iconify.js";

import ProductCardPC from "../MOBILE/FLOORING/REUSABLES/ProductCards/ProductCardPC.vue";
import { ENABLE_SCROLL } from "./../../utils/reusables";
import UnderDev from "../MOBILE/UnderDev.vue";
import gsap from "gsap";

import CountryDetailsPC from "./../components/MOBILE/FLOORING/CountryDetailsPC.vue";

const products = ref([]);
const filteredProducts = ref([]);
const loading = ref(true);
const error = ref(null);

const type = ref("");
const category = ref("");

// URL type handling
const route = useRoute();
const router = useRouter();
const allowedTypes = [
  "custom-carpets",
  "carpets",
  "parquets",
  "vinyl",
  "gym",
  "sports",
  "raised",
  "rubber",
  "grass",
  "epoxy",
  "stone",
  "services",
  "accessories",
];

const selectedType = ref(""); // default

// Ensure selectedType comes from query param 'type' (if provided and valid).
// If no 'type' param present, add '?type=carpets' to the URL (replace, no reload).
function normalizeTypeFromQuery() {
  try {
    // If explicit 'type' param present in URL, use it strictly
    const raw = route?.query?.type ?? "";
    const q = String(raw).trim();
    if (q) {
      selectedType.value = q;
      console.debug("[CatalogPC] type from query (strict):", q);
      return;
    }

    // Fallback: prefer explicit query keys (e.g., ?raised=..., ?parquets=...)
    if (route?.query?.raised) {
      selectedType.value = "raised";
      console.debug(
        "[CatalogPC] type inferred from 'raised' query:",
        route.query.raised,
      );
      if (!route.query?.type) {
        router
          .replace({ query: { ...route.query, type: selectedType.value } })
          .catch(() => {});
      }
      return;
    }

    if (route?.query?.parquets) {
      selectedType.value = "parquets";
      console.debug(
        "[CatalogPC] type inferred from 'parquets' query:",
        route.query.parquets,
      );
      if (!route.query?.type) {
        router
          .replace({ query: { ...route.query, type: selectedType.value } })
          .catch(() => {});
      }
      return;
    }

    // default to 'carpets' and ensure URL contains it
    selectedType.value = "carpets";
    if (!route.query?.type) {
      router
        .replace({ query: { ...route.query, type: selectedType.value } })
        .catch(() => {});
      console.debug(
        "[CatalogPC] no type query - added default 'carpets' to URL",
      );
    } else {
      console.debug(
        "[CatalogPC] invalid type query value - using default 'carpets'",
      );
    }
  } catch (e) {
    console.error("[CatalogPC] normalizeTypeFromQuery error:", e?.message || e);
    selectedType.value = "carpets";
  }
}

// Generate dropdown options dynamically from products array
const dropdowns = computed(() => {
  // Helper sets to collect unique values
  const materialSet = new Set();
  const subCategorySet = new Set();
  const colorSet = new Set();
  const priceSet = new Set();

  products.value.forEach((product) => {
    // Material Classification
    if (product.material_classification) {
      materialSet.add(product.material_classification);
    }
    // Sub-Category
    if (product.subCategory) {
      subCategorySet.add(product.subCategory);
    }
    // Variants
    if (Array.isArray(product.variants)) {
      product.variants.forEach((variant) => {
        // Color
        if (variant.color) {
          colorSet.add(variant.color);
        }
        // Price Range
        if (typeof variant.price === "number") {
          if (variant.price < 100) priceSet.add("Under $100");
          else if (variant.price < 500) priceSet.add("$100-$500");
          else if (variant.price < 1000) priceSet.add("$500-$1000");
          else priceSet.add("Above $1000");
        }
      });
    }
  });

  return [
    {
      label: "Material Classification",
      items: Array.from(materialSet),
    },
    {
      label: "Sub-Category",
      items: Array.from(subCategorySet),
    },
    {
      label: "Color",
      items: Array.from(colorSet),
    },
    {
      label: "Price Range",
      items: Array.from(priceSet),
    },
  ];
});

const selectedFilters = ref({
  "Material Classification": "",
  "Sub-Category": "",
  Color: "",
  "Price Range": "",
});

function handleFilterChange(label, value) {
  selectedFilters.value[label] = value;
}

function applyFilters() {
  console.log(`[CatalogPC] 🔄 applyFilters called`);
  console.log(`[CatalogPC] selectedFilters:`, selectedFilters.value);
  console.log(`[CatalogPC] products.value.length:`, products.value.length);

  filteredProducts.value = products.value.filter((product) => {
    // Material Classification
    if (
      selectedFilters.value["Material Classification"] &&
      product.material_classification !==
        selectedFilters.value["Material Classification"]
    ) {
      return false;
    }

    // Sub-Category
    if (
      selectedFilters.value["Sub-Category"] &&
      product.subCategory !== selectedFilters.value["Sub-Category"]
    ) {
      return false;
    }

    // Variants: Color &
    if (Array.isArray(product.variants) && product.variants.length > 0) {
      const variantMatch = product.variants.some((variant) => {
        // Color
        if (
          selectedFilters.value["Color"] &&
          variant.color !== selectedFilters.value["Color"]
        ) {
          return false;
        }

        // Price Range
        if (selectedFilters.value["Price Range"]) {
          const price = variant.price;
          const range = selectedFilters.value["Price Range"];

          if (
            (range === "Under $100" && price >= 100) ||
            (range === "$100-$500" && (price < 100 || price >= 500)) ||
            (range === "$500-$1000" && (price < 500 || price >= 1000)) ||
            (range === "Above $1000" && price < 1000)
          ) {
            return false;
          }
        }

        return true; // variant passes all filters
      });

      if (!variantMatch) return false;
    }

    return true; // product passes all filters
  });

  console.log(
    `[CatalogPC] 🎯 Filtered results: ${filteredProducts.value.length} products`,
  );
  console.log(`[CatalogPC] filteredProducts:`, filteredProducts.value);
  closeFilter();
}

const openFilter = () => {
  gsap.to(".filtersDivPC", {
    autoAlpha: 1,
  });
  DISABLE_SCROLL();
};

const closeFilter = () => {
  gsap.to(".filtersDivPC", {
    autoAlpha: 0,
  });
  ENABLE_SCROLL();
};

const goHome = () => {
  router.push("/");
};

// Extracted loader so we can call it on mount and when the URL changes
async function loadProducts(typeToSend, categoryToSend = "") {
  try {
    // Normalize type and category to handle case-insensitivity and hyphen/space variations
    const normalizedType = normalizeString(typeToSend);
    const normalizedCategory = normalizeString(categoryToSend);

    // Build query string with normalized values
    let queryString = `type=${encodeURIComponent(normalizedType)}`;
    if (normalizedCategory) {
      queryString += `&category=${encodeURIComponent(normalizedCategory)}`;
    }

    console.log(
      `[CatalogPC] 🔍 Fetching products with queryString:`,
      queryString,
    );
    console.log(
      `[CatalogPC] 🔍 Original type: "${typeToSend}" -> Normalized: "${normalizedType}"`,
    );
    console.log(
      `[CatalogPC] 🔍 Original category: "${categoryToSend}" -> Normalized: "${normalizedCategory}"`,
    );

    const res = await fetch(`/api/get-products?${queryString}`);
    console.log(`[CatalogPC] 📡 Response status:`, res.status);

    const json = await res.json();
    console.log(`[CatalogPC] 📦 API Response JSON:`, json);
    console.log(`[CatalogPC] 📦 Success flag:`, json.success);
    console.log(`[CatalogPC] 📦 Data is array:`, Array.isArray(json.data));
    console.log(`[CatalogPC] 📦 Unmatched items:`, json.unmatched);

    if (json.success && Array.isArray(json.data)) {
      products.value = json.data;
      console.log(
        `[CatalogPC] ✅ Loaded ${json.data.length} products - Type: ${normalizedType}`,
      );
      console.log(`[CatalogPC] 📋 Products array:`, products.value);

      if (json.data.length > 0) {
        console.log(`[CatalogPC] First product structure:`, json.data[0]);
        console.log(`[CatalogPC] Product keys:`, Object.keys(json.data[0]));
      }
      const categories = [
        ...new Set(json.data.map((p) => p.category).filter(Boolean)),
      ];
      console.log(
        `[CatalogPC] Categories extracted from products:`,
        categories,
      );
      console.log(
        `[CatalogPC] Sample products with categories:`,
        json.data.slice(0, 3).map((p) => ({
          title: p.title,
          category: p.category,
        })),
      );
    } else {
      error.value = json.message || "Failed to load products";
      products.value = [];
      console.log(
        `[CatalogPC] ❌ Failed to load products - Type: ${normalizedType}, Error: ${error.value}`,
      );
      console.log(`[CatalogPC] API Response:`, json);
    }
  } catch (err) {
    error.value = "Error fetching products";
    products.value = [];
    console.error(`[CatalogPC] 💥 Error fetching products:`, err);
  } finally {
    loading.value = false;
    console.log(
      `[CatalogPC] 🏁 Loading finished. products.value.length:`,
      products.value.length,
    );
    handleDOMEntry("DomItem");
  }
}

function toCamelCaseWithSpaces(value) {
  return value
    .toLowerCase()
    .split(/[\s+-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeString(value) {
  // Convert to lowercase, replace hyphens/underscores with spaces, trim whitespace
  return value.toLowerCase().replace(/[-_]/g, " ").trim();
}

onMounted(async () => {
  console.log(`[CatalogPC] 🚀 Component mounted`);
  console.log(`[CatalogPC] route.query:`, route?.query);

  normalizeTypeFromQuery();

  const rawTypeQuery = route?.query?.type ?? null;
  const urlType = rawTypeQuery
    ? String(
        Array.isArray(rawTypeQuery) ? rawTypeQuery[0] : rawTypeQuery,
      ).trim()
    : null;

  const typeToSend = urlType ? urlType : selectedType.value || "carpets";

  if (urlType) selectedType.value = urlType;

  let categoryToSend = "";
  const queryKeys = Object.keys(route?.query || {});
  for (const key of queryKeys) {
    if (key !== "type") {
      const value = route.query[key];
      if (value) {
        categoryToSend = String(Array.isArray(value) ? value[0] : value);
        break;
      }
    }
  }

  console.log(`[CatalogPC] 📌 typeToSend:`, typeToSend);
  console.log(`[CatalogPC] 📌 categoryToSend:`, categoryToSend);

  /* ✅ Assign formatted values to refs */
  type.value = toCamelCaseWithSpaces(typeToSend);
  category.value = categoryToSend ? toCamelCaseWithSpaces(categoryToSend) : "";

  loading.value = true;
  await loadProducts(typeToSend, categoryToSend);
  console.log(
    `[CatalogPC] 📊 After loadProducts - products.value.length:`,
    products.value.length,
  );
});

// React to changes in the URL and refetch when 'type' changes
watch(
  () => route?.query,
  async (newQuery, oldQuery) => {
    const rawType = newQuery?.type ?? null;
    const normalized = rawType
      ? String(Array.isArray(rawType) ? rawType[0] : rawType).trim()
      : null;

    console.debug(
      "[CatalogPC] route.query changed:",
      newQuery,
      "normalized type:",
      normalized,
    );

    if (normalized) {
      if (normalized !== selectedType.value) {
        selectedType.value = normalized;

        // Extract category parameter
        let categoryToSend = "";
        const queryKeys = Object.keys(newQuery || {});
        for (const key of queryKeys) {
          if (key !== "type") {
            const value = newQuery[key];
            if (value) {
              categoryToSend = String(Array.isArray(value) ? value[0] : value);
              break;
            }
          }
        }

        loading.value = true;
        await loadProducts(normalized, categoryToSend);
      }
    } else {
      console.debug("[CatalogPC] route.query.type empty -> ignoring change");
    }
  },
);
</script>

<style></style>
