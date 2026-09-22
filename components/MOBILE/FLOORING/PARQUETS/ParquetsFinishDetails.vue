<template>
  <div class="h-max w-max">
    <WoodFinishMOB v-if="isMobile" />
    <WoodFinishPC v-else />
  </div>
</template>

<script setup>
import WoodFinishMOB from "./Parquets-Finish/WoodFinish_MOB.vue";
import WoodFinishPC from "./Parquets-Finish/WoodFinish_PC.vue";

const isMobile = ref(false);
onMounted(() => {
  if (window.innerWidth < 990) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
});
</script>

<style scoped></style>
