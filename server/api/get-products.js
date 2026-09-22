import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SERVICE_KEY;

// Don't log secrets; only presence flags
console.log("[get-products] handler module loaded");
console.log("[get-products] SUPABASE_URL present:", !!supabaseUrl);
console.log("[get-products] SERVICE_KEY present:", !!supabaseServiceKey);

export default defineEventHandler(async (event) => {
  console.log("[get-products] handler invoked");

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error(
      "[get-products] Missing Supabase configuration (SUPABASE_URL or SERVICE_KEY).",
    );
    return {
      success: false,
      message: "Missing Supabase configuration",
    };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // read 'type' and 'category' query params and normalize for DB filter
  const query = getQuery(event) || {};
  const rawType = query.type ?? null;
  const rawCategory = query.category ?? null;
  // Normalization: lowercase, remove spaces and hyphens
  function normalizeStr(str) {
    return String(str || "")
      .toLowerCase()
      .replace(/[\s\-]+/g, "");
  }
  const typeFilter = rawType ? normalizeStr(rawType).slice(0, 100) : null;
  const categoryFilter = rawCategory
    ? normalizeStr(rawCategory).slice(0, 100)
    : null;
  console.log(
    "[get-products] incoming query type:",
    rawType,
    "normalized:",
    typeFilter,
    "category:",
    rawCategory,
    "normalized:",
    categoryFilter,
  );

  function stripExtension(filename) {
    return filename.replace(/\.[^/.]+$/, "");
  }

  // helper: safely stringify debug objects (trim long output)
  function safeDump(obj, max = 800) {
    try {
      const s = JSON.stringify(obj, null, 2);
      return s.length > max ? s.slice(0, max) + "...(truncated)" : s;
    } catch {
      return String(obj);
    }
  }

  try {
    console.log("[get-products] Fetching products from 'products' table...");
    console.log(
      `[get-products] Searching with filters: product_name ILIKE %${typeFilter}%, category ILIKE %${categoryFilter}%`,
    );

    let productsResponse;
    const selectFields =
      "id, product_name, brand, currency, variants, title, material_classification, category";

    // Fetch all, filter in JS for robust normalization
    productsResponse = await supabase
      .from("products")
      .select(selectFields)
      .order("id", { ascending: true });

    const { data: products, error: productError } = productsResponse;

    if (productError) {
      console.error("[get-products] productError:", productError);
      throw new Error("Error fetching products: " + productError.message);
    }

    // Filter in JS for normalization (ignore hyphens, spaces, case)
    let filteredProducts = products;
    if (typeFilter) {
      filteredProducts = filteredProducts.filter((p) =>
        normalizeStr(p.product_name).includes(typeFilter),
      );
    }
    if (categoryFilter) {
      filteredProducts = filteredProducts.filter((p) =>
        normalizeStr(p.category).includes(categoryFilter),
      );
    }

    console.log(
      "[get-products] products fetched:",
      Array.isArray(filteredProducts)
        ? filteredProducts.length
        : typeof filteredProducts,
      "(type/category filter applied)",
    );

    console.log(
      "[get-products] Listing images from storage bucket 'product-images'...",
    );
    const { data: images, error: imageError } = await supabase.storage
      .from("product-images")
      .list("", { limit: 1000 });

    if (imageError) {
      console.error("[get-products] imageError:", imageError);
      throw new Error("Error fetching images: " + imageError.message);
    }

    // filter out invalid/empty names and compute base names
    const validImages = Array.isArray(images)
      ? images.filter(
          (img) =>
            img && typeof img.name === "string" && img.name.trim() !== "",
        )
      : [];
    console.log(
      "[get-products] images fetched (valid):",
      validImages.length,
      "raw total:",
      Array.isArray(images) ? images.length : typeof images,
    );

    const imageNames = validImages.map((img) => stripExtension(img.name));
    console.log(
      "[get-products] sample imageNames (up to 10):",
      imageNames.slice(0, 10),
    );

    const unmatched = [];
    const productsWithImages = [];

    if (!Array.isArray(filteredProducts)) {
      console.warn(
        "[get-products] products is not array -> returning empty results block",
      );
      return {
        success: true,
        total: 0,
        data: [],
        unmatched: ["products-not-array"],
      };
    }

    for (const product of filteredProducts) {
      const {
        id,
        product_name,
        brand,
        currency,
        variants,
        title,
        material_classification,
        category,
      } = product;

      console.log(
        `[get-products] processing product id=${id} name="${product_name}" variantsType=${typeof variants}`,
      );

      // NORMALIZE variants into an array of variant objects
      let variantsArr = variants;
      if (!variantsArr) {
        console.log(`[get-products] product id=${id} has no variants field`);
        unmatched.push({ id, product: product_name, reason: "no-variants" });
        continue;
      }

      if (typeof variantsArr === "string") {
        try {
          variantsArr = JSON.parse(variantsArr);
          console.log(
            `[get-products] product id=${id} parsed JSON variants successfully, type after parse: ${typeof variantsArr}`,
          );
        } catch (e) {
          console.warn(
            `[get-products] product id=${id} variants JSON parse failed: ${e.message}`,
          );
          console.log("[get-products] variants raw:", safeDump(variantsArr));
          unmatched.push({
            id,
            product: product_name,
            reason: "variants-parse-failed",
          });
          continue;
        }
      }

      // If variants stored as object map, convert to array
      if (
        variantsArr &&
        typeof variantsArr === "object" &&
        !Array.isArray(variantsArr)
      ) {
        console.log(
          `[get-products] product id=${id} variants is object (not array), converting...`,
        );
        // try to convert common shapes: {0: {...}, 1: {...}} or keyed map
        const values = Object.values(variantsArr);
        // prefer array-like maps (numeric keys) else values still provide a form to inspect
        variantsArr = Array.isArray(values) ? values : [variantsArr];
        console.log(
          `[get-products] product id=${id} after conversion, variants count: ${variantsArr.length}`,
        );
      }

      if (!Array.isArray(variantsArr) || variantsArr.length === 0) {
        console.log(
          `[get-products] skipping product id=${id} - no variants after normalize`,
        );
        console.log(
          `[get-products] variantsArr for id=${id}:`,
          safeDump(variantsArr),
        );
        unmatched.push({
          id,
          product: product_name,
          reason: "no-variants-after-normalize",
        });
        continue;
      }

      console.log(
        `[get-products] product id=${id} normalized variants count=${variantsArr.length}`,
      );

      const variantResults = [];

      for (const variant of variantsArr) {
        // robust SKU detection: check several common keys and fall back to scanning keys containing "sku"
        let sku =
          variant?.SKU ??
          variant?.sku ??
          variant?.Sku ??
          variant?.sku_code ??
          variant?.skuCode ??
          null;
        if (!sku && variant && typeof variant === "object") {
          const skuKey = Object.keys(variant).find((k) => /sku/i.test(k));
          if (skuKey) sku = variant[skuKey];
        }

        console.log(
          `[get-products] product id=${id} checking variant SKU="${sku}" keys=${Object.keys(
            variant || {},
          ).join(",")}`,
        );

        if (!sku) {
          console.warn(
            `[get-products] variant missing SKU for product id=${id} -> variant sample:`,
            safeDump(variant),
          );
          unmatched.push({
            id,
            product: product_name,
            reason: "Variant missing SKU",
            variant: Object.keys(variant || {}).slice(0, 10),
          });
          continue;
        }

        // Try exact match first, then fuzzy match
        const skuLower = String(sku).toLowerCase();
        let matchIndex = imageNames.findIndex(
          (imgName) => imgName && imgName.toLowerCase() === skuLower,
        );

        // If no exact match, try partial/fuzzy match
        if (matchIndex === -1) {
          console.log(
            `[get-products] no exact match for SKU="${sku}", trying fuzzy match...`,
          );
          matchIndex = imageNames.findIndex(
            (imgName) =>
              imgName &&
              (imgName.toLowerCase().includes(skuLower) ||
                skuLower.includes(imgName.toLowerCase())),
          );
        }

        if (matchIndex !== -1) {
          const matchedImage = validImages[matchIndex];
          const imageUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${matchedImage.name}`;
          console.log(
            `[get-products] matched SKU="${sku}" -> image="${matchedImage.name}"`,
          );
          variantResults.push({
            ...variant,
            image: imageUrl,
          });
        } else {
          // Do NOT add variant if no image is found
          unmatched.push({
            id,
            product: product_name,
            sku,
            reason: `No image found for SKU "${sku}" - variant excluded`,
          });
        }
      }
      //
      if (variantResults.length) {
        productsWithImages.push({
          id,
          product_name,
          brand,
          title,
          currency,
          material_classification,
          variants: variantResults,
          category,
        });
        console.log(
          `[get-products] product id=${id} added with ${variantResults.length} variant(s)`,
        );
      } else {
        console.log(
          `[get-products] product id=${id} had 0 variants with images, excluded from results`,
        );
      }
    }

    console.log("[get-products] finished processing products");
    console.log(
      "[get-products] totals -> productsWithImages:",
      productsWithImages.length,
      "unmatched:",
      unmatched.length,
    );

    console.log(
      "[get-products] sample productsWithImages (up to 3):",
      productsWithImages.slice(0, 3),
    );
    console.log(
      "[get-products] sample unmatched (up to 5):",
      unmatched.slice(0, 5),
    );

    return {
      success: true,
      total: productsWithImages.length,
      data: productsWithImages,
      unmatched,
    };
  } catch (error) {
    console.error("[get-products] caught error:", error?.message || error);
    return {
      success: false,
      message: error?.message || String(error),
    };
  }
});
