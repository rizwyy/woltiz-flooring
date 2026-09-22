import Twilio from "twilio";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // parse JSON body
  const { message, to } = body;

  const client = Twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const response = await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886", // Twilio sandbox number or your WhatsApp sender
      to, // the 'to' number from request body
    });

    return { success: true, sid: response.sid };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
