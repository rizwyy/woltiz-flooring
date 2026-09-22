import { createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SERVICE_KEY
  );

  // Parse formData from the request body
  const { name, phone, formData } = await readBody(event);

  if (!name || !phone || !formData) {
    throw createError({
      statusCode: 400,
      message:
        "Bad Request: Missing required fields (name, phone, or formData)",
    });
  }

  // Build the insert object dynamically
  const insertData = {
    name,
    phone,
    formData,
  };

  // Insert the formData into quote-submissions table
  const { data, error } = await supabase
    .from("quote-submissions")
    .insert([insertData])
    .select("id") // Select the id of the newly inserted row
    .single(); // Ensure we get the inserted row as a single object

  if (error) {
    throw createError({
      statusCode: 400,
      message: `Error inserting quote submission: ${error.message}`,
    });
  }

  const insertedId = data.id;
  console.log(
    "Quote submission inserted successfully with id:",
    insertedId,
    insertData
  );

  return { id: insertedId };
});
