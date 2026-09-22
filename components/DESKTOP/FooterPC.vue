<template>
  <div
    role="contentinfo"
    aria-label="Floorsir footer"
    class="max-[990px]:hidden h-max max-w-[100vw] bg-gradient-to-b from-[#fff] to-blue-100 flex flex-col font-outfit"
  >
    <div
      class="h-max w-full flex border-t-[1px] border-[#ececec] px-[6vw] py-[12vh] text-[#666] justify-between"
    >
      <!-- Brand -->
      <div class="h-full w-max flex flex-col px-[1vw] gap-[2vh]">
        <p class="text-[2.8rem] tracking-[-.1vw] text-[#333] font-[300]">
          Floorsir
        </p>
        <span class="text-[#999] text-[1rem]">
          Delivering quality flooring solutions that <br />
          bring comfort and elegance to every space.
        </span>
      </div>

      <!-- Sections (data-driven for maintainability) -->
      <div
        v-for="(section, idx) in sections"
        :key="idx"
        class="h-full w-max flex flex-col px-[1vw] gap-[.8vh]"
      >
        <p class="mb-[2.4vh] text-[1rem] font-[500] text-[#555]">
          {{ section.title }}
        </p>
        <template v-for="(link, j) in section.links" :key="j">
          <a
            :href="link.href"
            class="text-[1rem]"
            :target="link.external ? '_blank' : null"
            :rel="link.external ? 'noopener noreferrer' : null"
            :aria-label="link.aria || `${section.title} - ${link.label}`"
          >
            {{ link.label }}
          </a>
        </template>
      </div>
    </div>

    <div class="border-t-[.2vh] border-[#fff9] py-[6vh] flex justify-center">
      <span class="text-[#888] text-[1rem]"
        >© {{ year }} Floorsir. All rights reserved.</span
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

/*
  Optimized: data-driven sections, accessible attributes and dynamic year.
  Note: sizing and units preserved exactly as requested.
*/
const year = computed(() => new Date().getFullYear());

const sections = [
  {
    title: "Product",
    links: [{ label: "Overview", href: "/about" }],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/about" },
      { label: "Support", href: "/about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Contact", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/about" },
      { label: "Privacy", href: "/about" },
      { label: "Cookies", href: "/about" },
      { label: "Licenses", href: "/about" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Twitter", href: "/about" },
      { label: "LinkedIn", href: "/about" },
      { label: "Facebook", href: "/about" },
      { label: "GitHub", href: "/about" },
      { label: "Dribbble", href: "/about" },
    ],
  },
];
</script>

<style lang="scss" scoped></style>
