<template>
  <div
    class="successMsgContainerMOB opacity-0 translate-y-[-200%] invisible fixed bg-[#000] bg-opacity-[.4] text-[#f1f1f1] backdrop-blur-[12px] border-[0px] top-[4%] left-[8vw] h-[3.4rem] w-[86vw] gap-[1.4vw] flex justify-center items-center rounded-md z-[99999] px-[2vw]"
  >
    <span>Form submitted</span
    ><Icon class="text-[1.2rem]" icon="lets-icons:done-all-alt-round" />
  </div>

  <QuestionaireMOB
    @close="handleCloseForm"
    @success="handleSuccessMessageAnimation"
    v-if="isFormActive"
  />
  <section
    class="assistanceCardMOB opacity-0 translate-y-[6%] w-[90vw] mx-auto mt-[2rem] mb-[4rem]"
  >
    <!-- Title -->
    <h2 class="text-[#333] text-[1.8rem] tracking-[-.1vw] font-[400] mb-[2rem]">
      Personal assistance
    </h2>

    <!-- Assistance options -->
    <div class="space-y-[1.8rem]">
      <!-- Card 1: Book a home visit -->
      <a
        target="_blank"
        href="https://wa.me/97333008801?text=I%20would%20like%20to%20book%20a%20store%20visit"
        class="flex items-center w-full px-[4vw] py-[.9rem] bg-[#f1f1f1] rounded-lg shadow-md border-l-[6px] border-blue-200"
      >
        <div class="mr-[4vw]">
          <homeIcon class="text-[2.2rem] text-[#333]" />
        </div>
        <div class="flex-[8] text-start">
          <h3 class="text-[#333] font-[500] text-[1.2rem]">
            Book a home visit
          </h3>
          <p class="text-[#777] text-[1rem]">Bring our collection to you.</p>
        </div>
        <div class="ml-auto flex-[1]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-[6vw] w-[6vw] text-[#777]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </a>

      <!-- Card 2: Book a store Visit -->
      <a
        target="_blank"
        href="https://wa.me/97333008801?text=I%20would%20like%20to%20book%20a%20store%20visit"
        class="flex items-center w-full px-[4vw] py-[.9rem] bg-[#f1f1f1] rounded-lg shadow-md border-l-[6px] border-blue-200"
      >
        <div class="pr-[4vw] flex-[1]">
          <storeIcon class="text-[2.2rem] text-[#333]" />
        </div>
        <div class="flex-[8] text-start">
          <h3 class="text-[#333] font-[500] text-[1.2rem]">
            Book a store Visit
          </h3>
          <p class="text-[#777] text-[1rem]">Book your appointment now</p>
        </div>
        <div class="ml-auto flex-[1]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-[6vw] w-[6vw] text-[#777]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </a>

      <!-- Card 3: Chat with experts -->
      <a
        target="_blank"
        href="https://wa.me/97333008801?text=I%20would%20like%20to%20chat%20with%20an%20expert"
        class="flex items-center w-full px-[4vw] py-[.9rem] bg-[#f1f1f1] rounded-lg shadow-md border-l-[6px] border-blue-200"
      >
        <div class="pr-[4vw] flex-[1]">
          <chatIcon class="text-[2.2rem] text-[#333]" />
        </div>
        <div class="flex-[8] text-start">
          <h3 class="text-[#333] font-[500] text-[1.2rem] leading-[1.6rem]">
            Chat with our Experts
          </h3>
          <p class="text-[#777] text-[1rem]">For instant advice</p>
        </div>
        <div class="ml-auto flex-[1]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-[6vw] w-[6vw] text-[#777]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </a>

      <!-- Card 4: Request a Sample -->
      <a
        target="_blank"
        href="https://wa.me/97333008801?text=I%20would%20like%20to%20request%20a%20sample"
        class="flex items-center w-full px-[4vw] py-[.9rem] bg-[#f1f1f1] rounded-lg shadow-md border-l-[6px] border-blue-200"
      >
        <div class="pr-[4vw] flex-[1]">
          <sampleIcon class="text-[2.2rem] text-[#333]" />
        </div>
        <div class="flex-[8] text-start">
          <h3 class="text-[#333] font-[500] text-[1.2rem] leading-[1.6rem]">
            Request a Sample
          </h3>
          <p class="text-[#777] text-[1rem]">See, Feel, Decide</p>
        </div>
        <div class="ml-auto flex-[1]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-[6vw] w-[6vw] text-[#777]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </a>

      <!-- Card 5: Whatsapp -->
      <a
        target="_blank"
        href="https://wa.me/97333008801"
        class="flex items-center w-full px-[4vw] py-[.9rem] bg-[#f1f1f1] rounded-lg shadow-md border-l-[6px] border-green-500"
      >
        <div class="pr-[4vw] flex-[1]">
          <Icon icon="mdi:whatsapp" class="text-[2.2rem] text-[#333]" />
        </div>
        <div class="flex-[8] text-start">
          <h3 class="text-[#333] font-[500] text-[1.2rem] leading-[1.6rem]">
            Whatsapp Us
          </h3>
          <p class="text-[#777] text-[1rem]">For Quick Chat</p>
        </div>
        <div class="ml-auto flex-[1]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-[6vw] w-[6vw] text-[#777]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import storeIcon from "~/public/icons/storeIcon.vue";
import homeIcon from "~/public/icons/homeIcon.vue";
import chatIcon from "~/public/icons/chatIcon.vue";
import sampleIcon from "~/public/icons/sampleIcon.vue";
import PersonalAssistanceFormMOB from "./PersonalAssistanceFormMOB.vue";
import QuestionaireMOB from "./QuestionaireMOB.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import useUserStore from "~/stores/user";

const userStore = useUserStore();

const isFormActive = ref(false);
const successMsgActive = ref(false);

function handleCloseForm() {
  isFormActive.value = false;
  ENABLE_SCROLL();
}

function handleSuccessMessageAnimation() {
  handleAutoAlpha("successMsgContainerMOB", 1, 0, 0);
  setTimeout(() => {
    handleAutoAlpha("successMsgContainerMOB", 0, 0, "-200%");
  }, 2400);
}

const bringForm = (type) => {
  userStore.tempString = type;
  isFormActive.value = true;
  DISABLE_SCROLL();
};

onMounted(() => {
  if (process.client) {
    handleScrollTrigger("assistanceCardMOB");
  }
});
</script>

<style scoped>
/* Add any additional custom styles if needed */
</style>
