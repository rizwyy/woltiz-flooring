<template>
  <div class="h-max w-screen font-outfit">
    <QuestionaireMOB v-if="!formCompleted" @success="handleCloseForm" />
    <section
      v-else
      class="h-[100vh] w-screen overflow-x-hidden max-w-[100vw] bg-gradient-to-br from-[#f1f1f1] to-[#ededed] fixed top-0 left-0 font-outfit flex flex-col justify-start gap-[1.8rem] pt-[2rem]"
    >
      <div class="h-max w-[100%] px-[4vw] flex justify-between">
        <a
          href="/"
          class="h-max w-max font-[300] text-[2.9rem] text-[#555] leading-[2.4rem] tracking-[-.07rem]"
        >
          Floorsir
        </a>
        <!-- <span
        class="h-max w-max font-[300] text-[2svh] text-[#999] leading-[4.8svh]"
      >
        explore
      </span> -->
      </div>
      <div
        class="h-max w-[75%] px-[4vw] flex flex-col items-start gap-[1rem] pt-[.4rem]"
      >
        <Icon
          icon="charm:tick-double"
          class="text-[6rem] text-[#666] max-[320px]:hidden"
        />
        <h2
          class="h-max w-full font-[300] text-[2.1rem] text-[#222] leading-[2.4rem]"
        >
          Thanks! You're ready to go.
        </h2>
      </div>
      <div class="h-max w-[90%] px-[4vw]">
        <p class="h-max w-[100%] text-[1rem] text-[#666]">
          One of our representatives will contact you soon to confirm the
          details. Please make sure to keep your phone line or email active to
          avoid any delays in communication. We appreciate your trust in us, and
          we look forward to delivering the best service!
        </p>
      </div>
      <a
        href="/"
        class="h-max w-[92vw] text-[1.2rem] tracking-[.4vw] rounded-md py-[1.2rem] text-[#ededed] bg-[#222] text-center fixed bottom-[2vh] left-[4vw] shadow-xl mt-[3rem] z-[99]"
      >
        GOT IT
      </a>
    </section>
  </div>
</template>

<script setup>
import QuestionaireMOB from "./FLOORING/QuestionaireMOB.vue";

const formCompleted = ref(false);

function handleCloseForm() {
  formCompleted.value = true;
  setTimeout(() => {
    window.location.href = "https://Floorsir.com";
  }, 3000);
}
</script>

<style lang="scss" scoped></style>
