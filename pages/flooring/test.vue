<template>
  <div class="p-6 font-sans"></div>
</template>

<script setup>
const route = useRoute();
const id = route.query.id;

const {
  data: product,
  error,
  pending,
} = await fetch(`/api/getProductByID`, {
  query: { id },
});

console.log(data);
</script>
