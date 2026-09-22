<template>
  <!-- Filter DIV -->
  <div
    class="filtersDiv invisible opacity-0 h-[100vh] w-screen bg-black bg-opacity-[.3] fixed top-0 left-0 z-[999] backdrop-blur-[12px] flex pt-[8rem] justify-center font-outfit"
  >
    <div
      class="h-max w-[90%] bg-white rounded-md flex flex-col px-[1rem] py-[1rem] gap-[2rem]"
    >
      <div class="h-max w-full flex justify-between">
        <span class="text-[1.8rem]">Filters</span>
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
          <label class="mb-1 text-sm font-medium">{{ dropdown.label }}</label>
          <select
            v-model="selectedFilters[dropdown.label]"
            class="border rounded px-2 py-1 text-sm bg-[#f5f5f5]"
          >
            <option value="">All</option>
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
  <div class="min-[990px]:hidden px-[2vw] relative font-outfit">
    <div
      v-if="loading"
      class="loadingIcon h-[32rem] w-screen flex items-center justify-center absolute left-0 top-0 z-10"
    >
      <Icon class="text-[2rem] text-black" icon="eos-icons:bubble-loading" />
    </div>
    <div class="h-max w-full flex justify-between items-center px-[1vw]">
      <button
        @click="openFilter"
        class="text-sm border border-black rounded-md text-black px-[2vw] flex items-center gap-1 py-[.4rem]"
      >
        Filters
        <Icon icon="material-symbols:filter-alt" class="text-[1rem]" />
      </button>
      <CurrencyDetails />
    </div>
    <div
      v-if="!loading && filteredProducts.length === 0 && products.length === 0"
      class="h-[40vh] w-full flex items-center justify-center"
    >
      <span class="text-[1.2rem] text-[#999] font-outfit"
        >No products available.</span
      >
    </div>
    <div
      v-else
      class="DomItem opacity-0 grid grid-cols-1 sm:grid-cols-1 gap-y-12 px-[1vw] pt-[2rem]"
    >
      <ProductCardMOB
        v-for="product in filteredProducts.length > 0
          ? filteredProducts
          : products"
        :key="product.id"
        :image="product.variants[0].image"
        :price="product.variants[0].price"
        :currency="product.currency"
        :catalogTitle="product.variants?.[0]?.variantName"
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
  <div class="DomItem opacity-0 pt-[8rem]">
    <FooterMOB />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { onMounted, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import CurrencyDetails from "@components/MOBILE/FLOORING/CountryDetails.vue";

import ProductCardMOB from "./REUSABLES/ProductCards/ProductCardMOB.vue";
import FooterMOB from "../FooterMOB.vue";
import gsap from "gsap";

const products = ref([]);
const filteredProducts = ref([]);
const loading = ref(true);
const error = ref(null);

/* -------------------------
   TYPE from query handling (same behavior as CatalogPC)
   ------------------------- */
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
const selectedType = ref("carpets");

function normalizeTypeFromQuery() {
  try {
    // If explicit 'type' param present in URL, use it strictly
    const rawType = route?.query?.type ?? "";
    const q = String(rawType).trim();
    if (q) {
      selectedType.value = q;
      console.debug("[CatalogMOB] type from query (strict):", q);
      return;
    }

    // Fallback: prefer explicit query keys (e.g., ?raised=..., ?parquets=..., ?gym=...)
    const queryKeys = Object.keys(route?.query || {});
    for (const key of queryKeys) {
      if (key === "type") continue;
      const lk = String(key).toLowerCase();

      // direct match
      if (allowedTypes.includes(lk)) {
        selectedType.value = lk;
        if (route.query?.type !== selectedType.value) {
          // replace with a clean query containing only the inferred type and its explicit key
          router
            .replace({
              query: { type: selectedType.value, [key]: route.query[key] },
            })
            .catch(() => {});
        }
        return;
      }

      // singular/plural flexibility
      if (allowedTypes.includes(lk + "s")) {
        selectedType.value = lk + "s";
        if (route.query?.type !== selectedType.value) {
          // replace with a clean query containing only the inferred type and its explicit key
          router
            .replace({
              query: { type: selectedType.value, [key]: route.query[key] },
            })
            .catch(() => {});
        }
        return;
      }

      if (allowedTypes.includes(lk.replace(/s$/g, ""))) {
        selectedType.value = lk.replace(/s$/g, "");
        if (route.query?.type !== selectedType.value) {
          // replace with a clean query containing only the inferred type and its explicit key
          router
            .replace({
              query: { type: selectedType.value, [key]: route.query[key] },
            })
            .catch(() => {});
        }
        return;
      }
    }

    // default to 'carpets' and ensure URL contains it
    selectedType.value = "carpets";
    if (!route.query?.type) {
      router
        .replace({ query: { ...route.query, type: selectedType.value } })
        .catch(() => {});
    } else {
    }
  } catch (e) {
    selectedType.value = "carpets";
  }
}

/* -------------------------
   Dropdowns / Filters (unchanged)
   ------------------------- */
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

    // Variants: Color & Price Range
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

  closeFilter();
}

