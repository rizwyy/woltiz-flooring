import { defineEventHandler, readBody } from "h3";
import twilio from "twilio";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: body.message || "Default message from Nuxt!",
      from: "whatsapp:+14155238886", // Twilio sandbox or your WhatsApp sender number
      to: body.to || "whatsapp:+918943564762", // Mathew's WhatsApp number
    });

    return {
      success: true,
      sid: message.sid,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
});
