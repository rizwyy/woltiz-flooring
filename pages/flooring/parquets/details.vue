<script setup>
import useUserStore from "../../../stores/user";
const userStore = useUserStore();

import NavBarPC from "@components/DESKTOP/NavBarPC.vue";
import NavBarMOB from "@components/MOBILE/NavBarMOB.vue";
import FloatingBarMOB from "@components/MOBILE/FLOORING/FloatingBarMOB.vue";
import CurrencyDetails from "@components/MOBILE/FLOORING/CountryDetails.vue";
import ScrollToTopBTNPC from "@components/DESKTOP/ScrollToTopBTN-PC.vue";

// Eager-loaded component (for both mobile and desktop)
import WoodenCategoryDetails from "@components/MOBILE/FLOORING/PARQUETS/ParquetsCategoryDetails.vue";

// Lazy-loaded components are intentionally commented out to keep initial bundle small
// const LazyWoodenTypeDetails = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/PARQUETS/ParquetsTypeDetails.vue")
// );
// const LazyWoodenDesignDetails = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/PARQUETS/ParquetsDesignDetails.vue")
// );
// const LazyWoodenColorDetails = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/PARQUETS/ParquetsColorDetails.vue")
// );
// const LazyWoodenFinishDetails = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/PARQUETS/ParquetsFinishDetails.vue")
// );
// const LazyWoodenBudgetDetails = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/PARQUETS/ParquetsBudgetDetails.vue")
// );
// const LazyOrderMethod = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/OrderMethod.vue")
// );
// const LazyInfoForm = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/InfoForm.vue")
// );
// const LazyReviewCard = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/DetailsReview.vue")
// );

const isMobile = ref(false);
const existingUser = ref(false);

onMounted(() => {
  userStore.preference.flooring = "Parquets";

  // const userPreferenceCookie = useCookie("userPreference").value;
  // existingUser.value = !!userPreferenceCookie?.name;

  isMobile.value = window.innerWidth < 990;
});
</script>

<template>
  <!-- MOBILE -->
  <section v-if="isMobile" class="min-[990px]:hidden w-max h-max select-none">
    <FloatingBarMOB flooring="PARQUETS" link="/" />
    <ul
      v-auto-animate
      class="h-max max-w-[100vw] overflow-x-hidden font-outfit flex flex-col gap-[.5rem] flex flex-col gap-[.5rem] items-center z-[2]"
    >
      <NavBarMOB />

      <div
        class="h-max px-[4vw] pt-[.7rem] pb-[.2rem] w-full flex flex-col items-start text-[1.9rem] gap-[1rem]"
      >
        <!-- MOBILE -->
        <div class="h-max w-full flex justify-between">
          <NuxtLink
            class="text-[1.2rem] underline underline-offset-[.4rem] text-[#666] flex"
            to="/flooring"
            >Parquet Flooring</NuxtLink
          >
          <CurrencyDetails />
        </div>
        <span class="text-[1.9rem]"> Specify Your Needs </span>
      </div>

      <BannerYouWin />
      <WoodenCategoryDetails />
      <!-- Lazy components kept commented out to avoid unnecessary bundle impact
      <LazyWoodenTypeDetails :existingUser="existingUser" />
      <LazyWoodenDesignDetails :existingUser="existingUser" />
      <LazyWoodenColorDetails :existingUser="existingUser" />
      <LazyWoodenFinishDetails :existingUser="existingUser" />
      <LazyWoodenBudgetDetails :existingUser="existingUser" />
      <LazyOrderMethod flooring="Parquets" />
      <LazyInfoForm flooring="Parquets" />
      <LazyReviewCard flooring="Parquets" link="parquets" />
      -->
    </ul>
    <!-- MOBILE -->
  </section>

  <!-- -------------------------------------------- -->
  <!-- DESKTOP -->
  <section v-else class="max-[990px]:hidden max-w-screen h-max select-none">
    <NavBarPC />
    <div
      class="h-max max-w-[100vw] overflow-x-hidden font-outfit flex flex-col gap-[2vh] flex flex-col gap-[6vh] items-center"
    >
      <div
        class="h-max px-[6vw] pt-[4vh] pb-[0vh] w-full flex flex-col items-start text-[1.9rem] gap-[2vh]"
      >
        <!-- DESKTOP -->
        <a
          href="/flooring"
          class="text-[2.6vh] underline underline-offset-[.4vh] text-[#666] flex"
        >
          Parquet Flooring >
          <!-- DESKTOP -->
          {{ userStore.preference.spec_1 }}
        </a>
        <span class="text-[5.4vh]"> Specify Your Needs </span>
      </div>
      <!-- DESKTOP -->
      <ScrollToTopBTNPC />
      <WoodenCategoryDetails />
      <!-- Lazy components kept commented out to avoid unnecessary bundle impact
      <LazyWoodenTypeDetails />
      <LazyWoodenDesignDetails />
      <LazyWoodenColorDetails />
      <LazyWoodenFinishDetails />
      <LazyWoodenBudgetDetails />
      <LazyOrderMethod flooring="Parquets" />
      <LazyInfoForm flooring="Parquets" />
      <LazyReviewCard flooring="Parquets" link="parquets" />
      -->
    </div>
    <!-- DESKTOP -->
  </section>
</template>
"},{

<style scoped>
.font-outfit {
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
.animate-gradient {
  background-size: 300%;
  -webkit-animation: animatedgradient 4s ease-in-out infinite;
  -moz-animation: animatedgradient 4s ease-in-out infinite;
  animation: animatedgradient 4s ease-in-out infinite normal;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
