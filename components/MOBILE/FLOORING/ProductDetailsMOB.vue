<template>
  <!-- ORDER METHODS DIV -->
  <div
    @click.self="closeForm"
    class="min-[990px]:hidden orderMethodFormMOB opacity-0 invisible h-[100vh] w-screen bg-[#222] z-[999] bg-opacity-[1] fixed top-0 flex items-center justify-center font-outfit"
  >
    <div
      class="h-max w-[90vw] flex flex-col justify-between gap-[4rem] border-[.1rem] rounded-md px-[3vw] pt-[3.2rem] pb-[1.8rem] relative"
    >
      <div class="h-max w-full flex justify-between items-start">
        <span class="text-white text-[2rem] leading-[2.4rem] w-[80%]">{{
          requestType === "getQuote" ? "Get Quotes by" : "Request Samples by:"
        }}</span>
        <Icon
          @click="closeForm"
          class="text-[2rem] text-[#f1f1f1] absolute top-[3%] right-[2%]"
          icon="material-symbols-light:cancel-outline-rounded"
        />
      </div>
      <div class="h-max w-full flex flex-col justify-center gap-[1rem]">
        <a
          :href="
            requestType === 'getQuote'
              ? whatsappLinkGetQuote
              : whatsappLinkReqSample
          "
          target="_blank"
          rel="noopener"
          class="w-full border-[.1rem] rounded-md text-left pl-[4vw] text-[1.2rem] text-white py-[1rem] bg-green-500 flex justify-between items-center pr-[2.4vw]"
          >Whatsapp
          <Icon class="text-[1.8rem]" icon="ic:baseline-whatsapp" /> </a
        ><a
          class="w-full border-[.1rem] rounded-md text-left pl-[4vw] text-[1.2rem] text-white py-[1rem] bg-red-500 flex justify-between items-center pr-[2.4vw]"
          :href="
            requestType === 'getQuote' ? emailLinkGetQuote : emailLinkReqSample
          "
          >Mail <Icon class="text-[1.8rem]" icon="material-symbols:mail" />
        </a>
      </div>
    </div>
  </div>

  <!--  -->
  <div
    class="min-[990px]:hidden loadingIcon h-full w-full flex items-center justify-center absolute left-0 top-0"
  >
    <Icon class="text-[2rem] text-black" icon="eos-icons:bubble-loading" />
  </div>

  <!-- MAIN -->
  <div class="min-[990px]:hidden font-outfit w-full pt-[rem] flex flex-col">
    <!-- Scrollable container -->
    <div
      class="DomItem opacity-0 w-full overflow-x-auto whitespace-nowrap py-[.8rem] bg-[#f1f1f1] scrollbar-hide"
    >
      <!-- Inline-flex children that overflow horizontally -->
      <div class="inline-flex gap-[8vw] px-[1rem] min-w-max text-[#333]">
        <a href="/flooring/carpets/details">Carpets</a>
        <a href="/flooring/parquets/details">Parquets</a>
        <a href="/flooring/pvc/details">Vinyl Flooring</a>
        <a href="/flooring/raised/details">Raised Flooring</a>
      </div>
    </div>

    <nav
      class="breadcrumb DomItem opacity-0 text-[1rem] text-gray-500 px-[2vw] rounded-md w-max py-[2rem]"
    >
      <a
        class="bg-[#f9f9f9] px-[2vw] py-[.4rem] rounded-md"
        href="/flooring/catalog"
        >Catalog</a
      >
      &nbsp;>&nbsp;
      <span
        class="DomItem opacity-0 bg-[#f9f9f9] px-[2vw] py-[.4rem] rounded-md"
      >
        {{ displayProductName }}
      </span>
    </nav>
    <!-- Product Title and Price -->
    <div class="DomItem opacity-0 px-[4vw] pb-[1rem] flex flex-col gap-[.8rem]">
      <h1 class="heading text-[2rem] w-[80%] font-[500] leading-[2.2rem]">
        {{ displayProductName }}
      </h1>
      <h2 class="pricing text-[1.2rem] font-[600] text-red-600">
        From {{ converted }} m&sup2;
      </h2>
    </div>

    <!-- Main Image -->
    <div class="w-full relative select-none pt-[rem]">
      <img
        v-if="product?.image"
        :src="product.image"
        alt="Product Image"
        class="DomItem opacity-0 w-full h-[18rem] object-cover"
        @load="onImageLoad"
        @error="imageLoading = false"
      />

      <div
        v-if="!imageLoading"
        class="product_Overlay absolute top-0 left-0 w-full h-full px-[4vw] py-[.8rem] flex items-center justify-center text-white"
      >
        <span class="overlayText opacity-[0] text-[3.2rem] text-black">
          Floorsir
        </span>
      </div>
    </div>

    <!-- Color Variants -->
    <div class="DomItem opacity-0 h-max w-full flex flex-col">
      <div class="h-max w-full px-[4vw] pt-[1rem]">
        <span><strong>Colors: </strong></span>
      </div>
      <div
        v-if="product.variants && product.variants.length > 0"
        class="flex gap-3 flex-wrap pl-[4vw] py-[1rem]"
      >
        <div
          v-for="(variant, index) in product.variants"
          :key="index"
          class="w-16 h-16 rounded-md border cursor-pointer overflow-hidden shrink-0 transition"
          :class="{
            'border-[#222] ring-1 ring-black': variant.SKU === route.query.sku,
            'border-gray-300 hover:ring-2 hover:ring-gray-400':
              variant.SKU !== route.query.sku,
          }"
          @click="goToVariantBySKU(variant.SKU)"
        >
          <img
            :src="variant.image"
            alt="Variant Thumbnail"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Product Description -->
    <div class="px-[vw] pt-[.4rem]">
      <div class="flex flex-col gap-[.6rem] DomItem opacity-0 px-[4vw]">
        <p v-if="product?.description?.trim()" class="text-[1rem]">
          {{ showMoreDescription ? product.description : truncatedDescription }}
          <span v-if="shouldShowMore && !showMoreDescription">...</span>
        </p>
        <button
          v-if="shouldShowMore"
          @click="showMoreDescription = !showMoreDescription"
          class="text-[0.95rem] text-blue-600 underline underline-offset-[.2rem] self-start text-left"
        >
          {{ showMoreDescription ? "View less" : "View more" }}
        </button>
        <div v-else class="flex justify-center items-center">
          <Icon
            class="text-[1rem] text-gray-500"
            icon="eos-icons:bubble-loading"
          />
        </div>
      </div>
      <!-- Action Buttons -->
      <div
        class="z-[9] DomItem opacity-0 floatingBarMOB bottom-[1rem] left-0 w-full flex justify-center gap-[4vw] pt-[2.4rem]"
      >
        <button
          @click="bringForm('getQuote')"
          class="z-[99] py-[1rem] text-black rounded-md w-[44%] bg-[#fff] border-black border-[.1rem] shadow-lg"
        >
          Get Quote
        </button>
        <button
          @click="addToCart"
          class="z-[99] py-[1rem] text-[#f1f1f1] rounded-md w-[44%] bg-[#222] border-black border-[.1rem] shadow-lg"
        >
          Add To Cart
        </button>
      </div>
      <!-- Assistance -->

      <div class="DomItem h-max w-full pt-[2rem] opacity-0 px-[4vw]">
        <div
          @click="technicalSpecExpanded = !technicalSpecExpanded"
          class="pt-[2rem] pb-[.5rem] px-[1vw] border-b-[#ededed] border-b-[.8px] text-[#333] font-medium w-full flex justify-between"
        >
          <span>Technical Specifications</span>
          <span>
            <span v-if="technicalSpecExpanded">-</span>
            <span v-else>+</span>
          </span>
        </div>

        <div
          v-if="technicalSpecExpanded"
          class="px-[1vw] pt-4 text-[.95rem] text-[#444] space-y-2"
        >
          <div
            v-if="product.thickness"
            class="flex justify-between border-b pb-2"
          >
            <span class="text-[#666]">Thickness</span>
            <span class="font-medium">{{ product.thickness }}</span>
          </div>
          <div v-if="product.size" class="flex justify-between border-b pb-2">
            <span class="text-[#666]">Size</span>
            <span class="font-medium">{{ product.size }}</span>
          </div>
          <div
            v-if="product.material"
            class="flex justify-between border-b pb-2"
          >
            <span class="text-[#666]">Material</span>
            <span class="font-medium">{{ product.material }}</span>
          </div>
          <div v-if="product.color" class="flex justify-between border-b pb-2">
            <span class="text-[#666]">Color</span>
            <span class="font-medium">{{ product.color }}</span>
          </div>
          <div
            v-if="product.wear_layer"
            class="flex justify-between border-b pb-2"
          >
            <span class="text-[#666]">Wear Layer</span>
            <span class="font-medium">{{ product.wear_layer }}</span>
          </div>
          <div
            v-if="product.fire_rating"
            class="flex justify-between border-b pb-2"
          >
            <span class="text-[#666]">Fire Rating</span>
            <span class="font-medium">{{ product.fire_rating }}</span>
          </div>
          <div
            v-if="product.acoustic"
            class="flex justify-between border-b pb-2"
          >
            <span class="text-[#666]">Acoustic</span>
            <span class="font-medium">{{ product.acoustic }}</span>
          </div>
          <div v-if="product.origin" class="flex justify-between border-b pb-2">
            <span class="text-[#666]">Country of Origin</span>
            <span class="font-medium">{{ product.origin }}</span>
          </div>
          <div
            v-if="product.installation"
            class="flex justify-between border-b pb-2"
          >
            <span class="text-[#666]">Installation Method</span>
            <span class="font-medium">{{ product.installation }}</span>
          </div>
        </div>
      </div>

      <!-- Customers Also Viewed -->
      <div class="DomItem h-max w-full opacity-0 px-[4vw]">
        <div
          @click="viewedExpanded = !viewedExpanded"
          class="pt-[2rem] pb-[.5rem] px-[1vw] border-b-[#ededed] border-b-[.8px] text-[#333] font-medium w-full flex justify-between"
        >
          <span>Customers Also Viewed</span>
          <span>
            <span v-if="viewedExpanded">-</span>
            <span v-else>+</span>
          </span>
        </div>

        <div
          v-if="viewedExpanded"
          class="px-[1vw] pt-4 text-[.95rem] text-[#444]"
        >
          <p v-if="product.viewed">{{ product.viewed }}</p>
          <p v-else class="text-[#888] italic">
            No related products available.
          </p>
        </div>
      </div>

      <!-- Accessories -->
      <div class="DomItem h-max w-full opacity-0 px-[4vw] pb-[4rem]">
        <div
          @click="accessoriesExpanded = !accessoriesExpanded"
          class="pt-[2rem] pb-[.5rem] px-[1vw] border-b-[#ededed] border-b-[.8px] text-[#333] font-medium w-full flex justify-between"
        >
          <span>Accessories</span>
          <span>
            <span v-if="accessoriesExpanded">-</span>
            <span v-else>+</span>
          </span>
        </div>

        <div
          v-if="accessoriesExpanded"
          class="px-[1vw] pt-4 text-[.95rem] text-[#444]"
        >
          <p v-if="product.accessories">{{ product.accessories }}</p>
          <p v-else class="text-[#888] italic">
            No accessories found for this product.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="footerMOB opacity-0">
    <FooterMOB />
  </div>
