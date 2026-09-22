<script setup>
import useUserStore from "../../../stores/user";
const userStore = useUserStore();

import NavBarPC from "@components/DESKTOP/NavBarPC.vue";
import NavBarMOB from "@components/MOBILE/NavBarMOB.vue";
import FloatingBarMOB from "@components/MOBILE/FLOORING/FloatingBarMOB.vue";
import CurrencyDetails from "@components/MOBILE/FLOORING/CountryDetails.vue";
import ScrollToTopBTNPC from "@components/DESKTOP/ScrollToTopBTN-PC.vue";

// Eager-loaded component (for both mobile and desktop)
import CategoryDetails from "@components/MOBILE/FLOORING/CARPETS/CarpetCategoryDetails.vue";

// Lazy-loaded components
// const LazyTypeDetails = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/CARPETS/CarpetTypeDetails.vue")
// );
// const LazyMaterialDetails = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/CARPETS/CarpetMaterialDetails.vue")
// );
// const LazyColorDetails = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/CARPETS/CarpetColorDetails.vue")
// );
// const LazyBudgetDetails = defineAsyncComponent(() =>
//   import("@components/MOBILE/FLOORING/CARPETS/CarpetBudgetDetails.vue")
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
  userStore.preference.flooring = "Carpets";

  // const userPreferenceCookie = useCookie("userPreference").value;
  // existingUser.value = !!userPreferenceCookie?.name;
  isMobile.value = window.innerWidth < 990;
});
</script>
<template>
  <!-- MOBILE -->
  <section v-if="isMobile" class="min-[990px]:hidden w-max h-max select-none">
    <FloatingBarMOB flooring="CARPETS" link="/" />
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
            prefetch
            >Carpet Flooring</NuxtLink
          >
          <CurrencyDetails />
        </div>
        <span class="text-[1.9rem]"> Specify Your Needs </span>
      </div>
      <!-- MOBILE -->
      <BannerYouWin />
      <CategoryDetails />
      <!-- <LazyTypeDetails :existingUser="existingUser" /> -->
      <!-- <LazyMaterialDetails :existingUser="existingUser" /> -->
      <!-- <LazyColorDetails :existingUser="existingUser" /> -->
      <!-- <LazyBudgetDetails :existingUser="existingUser" /> -->
      <!-- <LazyOrderMethod flooring="Carpets" /> -->
      <!-- <LazyInfoForm flooring="Carpets" /> -->
      <!-- <LazyReviewCard flooring="Carpets" link="carpets" /> -->
    </ul>
    <!-- MOBILE -->
  </section>
  <!-- -------------------------------------------- -->
  <!-- DESKTOP -->
  <section v-else class="max-[990px]:hidden max-w-screen h-max select-none">
    <ul
      v-auto-animate
      class="h-max max-w-[100vw] overflow-x-hidden font-outfit flex flex-col gap-[1rem] flex flex-col gap-[3rem] items-center"
    >
      <NavBarPC />
      <!--  -->
      <ScrollToTopBTNPC />
      <!--  -->
      <div
        class="test h-max px-[6vw] pt-[2rem] w-full flex flex-col items-start text-[1.9rem] gap-[1rem]"
      >
        <!-- DESKTOP -->
        <a
          href="/flooring"
          class="text-[1.3rem] underline underline-offset-[.2rem] text-[#666] flex"
        >
          Carpets >
          <!-- DESKTOP -->
          {{ userStore.preference.spec_1 }}
        </a>
        <span class="text-[2.7rem]"> Specify Your Needs </span>
      </div>
      <!-- DESKTOP -->
      <CategoryDetails />
      <!-- <LazyTypeDetails /> -->
      <!-- <LazyMaterialDetails /> -->
      <!-- <LazyColorDetails /> -->
      <!-- <LazyBudgetDetails /> -->
      <!-- <LazyOrderMethod flooring="Carpets" /> -->
      <!-- <LazyInfoForm flooring="Carpets" /> -->
      <!-- <LazyReviewCard flooring="Carpets" link="carpets" /> -->

      <!-- DESKTOP -->
    </ul>
    <!-- DESKTOP -->
  </section>
</template>

<style scoped>
.font-outfit {
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>

<style scoped>
.font-outfit {
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>

<style scoped>
.font-outfit {
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
