<template>
  <div
    class="successMsgContainerPC opacity-0 translate-x-[200%] fixed bg-[#000] bg-opacity-[.4] text-[#f1f1f1] backdrop-blur-[12px] border-[0px] top-[4%] right-[1%] h-[3.4rem] w-[15vw] gap-[.4vw] flex px-[2vw] items-center rounded-md z-[99999]"
    role="status"
    aria-live="polite"
  >
    <span>Form submitted</span
    ><Icon class="text-[1.2rem]" icon="lets-icons:done-all-alt-round" />
  </div>
  <QuestionairePC
    @close="handleCloseForm"
    v-if="isFormActive"
    @success="handleSuccessMessageAnimation"
  />
  <section
    class="PersonalAssistancePC opacity-0 translate-y-[6%] w-[60vw] mx-auto mt-[6vh] mb-[8vh]"
  >
    <!-- Title -->
    <h2
      class="text-[#333] text-center text-[2.4rem] tracking-[-.05vw] font-[400] mb-[8vh]"
    >
      Personal Assistance
    </h2>

    <!-- Assistance options -->
    <div class="space-y-[4vh]">
      <!-- Card 1: Book a home visit -->
      <a
        target="_blank"
        href="https://wa.me/97333008801?text=I%20would%20like%20to%20book%20a%20store%20visit"
        type="button"
        class="active:scale-[1] hover:translate-x-[1%] transition-all duration-[.2s] ease-in-out flex items-center px-[2vw] py-[2vh] bg-[#f1f1f1] rounded-lg shadow-md border-l-[8px] border-blue-200 w-full"
      >
        <div class="mr-[2vw] flex-[1]">
          <homeIcon class="text-[2.2rem] text-[#333]" />
        </div>
        <div class="flex-[18] flex flex-col items-start">
          <h3 class="text-[#333] font-[500] text-[1.2rem]">
            Book a home visit
          </h3>
          <p class="text-[#777] text-[1rem]">Bring our collection to you.</p>
        </div>
        <div class="ml-auto flex-[1]">
          <arrowDownIcon class="text-[2rem]" />
        </div>
      </a>

      <!-- Card 2: Book a store Visit -->
      <a
        target="_blank"
        href="https://wa.me/97333008801?text=I%20would%20like%20to%20book%20a%20store%20visit"
        type="button"
        class="active:scale-[1] hover:translate-x-[1%] transition-all duration-[.2s] ease-in-out flex items-center px-[2vw] py-[2vh] bg-[#f1f1f1] rounded-lg shadow-md border-l-[8px] border-blue-200 w-full"
      >
        <div class="mr-[2vw] flex-[1]">
          <storeIcon class="text-[2.2rem] text-[#333]" />
        </div>
        <div class="flex-[18] flex flex-col items-start">
          <h3 class="text-[#333] font-[500] text-[1.2rem]">
            Book a store Visit
          </h3>
          <p class="text-[#777] text-[1rem]">Book your appointment now</p>
        </div>
        <div class="ml-auto flex-[1]">
          <arrowDownIcon class="text-[2rem]" />
        </div>
      </a>

      <!-- Card 3: Chat with experts -->
      <a
        target="_blank"
        href="https://wa.me/97333008801?text=I%20would%20like%20to%20chat%20with%20an%20expert"
        class="active:scale-[1] hover:translate-x-[1%] transition-all duration-[.2s] ease-in-out flex items-center px-[2vw] py-[2vh] bg-[#f1f1f1] rounded-lg shadow-md border-l-[8px] border-blue-200 w-full"
      >
        <div class="mr-[2vw] flex-[1]">
          <chatIcon class="text-[2.2rem] text-[#333]" />
        </div>
        <div class="flex-[18] flex flex-col items-start">
          <h3 class="text-[#333] font-[500] text-[1.2rem]">
            Chat with our Experts
          </h3>
          <p class="text-[#777] text-[1rem]">For instant advice</p>
        </div>
        <div class="ml-auto flex-[1]">
          <arrowDownIcon class="text-[2rem]" />
        </div>
      </a>
      <!-- Card 4: Request a Sample -->
      <a
        target="_blank"
        href="https://wa.me/97333008801?text=I%20would%20like%20to%20request%20a%20sample"
        type="button"
        class="active:scale-[1] hover:translate-x-[1%] transition-all duration-[.2s] ease-in-out flex items-center px-[2vw] py-[2vh] bg-[#f1f1f1] rounded-lg shadow-md border-l-[8px] border-blue-200 w-full"
      >
        <div class="mr-[2vw] flex-[1]">
          <sampleIcon class="text-[2.2rem] text-[#333]" />
        </div>
        <div class="flex-[18] flex flex-col items-start">
          <h3 class="text-[#333] font-[500] text-[1.2rem]">Request a Sample</h3>
          <p class="text-[#777] text-[1rem]">See, Feel, Decide</p>
        </div>
        <div class="ml-auto flex-[1]">
          <arrowDownIcon class="text-[2rem]" />
        </div>
      </a>
      <!-- Card 5: Whatsapp-->
      <a
        target="_blank"
        href="https://wa.me/97333008801"
        type="button"
        class="active:scale-[1] hover:translate-x-[1%] transition-all duration-[.2s] ease-in-out flex items-center px-[2vw] py-[2vh] bg-[#f1f1f1] rounded-lg shadow-md border-l-[8px] border-green-500 w-full"
      >
        <div class="mr-[2vw] flex-[1]">
          <Icon icon="mdi:whatsapp" class="text-[2.2rem] text-[#333]" />
        </div>
        <div class="flex-[18] flex flex-col items-start">
          <h3 class="text-[#333] font-[500] text-[1.2rem]">WhatsApp Us</h3>
          <p class="text-[#777] text-[1rem]">For Quick Chat</p>
        </div>
        <div class="ml-auto flex-[1]">
          <arrowDownIcon class="text-[2rem]" />
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { Icon } from "@iconify/vue";
import useUserStore from "~/stores/user";

