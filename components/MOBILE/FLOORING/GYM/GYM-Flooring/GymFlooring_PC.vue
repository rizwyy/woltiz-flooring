<template>
  <!-- DESKTOP -->
  <div
    v-if="isLoading"
    class="h-[60rem] w-screen bg-white z-[99] absolute top-[7rem] flex items-start justify-center pt-[12rem] text-[#444]"
  >
    <span class="flex items-center justify-center text-[1.4rem] gap-[.4vw]">
      Loading your results

      <Icon
        class="text-[3rem] text-[#444]"
        icon="eos-icons:three-dots-loading"
      />
    </span>
  </div>

  <div class="max-[990px]:hidden h-max w-screen px-[6vw]">
    <div
      id="gymFlooringContainerPC"
      class="h-max w-full text-center py-[4vh] flex flex-col gap-[2vh] font-outfit font-[400] bg-[#f1f1f1] rounded-md shadow-lg bg-opacity-[.6] px-[3vw]"
    >
      <!-- DESKTOP -->
      <div class="h-max w-full flex justify-between text-[3.8vh] z-[9]">
        <span class="text-left text-balance text-detailsContainer_heading_PC"
          >Choose your Flooring</span
        >
        <button
          @click="clearmaterialSelections"
          v-show="spec_3"
          class="h-max bg-white text-gray-500 px-[2vw] py-[.8vh] text-detailsContainer_clearAll_PC rounded-md flex gap-[1vw] items-center"
        >
          <span>Clear All</span>
          <ClearAllIcon />
        </button>
        <!-- DESKTOP -->
      </div>
      <div class="h-max w-full flex justify-between gap-[2vw] z-[9]">
        <!-- Rubber -->
        <div
          :class="[
            'h-[28vh] w-full rounded-md border-[2px] border-[#f1f1f1] flex items-end justify-between text-[#f1f1f1] px-[1.6vw] py-[.8vh] text-[2.4vh] relative cursor-pointer',
            { selected: spec_3 === 'Rubber' },
          ]"
          @click="toggleSelect('Rubber')"
        >
          <div
            v-show="spec_3 === 'Rubber'"
            class="selectedDiv h-full w-full from-[20%] absolute bottom-0 left-0 bg-opacity-[.3] z-[1] flex items-start justify-end px-[1vw] py-[1vh]"
          >
            <!-- Selected indicator without text -->
            <span
              class="absolute top-1 right-1 bg-white text-gray-500 px-2 py-1 text-detailsContainer_selectedText_PC rounded-md"
              >Selected</span
            >
          </div>
          <div
            class="h-full w-full bg-gradient-to-b from-[#0000] to-black from-[60%] absolute bottom-0 left-0 bg-opacity-[.3] z-[-1]"
          ></div>
          <NuxtImg
            quality="50"
            placeholder
            loading="lazy"
            class="h-full w-full object-cover absolute left-0 bottom-0 z-[-9]"
            src="/gym/rubberFlooring.webp"
            alt="#"
          />
          <span class="text-detailsContainer_label_PC">Rubber</span>
        </div>
        <!-- PVC -->
        <div
          :class="[
            'h-[28vh] w-full rounded-md border-[2px] border-[#f1f1f1] flex items-end justify-between text-[#f1f1f1] px-[1.6vw] py-[.8vh] text-[2.4vh] relative cursor-pointer',
            { selected: spec_3 === 'PVC' },
          ]"
          @click="toggleSelect('PVC')"
        >
          <div
            v-show="spec_3 === 'PVC'"
            class="selectedDiv h-full w-full from-[20%] absolute bottom-0 left-0 bg-opacity-[.3] z-[1] flex items-start justify-end px-[1vw] py-[1vh]"
          >
            <!-- DESKTOP -->
            <!-- Selected indicator without text -->
            <span
              class="absolute top-1 right-1 bg-white text-gray-500 px-2 py-1 text-detailsContainer_selectedText_PC rounded-md"
              >Selected</span
            >
          </div>
          <div
            class="h-full w-full bg-gradient-to-b from-[#0000] to-black from-[60%] absolute bottom-0 left-0 bg-opacity-[.3] z-[-1]"
          ></div>
          <NuxtImg
            placeholder
            loading="lazy"
            class="h-full w-full object-cover absolute left-0 bottom-0 z-[-9]"
            src="/gym/pvcGymFlooring.webp"
            alt="#"
          />
          <span class="text-detailsContainer_label_PC">PVC</span>
        </div>
        <!-- DESKTOP -->
      </div>
      <div class="h-max w-full flex justify-between gap-[2vw] z-[9]">
        <!-- Wooden -->
        <div
          :class="[
            'h-[28vh] w-full rounded-md border-[2px] border-[#f1f1f1] flex items-end justify-between text-[#f1f1f1] px-[1.2vw] py-[1.4vh] text-[2.4vh] relative cursor-pointer',
            { selected: spec_3 === 'Wooden' },
          ]"
          @click="toggleSelect('Wooden')"
        >
          <div
            v-show="spec_3 === 'Wooden'"
            class="selectedDiv h-full w-full from-[20%] absolute bottom-0 left-0 bg-opacity-[.3] z-[1] flex items-start justify-end px-[1vw] py-[1vh]"
          >
            <!-- Selected indicator without text -->
            <span
              class="absolute top-1 right-1 bg-white text-gray-500 px-2 py-1 text-detailsContainer_selectedText_PC rounded-md"
              >Selected</span
            >
          </div>
          <div
            class="h-full w-full bg-gradient-to-bl from-[#0000] to-black from-[20%] absolute bottom-0 left-0 bg-opacity-[.3] z-[-1]"
          ></div>
          <NuxtImg
            quality="50"
            placeholder
            loading="lazy"
            class="h-full w-full object-cover absolute left-0 bottom-0 z-[-9]"
            src="/gym/woodenGymFlooring.webp"
            alt="#"
          />
          <!-- DESKTOP -->
          <span class="text-detailsContainer_label_PC">Wooden</span>
        </div>
        <!-- DESKTOP -->
        <!-- Artificial Grass -->
        <div
          v-show="!(userStore.preference.spec_1 === 'Strength')"
          :class="[
            'h-[28vh] w-full rounded-md border-[2px] border-[#f1f1f1] flex items-end justify-between text-[#f1f1f1] px-[1.2vw] py-[1.4vh] text-[2.4vh] relative cursor-pointer',
            { selected: spec_3 === 'Artificial Grass' },
          ]"
          @click="toggleSelect('Artificial Grass')"
        >
          <div
            v-show="spec_3 === 'Artificial Grass'"
            class="selectedDiv h-full w-full from-[20%] absolute bottom-0 left-0 bg-opacity-[.3] z-[1] flex items-start justify-end px-[1vw] py-[1vh]"
          >
            <!-- Selected indicator without text -->
            <span
              class="absolute top-1 right-1 bg-white text-gray-500 px-2 py-1 text-detailsContainer_selectedText_PC rounded-md"
              >Selected</span
            >
          </div>
          <div
            class="h-full w-full bg-gradient-to-bl from-[#0000] to-black from-[20%] absolute bottom-0 left-0 bg-opacity-[.3] z-[-1]"
          ></div>
          <NuxtImg
            quality="50"
            placeholder
            loading="lazy"
            class="h-full w-full object-cover absolute left-0 bottom-0 z-[-9]"
            src="/40004.jpg"
            alt="#"
          />
          <span class="text-detailsContainer_label_PC">Artificial Grass</span>
        </div>
        <!-- DESKTOP -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRaw } from "vue";
