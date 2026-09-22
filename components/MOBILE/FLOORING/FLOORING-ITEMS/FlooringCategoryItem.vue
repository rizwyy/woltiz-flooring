<template>
  <a
    :href="props.href"
    :target="isExternal ? '_blank' : '_self'"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :aria-label="props.title || 'Flooring category'"
    class="h-[11.2rem] w-[50%] rounded-md overflow-hidden relative flex flex-col gap-[.4rem] items-start justify-between px-[1.8vw] pt-[.8rem] pb-[.5rem]"
  >
    <span
      :class="[
        'w-[75%] h-max flooringItem_Text opacity-0 text-gridContainer_heading_MOB font-[400] leading-[1.6rem] z-[1] text-[#f1f1f1]',
        props.titleClass,
      ]"
    >
      <slot name="title">{{ props.title }}</slot>
    </span>

    <div class="h-max text-[#fff] w-full px-[.2vw] flex justify-end pb-[rem]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-[1.8rem] flooringItem_Text opacity-0 text-gridContainer_heading_MOB"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <!-- Icon from All by undefined - undefined -->
        <path
          fill="currentColor"
          d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z"
        />
      </svg>
    </div>

    <div
      class="flooringItem_Overlay absolute object-cover bottom-0 left-0 h-full w-full z-[-9] bg-gradient-to-br from-[#000] to-transparent"
    ></div>

    <NuxtImg
      @load="emitLoad"
      :src="props.imgSrc"
      :alt="props.altText"
      :loading="props.loading"
      :quality="props.quality"
      class="flooringItem_Img absolute object-cover bottom-0 left-0 h-full w-full z-[-99]"
    />
  </a>
</template>

<script setup>
// filepath: /Users/rizwin/Desktop/carpets-neil/components/MOBILE/FLOORING/FLOORING-ITEMS/FlooringCategoryItem.vue
import { computed } from "vue";

/* Props */
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  imgSrc: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: "",
  },
  titleClass: {
    type: String,
    default: "",
  },
  loading: {
    type: String,
    default: "lazy",
  },
  quality: {
    type: [String, Number],
    default: 75,
  },
});

/* Emit: parent listens with @load */
const emit = defineEmits(["load"]);
function emitLoad(ev) {
  emit("load", ev);
}

/* Detect external links to set target/rel */
const isExternal = computed(() => {
  try {
    return /^https?:\/\//i.test(props.href);
  } catch {
    return false;
  }
});
</script>

<style scoped>
.flooringItem_Overlay {
  backdrop-filter: blur(14px);
  opacity: 0.8;
}
</style>
