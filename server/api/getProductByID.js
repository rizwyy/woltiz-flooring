import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

function findImageBySKU(sku, images) {
  if (!sku || typeof sku !== "string") return null;
  const cleanSKU = sku.toLowerCase();
  for (const image of images) {
    const base = image.name.split(".")[0].toLowerCase(); // strip extension
    if (base === cleanSKU) {
      return `${supabaseUrl}/storage/v1/object/public/product-images/${image.name}`;
    }
  }
  return null;
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const id = Number(query.id);
    const requestedSKU = query.sku?.toLowerCase() || null;

    console.log("Requested SKU from URL:", requestedSKU); // 👈 Log SKU here

    if (!id) throw new Error("Missing product id");
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (error) throw new Error("Error querying product: " + error.message);
    if (!data || data.length === 0)
      throw new Error(`No product found with ID ${id}`);

    const product = data[0];

    const { data: images, error: imageError } = await supabase.storage
      .from("product-images")
      .list("", { limit: 1000 });

    if (imageError)
      throw new Error("Error fetching images: " + imageError.message);

    const unmatched = [];
    const parsedVariants = Array.isArray(product.variants)
      ? product.variants
      : [];

    const variantsWithImages = parsedVariants.map((variant) => {
      const img = findImageBySKU(variant.SKU, images);
      if (!img) {
        unmatched.push({
          product_id: id,
          sku: variant.SKU,
          reason: `Image not found for SKU "${variant.SKU}"`,
        });
      }
      return {
        ...variant,
        image: img,
      };
    });

    // Find the active variant (based on SKU from query or default to first)
    const activeVariant =
      variantsWithImages.find((v) => v.SKU?.toLowerCase() === requestedSKU) ||
      variantsWithImages[0];

    return {
      success: true,
      product: {
        ...product,
        image: activeVariant?.image || null,
        product_color: activeVariant?.color || product.product_color || "",
        price: activeVariant?.price || product.price || "",
        variants: variantsWithImages,
      },
      unmatched,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
});
