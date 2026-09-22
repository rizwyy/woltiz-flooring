import { createError } from "h3";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SERVICE_KEY
  );

  // Parse email from the request body
  const { email } = await readBody(event);

  // Validate email presence
  if (!email) {
    throw createError({
      statusCode: 400,
      message: "Bad Request: Email is required",
    });
  }

  // Insert the email into newsletter_subscribers table
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email }])
    .select("id")
    .single();

  if (error) {
    throw createError({
      statusCode: 400,
      message: `Error adding newsletter subscription: ${error.message}`,
    });
  }

  const insertedId = data.id;
  console.log(
    "Newsletter subscription added successfully with id:",
    insertedId,
    { email }
  );

  return { id: insertedId };
});
