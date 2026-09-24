// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": "/",
    "@components": "@/components",
    "@stores": "@/stores",
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "@nuxt/image",
    "@formkit/auto-animate/nuxt",
  ],
  tailwindcss: {
    config: {
      /* Extend the Tailwind config here */
      content: ["content/**/**.md"],
      theme: {
        extend: {
          fontSize: {
            bannerContainer_heading_MOB: "2.4rem", //MOBILE -> BANNER -> HEADING
            gridContainer_heading_MOB: "1.4rem", //MOBILE -> GRID LAYOUT -> CONTAINER -> HEADING
            gridContainer_anchor_MOB: "1.8vh", //MOBILE -> GRID LAYOUT -> CONTAINER -> ANCHOR
            detailsContainer_heading_MOB: "1.5rem", //MOBILE -> DETAILS -> CONTAINER -> HEADING
            detailsContainer_clearAllText_MOB: ".8rem", //MOBILE -> DETAILS -> CONTAINER -> CLEAR ALL
            detailsContainer_inputText_MOB: "1rem", // MOBILE -> DETAILS-> CONTAINER -> INPUT
            gridContainer_desc_PC: "1.2vw", //LAPTOP -> GRID LAYOUT -> CONTAINER -> DESC
            gridContainer_heading_PC: "2.4rem", //LAPTOP -> GRID LAYOUT -> CONTAINER -> HEADING
            gridContainer_anchor_PC: "1.2vw", //LAPTOP -> GRID LAYOUT -> CONTAINER -> ANCHOR
            detailsContainer_heading_PC: "2rem", //LAPTOP -> DETAILS -> CONTAINER -> HEADING
            detailsContainer_clearAll_PC: "1.2rem",
            detailsContainer_selectedText_PC: "1rem",
            detailsContainer_label_PC: "1.8rem",
            detailsContainer_colorLabel_PC: "1.4rem",
          },
          colors: {
            navBarBG: "#fff",
            detailsBG: "#fffdf5",
            detailsFrom: "#fff",
            detailsTo: "#f1f1f1",
            detailsHeadCLR: "#222",
            // REVIEW CARD
            prefCard: "#f1f1f1",
            prefCardBG: "#fff",
          },
        },
      },
    },
  },

  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
      twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    },
  },
  image: {
    domains: ["iqhciavbeulhroqoskbu.supabase.co"],
  },
});
