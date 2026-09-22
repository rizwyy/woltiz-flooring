<template>
  <section
    class="min-[990px]:hidden h-[100vh] w-[100vw] fixed top-0 left-0 bg-[#fff9] backdrop-blur-[8px] z-[99999]"
  >
    <div
      @click.self="closeForm"
      class="h-[100svh] w-full relative flex items-start pt-[6svh] justify-center"
    >
      <div
        class="h-max w-[92vw] border-[2px] flex flex-col gap-[8vh] items-center justify-center rounded-md border-black py-[4.8vh] px-[2vw]"
      >
        <div v-if="showSummary" class="h-full w-full flex flex-col gap-[4vh]">
          <span class="text-[2rem]">Summary</span>
          <div class="h-full w-full flex flex-col gap-[1rem] text-[#333]">
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
          <div class="h-max w-full flex flex-col gap-[2rem] pt-[2rem]">
            <button
              @click="() => (showSummary = false)"
              class="w-full flex items-center justify-center border-[#666] w-full border-[2.4px] tracking-[.2vw] rounded-md py-[1rem] uppercase font-[500] text-[.9rem] px-[2vw] outline-none"
            >
              EDIT
            </button>
            <button
              @click="closeForm"
              class="w-full flex items-center justify-center border-[#666] w-full border-[2.4px] tracking-[.2vw] rounded-md py-[1rem] uppercase font-[500] text-[.9rem] px-[2vw] outline-none"
            >
              DONE
            </button>
          </div>
        </div>
        <div
          v-else
          class="h-full w-full flex flex-col justify-between gap-[2rem]"
        >
          <div class="h-max w-full flex justify-between pr-[2vw]">
            <div class="h-max w-full flex flex-col items-start">
              <span
                class="InfoMOB-HEADING w-max text-[1.8rem] tracking-[-.2vw] font-[400] text-[#444]"
              >
                Contact Information</span
              >
              <span
                class="InfoMOB-HEADING mb-[1vh] text-[#999] text-[1rem] font-[450]"
                >Enter your contact information</span
              >
              <span
                v-show="isNameInvalid || isMailInvalid || isPhoneInvalid"
                class="text-red-400 text-[.8rem] font-[450]"
                >Something went wrong!</span
              >
            </div>
            <span @click="closeForm"><closeIcon class="text-[3.8vh]" /></span>
          </div>

          <div class="h-max w-full flex flex-col gap-[1.4rem]">
            <input
              :class="[
                'border-[2px] rounded-md px-[2.4vw] py-[.8rem] outline-none  border-[#555]',
                {
                  'bg-gray-300 cursor-not-allowed ': formValidated,
                  'bg-white': !formValidated,
                  'border-red-500 focus:border-red-300': isNameInvalid,
                  'border-[#555] focus:border-black': !isNameInvalid,
                },
              ]"
              :readonly="formValidated"
              type="text"
              placeholder="Name"
              v-model="nameIpt"
            />
            <input
              :class="[
                'border-[2px] border-[#555] rounded-md px-[2.4vw] py-[.8rem] outline-none ',
                {
                  'bg-gray-300 cursor-not-allowed ': formValidated,
                  'bg-white': !formValidated,
                  'border-red-500 focus:border-red-300': isMailInvalid,
                  'border-[#555] focus:border-black': !isMailInvalid,
                },
              ]"
              :readonly="formValidated"
              :required="emailIpt.length > 2"
              type="email"
              placeholder="Email"
              v-model="emailIpt"
            />
            <input
              :class="[
                'border-[2px] border-[#555] rounded-md px-[2.4vw] py-[.8rem] outline-none ',
                {
                  'bg-gray-300 cursor-not-allowed ': formValidated,
                  'bg-white': !formValidated,
                  'border-red-500 focus:border-red-300':
                    isCompanyDetailsInvalid,
                  'border-[#555] focus:border-black': !isCompanyDetailsInvalid,
                },
              ]"
              :readonly="formValidated"
              :required="companyDetailsIpt.length > 10"
              type="text"
              placeholder="Company Name & Address"
              v-model="companyDetailsIpt"
            />
            <div class="h-max w-full flex">
              <select
                :class="[
                  'w-max rounded-l-md border-[2px] border-r-[0px] bg-[#fff9] py-[.8rem] px-[.8vw] text-[1rem] outline-none  ',
                  {
                    'bg-gray-300 cursor-not-allowed': formValidated,
                    'bg-white': !formValidated,
                    'border-red-500 focus:border-red-300': isPhoneInvalid,
                    'border-[#555] focus:border-black': !isPhoneInvalid,
                  },
                ]"
                v-model="userStore.preference.country"
              >
                <option value="Bahrain">+973</option>
                <option value="UAE">+971</option>
                <option value="Saudi Arabia">+966</option>
                <option value="Kuwait">+965</option>
                <option value="Qatar">+974</option>
              </select>

              <input
                :readonly="formValidated"
                :class="[
                  '[appearance:textfield] text-[16.8px] w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-[2px]    rounded-r-md rounded-l-[0px] px-[2.4vw] py-[.8rem] text-[1rem] outline-none',
                  {
                    'bg-gray-300 cursor-not-allowed': formValidated,
                    'bg-white': !formValidated,
                    'border-red-500 focus:border-red-300': isNameInvalid,
                    'border-[#555] focus:border-black': !isNameInvalid,
                  },
                ]"
                :required="phoneIpt.length > 8"
                type="number"
                placeholder="Phone"
                v-model="phoneIpt"
              />
            </div>
          </div>
          <div class="h-max w-full flex flex-col gap-[1rem] pt-[1rem]">
            <button
              @click="handleInfoProceedings()"
              :class="[
                ' w-full flex items-center justify-center  border-[#666]  w-full border-[2.4px] tracking-[.2vw] rounded-md py-[1rem] uppercase font-[500] text-[.9rem] px-[2vw] outline-none',
              ]"
            >
              <span v-if="isLoading && !showSuccessMsg"
                ><loadingIconVue class="text-[3.2vh]"
              /></span>
              <span
                class="flex items-center gap-[2vw] text-[1rem]"
                v-else-if="!isLoading && showSuccessMsg"
                >Done <TickIcon
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
import closeIcon from "~/public/icons/closeIcon.vue";
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
