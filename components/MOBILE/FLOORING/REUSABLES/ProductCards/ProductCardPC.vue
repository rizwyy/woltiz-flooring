<template>
  <div
    class="rounded-md transition duration-300 cursor-pointer font-outfit border pb-[.8rem] border-[#666] hover:shadow-md transition-all duration-[.1] ease-in-out"
    @click="goToProduct"
  >
    <img
      :src="image"
      alt="Product Image"
      class="w-full h-[14rem] object-cover rounded-sm"
    />
    <div class="h-max w-full flex justify-between pt-[.8rem] px-[1vw]">
      <h2 class="text-lg font-semibold">{{ formattedTitle }}</h2>
      <h2 class="text-lg font-semibold">{{ converted }} m&sup2;</h2>
    </div>

    <div
      class="h-max w-full flex justify-between pt-[.4rem] text-[#666] px-[1vw]"
    >
      <div class="flex items-center gap-2">
        <span class="text-[.9rem]">{{ catalogTitle }}</span>
        <span class="text-[.9rem]">|</span>
        <span class="text-sm">{{ colors }}&nbsp; colors</span>
      </div>
      <p class="underline underline-offset-[.2rem] text-[.9rem]">View</p>
    </div>
  </div>
</template>

<script setup>
// .
import useUserStore from "../../../stores/user";
import { convertCurrency } from "./../../../../../utils/reusables";
import { useRouter } from "vue-router";
import { computed } from "vue";

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
    userCountry.value
  );

  return result;
});

const goToProduct = () => {
  console.log(props);

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
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    ) || ""
);
</script>
