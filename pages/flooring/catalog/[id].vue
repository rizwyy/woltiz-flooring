<template>
  <div class="h-full w-full">
    <div v-if="isMobile">
      <NavBarMOB />
      <ProductDetailsMOB />
    </div>
    <div v-else>
      <NavBarPC />
      <ProductsDetailsPC />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted, onUnmounted } from "vue";

// ✅ Handle screen width check directly
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

// ✅ Lazy-load components
const NavBarPC = defineAsyncComponent(() =>
  import("./../../../components/DESKTOP/NavBarPC.vue")
);
const ProductsDetailsPC = defineAsyncComponent(() =>
  import("./../../../components/DESKTOP/ProductsDetailsPC.vue")
);
const NavBarMOB = defineAsyncComponent(() =>
  import("./../../../components/MOBILE/NavBarMOB.vue")
);
const ProductDetailsMOB = defineAsyncComponent(() =>
  import("./../../../components/MOBILE/FLOORING/ProductDetailsMOB.vue")
);
</script>