const openFilter = () => {
  gsap.to(".filtersDiv", {
    autoAlpha: 1,
  });
  DISABLE_SCROLL();
};
const closeFilter = () => {
  gsap.to(".filtersDiv", {
    autoAlpha: 0,
  });
  ENABLE_SCROLL();
};

// Extracted loader so we can call it on mount and when the URL changes
async function loadProducts(typeToSend, categoryToSend = "") {
  try {
    // Build query string with type and category
    let queryString = `type=${encodeURIComponent(typeToSend)}`;
    if (categoryToSend) {
      queryString += `&category=${encodeURIComponent(categoryToSend)}`;
    }

    const res = await fetch(`/api/get-products?${queryString}`);
    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      products.value = json.data;
      console.log(
        `[CatalogMOB] API Response - Loaded ${json.data.length} products - Type: ${typeToSend}`,
      );
      console.log(`[CatalogMOB] Full API Response:`, json.data);
      if (json.data.length > 0) {
        console.log(`[CatalogMOB] First product structure:`, json.data[0]);
        console.log(`[CatalogMOB] Product keys:`, Object.keys(json.data[0]));
      }
      const categories = [...new Set(json.data.map((p) => p.category))];
      console.log(
        `[CatalogMOB] Categories extracted from 'category' field:`,
        categories,
      );
    } else {
      error.value = json.message || "Failed to load products";
      products.value = [];
      console.log(
        `[CatalogMOB] Failed to load products - Type: ${typeToSend}, Error: ${error.value}`,
      );
      console.log(`[CatalogMOB] API Response:`, json);
    }
  } catch (err) {
    error.value = "Error fetching products";
    products.value = [];
  } finally {
    loading.value = false;
    handleDOMEntry("DomItem");
  }
}

onMounted(async () => {
  normalizeTypeFromQuery();

  // compute URL 'type' strictly; fallback to window.location.search if route misses it
  let rawTypeQuery = route?.query?.type ?? null;
  if (!rawTypeQuery && typeof window !== "undefined") {
    const sp = new URLSearchParams(window.location.search || "");
    const fromUrl = sp.get("type");
    if (fromUrl) rawTypeQuery = fromUrl;
  }

  const urlType = rawTypeQuery
    ? String(
        Array.isArray(rawTypeQuery) ? rawTypeQuery[0] : rawTypeQuery,
      ).trim()
    : null;

  const typeToSend = urlType ? urlType : selectedType.value || "carpets";

  // ensure selectedType follows URL exactly when present
  if (urlType) selectedType.value = urlType;

  // Extract category parameter from query (e.g., ?carpet=Wall+to+Wall)
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

  console.debug(
    "[CatalogMOB] initial fetch - route.query:",
    route?.query,
    "urlType:",
    urlType,
    "categoryToSend:",
    categoryToSend,
    "using:",
    typeToSend,
  );

  loading.value = true;
  await loadProducts(typeToSend, categoryToSend);
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
      "[CatalogMOB] route.query changed:",
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
      console.debug("[CatalogMOB] route.query.type empty -> ignoring change");
    }
  },
);
</script>

<style></style>
