<template>
  <!-- MOBILE -->
  <section v-if="isMobile" class="h-max w-max min-[990px]:hidden">
    <component :is="NavBarMOB" v-if="NavBarMOB" />
    <component :is="SearchBarMOB" v-if="SearchBarMOB" />
    <BannerYouWin />
    <component :is="FlooringLayoutMOB" v-if="FlooringLayoutMOB" />
    <component :is="FooterMOB" v-if="FooterMOB" />
  </section>

  <!-- DESKTOP -->
  <section
    v-else
    class="min-[1590px]:h-max min-[1590px]:w-screen min-[1590px]:max-w-[99vw] h-max max-w-screen overflow-x-hidden max-[990px]:hidden font-outfit"
  >
    <component :is="NavBarPC" v-if="NavBarPC" />

    <div
      class="min-[1590px]:w-full min-[1590px]:flex min-[1590px]:items-center min-[1590px]:flex-col"
    >
      <div class="min-[1590px]:w-[75%]">
        <BannerYouWin />
        <component :is="FlooringLayoutPC" v-if="FlooringLayoutPC" />
        <section class="section-spacing">
          <component :is="SignUpCardPC" v-if="SignUpCardPC" />
        </section>
        <section class="section-spacing">
          <component :is="PersonalAssistancePC" v-if="PersonalAssistancePC" />
        </section>
        <section class="section-spacing border-t-[.2vh]">
          <component :is="DesignerApnaBannerPC" v-if="DesignerApnaBannerPC" />
        </section>
        <component :is="WhyWoltizPC" v-if="WhyWoltizPC" />
        <component :is="FaqPC" v-if="FaqPC" />
      </div>
    </div>

    <component :is="FooterPC" v-if="FooterPC" />
  </section>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { useHead } from "#imports";
import { useDevice } from "./../../composables/useDevice";

// Device detection (runtime-safe)
const { isMobile } = useDevice();

// Shared component
import BannerYouWin from "./../../components/BannerYouWin.vue";

// Refs for async components
const NavBarMOB = ref(null);
const SearchBarMOB = ref(null);
const FlooringLayoutMOB = ref(null);
const FooterMOB = ref(null);

const NavBarPC = ref(null);
const FlooringLayoutPC = ref(null);
const SignUpCardPC = ref(null);
const PersonalAssistancePC = ref(null);
const DesignerApnaBannerPC = ref(null);
const WhyWoltizPC = ref(null);
const FaqPC = ref(null);
const FooterPC = ref(null);

onMounted(() => {
  // Lazy-load components based on device
  if (isMobile.value) {
    NavBarMOB.value = defineAsyncComponent(() =>
      import("./../../components/MOBILE/NavBarMOB.vue")
    );
    SearchBarMOB.value = defineAsyncComponent(() =>
      import("../../components/SearchBar/SearchBarMOB.vue")
    );
    FlooringLayoutMOB.value = defineAsyncComponent(() =>
      import("./../../components/MOBILE/FLOORING/FlooringLayoutMOB.vue")
    );
    FooterMOB.value = defineAsyncComponent(() =>
      import("./../../components/MOBILE/FooterMOB.vue")
    );
  } else {
    NavBarPC.value = defineAsyncComponent(() =>
      import("./../../components/DESKTOP/NavBarPC.vue")
    );
    FlooringLayoutPC.value = defineAsyncComponent(() =>
      import("./../../components/DESKTOP/FlooringLayoutPC.vue")
    );
    SignUpCardPC.value = defineAsyncComponent(() =>
      import("./../../components/DESKTOP/SignUpCardPC.vue")
    );
    PersonalAssistancePC.value = defineAsyncComponent(() =>
      import("./../../components/DESKTOP/PersonalAssistancePC.vue")
    );
    DesignerApnaBannerPC.value = defineAsyncComponent(() =>
      import("./../../components/DESKTOP/DesignerApnaBannerPC.vue")
    );
    WhyWoltizPC.value = defineAsyncComponent(() =>
      import("./../../components/DESKTOP/WhyWoltizPC.vue")
    );
    FaqPC.value = defineAsyncComponent(() =>
      import("./../../components/DESKTOP/FaqPC.vue")
    );
    FooterPC.value = defineAsyncComponent(() =>
      import("./../../components/DESKTOP/FooterPC.vue")
    );
  }
});

// SEO
useHead({
  title: "Carpet Shop: Broadloom, Custom and Tile Option for all room",
  meta: [
    {
      name: "description",
      content:
        "Your Carpet Store in Bahrain, Dubai, Qatar, Kuwait, Abu Dhabi & Riyadh. We offer carpets with expert supply & installation services.",
    },
  ],
});
</script>

<style scoped>
.section-spacing {
  @apply h-max w-full pb-[12vh] pt-[8vh] flex flex-col items-center gap-[8vh];
}
</style>
