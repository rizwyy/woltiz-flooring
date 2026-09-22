<template>
  <section
    class="flooringLayoutPC invisible opacity-0 h-max max-w-[100vw] flex flex-col gap-[4.8vh] min-[1590px]:gap-[4vh] py-[6vh] pb-[14vh] font-outfit"
  >
    <div class="h-max w-full flex justify-center min-[1590px]:py-[2vh]">
      <span class="text-[2.4rem] font-[400]">Shop By Flooring Category</span>
    </div>

    <!-- Category Cards Loop -->
    <div
      v-for="(flooringRow, index) in flooringCategories"
      :key="index"
      class="h-max w-full flex justify-between px-[6vw] gap-[.4vw] min-[1590px]:gap-[2.4vw]"
    >
      <FlooringCategoryItem
        v-for="category in flooringRow"
        :key="category.name"
        :name="category.name"
        :desc="category.desc"
        :src="category.src"
        :isAvailable="category.isAvailable"
        :link="category.link"
        :altText="`Floorsir ${category.name}`"
        @load="
          handleImageLoad(
            0.4,
            'flooringLayout_' + category.name.replace(/\s+/g, ''),
            'flooringItem',
            true,
            true
          )
        "
        loading="lazy"
      />
    </div>
  </section>
</template>

<script setup>
import { defineAsyncComponent, onMounted } from "vue";

const FlooringCategoryItem = defineAsyncComponent(() =>
  import("./CategoryCard-HeroPC.vue")
);

// small helper to keep entries concise and reduce repetition
const c = (name, desc, src, link, isAvailable = true) => ({
  name,
  desc,
  src,
  link,
  isAvailable,
});

const flooringCategories = [
  // Row 1
  [
    c(
      "Carpet Flooring",
      "Durable, stylish carpet flooring enhances comfort, warmth, and aesthetic appeal in any space.",
      "/carpets/carpetsCover.webp",
      "/flooring/carpets/details"
    ),
    c(
      "Parquet Flooring",
      "Durable, stylish wooden flooring enhances comfort, warmth, and aesthetic appeal in any space.",
      "/wooden-flooring.webp",
      "/flooring/parquets/details"
    ),
  ],
  // Row 2
  [
    c(
      "Vinyl Flooring",
      "Durable, stylish vinyl tiles offer sleek, resilient, and low-maintenance flooring for any modern space.",
      "/pvc/vinyl-cover.webp",
      "/flooring/pvc/details"
    ),
    c(
      "Gym Flooring",
      "Durable, stylish gym flooring enhances comfort and safety in workout spaces.",
      "40001.webp",
      "/flooring/gym/details"
    ),
  ],
  // Row 3
  [
    c(
      "Sports Flooring",
      "Durable sports flooring ensures enhanced safety and performance in sports areas.",
      "sports-flooring.webp",
      "/flooring/sports/details"
    ),
    c(
      "Raised Flooring",
      "Stylish raised flooring offers practical solutions for easy access to utilities underneath.",
      "/raised/raised-office.webp",
      "/flooring/raised/details"
    ),
  ],
  // Row 4
  [
    c(
      "Rubber Flooring",
      "Durable and slip-resistant, rubber flooring offers excellent shock absorption and easy maintenance, ideal for gym & playrooms",
      "/rubber-flooring.webp",
      "/flooring/catalog?type=rubber"
    ),
    c(
      "Grass Flooring",
      "Lush and low-maintenance, grass flooring provides a natural look, perfect for outdoor spaces & patios with added weather resistance.",
      "/40004.webp",
      "/flooring/catalog?type=grass"
    ),
  ],
  // Row 5
  [
    c(
      "Epoxy Flooring",
      "Durable and slip-resistant, rubber flooring offers excellent shock absorption and easy maintenance, ideal for gym & playrooms",
      "/epoxy/epoxyFlooring.webp",
      "/flooring/catalog?type=epoxy"
    ),
    c(
      "Microcement",
      "Lush and low-maintenance, grass flooring provides a natural look, perfect for outdoor spaces & patios with added weather resistance.",
      "/stone/stoneFlooring.webp",
      "/flooring/catalog?type=microcement"
    ),
  ],
  // Row 6
  [
    c(
      "Flooring Services",
      "Durable and slip-resistant, rubber flooring offers excellent shock absorption and easy maintenance, ideal for gym & playrooms",
      "/flooringServiceBanner.webp",
      "/flooring/services/details"
    ),
    c(
      "Flooring Accessories",
      "Lush and low-maintenance, grass flooring provides a natural look, perfect for outdoor spaces & patios with added weather resistance.",
      "/flooringAccessories.webp",
      "/flooring/accessories/details"
    ),
  ],
];

onMounted(() => {
  // keep side-effect minimal; rely on global helper as before
  handleAutoAlpha("flooringLayoutPC", 1);
});
</script>

<style scoped>
.font-outfit {
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
