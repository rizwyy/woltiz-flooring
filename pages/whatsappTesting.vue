<template>
  <!-- <div>
    <input v-model="message" placeholder="Enter Message" />
    <button @click="sendSMS">Send SMS</button>
    <button @click="sendWhatsApp">Send WhatsApp</button>
    <p v-if="status">{{ status }}</p>
  </div> -->
</template>

<script setup>
// --- Send WhatsApp ---
async function sendWhatsAppMessage() {
  console.log("sending message");
  const res = await fetch("/api/send-whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Hey this is a test from nuxt app",
      to: "whatsapp:+917306014762", // Replace with Mathew’s number
    }),
  });

  const data = await res.json();
  if (!data.success) {
    console.error("Error sending WhatsApp message:", data.error);
  } else {
    console.log("Message sent! SID:", data.sid);
  }
}

// sendWhatsAppMessage();
</script>
