<template>
  <div class="h-max w-screen relative">
    <ReqQuotePC v-if="!isMobile" />
    <ReqQuoteMOB v-else />
  </div>
</template>

<script setup>
import ReqQuoteMOB from "~/components/MOBILE/ReqQuoteMOB.vue";
import ReqQuotePC from "~/components/DESKTOP/ReqQuotePC.vue";

const isMobile = ref(false);
onMounted(() => {
  if (window.innerWidth < 990) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
});
</script>

<style lang="scss" scoped></style>
