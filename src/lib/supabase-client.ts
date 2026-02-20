import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Public client (for storage uploads from client)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (server-side only)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export const STORAGE_BUCKET = "product-images";

export async function uploadProductImage(
  file: File,
  productId: string,
): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `${productId}/${Date.now()}.${ext}`;

  const { data, error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(data.path);

  return publicUrl;
}

export async function deleteProductImage(url: string): Promise<void> {
  const path = url.split(`${STORAGE_BUCKET}/`)[1];
  if (!path) return;

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .remove([path]);

  if (error) throw error;
}
