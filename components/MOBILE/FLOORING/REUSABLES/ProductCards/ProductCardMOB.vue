<template>
  <div
    class="bg-white rounded-md shadow hover:shadow-lg border border-[#999] transition duration-300 cursor-pointer font-outfit overflow-hidden flex"
    @click="goToProduct"
  >
    <img :src="image" alt="Product Image" class="w-[44%] h-full object-cover" />
    <div
      class="h-full w-[56%] flex flex-col items-between justify-between pb-[1.2rem]"
    >
      <!-- Top section with title and price -->
      <div
        class="h-max w-full flex flex-col gap-[.4rem] items-start justify-between pt-[1rem] px-[3.2vw]"
      >
        <h2 class="text-[1.4rem] leading-[1.8rem]">{{ formattedTitle }}</h2>
        <h2 class="text-[1rem] leading-[1.8rem]">{{ catalogTitle }}</h2>
        <h2 class="text-[1rem] font-[600] text-red-600">
          {{ converted }} m&sup2;
        </h2>
      </div>

      <!-- Variants / Colors -->
      <div
        class="h-max w-full flex flex-col gap-[2rem] items-start justify-between py-[.8rem] px-[4vw] text-[#666]"
      >
        <div class="h-max w-full flex flex-col gap-2 mt-2">
          <p class="text-[1rem]">{{ colors }} Colors:</p>
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="variant in variants"
              :key="variant.SKU"
              class="w-8 h-8 rounded-sm overflow-hidden"
            >
              <img
                :src="variant.image"
                :alt="variant.SKU"
                class="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Quick View Button -->
      <div class="h-max w-full px-[4vw] pt-[.8rem]">
        <span
          class="text-[#333] block w-full flex gap-[1.2vw] justify-center items-center bg-yellow-300 rounded-md px-[3.2vw] py-[.6rem]"
        >
          Quick View
          <Icon class="text-[1rem]" icon="ic:baseline-remove-red-eye" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import useUserStore from "../../../stores/user";

import { useRouter } from "vue-router";
import { computed } from "vue";
import { handleDOMEntry } from "./../../../../../utils/gsapUtils";
import { convertCurrency } from "./../../../../../utils/reusables";
import { Icon } from "@iconify/vue/dist/iconify.js";

const props = defineProps({
  image: String,
  price: [String, Number],
  currency: String,
  catalogTitle: String,
  title: String,
  colors: Number,
  description: String,
});

const router = useRouter();
const userStore = useUserStore();

const userCountry = computed(() => userStore.preference.country || null);

const converted = computed(() => {
  if (!userCountry.value) {
    return {
      currency: props.currency,
      price: props.price,
    };
  }
  const result = convertCurrency(
    props.price,
    props.currency,
    userCountry.value,
  );

  return result;
});

const goToProduct = () => {
  const match = props.description?.match(/Product ID:\s*(\d+)/);
  const id = match ? parseInt(match[1]) : null;

  if (id) {
    router.push(`/flooring/catalog/${id}`);
  } else {
    console.warn("No valid ID found in description for product:", props.title);
  }
};

const formattedTitle = computed(
  () =>
    props.title?.replace(
      /\w\S*/g,
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    ) || "",
);
</script>
