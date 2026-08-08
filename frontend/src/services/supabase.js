import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env?.VITE_SUPABASE_URL ||
  "https://rempomklammhhxkfmsch.supabase.co";

const supabaseKey =
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_fQlbcC_XI3kjoCeNSFU-yg_LCpCQEho";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});