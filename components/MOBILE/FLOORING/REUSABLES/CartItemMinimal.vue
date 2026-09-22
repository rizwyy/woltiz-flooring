<template>
  <div
    class="h-full w-full flex border-[1px] border-[#888] px-[2vw] py-[.5rem] rounded-md overflow-hidden"
  >
    <div class="w-[8rem] h-[8rem] flex items-center justify-center shrink-0">
      <img
        class="w-full h-full object-cover rounded-md"
        :src="image || '/placeholder.jpg'"
        alt="product"
      />
    </div>

    <div class="h-full w-full pl-[2vw] flex-[2] flex flex-col justify-between">
      <div class="h-max w-full flex justify-between">
        <div class="h-max w-[80%] flex flex-col gap-[.4rem] pt-[.2rem]">
          <h2 class="text-[1.4rem] font-[500] leading-[1.6rem] text-[#333]">
            {{ name }}
          </h2>
          <span class="text-[#999] block h-max w-full text-[.8rem]">{{
            description
          }}</span>
        </div>
        <div class="h-max w-[12%] flex items-start">
          <Icon
            @click="removeCartItem"
            class="text-[2rem] text-[#222]"
            icon="material-symbols:close-small-rounded"
          />
        </div>
      </div>
      <div class="h-max w-full flex justify-between">
        <span class="text-[1.2rem]">{{ currency }}&nbsp;{{ price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
import useUserStore from "../../../stores/user";
import { Icon } from "@iconify/vue/dist/iconify.js";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: [Number, String],
    required: true,
  },
  currency: {
    type: String,
  },
  sku: {
    type: String,
    required: true,
  },
});

const { sku } = toRefs(props);
const userStore = useUserStore();

function removeCartItem() {
  const targetSku = (props.sku || "").toString().toLowerCase();
  const idx = userStore.cart.findIndex((item) => {
    const itemSku = ((item.sku ?? item.squ) || "").toString().toLowerCase();
    return itemSku === targetSku;
  });
  if (idx !== -1) {
    userStore.cart.splice(idx, 1);
  }
}
</script>

<style lang="scss" scoped></style>
