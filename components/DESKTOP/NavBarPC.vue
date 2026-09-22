<template>
  <!-- Top nav -->
  <section
    class="navBarPC max-[990px]:hidden h-max w-full max-w-[100vw] overflow-x-hidden flex items-center justify-between py-[1.2rem] px-[6vw] bg-gradient-to-b from-[#fff] to-[#f1f1f1] font-outfit"
    role="navigation"
    aria-label="Main navigation"
  >
    <!-- Left: Menu icon -->
    <div class="h-full w-[35%] flex items-center justify-start">
      <Icon
        @click="openMenu"
        icon="pajamas:hamburger"
        class="text-[2rem] cursor-pointer text-[#222]"
        aria-hidden="false"
        aria-label="Open menu"
      />
    </div>

    <!-- Center: Brand -->
    <div class="h-full w-[25%] flex justify-center items-center">
      <a
        href="/"
        class="h-max w-max block font-[300] text-[3.2rem] text-[#333] tracking-[-.1vw]"
        aria-label="Floorsir home"
      >
        Floorsir
      </a>
    </div>

    <!-- Right: Actions -->
    <div class="h-full w-[35%] flex justify-end gap-[4vw] items-center">
      <CartIconPC @click="openCart" class="cursor-pointer text-[2rem]" />
      <SearchBarPC class="cursor-pointer text-[2rem]" />
    </div>
  </section>

  <!-- MENU PAGE -->
  <div
    @click.self="closeMenu"
    class="menuPagePC opacity-0 invisible font-outfit fixed top-0 left-0 h-[100dvh] flex flex-col justify-end w-screen bg-transparent z-[999999] backdrop-blur-[12px] bg-[#fff1]"
  >
    <div
      class="menuPageContainerPC translate-x-[-100%] opacity-0 invisible h-full w-[50%] bg-[#f1f1f1] flex flex-col items-start overflow-hidden rounded-r-lg"
    >
      <!-- Header -->
      <div
        class="h-max w-full px-[4vw] items-center flex justify-between pt-[4vh]"
      >
        <a
          href="/"
          class="h-max w-max font-[300] text-[3rem] text-[#333] tracking-[-.1vw]"
        >
          Floorsir
        </a>

        <Icon
          @click="closeMenu"
          icon="material-symbols:close-small-rounded"
          class="text-[3.2rem] text-[#777] cursor-pointer"
          aria-label="Close menu"
        />
      </div>

      <!-- Links -->
      <nav
        class="h-[62vh] w-screen flex flex-col justify-center gap-[2.8vh] items-start px-[4.2vw] text-[#666]"
      >
        <a
          class="flex items-center gap-[1vw] hover:translate-x-[5%] duration-300 transition-all ease-in-out text-[1.6rem]"
          href="/"
          >Flooring <arowTopRightIcon
        /></a>
        <a
          class="flex items-center gap-[1vw] hover:translate-x-[5%] duration-300 transition-all ease-in-out text-[1.6rem]"
          href="/about"
          >About <arowTopRightIcon
        /></a>
        <a
          class="flex items-center gap-[1vw] hover:translate-x-[5%] duration-300 transition-all ease-in-out text-[1.6rem]"
          href="/contact"
          >Contact <arowTopRightIcon
        /></a>
        <a
          class="flex items-center gap-[1vw] hover:translate-x-[5%] duration-300 transition-all ease-in-out text-[1.6rem]"
          href="/privacy"
          >Privacy Policy <arowTopRightIcon
        /></a>
        <a
          class="flex items-center gap-[1vw] hover:translate-x-[5%] duration-300 transition-all ease-in-out text-[1.6rem]"
          href="/careers"
          >Careers <arowTopRightIcon
        /></a>
      </nav>

      <!-- Footer area within menu -->
      <div class="h-[32vh] w-screen flex flex-col justify-between">
        <div class="flex h-max w-full justify-between px-[4vw] items-center">
          <a
            class="flex items-center gap-[1vw] bg-[#222] hover:shadow-xl hover:translate-y-[-2%] duration-300 transition-all ease-in-out px-[1.8vw] text-[1.6rem] rounded-sm text-[#f1f1f1] py-[1.2vh]"
            href="/designer"
            >Designer Login</a
          >
        </div>

        <div
          class="flex h-max w-full justify-between px-[4vw] py-[4vh] text-[1.4rem] items-center"
        >
          <span class="h-max w-[40%] text-[1.2rem] text-[#888]"
            >Delivering Quality Flooring Solutions.</span
          >
        </div>
      </div>
    </div>
  </div>

  <!-- CART PAGE -->
  <div
    @click.self="closeCart"
    class="cartPagePC invisible opacity-0 font-outfit fixed top-0 left-0 h-[100dvh] flex justify-end w-screen bg-transparent z-[999999] backdrop-blur-[12px] bg-[#fff1]"
  >
    <div
      v-auto-animate
      class="h-full w-[42%] bg-[#f1f1f1] rounded-l-lg flex flex-col items-start relative cartPageContainerPC invisible opacity-0 translate-x-[50%]"
    >
      <!-- Top: header when cart has items -->
      <div
        v-if="userStore.cart.length > 0"
        class="h-max w-full flex items-center justify-between py-[3.2vh] px-[2vw]"
      >
        <Icon
          @click="closeCart"
          icon="material-symbols:close-small-rounded"
          class="text-[3.2rem] text-[#777] cursor-pointer"
          aria-label="Close cart"
        />

        <div class="h-max w-max flex flex-col">
          <span class="text-[1.6rem] flex items-center gap-[1rem]">
            <span class="flex flex-col items-start">
              <span class="text-[1.2rem]"
                >Hi, {{ capitalizeName(userPreference.name) }}</span
              >
              <button
                class="text-[1rem] text-[#999] w-full text-right font-[300] tracking-[.1vw]"
              >
                {{ userPreference.phone }}
              </button>
            </span>
          </span>
        </div>
      </div>

      <!-- Top: header when cart empty -->
      <div
        v-else
        class="h-max w-full flex justify-between items-center pt-[4vh] px-[2vw] text-[2rem]"
      >
        <a
          href="/"
          class="h-max w-max font-[300] text-[2.8rem] text-[#333] tracking-[-.rem]"
          >Floorsir</a
        >
        <Icon
          @click="closeCart"
          icon="material-symbols:close-small-rounded"
          class="text-[3.2rem] text-[#777] cursor-pointer"
          aria-label="Close cart"
        />
      </div>

      <!-- Scrollable content -->
      <div
        v-auto-animate
        :key="userStore.cartKey"
        v-if="userStore.cart.length > 0"
        class="flex-grow w-full overflow-y-auto px-0 pb-[12vh]"
      >
        <ul>
          <li v-for="(item, index) in userStore.cart" :key="index">
            <ReusablePrefNavCardMOB :item="item" />
          </li>
        </ul>

        <div v-auto-animate class="h-max w-[42rem] fixed bottom-0 right-0">
          <button
            @click="HandleOrderConfirmation"
            class="text-[2rem] flex items-center justify-center w-full tracking-[.2vw] px-[4vw] py-[1.6rem] text-white bg-[#222] text-center shadow-xl rounded-bl-lg"
          >
            <Icon
              v-if="isConfirmLoading"
              class="text-white text-[1.2rem]"
              icon="eos-icons:three-dots-loading"
            />
            <span class="text-[1.2rem]" v-else> PROCEED TO CHECKOUT </span>
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else
        class="h-max w-full flex items-center justify-between flex-col gap-[4rem] pt-[3rem] flex-grow"
      >
        <div
          class="h-max w-full px-[1.2vw] flex items-center justify-around flex-col gap-[1rem] flex-[4]"
        >
          <Icon
            icon="mdi:cart-off"
            class="text-[12rem] text-[#999] cursor-pointer"
          />
          <span class="text-[1rem] font-[300] text-center">
            Oops! It looks like you don't have any saved preferences yet. <br />
            Start exploring and add your favorite options!
          </span>
        </div>

        <div class="h-max w-full relative flex justify-center flex-[1]">
          <button
            class="text-[1.8rem] w-full bg-[#222] text-[#f1f1f1] text-center flex items-center justify-center py-[1.2rem] tracking-[.4vw]"
            @click="closeCart"
          >
            EXPLORE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRaw } from "vue";