import {
  DISABLE_SCROLL,
  ENABLE_SCROLL,
} from "./../../../../../utils/reusables";
import { Icon } from "@iconify/vue/dist/iconify.js";
import ClearAllIcon from "~/public/icons/clearAllIcon.vue";
import useUserStore from "~/stores/user";
import { useRouter } from "vue-router";

// PINIA
const userStore = useUserStore();
const router = useRouter();

const spec_3 = ref("");
const isLoading = ref(false);

function clearmaterialSelections() {
  spec_3.value = "";
  userStore.preference.spec_3 = "";
}

const toggleSelect = (material) => {
  if (!material) return;

  if (spec_3.value === material) {
    spec_3.value = "";
    userStore.preference.spec_3 = "";
    return;
  }

  // set preference and navigate to catalog with type=gym
  userStore.preference.spec_3 = toRaw(material);
  userStore.preference.flooring = "Gym";

  isLoading.value = true;
  DISABLE_SCROLL();
  setTimeout(() => {
    router.push({
      path: "/flooring/catalog",
      query: { type: "gym", gym: material },
    });
    ENABLE_SCROLL();
    isLoading.value = false;
  }, 1000);
};
</script>

<style scoped>
.selected {
  border-radius: 0px; /* Adjust this value as needed */
  border-radius: 0.375rem;
  border: 2px solid #333; /* Adjust border color as needed */
}
</style>
