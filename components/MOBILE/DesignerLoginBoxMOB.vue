<template>
  <div
    class="min-[990px]:hidden h-max w-screen py-[4vh] flex justify-center font-outfit"
  >
    <div
      class="h-max w-[96vw] px-[4vw] pt-[4vh] pb-[6vh] flex flex-col gap-[6vh] justify-between border-[.1rem] border-[#999] rounded-md bg-[#fcfcfc]"
    >
      <div class="h-max w-full flex flex-col justify-center gap-[2vh]">
        <span
          class="text-[2rem] font-[600] text-center tracking-[-.4vw] text-[#222]"
          >Sign In</span
        >
        <span class="text-center text-[1rem] text-[#999] leading-[3.4vh]">
          Welcome back! Enjoy special discounts on premium flooring tailored
          just for you.</span
        >
      </div>
      <div class="h-max w-full flex flex-col">
        <form>
          <div class="h-max w-full flex flex-col gap-[4vh]">
            <input
              type="username"
              class="rounded-md border-[.1rem] text-[.8rem] border-[#999] px-[2vw] py-[1.6vh]"
              placeholder="Name"
            />
            <input
              type="password"
              class="rounded-md border-[.1rem] text-[.8rem] border-[#999] px-[2vw] py-[1.6vh]"
              placeholder="Password"
            />
          </div>
          <div class="h-max w-full flex justify-end py-[2vh] text-[.8rem]">
            <a href="#">Forgot Password</a>
          </div>
          <div
            class="h-max w-full flex flex-col gap-[1rem] items-center justify-center"
          >
            <button
              class="bg-[#111] w-full py-[2vh] text-[#f1f1f1] rounded-md mt-[2vh] text-[1rem]"
            >
              Sign In
            </button>
            <!-- <span class="font-[600] text-[.8rem] tracking-[.2vw]">OR</span>
            <button
              class="border-[#ddd] border-[.1rem] w-full py-[2vh] text-[#f1222f1f1] rounded-md text-[1rem] flex justify-center items-center gap-[3.2vw]"
            >
              <Icon icon="devicon:google" />Sign up with Google
            </button> -->
          </div>
          <div class="h-max w-full flex justify-center pt-[3.8vh] text-[.8rem]">
            <span class="text-[#999]"
              >Dont have an account?
              <a href="#" class="font-[600] text-[#333] underline"
                >Register</a
              ></span
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
</script>

<style lang="scss" scoped></style>
