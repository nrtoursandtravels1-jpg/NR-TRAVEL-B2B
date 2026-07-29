import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rempomklammhhxkfmsch.supabase.co";
const supabaseKey = "sb_publishable_fQlbcC_XI3kjoCeNSFU-yg_LCpCQEho";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);