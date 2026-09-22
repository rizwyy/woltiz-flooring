<template>
  <div
    class="why-Floorsir-container opacity-0 translate-y-[6%] w-max mx-auto pt-[4vw] pb-[8vw] text-center font-outfit border-t-[.2vh] border-b-[.2vh]"
    data-test="why-floorsir"
    role="region"
    aria-label="Why Floorsir"
  >
    <h2
      class="text-[2.4rem] font-[400] mb-[14vh] text-gray-800 h-max w-full text-center px-[4vw]"
    >
      Why Floorsir
    </h2>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-[4vw] mx-auto max-w-[90vw]">
      <!-- Free measuring and planning -->
      <div class="flex flex-col items-center gap-[1.5rem]">
        <rulerIcon class="text-[3.4rem] text-[#666]" aria-hidden="true" />
        <span class="text-[1.2rem] font-[400] text-[#333]">
          Free measuring and planning
        </span>
      </div>

      <!-- Uplift and removal service -->
      <div class="flex flex-col items-center gap-[1.5rem]">
        <forkLiftIcon class="text-[3.4rem] text-[#666]" aria-hidden="true" />
        <span class="text-[1.2rem] font-[400] text-[#333]">
          Uplift and removal service
        </span>
      </div>

      <!-- We’ll arrange fitting -->
      <div class="flex flex-col items-center gap-[1.5rem]">
        <fittingIcon class="text-[3.4rem] text-[#666]" aria-hidden="true" />
        <span class="text-[1.2rem] font-[400] text-[#333]">
          We’ll arrange fitting
        </span>
      </div>

      <!-- Wide Selection -->
      <div class="flex flex-col items-center gap-[1.5rem]">
        <tapIcon class="text-[3.4rem] text-[#666]" aria-hidden="true" />
        <span class="text-[1.2rem] font-[400] text-[#333]">Wide Selection</span>
      </div>

      <!-- Free Delivery -->
      <div class="flex flex-col items-center gap-[1.5rem]">
        <deliveryIcon class="text-[3.4rem] text-[#666]" aria-hidden="true" />
        <span class="text-[1.2rem] font-[400] text-[#333]">Free Delivery</span>
      </div>

      <!-- Customisation Options -->
      <div class="flex flex-col items-center gap-[1.5rem]">
        <customisationIcon
          class="text-[3.4rem] text-[#666]"
          aria-hidden="true"
        />
        <span class="text-[1.2rem] font-[400] text-[#333]">
          Customisation Options
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineAsyncComponent } from "vue";

const rulerIcon = defineAsyncComponent(() =>
  import("~/public/icons/rulerIcon.vue")
);
const forkLiftIcon = defineAsyncComponent(() =>
  import("~/public/icons/forkLiftIcon.vue")
);
const fittingIcon = defineAsyncComponent(() =>
  import("~/public/icons/fittingIcon.vue")
);
const customisationIcon = defineAsyncComponent(() =>
  import("~/public/icons/customisationIcon.vue")
);
const deliveryIcon = defineAsyncComponent(() =>
  import("~/public/icons/deliveryIcon.vue")
);
const tapIcon = defineAsyncComponent(() =>
  import("~/public/icons/tapIcon.vue")
);

onMounted(() => {
  if (process.client) {
    try {
      const fn =
        (typeof handleScrollTrigger !== "undefined" && handleScrollTrigger) ||
        (typeof window !== "undefined" && window.handleScrollTrigger);
      if (fn && typeof fn === "function") {
        fn("why-Floorsir-container");
      }
    } catch (e) {
      // swallow errors to avoid breaking page mount
    }
  }
});
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>
