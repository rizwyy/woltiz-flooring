<template>
  <div
    class="max-[990px]:hidden h-max w-screen py-[8vh] flex justify-center font-outfit"
  >
    <div
      class="h-max w-[42vw] px-[2vw] pt-[4vh] pb-[6vh] flex flex-col gap-[6vh] justify-between border-[.1rem] border-[#333] rounded-md bg-[#fcfcfc]"
    >
      <div class="h-max w-full flex flex-col justify-center gap-[2vh]">
        <span class="text-[2rem] font-[600] text-center tracking-[-.02vw]"
          >Sign In</span
        >
        <span class="text-center text-[1rem] text-[#999]"
          >Welcome back! Unlock exclusive designer perks with Floorsir. <br />
          Enjoy special discounts on premium flooring tailored just for
          you.</span
        >
      </div>
      <div class="h-max w-full flex flex-col">
        <form>
          <div class="h-max w-full flex flex-col gap-[4vh]">
            <div class="h-max w-full flex flex-col gap-[.8vh]">
              <!-- <span class="text-[#444]">Name</span> -->
              <input
                type="username"
                class="rounded-md border-[.1rem] text-[1rem] border-[#444] px-[1vw] py-[1.2vh]"
                placeholder="Name"
              />
            </div>
            <div class="h-max w-full flex flex-col gap-[.8vh]">
              <!-- <span class="text-[#444]">Password</span> -->
              <input
                type="password"
                class="rounded-md border-[.1rem] text-[1rem] border-[#444] px-[1vw] py-[1.2vh]"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="h-max w-full flex justify-end py-[2vh]">
            <a href="#">Forgot Password</a>
          </div>
          <div
            class="h-max w-full flex gap-[2vh] items-center justify-center pt-[2vh]"
          >
            <button
              class="bg-[#111] border-[#111] font-[500] border-[.16rem] w-full py-[1.8vh] text-[#f1f1f1] rounded-lg text-[1rem]"
            >
              Sign In
            </button>
          </div>
          <!-- <div class="text-center w-full pt-[2vh] text-[.8rem] font-[500]">
            OR
          </div>
          <div
            class="h-max w-full flex gap-[2vh] items-center justify-center pt-[2vh]"
          >
            <button
              class="bg-[#] border-[#ddd] border-[.16rem] font-[500] w-full py-[1.6vh] flex justify-center items-center gap-[1vw] text-[#333] rounded-lg text-[1rem]"
            >
              <Icon class="text-[1.2rem]" icon="devicon:google" />Sign up with
              Google
            </button>
            <button
              class="bg-[#] border-[#ddd] border-[.16rem] font-[500] w-full py-[1.6vh] flex justify-center items-center gap-[1vw] text-[#333] rounded-lg text-[1rem]"
            >
              <Icon class="text-[1.2rem]" icon="devicon:facebook" />Sign up with
              Facebook
            </button>
          </div> -->
          <div class="h-max w-full flex justify-center pt-[3vh] text-[.8rem]">
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
