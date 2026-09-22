<template>
  <!-- DESKTOP -->
  <div
    v-if="isLoading"
    class="h-[60rem] w-screen bg-white z-[99] absolute top-[7rem] flex items-start justify-center pt-[12rem] text-[#444]"
  >
    <span class="flex items-center justify-center text-[1.4rem] gap-[.4vw]"
      >Loading your results

      <Icon
        class="text-[3rem] text-[#444]"
        icon="eos-icons:three-dots-loading"
      />
    </span>
  </div>
  <!--  -->
  <div class="max-[990px]:hidden h-max w-screen px-[6vw]">
    <div
      id="carpetCategoryContainerPC"
      class="h-max w-full text-center py-[2rem] flex flex-col gap-[1rem] font-outfit font-[400] bg-[#ececec] rounded-md shadow-lg bg-opacity-[.6] px-[3vw]"
    >
      <div
        class="h-max w-full flex items-center justify-between text-[1.8rem] z-[9]"
      >
        <span class="text-left text-balance text-detailsContainer_heading_PC">
          Choose Your Category
        </span>
      </div>
      <div class="h-max w-full flex justify-between gap-[2vw] z-[9]">
        <!-- Wall To Wall -->
        <div
          :class="[
            'h-[28vh] w-full rounded-md  border-[2px] border-[#f1f1f1]  w flex items-end justify-between text-[#f1f1f1] px-[1.6vw] py-[.8vh] text-[2.4vh] relative cursor-pointer',
            { selected: userStore.preference.spec_1.includes('Wall to Wall') },
          ]"
          @click="toggleSelect('Wall to Wall')"
        >
          <div
            v-show="userStore.preference.spec_1.includes('Wall to Wall')"
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
            loading="eager"
            class="h-full w-full object-cover absolute left-0 bottom-0 z-[-9]"
            src="/wall-to-wall.webp"
            alt="carpet"
          />
          <span class="text-detailsContainer_label_PC">Wall to Wall</span>
        </div>

        <!-- Carpet Tiles -->
        <div
          :class="[
            'h-[28vh] w-full rounded-md  border-[2px] border-[#f1f1f1]  w flex items-end justify-between text-[#f1f1f1] px-[1.6vw] py-[.8vh] text-[2.4vh] relative cursor-pointer',
            { selected: userStore.preference.spec_1.includes('Carpet Tiles') },
          ]"
          @click="toggleSelect('Carpet Tiles')"
        >
          <div
            v-show="userStore.preference.spec_1.includes('Carpet Tiles')"
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
            loading="eager"
            class="h-full w-full object-cover absolute left-0 bottom-0 z-[-9]"
            src="/carpet-tiles.webp"
            alt="Carpet Tiles"
          />
          <span class="text-detailsContainer_label_PC">Carpet Tiles</span>
        </div>
      </div>
      <div class="h-max w-full flex justify-between gap-[2vw] z-[9]">
        <!-- Axminister -->
        <div
          :class="[
            'h-[28vh] w-full rounded-md  border-[2px] border-[#f1f1f1]  w flex items-end justify-between text-[#f1f1f1] px-[1.6vw] py-[.8vh] text-[2.4vh] relative cursor-pointer',
            { selected: userStore.preference.spec_1.includes('Axminister') },
          ]"
          @click="toggleSelect('Axminister')"
        >
          <div
            v-show="userStore.preference.spec_1.includes('Axminister')"
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
            loading="eager"
            class="h-full w-full object-cover absolute left-0 bottom-0 z-[-9]"
            src="/axminister.webp"
            alt="axminister carpets floorsir"
          />
          <span class="text-detailsContainer_label_PC">Axminister</span>
        </div>

        <!-- Mosque Carpets -->
        <div
          :class="[
            'h-[28vh] w-full rounded-md  border-[2px] border-[#f1f1f1]  w flex items-end justify-between text-[#f1f1f1] px-[1.6vw] py-[.8vh] text-[2.4vh] relative cursor-pointer',
            {
              selected: userStore.preference.spec_1.includes('Mosque Carpets'),
            },
          ]"
          @click="toggleSelect('Mosque Carpets')"
        >
          <div
            v-show="userStore.preference.spec_1.includes('Mosque Carpets')"
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
            loading="eager"
            class="h-full w-full object-cover absolute left-0 bottom-0 z-[-9]"
            src="/mosque.webp"
            alt="Mosque Carpets"
          />
          <span class="text-detailsContainer_label_PC">Mosque Carpets</span>
        </div>
      </div>
      <div class="h-max w-full flex justify-between gap-[2vw] z-[9]">
        <!-- Area Rugs -->
        <div
          :class="[
            'h-[28vh] rounded-md border-[2px] border-[#f1f1f1]  w-full flex items-end justify-between text-[#f1f1f1] px-[1.6vw] py-[.8vh] text-[2.4vh] relative cursor-pointer',
            { selected: userStore.preference.spec_1.includes('Area Rugs') },
          ]"
          @click="toggleSelect('Area Rugs')"
        >
          <div
            v-show="userStore.preference.spec_1.includes('Area Rugs')"
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
            preload
            loading="eager"
            class="h-full w-full object-cover absolute left-0 bottom-0 z-[-9]"
            src="/area-rugs.webp"
            alt="Area Rugs"
          />
          <span class="text-detailsContainer_label_PC">Area Rugs</span>
        </div>

        <!-- Customized -->
        <div
          :class="[
            'h-[28vh] w-full rounded-md  border-[2px] border-[#f1f1f1]  w flex items-end justify-between text-[#f1f1f1] px-[1.6vw] py-[.8vh] text-[2.4vh] relative cursor-pointer',
            { selected: userStore.preference.spec_1.includes('Runners') },
          ]"
          @click="toggleSelect('Runners')"
        >
          <div
            v-show="userStore.preference.spec_1.includes('Runners')"
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
            loading="eager"
            class="h-full w-full object-cover absolute left-0 bottom-0 z-[-9]"
            src="/runners.webp"
            alt="carpet"
          />
          <span class="text-detailsContainer_label_PC">Runners</span>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import {
  DISABLE_SCROLL,
  ENABLE_SCROLL,
} from "./../../../../../utils/reusables";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { ref } from "vue";
import ClearAllIcon from "~/public/icons/clearAllIcon.vue";

// PINIA

import useUserStore from "~/stores/user";
const userStore = useUserStore();
// COOKIES

const spec_1 = ref("");
const isLoading = ref(false);

function clearAllSelections() {
  spec_1.value = "";
  userStore.preference.spec_1 = "";
}

function toggleSelect(category) {
  const router = useRouter();

  if (!category) return;

  isLoading.value = true;
  DISABLE_SCROLL();
  setTimeout(() => {
    router.push({
      path: "/flooring/catalog?type=Carpets",
      query: { carpet: category },
    });
    ENABLE_SCROLL();
    isLoading.value = false;
  }, 1000);
}
</script>
<style scoped>
.selected {
  border-radius: 0px; /* Adjust this value as needed */
  border-radius: 0.375rem;
  border: 2px solid #333; /* Adjust border color as needed */
}
</style>
