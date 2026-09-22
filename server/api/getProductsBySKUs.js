// /api/getProductsBySKUs.js
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
    const body = await readBody(event);
    let { skus } = body;
    if (!Array.isArray(skus)) {
      return { success: false, message: "skus must be an array" };
    }

    // normalize and dedupe incoming SKUs
    skus = Array.from(
      new Set(
        skus
          .map((s) => String(s || "").trim())
          .filter((s) => s.length > 0)
          .map((s) => s.toLowerCase())
      )
    );
    if (skus.length === 0) {
      return { success: false, message: "No valid SKUs provided" };
    }

    // Build .or filter for variant SKUs (Supabase / PostgREST syntax)
    // Note: this matching is case-sensitive, so ensure your stored SKUs are consistent or adjust after fetch.
    const orConditions = skus
      .map((sku) => `variants->>SKU.eq.${encodeURIComponent(sku)}`)
      .join(",");

    // Fetch products that have at least one matching variant SKU
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("*")
      .or(orConditions)
      .limit(100); // adjust if you expect more; you could paginate

    if (productError) {
      throw new Error("Error querying products: " + productError.message);
    }

    if (!products || products.length === 0) {
      return { success: true, items: [] };
    }

    // Fetch all variant images once
    const { data: images, error: imageError } = await supabase.storage
      .from("product-images")
      .list("", { limit: 1000 });

    if (imageError) {
      throw new Error("Error fetching images: " + imageError.message);
    }

    const items = [];

    products.forEach((product) => {
      const parsedVariants = Array.isArray(product.variants)
        ? product.variants
        : [];

      parsedVariants.forEach((variant) => {
        if (!variant?.SKU) return;
        const variantSkuLower = String(variant.SKU).toLowerCase();
        if (!skus.includes(variantSkuLower)) return;

        const variantImage = findImageBySKU(variant.SKU, images);

        items.push({
          product_id: product.id,
          product_name: product.product_name,
          description: product.description || "",
          product_image: product.image || null,
          sku: variant.SKU,
          variant: {
            ...variant,
            image: variantImage,
          },
          price:
            variant.price != null
              ? variant.price
              : product.price != null
              ? product.price
              : null,
          currency: variant.currency || product.currency || "",
          image: variantImage || product.image || null,
        });
      });
    });

    return {
      success: true,
      items,
    };
  } catch (err) {
    console.error("getProductsBySKUs error:", err);
    return {
      success: false,
      message: err.message,
    };
  }
});
