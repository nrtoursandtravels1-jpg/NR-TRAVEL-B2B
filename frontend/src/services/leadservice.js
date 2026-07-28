import { supabase } from "./supabase";

export const getLeads = async () => {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};