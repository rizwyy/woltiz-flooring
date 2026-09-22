<template>
  <section
    class="max-[990px]:hidden h-[100vh] w-[100vw] fixed top-0 left-0 bg-[#fff9] backdrop-blur-[8px] z-[99999]"
  >
    <div
      @click.self="closeForm"
      class="h-[100svh] w-full relative flex items-center justify-center"
    >
      <div
        class="h-[75svh] bg-[#fff9] backdrop-blur-[22px] w-[80vw] border-[2px] flex flex-col gap-[8vh] items-center justify-center rounded-md border-black py-[4vh] px-[2vw]"
      >
        <div
          v-if="showSummary"
          class="h-full w-full flex flex-col justify-between"
        >
          <span class="text-[2.4rem]">Summary</span>
          <div
            class="h-max w-full flex flex-col gap-[5vh] text-[1.2rem] text-[#333]"
          >
            <span
              >Name: <span>{{ nameIpt }}</span></span
            >
            <span
              >Phone: <span>{{ phoneIpt }}</span></span
            >
            <span
              >Company: <span>{{ companyDetailsIpt }}</span></span
            >
            <span
              >Mail: <span>{{ emailIpt }}</span></span
            >
          </div>
          <div class="h-max w-full flex gap-[2vw]">
            <button
              @click="() => (showSummary = false)"
              class="w-full flex items-center justify-center border-[#666] active:scale-[.93] w-full border-[2.4px] tracking-[.2vw] rounded-md py-[2.8vh] uppercase font-[500] text-[1.4vw] px-[2vw] outline-none"
            >
              EDIT
            </button>
            <button
              @click="closeForm"
              class="w-full flex items-center justify-center border-[#666] active:scale-[.93] w-full border-[2.4px] tracking-[.2vw] rounded-md py-[2.8vh] uppercase font-[500] text-[1.4vw] px-[2vw] outline-none"
            >
              DONE
            </button>
          </div>
        </div>
        <div v-else class="h-full w-full flex flex-col justify-between">
          <div class="h-max w-full flex justify-between">
            <div class="h-max w-full flex flex-col items-start">
              <span
                class="InfoCardPC-HEADING w-max text-[2.4vw] font-[400] text-[#444]"
                >Your Contact Information</span
              >
              <span
                class="InfoCardPC-HEADING text-[#999] text-[1.4vw] font-[450]"
                >Enter your contact information</span
              >
              <span
                v-show="isNameInvalid || isMailInvalid || isPhoneInvalid"
                class="text-red-400 text-[1.2vw] font-[450]"
                >Something went wrong!</span
              >
            </div>
            <div
              @click="closeForm"
              class="h-max w-max font-[500] tracking-[.1vw] cursor-pointer text-[1.2vw] hover:translate-y-[-2%] ease-in-out duration-300 transition-all hover:scale-[1.1]"
            >
              CLOSE
            </div>
          </div>
          <div class="h-max w-full flex flex-col gap-[2vh]">
            <div class="h-max w-full flex justify-between gap-[4vw]">
              <div class="h-max w-[50%] flex flex-col gap-[1.2vh] items-start">
                <span>Name</span>
                <input
                  :class="{
                    'border-red-500 focus:border-red-300': isNameInvalid,
                    'border-[#555] focus:border-black': !isNameInvalid,
                  }"
                  class="border-[2px] w-full rounded-md px-[1.2vw] border-[#555] bg-[#fff9] py-[2.4vh] outline-none focus:border-black text-[1.2vw]"
                  placeholder="Name"
                  v-model="nameIpt"
                />
              </div>
              <div class="h-max w-[50%] flex flex-col gap-[1vh] items-start">
                <span>Email</span>
                <input
                  :class="{
                    'border-red-500 focus:border-red-300': isMailInvalid,
                    'border-[#555] focus:border-black': !isMailInvalid,
                  }"
                  :required="emailIpt.length > 10"
                  type="email"
                  class="border-[2px] w-[100%] rounded-md px-[1.2vw] border-[#555] text-[1.2vw] py-[2.4vh] outline-none focus:border-black"
                  placeholder="Mail"
                  v-model="emailIpt"
                />
              </div>
            </div>

            <div class="h-max w-full flex justify-between gap-[4vw]">
              <div class="h-max w-[50%] flex flex-col gap-[1vh] items-start">
                <span>Company Details</span>
                <input
                  :class="{
                    'border-red-500 focus:border-red-300':
                      isCompanyDetailsInvalid,
                    'border-[#555] focus:border-black':
                      !isCompanyDetailsInvalid,
                  }"
                  type="text"
                  class="border-[2px] w-[100%] rounded-md px-[1.2vw] border-[#555] text-[1.2vw] py-[2.4vh] outline-none focus:border-black"
                  placeholder="Company Name & Address"
                  v-model="companyDetailsIpt"
                />
              </div>
              <div
                :class="[
                  `h-max flex flex-col gap-[1vh] items-start ${'w-[50%]'}`,
                ]"
              >
                <span>Phone</span>
                <div class="h-max w-full flex">
                  <select
                    :class="{
                      'border-red-500 focus:border-red-300': isPhoneInvalid,
                      'border-[#555] focus:border-black': !isPhoneInvalid,
                    }"
                    v-model="userStore.preference.country"
                    class="w-max rounded-l-md border-[2px] border-r-[0px] border-[#555] bg-[#fff9] py-[2.4vh] px-[.8vw] text-[1.2vw] outline-none w-full"
                  >
                    <option value="Bahrain">+973</option>
                    <option value="UAE">+971</option>
                    <option value="Saudi Arabia">+966</option>
                    <option value="Kuwait">+965</option>
                    <option value="Qatar">+974</option>
                  </select>
                  <input
                    :readonly="formValidated"
                    :class="{
                      'border-red-500 focus:border-red-300': isPhoneInvalid,
                      'border-[#555] focus:border-black': !isPhoneInvalid,
                    }"
                    type="number"
                    class="[appearance:textfield] w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-[2px] w-full rounded-r-md px-[1.2vw] bg-[#fff9] py-[2.4vh] text-[1.2vw] outline-none"
                    placeholder="Phone"
                    v-model="phoneIpt"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="h-max w-full flex justify-between gap-[3.2vw]">
            <button
              @click="handleInfoProceedings()"
              :class="[
                ' w-full flex items-center justify-center  border-[#666] active:scale-[.93]  w-full border-[2.4px] tracking-[.2vw] rounded-md py-[2.8vh] uppercase font-[500] text-[1.4vw] px-[2vw] outline-none',
              ]"
            >
              <span v-if="isLoading && !showSuccessMsg"
                ><loadingIconVue class="text-[2.8vw]"
              /></span>
              <span
                class="flex items-center gap-[.4vw]"
                v-else-if="!isLoading && showSuccessMsg"
                >Done <TickIcon class="text-[2.8vw]"
              /></span>
              <span v-else>PROCEED</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import loadingIconVue from "~/public/icons/loadingIcon.vue";
