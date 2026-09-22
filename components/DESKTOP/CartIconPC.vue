<template>
  <div class="inline-block relative">
    <InvoiceList class="text-[2rem]" />
    <!-- Circle Badge (updated to rem sizing and offsets) -->
    <div
      v-if="userStore.cart.length > 0"
      class="absolute bg-slate-500 text-[0.9rem] font-[500] text-white flex items-center justify-center rounded-full w-[1.6rem] h-[1.6rem]"
      style="top: -0.75rem; right: -0.5rem"
    >
      {{ userStore.cart.length }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, toRaw, unref } from "vue";
import useUserStore from "~/stores/user";
import InvoiceList from "~/public/icons/InvoiceList.vue";

const userStore = useUserStore();

/*
  Helpers: fallback-safe wrappers for project-level utilities
  - If the project exposes addCountryCode / fetchPreferencesByMobile / removeDuplicates globally,
    they will be used. Otherwise fallbacks are provided (non-breaking).
*/
const hasFn = (fnName) => typeof globalThis[fnName] === "function";

function sanitizePhone(phone = "", country) {
  if (!phone) return null;
  if (phone.startsWith("+")) return phone.slice(1);
  if (hasFn("addCountryCode")) {
    const withCode = globalThis.addCountryCode(phone, country || "");
    return withCode?.startsWith("+") ? withCode.slice(1) : withCode;
  }
  // Fallback: return stripped digits
  return phone.replace(/\D/g, "");
}

async function getHistory(phone, country) {
  try {
    const sanitized = sanitizePhone(phone, country);
    if (!sanitized) throw new Error("Invalid phone");

    if (!hasFn("fetchPreferencesByMobile")) {
      console.warn(
        "fetchPreferencesByMobile is not available in global scope."
      );
      return null;
    }

    const result = await globalThis.fetchPreferencesByMobile(sanitized);
    // result might be a reactive object { data, error } or raw
    const data = result?.data ?? result;
    const error = result?.error;

    if (error) throw new Error(error);
    return unref(data);
  } catch (err) {
    console.error("getHistory:", err?.message || err);
    return null;
  }
}

function dedupeById(arr) {
  const map = new Map();
  for (const item of arr) {
    if (!item || !item.id) continue;
    map.set(item.id, item);
  }
  return Array.from(map.values());
}

function mergePreferencesIntoCart(rawHistory) {
  if (!Array.isArray(rawHistory)) return;

  const toPush = [];
  for (const entry of rawHistory) {
    const pref = toRaw(entry?.preference ?? entry);
    const id = entry?.id ?? pref?.id;
    if (!pref) continue;
    const updated = { ...pref, id };
    toPush.push(updated);
  }

  // push and dedupe
  userStore.cart = Array.isArray(userStore.cart)
    ? [...userStore.cart, ...toPush]
    : [...toPush];

  if (hasFn("removeDuplicates")) {
    // prefer project helper if available
    try {
      userStore.cart = globalThis.removeDuplicates(userStore.cart);
    } catch {
      userStore.cart = dedupeById(userStore.cart);
    }
  } else {
    userStore.cart = dedupeById(userStore.cart);
  }
}

onMounted(async () => {
  if (window.innerWidth <= 990) return;

  await nextTick();

  const prefCookie = useCookie("userPreference").value;
  const country = useCookie("ctry").value || "Bahrain";

  if (!prefCookie) return;
  const rawPref = toRaw(prefCookie);
  const phone = rawPref?.phone;

  if (!phone || typeof phone !== "string") return;

  try {
    const history = await getHistory(phone, country);
    if (history && Array.isArray(history)) {
      mergePreferencesIntoCart(history);
    } else {
      console.debug("No history returned or invalid format.");
    }
  } catch (err) {
    console.error("onMounted: failed to hydrate cart:", err?.message || err);
  }
});
</script>