import { defineAsyncComponent } from "vue";
import useUserStore from "~/stores/user";
import SearchBarPC from "../SearchBar/SearchBarPC.vue";
import loadingIcon from "~/public/icons/loadingIcon.vue";
import arowTopRightIcon from "~/public/icons/arowTopRightIcon.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";

const userStore = useUserStore();
const router = useRouter();

const CartIconPC = defineAsyncComponent(() => import("./CartIconPC.vue"));
const ReusablePrefNavCardMOB = defineAsyncComponent(() =>
  import("./../MOBILE/FLOORING/DetailsReviewCards/ReusablePrefNavCard.vue")
);

// UI state
const isMenuOpen = ref(false);
const isCartOpen = ref(false);
const isConfirmLoading = ref(false);

// user preference cookie
const restrictedAccess = useCookie("restrictedAccess");
const userPreference = ref(null);

/* -------------------------
   Utility helpers
   ------------------------- */
function capitalizeName(name) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/* -------------------------
   Menu / Cart open/close
   (keeps existing DOM helpers calls)
   ------------------------- */
function openMenu() {
  isMenuOpen.value = true;
  handleAutoAlpha("menuPagePC", 1);
  DISABLE_SCROLL();
  handleAutoAlpha("menuPageContainerPC", 1, 0, 0);
}
function closeMenu() {
  handleAutoAlpha("menuPagePC", 0);
  ENABLE_SCROLL();
  handleAutoAlpha("menuPageContainerPC", 0, "-50%", 0);
  isMenuOpen.value = false;
}