import TickIcon from "~/public/icons/TickIcon.vue";
import useUserStore from "~/stores/user";
const emit = defineEmits(["close"]);
// Define form inputs and validation states
const emailIpt = ref("");
const nameIpt = ref("");
const phoneIpt = ref("");
const showSummary = ref(false);
const isNameInvalid = ref(false);
const isMailInvalid = ref(false);
const companyDetailsIpt = ref("");
const isCompanyDetailsInvalid = ref(false);
const formValidated = ref(false);
const isPhoneInvalid = ref(false);
const isLoading = ref(false);
const showSuccessMsg = ref(false);
// Get user store
const userStore = useUserStore();

// The closeForm function which emits an event
const props = defineProps({
  formType: String, // Accept the form type from parent
});

const closeForm = () => {
  emit("close");
};
function validateInputFields() {
  const email = "test@test.com"; // Placeholder email

  // Add country code to phone input if phone input exists
  const phoneWithCode = phoneIpt?.value
    ? addCountryCode(phoneIpt.value, userStore.preference.country)
    : "";
  const validationResults = validateInputs(
    emailIpt.value,
    phoneWithCode,
    nameIpt.value
  );
  // Check for empty fields
  const isNameEmpty = !nameIpt?.value?.trim();
  const isPhoneEmpty = !phoneIpt?.value;
  const isMailEmpty = !emailIpt?.value?.trim();
  const isCompanyDetailsEmpty = !companyDetailsIpt?.value?.trim();

  // Handle empty fields
  isNameInvalid.value = isNameEmpty;
  isPhoneInvalid.value = isPhoneEmpty;
  isMailInvalid.value = isMailEmpty;
  isCompanyDetailsInvalid.value = isCompanyDetailsEmpty;

  if (isNameEmpty || isPhoneEmpty || isCompanyDetailsEmpty || isMailEmpty) {
    formValidated.value = false;
    return;
  }

  // Validate inputs using validateInputs utility
  // Check if all fields are valid
  const isValid =
    validationResults.isEmailValid &&
    validationResults.isPhoneValid &&
    validationResults.isNameValid &&
    !isCompanyDetailsInvalid.value; // Ensure company details are filled

  if (!isValid) {
    isMailInvalid.value = !validationResults.isEmailValid;
    isPhoneInvalid.value = !validationResults.isPhoneValid;
    isNameInvalid.value = !validationResults.isNameValid;
    formValidated.value = false;
    return;
  }

  // Reset error flags if all fields are valid
  isPhoneInvalid.value = false;
  isNameInvalid.value = false;
  isCompanyDetailsInvalid.value = false;

  // Update form validation state if all inputs are valid
  formValidated.value = true;
}

function handleInfoProceedings() {
  isLoading.value = true;
  validateInputFields();
  if (!formValidated.value) {
    isLoading.value = false;
    return;
  }
  setTimeout(() => {
    isLoading.value = false;
    showSummary.value = true;
  }, 1000);
}
</script>

<style lang="scss" scoped></style>
