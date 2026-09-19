import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tlyqtsbyxckovzdssdeg.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_NjC1xCem5WpxB1TDFt6UgQ_gySS7kUe";

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  );
};
