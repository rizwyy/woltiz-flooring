<template>
  <!-- Desktop Optimized FAQ Section -->
  <div
    v-auto-animate
    class="faq-container opacity-0 translate-y-[6%] h-full w-full mx-auto pt-[14vh] pb-[14vh] px-[4vw] grid grid-cols-2 gap-[4vw] font-outfit max-w-screen-xl border-t-[.2vh]"
  >
    <h2
      class="col-span-2 text-[2.4rem] font-[400] mb-[10vh] w-full text-center"
    >
      Frequently Asked Questions
    </h2>

    <!-- Loop through the displayedFaqs computed property -->
    <div
      v-auto-animate
      v-for="(faq, index) in displayedFaqs"
      :key="faq.id"
      class="faq-item bg-[#f2f2f2] rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-[#f1f1f1]"
      :class="{ expanded: isExpanded(index) }"
    >
      <!-- Question Button -->
      <button
        v-auto-animate
        class="w-full text-left px-[.8rem] py-[.8rem]"
        @click="toggleFAQ(index)"
        :aria-expanded="isExpanded(index)"
        :aria-controls="`faq-answer-${faq.id}`"
      >
        <div class="flex justify-between items-center">
          <span class="text-[1.2rem] text-[#333] font-[400]">
            {{ faq.question }}
          </span>
          <span>
            <arrowUpIcon v-if="isExpanded(index)" />
            <arrowDownIcon v-else />
          </span>
        </div>
      </button>

      <!-- Answer Section (conditionally rendered) -->
      <transition name="fade">
        <div
          v-auto-animate
          v-show="isExpanded(index)"
          :id="`faq-answer-${faq.id}`"
          role="region"
          :aria-hidden="!isExpanded(index)"
          class="mt-[] bg-[#f2f2f2] p-[.8rem] rounded-b-lg border-t-[.8px] border-[#999] text-[#666] transition-all duration-300 ease-in-out"
        >
          {{ faq.answer }}
        </div>
      </transition>
    </div>

    <!-- View More Button -->
    <button
      v-if="faqsList.length > 6"
      @click="toggleViewMore"
      class="col-span-2 mt-[8vh] mx-auto px-4 py-2 rounded-md text-[#555] text-[1.4vw] underline underline-offset-[.8vh]"
    >
      {{ showMore ? "Show Less" : "View More" }}
    </button>
  </div>
</template>

<script setup>
/* Changed: add missing imports, lazy-load small icon components, add ids to faqs and defensive onMounted call */
import { ref, computed, onMounted, defineAsyncComponent } from "vue";

/* Lazy-load tiny icons to reduce bundle size */
const arrowUpIcon = defineAsyncComponent(() =>
  import("~/public/icons/arrowUpIcon.vue")
);
const arrowDownIcon = defineAsyncComponent(() =>
  import("~/public/icons/arrowDownIcon.vue")
);