</template>

<script setup>
import {
  bringOpacity,
  handleAutoAlpha,
  handleDOMEntry,
  handleImageLoad,
} from "./../../../utils/gsapUtils";
import { Icon } from "@iconify/vue";

import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ref, onMounted, watch, toRaw, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import FooterMOB from "../FooterMOB.vue";
import useUserStore from "../../../stores/user";

import gsap from "gsap";

const route = useRoute();
const router = useRouter();

const requestType = ref("");
const product = ref({});
const imageLoading = ref(true);
const error = ref(null);
const technicalSpecExpanded = ref(false);
const viewedExpanded = ref(false);
const accessoriesExpanded = ref(false);
const id = route.params.id;
const showMoreDescription = ref(false);
const descriptionMaxWords = 40;

const descriptionWords = computed(() => {
  const text = product.value?.description?.trim() || "";
  return text ? text.split(/\s+/).filter(Boolean) : [];
});

const shouldShowMore = computed(
  () => descriptionWords.value.length > descriptionMaxWords,
);

const truncatedDescription = computed(() =>
  descriptionWords.value.slice(0, descriptionMaxWords).join(" "),
);

// WhatsApp & Email links with product URL
const productUrl = window.location.href;
const whatsappLinkGetQuote = `https://wa.me/97333008801?text=${encodeURIComponent(
  `Hello, I would like to get a quotation for this product:\n\n${productUrl}\n\n(Please do not change this message as it is required for the enquiry to be sent.)`,
)}`;

