import { ref, onMounted, onUnmounted } from "vue";

export const useDevice = () => {
  const isMobile = ref(false);

  const checkScreen = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    checkScreen(); // initial check
    window.addEventListener("resize", checkScreen);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkScreen);
  });

  return { isMobile };
};
