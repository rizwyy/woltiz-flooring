<template>
  <section class="h-max max-w-screen overflow-x-hidden">
    <NavBarMOB />
    <NavBarPC />
    <div>
      <DesignerLoginBoxPC />
      <DesignerLoginBoxMOB />
      <FooterMOB />
      <FooterPC />
    </div>
  </section>
</template>

<script setup>
import NavBarMOB from "../components/MOBILE/NavBarMOB.vue";
import NavBarPC from "../components/DESKTOP/NavBarPC.vue";
import UnderDev from "../components/MOBILE/UnderDev.vue";
import FooterMOB from "~/components/MOBILE/FooterMOB.vue";
import FooterPC from "~/components/DESKTOP/FooterPC.vue";
import DesignerLoginBoxPC from "~/components/DESKTOP/DesignerLoginBoxPC.vue";
import DesignerLoginBoxMOB from "~/components/MOBILE/DesignerLoginBoxMOB.vue";
</script>

<style lang="scss" scoped></style>