/* Raw FAQ data (unchanged content) */
const _rawFaqs = [
  {
    question: "What types of flooring does Floorsir offer?",
    answer:
      "Floorsir offers a wide range of flooring options, including carpet, parquet, vinyl, raised floors, rubber flooring, artificial grass, and floor accessories.",
  },
  {
    question:
      "What are the differences between carpet, parquet, and vinyl flooring?",
    answer:
      "Carpet: Soft, comfortable, and available in various styles and textures.\n" +
      "Parquet: Durable, elegant, and made from natural wood.\n" +
      "Vinyl: Versatile, easy to maintain, and offers a variety of designs.",
  },
  {
    question: "What are the benefits of raised floors?",
    answer:
      "Raised floors provide flexibility for cable management, ventilation, and easy maintenance.",
  },
  {
    question: "What is the difference between SPC and WPC flooring?",
    answer:
      "SPC (Stone Plastic Composite): More durable, scratch-resistant, and water-resistant.\n" +
      "WPC (Wood Plastic Composite): Often used for outdoor decking due to its weather resistance.",
  },
  {
    question: "Do you offer flooring installation and repair services?",
    answer:
      "Yes, Floorsir provides professional flooring installation and repair services for all types of flooring.",
  },
  {
    question:
      "What is the difference between wall-to-wall carpet and area rugs?",
    answer:
      "Wall-to-wall carpet: Covers the entire floor.\n" +
      "Area rugs: Smaller, portable, and can be used to accentuate specific areas.",
  },
  {
    question: "What are the advantages of carpet tiles?",
    answer:
      "Carpet tiles are modular, easy to replace, and offer flexibility in design.",
  },
  {
    question: "What is the difference between Axminster and custom carpet?",
    answer:
      "Axminster carpet: A high-quality, intricately patterned carpet.\n" +
      "Custom carpet: Tailored to specific dimensions and design preferences.",
  },
  {
    question:
      "What is the difference between solidwood and engineered parquet?",
    answer:
      "Solidwood parquet: Made entirely from solid wood.\n" +
      "Engineered parquet: Has a wear layer of solid wood on top of a plywood core.",
  },
  {
    question: "What is the difference between laminated and bamboo parquet?",
    answer:
      "Laminated parquet: A more affordable option with a printed image layer.\n" +
      "Bamboo parquet: Made from bamboo, offering a unique look and eco-friendly properties.",
  },
  {
    question:
      "What is the difference between homogeneous and heterogeneous vinyl flooring?",
    answer:
      "Homogeneous: Uniform color and composition throughout.\n" +
      "Heterogeneous: Multiple layers with different properties.",
  },
  {
    question:
      "What is the difference between vinyl tile, lay-flat vinyl tile, and vinyl plank?",
    answer:
      "Vinyl tile: Square-shaped tiles.\n" +
      "Lay-flat vinyl tile: Large, flexible sheets.\n" +
      "Vinyl plank: Rectangular planks that mimic the appearance of wood.",
  },
  {
    question: "What are the different types of panels used in raised floors?",
    answer:
      "Bare panel: Cement core or wood core.\n" +
      "HPL panel: High-pressure laminate.\n" +
      "PVC panel: Polyvinyl chloride.\n" +
      "Perforation panel: Panels with holes for cable management.",
  },
  {
    question: "What are the benefits of rubber flooring?",
    answer:
      "Rubber flooring is durable, slip-resistant, and offers excellent shock absorption.",
  },
  {
    question: "What is the difference between rubber tiles, rolls, and mats?",
    answer:
      "Rubber tiles: Modular tiles.\n" +
      "Rubber rolls: Large, continuous sheets.\n" +
      "Rubber mats: Smaller, portable mats.",
  },
  {
    question: "What are the benefits of artificial grass?",
    answer:
      "Artificial grass is low-maintenance, durable, and environmentally friendly.",
  },
  {
    question: "Can artificial grass be used for indoor or outdoor spaces?",
    answer: "Artificial grass can be used both indoors and outdoors.",
  },
  {
    question: "What are trims, profiles, and stair rods used for?",
    answer:
      "These accessories provide a finished look and protect flooring edges.",
  },
  {
    question: "What types of floor cleaners do you recommend?",
    answer:
      "We offer a variety of floor cleaners suitable for different flooring types.",
  },
  {
    question: "What is the purpose of skirting?",
    answer: "Skirting covers the gap between the floor and walls.",
  },
  {
    question: "Do you offer professional flooring installation services?",
    answer: "Yes, we provide professional flooring installation services.",
  },
  {
    question: "What factors affect the cost of flooring installation?",
    answer:
      "Factors such as flooring type, size of the area, and complexity of the installation can influence the cost.",
  },
  {
    question: "Do you offer flooring repair services?",
    answer:
      "Yes, we offer flooring repair services for various types of flooring.",
  },
  {
    question: "What is the best flooring option for high-traffic areas?",
    answer:
      "Durable options like vinyl, engineered parquet, or rubber flooring are suitable for high-traffic areas.",
  },
  {
    question: "How do I choose the right flooring color and style for my home?",
    answer:
      "Consider your home's overall decor, personal preferences, and the amount of natural light.",
  },
  {
    question: "How often should I clean my floors?",
    answer:
      "Regular cleaning helps maintain the appearance and longevity of your flooring. Follow the manufacturer's recommendations for specific cleaning methods.",
  },
  {
    question: "Can you recommend flooring options for allergy sufferers?",
    answer:
      "Hard flooring options like vinyl or hardwood can be easier to clean and may be less prone to allergens.",
  },
  {
    question: "What is the warranty for your flooring products?",
    answer:
      "We offer warranties on our flooring products. Please refer to the specific product details for warranty information.",
  },
  {
    question:
      "Do you offer flooring solutions specifically designed for the Middle East climate?",
    answer:
      "Yes, we offer flooring options that are suitable for the hot and humid climate of the Middle East.",
  },
  {
    question:
      "Do you have experience working on large-scale flooring projects in the Middle East?",
    answer:
      "Yes, we have experience in handling large-scale flooring projects in the Middle East.",
  },
  {
    question:
      "Can you provide references for previous projects in the Middle East?",
    answer: "We can provide references upon request.",
  },
  {
    question: "Why should I choose Floorsir Flooring Company?",
    answer:
      "We offer a wide range of high-quality flooring options, professional installation services, and excellent customer service.",
  },
  {
    question: "How can I contact Floorsir Flooring Company?",
    answer:
      "You can contact us through our website, phone number, or email address.",
  },
  {
    question: "Do you offer financing options for flooring purchases?",
    answer: "Please inquire about financing options when contacting us.",
  },
  {
    question: "Can I visit your showroom to see your flooring products?",
    answer:
      "Yes, we invite you to visit our showroom to explore our flooring options.",
  },
];

/* Add deterministic ids for stable keys */
const faqsList = ref(
  _rawFaqs.map((item, idx) => ({
    id: `faq-${idx}`,
    ...item,
  }))
);

/* Reactive variables */
const expandedIndex = ref(-1);
const showMore = ref(false);

/* Toggle the expanded state for each FAQ item */
function toggleFAQ(index) {
  expandedIndex.value = expandedIndex.value === index ? -1 : index;
}

/* Check if a specific FAQ is expanded */
function isExpanded(index) {
  return expandedIndex.value === index;
}

/* Computed property to control how many FAQs are displayed */
const displayedFaqs = computed(() =>
  showMore.value ? faqsList.value : faqsList.value.slice(0, 6)
);

/* Toggle between showing limited and all FAQs */
function toggleViewMore() {
  showMore.value = !showMore.value;
}

/* Defensive onMounted scroll-trigger call */
onMounted(() => {
  if (typeof window === "undefined") return;
  try {
    const fn =
      (typeof handleScrollTrigger !== "undefined" && handleScrollTrigger) ||
      (window && window.handleScrollTrigger);
    if (typeof fn === "function") fn("faq-container");
  } catch (e) {
    // swallow to avoid breaking mount in environments without the helper
  }
});
</script>

<style scoped>
.faq-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: start;
  gap: 2rem;
}

.faq-item {
  position: relative;
  overflow: hidden;
}

.faq-item.expanded {
  overflow: visible;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
