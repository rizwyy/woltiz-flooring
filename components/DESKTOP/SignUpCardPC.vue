<template>
  <div
    class="newsLetter_temp_div flex gap-[.4vw] opacity-0 invisible items-center translate-x-[50%] h-max w-max py-[1.8vh] bg-black text-[#f1f1f1] fixed top-[6vh] z-[9999] right-[1vw] px-[1vw] rounded-md bg-opacity-[.4] backdrop-blur-[12px]"
    role="status"
    aria-live="polite"
  >
    <Icon icon="material-symbols:download-done-rounded" class="text-[1.8rem]" />
    <span>Subscription successful! We’ll be in touch soon</span>
  </div>
  <div
    class="newsLetter_temp_div2 flex gap-[.4vw] opacity-0 invisible items-center translate-x-[50%] h-max w-max py-[1.8vh] bg-black text-[#f1f1f1] fixed top-[6vh] z-[9999] right-[1vw] px-[1vw] rounded-md bg-opacity-[.4] backdrop-blur-[12px]"
    role="status"
    aria-live="polite"
  >
    <Icon icon="material-symbols:download-done-rounded" class="text-[1.8rem]" />
    <span>Subscription unsuccessful, Try again.</span>
  </div>
  <section
    class="SingUpCardPC opacity-0 translate-y-[4%] w-[60vw] h-max mx-auto relative bg-gradient-to-br from-[#DCEDFD] rounded-lg shadow-lg px-[4vw] py-[6vh] relative font-outfit flex flex-col items-center gap-[2vh]"
  >
    <!-- Sign-up Header -->
    <h2 class="text-center text-[#333] font-[500] text-[2.4rem]">
      SIGN-UP FOR OFFERS!
    </h2>

    <!-- Description -->
    <p class="text-center text-[#777] text-[1.2rem] mt-[.5vh]">
      Receive the latest offers, promotions, and news straight to your inbox.
    </p>

    <!-- Email Input Field -->
    <div class="h-max w-full pt-[4vh]">
      <label for="newsletter-email" class="sr-only">Email address</label>
      <input
        id="newsletter-email"
        v-model="emailIpt"
        @input="onEmailInput"
        type="email"
        placeholder="Enter email address"
        :class="`${
          emailInvalid.value ? 'border-red-500' : 'border-[#ededed]'
        } w-full h-[8vh] rounded-lg px-[2vw] text-[#333] text-[1.2rem] border-[.2vw]  focus:outline-none`"
        :aria-invalid="emailInvalid.value ? 'true' : 'false'"
        aria-label="Email address for newsletter"
      />
    </div>

    <!-- Sign-up Button -->
    <div class="h-max w-full flex justify-center pt-[5.4vh]">
      <button
        type="button"
        @click="handleAddEmailNewsletter"
        :disabled="isLoading.value"
        :aria-busy="isLoading.value ? 'true' : 'false'"
        class="w-[20vw] h-[8vh] shadow-lg bg-inherit text-[#333] text-[1.2rem] tracking-[.1vw] font-[500] border-[#444] border-[.2vh] rounded-md hover:shadow-xl transition-colors duration-300 active:scale-[.96] ease-in-out"
        :class="{ 'opacity-50 cursor-not-allowed': isLoading.value }"
      >
        <span v-if="!isLoading.value">SIGN UP</span>
        <span v-else>Signing up…</span>
      </button>
    </div>
  </section>
</template>

<script setup>
// filepath: /Users/rizwin/Desktop/carpets-neil/components/DESKTOP/SignUpCardPC.vue
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const emailIpt = ref("");
const isLoading = ref(false);
const emailInvalid = ref(false);

/* Reset validation on input */
function onEmailInput() {
  emailInvalid.value = false;
}

/* Simple email validation */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/* Safe helper wrappers to prevent errors when global helpers are absent */
function safeHandleAutoAlpha(className, opacity, topOrX = 0, transform = "") {
  try {
    // Prefer existing global implementation if present
    const fn =
      (typeof handleAutoAlpha !== "undefined" && handleAutoAlpha) ||
      (typeof window !== "undefined" && window.handleAutoAlpha);
    if (fn && typeof fn === "function") {
      fn(className, opacity, topOrX, transform);
      return;
    }
  } catch (e) {
    // fall through to DOM fallback
  }

  // DOM fallback: toggle styles on the first matching element
  if (typeof document === "undefined") return;
  try {
    const el = document.querySelector(`.${className}`);
    if (!el) return;
    // show/hide based on opacity parameter
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
        : "translateX(50%)";
    }
  } catch (e) {
    // swallow
  }
}

function safeHandleScrollTrigger(id) {
  try {
    const fn =
      (typeof handleScrollTrigger !== "undefined" && handleScrollTrigger) ||
      (typeof window !== "undefined" && window.handleScrollTrigger);
    if (fn && typeof fn === "function") {
      fn(id);
    }
  } catch (e) {
    // swallow
  }
}

async function handleAddEmailNewsletter() {
  if (!isValidEmail(emailIpt.value)) {
    emailInvalid.value = true;
    return;
  }

  try {
    isLoading.value = true;
    emailInvalid.value = false;

    const response = await fetch("/api/add-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailIpt.value }),
    });

    if (!response.ok) {
      // try to parse server error message
      let errorMsg = "Failed to subscribe";
      try {
        const json = await response.json();
        errorMsg = json?.message || errorMsg;
      } catch (e) {
        /* ignore parse errors */
      }
      throw new Error(errorMsg);
    }

    // Show success message (use safe wrapper)
    safeHandleAutoAlpha("newsLetter_temp_div", 1, 0, 0);
    emailIpt.value = "";

    // Hide success message after 3 seconds
    setTimeout(() => {
      safeHandleAutoAlpha("newsLetter_temp_div", 0, 0, "50%");
    }, 3000);
  } catch (error) {
    // Show failure message briefly
    console.error("Newsletter subscription error:", error);
    safeHandleAutoAlpha("newsLetter_temp_div2", 1, 0, 0);
    setTimeout(() => {
      safeHandleAutoAlpha("newsLetter_temp_div2", 0, 0, "50%");
    }, 3000);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  if (typeof window !== "undefined") {
    safeHandleScrollTrigger("SingUpCardPC");
  }
});
</script>

<style scoped>
/* ...existing code... */
.sr-only {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
</style>
