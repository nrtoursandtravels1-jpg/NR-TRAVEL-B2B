import { supabase } from "../lib/supabase";

export async function getHotel() {
  const { data, error } = await supabase
    .from("hotel")
    .select("*");

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}