/* Lazy-load icon components and the questionnaire to reduce initial bundle weight */
const storeIcon = defineAsyncComponent(
  () => import("~/public/icons/storeIcon.vue"),
);
const homeIcon = defineAsyncComponent(
  () => import("~/public/icons/homeIcon.vue"),
);
const chatIcon = defineAsyncComponent(
  () => import("~/public/icons/chatIcon.vue"),
);
const sampleIcon = defineAsyncComponent(
  () => import("~/public/icons/sampleIcon.vue"),
);
const arrowDownIcon = defineAsyncComponent(
  () => import("~/public/icons/arrowRightIcon.vue"),
);
const QuestionairePC = defineAsyncComponent(
  () => import("../MOBILE/FLOORING/QuestionairePC.vue"),
);

const userStore = useUserStore();
// Define a ref variable in the parent
const isFormActive = ref(false);

/* Safe helper wrappers to avoid runtime errors if globals are missing */
function safeDisableScroll() {
  try {
    if (typeof DISABLE_SCROLL === "function") return DISABLE_SCROLL();
    if (
      typeof window !== "undefined" &&
      typeof window.DISABLE_SCROLL === "function"
    )
      return window.DISABLE_SCROLL();
    if (typeof document !== "undefined")
      document.body.style.overflow = "hidden";
  } catch (e) {
    /* swallow */
  }
}
function safeEnableScroll() {
  try {
    if (typeof ENABLE_SCROLL === "function") return ENABLE_SCROLL();
    if (
      typeof window !== "undefined" &&
      typeof window.ENABLE_SCROLL === "function"
    )
      return window.ENABLE_SCROLL();
    if (typeof document !== "undefined") document.body.style.overflow = "";
  } catch (e) {
    /* swallow */
  }
}

function safeHandleAutoAlpha(className, opacity, topOrX = 0, transform = 0) {
  try {
    const fn =
      (typeof handleAutoAlpha !== "undefined" && handleAutoAlpha) ||
      (typeof window !== "undefined" && window.handleAutoAlpha);
    if (fn && typeof fn === "function") {
      fn(className, opacity, topOrX, transform);
      return;
    }
  } catch (e) {
    // fallthrough to DOM fallback
  }
  if (typeof document === "undefined") return;
  const el = document.querySelector(`.${className}`);
  if (!el) return;
  if (opacity && Number(opacity) > 0) {
    el.style.visibility = "visible";
    el.style.opacity = "1";
    el.style.transform = transform
      ? `translateX(${transform})`
      : "translateX(0)";
  } else {
    el.style.opacity = "0";
    el.style.visibility = "hidden";
    el.style.transform = transform
      ? `translateX(${transform})`
      : "translateX(200%)";
  }
}

function safeHandleScrollTrigger(id) {
  try {
    const fn =
      (typeof handleScrollTrigger !== "undefined" && handleScrollTrigger) ||
      (typeof window !== "undefined" && window.handleScrollTrigger);
    if (fn && typeof fn === "function") fn(id);
  } catch (e) {
    /* swallow */
  }
}

/* Function to handle the 'close' event emitted by the child component */
function handleCloseForm() {
  isFormActive.value = false; // Close the form by setting this to false
  safeEnableScroll();
}
function handleSuccessMessageAnimation() {
  safeHandleAutoAlpha("successMsgContainerPC", 1, 0, 0);
  setTimeout(() => {
    safeHandleAutoAlpha("successMsgContainerPC", 0, "200%", 0);
  }, 2400);
}

const bringForm = (str) => {
  userStore.tempString = str;
  isFormActive.value = true;
  safeDisableScroll();
};
onMounted(() => {
  safeHandleScrollTrigger("PersonalAssistancePC");
});
</script>

<style scoped>
/* ...existing code... */
</style>
