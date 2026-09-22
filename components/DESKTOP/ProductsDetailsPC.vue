<template>
  <div
    @click.self="closeForm"
    class="orderMethodFormPC opacity-0 invisible h-[100vh] w-screen bg-[#000] backdrop-blur-[8px] z-[999] bg-opacity-[.9] fixed top-0 flex items-center justify-center font-outfit"
  >
    <div
      class="h-max w-[32vw] flex flex-col justify-between gap-[4rem] border-[.1rem] border-[#fff9] rounded-md px-[2vw] pt-[2.6rem] pb-[1.8rem] relative bg-black bg-opacity-[1]"
    >
      <div class="h-max w-full flex justify-between items-start">
        <span class="text-white text-[2rem] leading-[2.4rem] w-[80%]">{{
          requestType === "getQuote" ? "Get Quotes by" : "Request Samples by:"
        }}</span>
        <Icon
          @click="closeForm"
          class="text-[2rem] text-[#f1f1f1] absolute top-[3%] right-[2%] cursor-pointer"
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
          class="w-full border-[.1rem] border-[#fff9] rounded-md text-left pl-[2vw] text-[1.2rem] text-white py-[1rem] bg-green-600 flex justify-start items-center pr-[2.4vw] gap-[1vw] hover:bg-opacity-[.7]"
        >
          <Icon class="text-[1.8rem]" icon="ic:baseline-whatsapp" />Whatsapp
        </a>
        <a
          class="w-full border-[.1rem] border-[#fff9] rounded-md text-left pl-[2vw] text-[1.2rem] text-white py-[1rem] bg-red-600 flex justify-start items-center pr-[2.4vw] gap-[1vw] hover:bg-opacity-[.7]"
          :href="
            requestType === 'getQuote' ? emailLinkGetQuote : emailLinkReqSample
          "
        >
          <Icon class="text-[1.8rem]" icon="material-symbols:mail" />Mail
        </a>
      </div>
    </div>
  </div>
  <div
    class="loadingIcon h-full w-full flex items-center justify-center absolute left-0 top-0"
  >
    <Icon class="text-[2rem] text-black" icon="eos-icons:bubble-loading" />
  </div>
  <div
    class="w-full overflow-x-auto whitespace-nowrap py-[1rem] font-outfit bg-[#f1f1f1] border-[#999] border-y-[1px] px-[9vw] hide-scrollbar"
  >
    <div class="inline-flex gap-[8vw] px-[1rem] min-w-max text-[#333]">
      <a
        class="hover:underline underline-offset-[.4rem]"
        href="/flooring/carpets/details"
        >Carpets</a
      >
      <a
        class="hover:underline underline-offset-[.4rem]"
        href="/flooring/parquets/details"
        >Parquets</a
      >
      <a
        class="hover:underline underline-offset-[.4rem]"
        href="/flooring/pvc/details"
        >Vinyl Flooring</a
      >
      <a
        class="hover:underline underline-offset-[.4rem]"
        href="/flooring/rubber-flooring/details"
        >Rubber Flooring</a
      >
      <a
        class="hover:underline underline-offset-[.4rem]"
        href="/flooring/raised/details"
      >
        Artificial Grass</a
      >
      <a
        class="hover:underline underline-offset-[.4rem]"
        href="/flooring/grass-flooring/details"
        >Raised Flooring</a
      >
    </div>
  </div>

  <div
    class="max-[990px]:hidden font-outfit h-max w-full px-[6vw] py-[2rem] flex justify-between"
  >
    <!-- Left: Main Image with Overlay -->
    <div class="w-[40%] h-max flex flex-col pt-[rem]">
      <nav class="breadcrumb text-[1rem] text-gray-500 pb-[1rem] pt-[rem]">
        <a class="hover:underline" href="/">Home</a> &nbsp;> &nbsp;
        <a class="hover:underline" href="/flooring">Flooring</a>&nbsp; > &nbsp;
        <a class="hover:underline" href="/flooring/catalog">Catalog</a>
        &nbsp;>&nbsp;
        <span class="text-[#333] font-medium DomItem opacity-0">
          {{ product?.title ? capitalizeWords(product.title) : "" }}
        </span>
      </nav>
      <div class="relative select-none">
        <img
          v-if="product?.image"
          :src="product.image"
          alt="Product Image"
          class="w-full h-[28rem] object-cover rounded-md"
          @load="onImageLoad"
          @error="imageLoading = false"
        />
        <div
          v-if="!imageLoading"
          class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white bg-black opacity-[.1]"
        ></div>
        <span
          class="text-[4rem] opacity-[0] overlayText absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[9]"
          >Floorsir</span
        >
      </div>
      <div class="DomItem opacity-1 h-max w-full flex flex-col">
        <div class="h-max w-full px-[vw] pt-[1.6rem] DomItem opacity-0">
          <span><strong>Colors: </strong></span>
        </div>
        <div
          v-if="product.variants && product.variants.length > 0"
          class="flex gap-[1vw] flex-wrap pl-[vw] py-[1rem]"
        >
          <div
            v-for="(variant, index) in product.variants"
            :key="index"
            class="w-20 h-20 rounded-md border cursor-pointer overflow-hidden shrink-0 transition"
            :class="{
              'border-black ring-2 ring-black': variant.SKU === route.query.sku,
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
    </div>

    <!-- Right: Product Details -->
    <div class="w-[55%] px-[1vw] flex flex-col gap-[0rem] pt-[2rem]">
      <div
        class="DomItem opacity-0 h-max w-full flex flex-wrap gap-[1rem] items-start"
      >
        <h1
          class="text-[2rem] font-[500] tracking-[-.05rem] flex-1 min-w-0 break-words leading-tight"
        >
          {{ displayProductName }}
        </h1>
        <h2 class="text-[1.4rem] font-[600] text-red-600 shrink-0">
          From {{ converted }} m&sup2;
        </h2>
      </div>

      <!-- Description -->
      <div class="pt-[1rem]">
        <p
          class="DomItem opacity-0 w-[80%] text-[1rem] text-[#444] leading-relaxed"
          v-if="product?.description?.trim()"
        >
          {{ showMoreDescription ? product.description : truncatedDescription }}
          <span v-if="shouldShowMore && !showMoreDescription">...</span>
        </p>
        <button
          v-if="shouldShowMore"
          @click="showMoreDescription = !showMoreDescription"
          class="DomItem opacity-0 text-blue-600 underline underline-offset-[.2rem] mt-2"
        >
          {{ showMoreDescription ? "View Less" : "View More" }}
        </button>
      </div>
      <!-- Assistance -->
      <div class="flex gap-2 pt-[2rem] DomItem opacity-0">
        <span class="text-[#999]">Need Assistance? </span
        ><a
          href="tel:+97333008801"
          class="text-blue-600 underline underline-offset-[.2rem] flex items-center gap-[.4vw]"
          >Talk to our expert<Icon
            class="text-[1.2rem]"
            icon="tdesign:user-talk-1"
          />
        </a>
      </div>
      <!-- Buttons -->
      <div class="h-max w-full flex gap-[2vw] pt-[3rem] DomItem opacity-0">
        <button
          class="w-[50%] bg-[#111] border-[.1rem] border-black text-[1.2rem] text-[#f1f1f1] px-[4vw] py-[1.1rem] shadow-md hover:bg-[#000] hover:translate-y-[-2%] duration-[.2s] rounded-md uppercase tracking-[.1rem]"
        >
          Add To Cart
        </button>
        <button
          @click="bringForm('getQuote')"
          class="w-[50%] bg-[#fff] border-[.1rem] border-[#999] text-[1.2rem] text-black px-[4vw] py-[1rem] shadow-md hover:bg-[#f1f1f1] hover:translate-y-[-2%] duration-[.2s] rounded-md uppercase tracking-[.1rem]"
        >
          Get Quote
        </button>
      </div>

      <div class="flex flex-col gap-2 py-[3rem] DomItem opacity-0">
        <!-- Full Description Toggle -->
        <div
          @click="showDescription = !showDescription"
          class="h-max w-full border-y-[1.2px] border-[#999] py-[1.2rem] uppercase flex justify-between cursor-pointer"
        >
          <span>Show Full Description</span>
          <span class="text-[1rem]">{{ showDescription ? "-" : "+" }}</span>
        </div>
        <div v-if="showDescription" class="text-[#444] leading-[1.6] py-3 px-1">
          {{ product?.description || "No description available." }}
        </div>

        <!-- Technical Specs Toggle -->
        <div
          @click="showSpecs = !showSpecs"
          class="h-max w-full border-b-[1.2px] border-[#999] py-[1.2rem] uppercase flex justify-between cursor-pointer"
        >
          <span>Show Technical Specifications</span>
          <span class="text-[1rem]">{{ showSpecs ? "-" : "+" }}</span>
        </div>
        <div
          v-if="showSpecs"
          class="px-[1vw] pt-4 text-[.95rem] text-[#444] space-y-2"
        >
          <!-- Text Fields -->

          <div
            v-if="product.brand"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Brand</span>
            <span class="font-medium">{{ product.brand }}</span>
          </div>

          <div
            v-if="product.material"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Material</span>
            <span class="font-medium">{{ product.material }}</span>
          </div>
          <div
            v-if="product.material_classification"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Material Classification</span>
            <span class="font-medium">{{
              product.material_classification
            }}</span>
          </div>
          <div
            v-if="product.dimension"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Dimension</span>
            <span class="font-medium">{{ product.dimension }}</span>
          </div>
          <div
            v-if="product.thickness_mm"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Thickness (mm)</span>
            <span class="font-medium">{{ product.thickness_mm }}</span>
          </div>
          <div
            v-if="product.origin"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Origin</span>
            <span class="font-medium">{{ product.origin }}</span>
          </div>
          <div
            v-if="product.warranty"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Warranty</span>
            <span class="font-medium">{{ product.warranty }}</span>
          </div>

          <div
            v-if="product.density_gsm"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Density (GSM)</span>
            <span class="font-medium">{{ product.density_gsm }}</span>
          </div>

          <div
            v-if="product.wear_layer"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Wear Layer</span>
            <span class="font-medium">{{ product.wear_layer }}</span>
          </div>

          <!-- Boolean Fields -->
          <div
            v-if="product.scratch_resistant !== undefined"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Scratch Resistant</span>
            <span class="font-medium">{{
              product.scratch_resistant ? "Yes" : "No"
            }}</span>
          </div>
          <div
            v-if="product.uv_resistant !== undefined"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">UV Resistant</span>
            <span class="font-medium">{{
              product.uv_resistant ? "Yes" : "No"
            }}</span>
          </div>
          <div
            v-if="product.water_resistance !== undefined"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Water Resistance</span>
            <span class="font-medium">{{
              product.water_resistance ? "Yes" : "No"
            }}</span>
          </div>
          <div
            v-if="product.stain_resistance !== undefined"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Stain Resistance</span>
            <span class="font-medium">{{
              product.stain_resistance ? "Yes" : "No"
            }}</span>
          </div>
          <div
            v-if="product.antistatic !== undefined"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Antistatic</span>
            <span class="font-medium">{{
              product.antistatic ? "Yes" : "No"
            }}</span>
          </div>
          <div
            v-if="product.slip_resistant !== undefined"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Slip Resistant</span>
            <span class="font-medium">{{
              product.slip_resistant ? "Yes" : "No"
            }}</span>
          </div>
          <div
            v-if="product.fire_retardant !== undefined"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Fire Retardant</span>
            <span class="font-medium">{{
              product.fire_retardant ? "Yes" : "No"
            }}</span>
          </div>
          <div
            v-if="product.antibacterial !== undefined"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Antibacterial</span>
            <span class="font-medium">{{
              product.antibacterial ? "Yes" : "No"
            }}</span>
          </div>
          <div
            v-if="product.pet_friendly !== undefined"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Pet Friendly</span>
            <span class="font-medium">{{
              product.pet_friendly ? "Yes" : "No"
            }}</span>
          </div>
          <div
            v-if="product.sound_insulation !== undefined"
            class="flex justify-between border-b pb-2 text-[#444]"
          >
            <span class="text-[#666]">Sound Insulation</span>
            <span class="font-medium">{{
              product.sound_insulation ? "Yes" : "No"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterPC class="DomItem opacity-0" />
</template>

<script setup>
import {
  handleAutoAlpha,
  handleDOMEntry,
  handleImageLoad,
} from "./../../../utils/gsapUtils";
import { Icon } from "@iconify/vue";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import gsap from "gsap";
import FooterPC from "./FooterPC.vue";
import useUserStore from "../../../stores/user";

const route = useRoute();
const router = useRouter();

const requestType = ref("");
const product = ref({});
const imageLoading = ref(true);
const error = ref(null);
const id = route.params.id;

const showDescription = ref(false);
const showSpecs = ref(false);
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

// WhatsApp messages with product link
const whatsappMessageGetQuote = `Hello, I would like to get a quotation for this product:\n\nhttps://woltiz.com/flooring/catalog/${id}\n\n(Please do not change this message as it is required for the enquiry to be sent.)`;

const whatsappMessageReqSample = `Hello, I would like to request a sample of this product:\n\nhttps://woltiz.com/flooring/catalog/${id}\n\n(Please do not change this message as it is required for the enquiry to be sent.)`;

const whatsappLinkGetQuote = `https://wa.me/97333008801?text=${encodeURIComponent(
  whatsappMessageGetQuote,
)}`;

const whatsappLinkReqSample = `https://wa.me/97333008801?text=${encodeURIComponent(
  whatsappMessageReqSample,
)}`;

// Email messages with mailto link
const emailMessageGetQuote = `Hello,

I would like to request a quotation for this product: https://woltiz.com/flooring/catalog/${id}

To help with the estimate, here are some initial details:
 * Approximate Area Size: [e.g., 50 sq meters]
 * Location/Area: [e.g., Adliya, Manama]

Thank you,
[Customer Name]`;

const emailMessageReqSample = `Hello,

I would like to request a sample of this product: https://woltiz.com/flooring/catalog/${id}

Please find my delivery details below:
 * Full Name: [Enter Your Full Name]
 * Delivery Address: [Enter Your Full Address]
 * Contact Number: [Enter Your Phone Number]

Thank you,
[Customer's Name]`;

const emailLinkGetQuote = `mailto:neil@gmail.com?subject=Product Enquiry&body=${encodeURIComponent(
  emailMessageGetQuote,
)}`;

const emailLinkReqSample = `mailto:neil@gmail.com?subject=Product Enquiry&body=${encodeURIComponent(
  emailMessageReqSample,
)}`;

const closeForm = () => handleAutoAlpha("orderMethodFormPC", 0);
const bringForm = (req) => {
  requestType.value = req;
  handleAutoAlpha("orderMethodFormPC", 1);
};

const onImageLoad = () => {
  imageLoading.value = false;
  setTimeout(() => {
    handleAutoAlpha("loadingIcon", 0);
    handleImageLoad("productIMG");
    handleDOMEntry("DomItem");
  }, 1000);
  setTimeout(() => handleAutoAlpha("overlayText", 0.2), 1400);
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

// Capitalize each word in the string
function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

const goToVariantBySKU = (sku) => {
  if (!sku) return;
  window.location.href = `/flooring/catalog/${id}?sku=${sku}`;
};

// Convert string to hyphenated format for URL
function hyphenateName(name) {
  return name
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim()
    .split(/\s+/)
    .join("-");
}

// Navigate to a variant product
const goToVariant = (variantId) => {
  if (variantId && variantId !== parseInt(route.params.id)) {
    router.push(`/flooring/catalog/${variantId}`);
  }
};

// Fetch product and its variants
const fetchProduct = async () => {
  if (!id || isNaN(id)) {
    error.value = "Invalid product ID.";
    return;
  }
  try {
    const sku = route.query.sku || "";
    const res = await $fetch(`/api/getProductByID?id=${id}&sku=${sku}`);
    if (res.success) {
      const fetchedProduct = res.product;
      product.value = fetchedProduct;
      const firstVariant = fetchedProduct.variants?.[0];
      const currentSKU = route.query.sku;
      if (!currentSKU && firstVariant?.SKU) {
        router.replace({ path: route.path, query: { sku: firstVariant.SKU } });
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

// (Optional) Add scrollTrigger only if needed for performance

onMounted(() => {
  if (window.innerWidth < 990) return;
  fetchProduct();
});

watch(() => route.params.id, fetchProduct);
</script>

<style scoped>
.floatingBarMOB {
  transition: all 2s ease;
}
</style>
<style scoped>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