function openCart() {
  isCartOpen.value = true;
  handleAutoAlpha("cartPagePC", 1);
  DISABLE_SCROLL();
  handleAutoAlpha("cartPageContainerPC", 1, 0, 0);
}
function closeCart() {
  handleAutoAlpha("cartPagePC", 0);
  ENABLE_SCROLL();
  handleAutoAlpha("cartPageContainerPC", 0, "50%", 0);
  isCartOpen.value = false;
}

/* -------------------------
   Order confirmation flow
   - async/await
   - clear incorrect reference bug fixed
   - robust error handling
   ------------------------- */
const HandleOrderConfirmation = async () => {
  if (!userStore?.cart?.length) return;

  isConfirmLoading.value = true;
  try {
    // ensure cookie set on server
    const { data, error } = await useFetch("/api/set-cookie");
    if (error?.value) throw new Error(error.value);

    // Update logs for each cart item (sequential to preserve order)
    for (const item of userStore.cart) {
      item.isOrderConfirmed = true;

      const phone =
        userStore.userData?.phone?.startsWith("+") === true
          ? userStore.userData.phone
          : addCountryCode(
              userStore.userData?.phone || "",
              userStore.preference?.country
            );

      const userData = {
        id: item.id,
        name: userStore.userData?.name || "",
        phone,
        email: userStore.userData?.email || "",
        preference: item,
        isOrderConfirmed: true,
      };

      const response = await fetch("/api/update-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "unknown");
        throw new Error(
          `Failed updating log for item ${item.id}: ${response.status} ${text}`
        );
      }
    }

    // Clear sensitive user data and cart (use store fields consistently)
    if (userStore.userData) {
      userStore.userData.email = "";
      userStore.userData.name = "";
      userStore.userData.phone = "";
    }
    // If your store exposes an action to clear cart, prefer that. Fallback:
    if (Array.isArray(userStore.cart)) userStore.cart = [];

    userPreference.value = null;
    restrictedAccess.value = false;

    // navigate after successful confirmation
    await router.push("/flooring/checkout");
  } catch (err) {
    restrictedAccess.value = true;
    handleTempAnimation("errOverlayMOB");
    console.error("Order confirmation error:", err?.message || err);
  } finally {
    isConfirmLoading.value = false;
  }
};

/* -------------------------
   Mounted: hydrate preference
   ------------------------- */
onMounted(() => {
  handleDOMEntry("navBarMOB");

  const cookieVal = useCookie("userPreference").value;
  if (cookieVal && typeof toRaw(cookieVal).name === "string") {
    userPreference.value = cookieVal;
  }
});
</script>
<style scoped>
.font-outfit {
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
}
</style>
