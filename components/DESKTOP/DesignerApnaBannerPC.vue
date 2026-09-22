<template>
  <!-- Lazy-render the async form inside a Suspense boundary with a lightweight fallback -->
  <Suspense>
    <template #default>
      <DesignerFormPC
        v-if="isFormActive"
        @close="handleCloseForm"
        id="designer-form"
      />
    </template>
    <template #fallback>
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        role="status"
        aria-live="polite"
      >
        <svg
          class="w-12 h-12 animate-spin text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span class="sr-only">Loading form…</span>
      </div>
    </template>
  </Suspense>

  <section
    id="designer-apna-pc"
    class="DesignerApnaPC opacity-0 translate-y-[6%] w-[82vw] mx-auto rounded-xl shadow-md px-[3vw] pt-[8vh] pb-[8vh] text-center font-outfit flex items-center flex-col gap-[10vh]"
    :aria-hidden="isFormActive"
    aria-labelledby="designer-apna-title"
  >
    <div
      class="z-[-999] bg-blue-100 absolute top-0 left-0 h-full w-full"
      aria-hidden="true"
    ></div>

    <!-- First line -->
    <div
      class="apnaBannerItem_Text opacity-0 text-[#555] text-[3rem] tracking-[-.1vw]"
    >
      Floorsir
      <span class="text-[#222] font-[300] tracking-[0vw] text-[2.4rem]">
        For Designers
      </span>
    </div>

    <NuxtImg
      @load="handleImageLoad(0, 'apnaBannerIMG_PC', 'apnaBannerItem')"
      src="/group54.webp"
      placeholder="/group54PH.webp"
      alt="Floorsir designers banner"
      decoding="async"
      loading="lazy"
      class="apnaBannerIMG_PC h-full w-full z-[-9] absolute top-0 left-0 object-cover"
    />

    <!-- Content Overlay -->
    <div
      class="apnaBannerItem_Overlay backdrop-blur-[8px] absolute top-0 left-0 h-full w-full transition-all duration-[.4s] ease-in-out bg-gradient-to-b hover:to-[70%] to-transparent z-[-1]"
      aria-hidden="true"
    ></div>

    <!-- Second line -->
    <h2
      id="designer-apna-title"
      class="text-[#333] text-[2rem] font-[400] apnaBannerItem_Text opacity-0"
    >
      Unlock Designer Discounts!
    </h2>

    <div class="h-max w-full">
      <!-- Fifth line -->
      <p
        class="text-[#666] text-[1.4rem] font-[300] apnaBannerItem_Text opacity-0"
      >
        Are you a Designer? Unlock Exclusive Discounts Here!
      </p>
    </div>

    <!-- Button (Sign Up) -->
    <div
      class="h-max w-full flex justify-center gap-[3vw] pt-[2vh] pb-[2vh] apnaBannerItem_Text opacity-0"
    >
      <button
        type="button"
        @click="bringForm"
        @keyup.enter.prevent="bringForm"
        :aria-expanded="isFormActive"
        aria-controls="designer-form"
        class="border-[2px] border-[#999] text-[#333] hover:shadow-lg backdrop-blur-[18px] active:shadow-xl tracking-[.2vw] w-[40%] px-[3vw] py-[2.4vh] rounded-md transition-all duration-300 text-[1.4rem] font-[500]"
      >
        SIGN UP
        <span class="sr-only"> — Opens the designer sign up form</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent } from "vue";

// Lazy-load the form component to reduce initial bundle size
const DesignerFormPC = defineAsyncComponent(() =>
  import("./DesignerFormPC.vue")
);

const isFormActive = ref(false);

// Safe scroll toggles: prefer global helpers if present, fallback to document style
const disableScroll = () => {
  if (typeof DISABLE_SCROLL === "function") return DISABLE_SCROLL();
  document.documentElement.style.overflow = "hidden";
};
const enableScroll = () => {
  if (typeof ENABLE_SCROLL === "function") return ENABLE_SCROLL();
  document.documentElement.style.overflow = "";
};

function handleCloseForm() {
  isFormActive.value = false;
  enableScroll();
}
const bringForm = () => {
  isFormActive.value = true;
  disableScroll();
};

onMounted(() => {
  if (typeof handleScrollTrigger === "function")
    handleScrollTrigger("DesignerApnaPC");
});

// Ensure scroll is restored if this component is unmounted while form is open
onBeforeUnmount(() => {
  if (isFormActive.value) enableScroll();
});
</script>

<style scoped>
/* Optional: Add any specific styles here if necessary */
</style>
