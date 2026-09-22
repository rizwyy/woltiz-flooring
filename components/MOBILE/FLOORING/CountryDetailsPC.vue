<template>
  <!-- POP UP -->
  <div
    class="countryDetailsPopUp h-[100vh] opacity-0 invisible w-screen flex items-center justify-center bg-[#000] bg-opacity-[.8] backdrop-blur-[8px] z-[9999] fixed top-0 left-0"
  >
    <div
      @click.self="setCountryCookie"
      class="h-full w-full flex items-start justify-center pt-[10rem]"
    >
      <div
        class="w-[28vw] bg-[#fff] bg-opacity-[.9] backdrop-blur-[12px] rounded-md overflow-hidden flex flex-col gap-[2rem] items-center pt-[1.2rem] pb-[1rem] px-[1rem] text-[#f1f1f1] relative shadow-2xl"
      >
        <div class="w-full flex flex-col items-center gap-[4rem]">
          <div class="w-full flex flex-col items-center gap-[2rem]">
            <span
              class="text-[1.5rem] leading-[2.4rem] w-full text-start text-[#222]"
              >Choose Your Country</span
            >
            <div class="h-max w-full flex flex-col gap-[.6rem]">
              <span
                class="text-[.8rem] font-[400] w-full text-start text-[#666]"
                >Current Country: {{ userStore.preference.country }}</span
              >
              <select
                @change="handleChangeInCountry"
                v-model="userStore.preference.country"
                class="w-full bg-inherit rounded-md border-[1px] border-[#666] px-[.4rem] py-[.6rem] text-[.8rem] text-[#000] outline-none bg-black"
              >
                <option value="Bahrain">Bahrain</option>
                <option value="UAE">UAE</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Qatar">Qatar</option>
              </select>
            </div>
          </div>

          <button
            @click="() => setCountryCookie()"
            class="rounded-sm text-[1rem] bg-[#111] text-[#f1f1f1] py-[1rem] w-full"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- COUNTRY DISPLAY BUTTON -->
  <div
    @click="handleEnableCountryOverlay"
    class="h-full flex items-center gap-[.8vw] bg-[#ededed] border-[1px] rounded-md px-[.8vw] py-[0.2rem] w-max"
  >
    <span class="text-[.8rem]">
      <BahrainFlagIcon v-show="userStore.preference.country === 'Bahrain'" />
      <QatarFlagIcon v-show="userStore.preference.country === 'Qatar'" />
      <SaudiFlagIcon v-show="userStore.preference.country === 'Saudi Arabia'" />
      <KuwaitFlagIcon v-show="userStore.preference.country === 'Kuwait'" />
      <UaeFlagIcon v-show="userStore.preference.country === 'UAE'" />
    </span>
    <span class="text-[.8rem] text-center flex items-center">
      {{ userStore.preference.country }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-[1.2rem]"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M12 14.308L8.192 10.5h7.616z" />
      </svg>
    </span>
  </div>
</template>
<script setup>
import BahrainFlagIcon from "~/public/icons/BahrainFlagIcon.vue";
import KuwaitFlagIcon from "~/public/icons/KuwaitFlagIcon.vue";
import QatarFlagIcon from "~/public/icons/QatarFlagIcon.vue";
import SaudiFlagIcon from "~/public/icons/SaudiFlagIcon.vue";
import UaeFlagIcon from "~/public/icons/UaeFlagIcon.vue";
import useUserStore from "~/stores/user";
const ctry = useCookie("ctry");

const userStore = useUserStore();
const countriesAndCurrencies = {
  Bahrain: "BHD",
  UAE: "AED",
  SaudiArabia: "SAR",
  Kuwait: "KWD",
  Qatar: "QAR",
};

function handleEnableCountryOverlay() {
  handleAutoAlpha("countryDetailsPopUp", 1);
  DISABLE_SCROLL();
}

function setCountryCookie() {
  ctry.value = userStore.preference.country;
  handleAutoAlpha("countryDetailsPopUp", 0);
  ENABLE_SCROLL();
}
function handleChangeInCountry() {
  userStore.userData.phone = "";
}
onMounted(() => {
  const TIMEOUT_DURATION = 2000;

  if (toRaw(ctry.value)) {
    userStore.preference.country = toRaw(ctry.value);
    return;
  }

  setTimeout(() => {
    handleAutoAlpha("countryDetailsPopUp", 1);
  }, TIMEOUT_DURATION);
});
</script>

<style lang="scss" scoped></style>
