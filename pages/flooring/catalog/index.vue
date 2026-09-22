<template>
  <div class="h-max w-full">
    <component :is="isMobile ? NavBarMOB : NavBarPC" />
    <component :is="isMobile ? CatalogMOB : CatalogPC" />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { useDevice } from "./../../../composables/useDevice";

const { isMobile } = useDevice();

const NavBarPC = defineAsyncComponent(() =>
  import("./../../../components/DESKTOP/NavBarPC.vue")
);
const CatalogPC = defineAsyncComponent(() =>
  import("./../../../components/DESKTOP/CatalogPC.vue")
);
const NavBarMOB = defineAsyncComponent(() =>
  import("./../../../components/MOBILE/NavBarMOB.vue")
);
const CatalogMOB = defineAsyncComponent(() =>
  import("./../../../components/MOBILE/FLOORING/CatalogMOB.vue")
);
</script>