const whatsappLinkReqSample = `https://wa.me/97333008801?text=${encodeURIComponent(
  `Hello, I would like to request a sample of this product:\n\n${productUrl}\n\n(Please do not change this message as it is required for the enquiry to be sent.)`,
)}`;

const emailLinkGetQuote = `mailto:neil@gmail.com?subject=Product Enquiry&body=${encodeURIComponent(
  `Hello,\n\nI would like to request a quotation for this product: ${productUrl}\n\nTo help with the estimate, here are some initial details:\n * Approximate Area Size: [e.g., 50 sq meters]\n * Location/Area: [e.g., Adliya, Manama]\n\nThank you,\n[Customer Name]`,
)}`;

const emailLinkReqSample = `mailto:neil@gmail.com?subject=Product Enquiry&body=${encodeURIComponent(
  `Hello,\n\nI would like to request a sample of this product: ${productUrl}\n\nPlease find my delivery details below:\n * Full Name: [Enter Your Full Name]\n * Delivery Address: [Enter Your Full Address]\n * Contact Number: [Enter Your Phone Number]\n\nThank you,\n[Customer's Name]`,
)}`;

const closeForm = () => handleAutoAlpha("orderMethodFormMOB", 0);

const bringForm = (req) => {
  requestType.value = req;
  handleAutoAlpha("orderMethodFormMOB", 1);
};

const goToVariantBySKU = (sku) => {
  if (!sku) return;
  window.location.href = `/flooring/catalog/${id}?sku=${sku}`;
};

const userStore = useUserStore();

const userCountry = computed(() => userStore.preference.country || null);

const converted = computed(() => {
  if (!userCountry.value) {
    return {
      currency: product.value.currency,
      price: product.value.price,
    };
  }
  const result = convertCurrency(
    product.value.price,
    product.value.currency,
    userCountry.value,
  );
  return result;
});

const onImageLoad = () => {
  imageLoading.value = false;
  setTimeout(() => {
    handleAutoAlpha("loadingIcon", 0);
    handleImageLoad("productIMG");
    handleDOMEntry("DomItem");
  }, 1000);
  setTimeout(() => {
    handleAutoAlpha("overlayText", 0.2);
    handleAutoAlpha("footerMOB", 1);
  }, 1400);
};

function addToCart() {
  const selectedVariant = getSelectedVariant.value;
  const sku = selectedVariant ? String(toRaw(selectedVariant).SKU || "") : "";
  if (!sku) {
    console.warn("No SKU available, cannot add to cart.");
    return;
  }

  // check existing by SKU (case-insensitive)
  const exists = userStore.cart.some(
    (c) => String(c.sku || c.squ || "").toLowerCase() === sku.toLowerCase(),
  );
  if (exists) {
    return; // already in cart
  }

  const item = {
    id: product.value.id,
    name: product.value.product_name || "",
    description: product.value.sku || "",
    image: selectedVariant?.image || product.value.image || "",
    price: product.value.price || 0,
    currency: product.value.currency,
    sku,
  };

  console.log(item);
  userStore.cart.push(item);
}

function capitalizeWords(str) {
  if (!str || typeof str !== "string") return "";
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Navigate to a variant product
const goToVariant = (variantId) => {
  if (variantId && variantId !== parseInt(route.params.id)) {
    router.push(`/flooring/catalog/${variantId}`);
  }
};
const getSelectedVariant = computed(() => {
  const sku = route.query.sku?.toLowerCase();
  if (!sku || !product.value || !Array.isArray(product.value.variants))
    return null;

  return product.value.variants.find(
    (variant) => variant.SKU?.toLowerCase() === sku,
  );
});

const displayProductName = computed(() => {
  const baseName = product.value?.product_name || product.value?.title || "";
  const variantName =
    getSelectedVariant.value?.variantName ||
    getSelectedVariant.value?.variant_name ||
    getSelectedVariant.value?.name ||
    "";

  if (!baseName) return "";
  if (!variantName) return capitalizeWords(baseName);

  return `${capitalizeWords(baseName)} - ${capitalizeWords(variantName)}`;
});

// Fetch product and its variants
const fetchProduct = async () => {
  if (!id || isNaN(id)) {
    error.value = "Invalid product ID.";
    return;
  }

  try {
    // ✅ Always include SKU if present
    const sku = route.query.sku || "";
    const res = await $fetch(`/api/getProductByID?id=${id}&sku=${sku}`);

    if (res.success) {
      const fetchedProduct = res.product;
      product.value = fetchedProduct;
      const firstVariant = fetchedProduct.variants?.[0];
      const currentSKU = route.query.sku;

      if (!currentSKU && firstVariant?.SKU) {
        // Redirect to same page with ?sku=[first SKU]
        router.replace({
          path: route.path,
          query: { sku: firstVariant.SKU },
        });
      }
    } else {
      error.value = res.message || "Failed to fetch product.";
    }
  } catch (err) {
    error.value = err.message || "Error fetching product.";
  } finally {
    imageLoading.value = false;
  }
};

onMounted(() => {
  if (window.innerWidth >= 990) return;
  fetchProduct();
});
watch(() => route.params.id, fetchProduct);
</script>

<style scoped>
.floatingBarMOB {
  transition: all 2s ease;
}
</style>
