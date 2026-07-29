import { supabase } from "./supabase";


export async function checkUserSubscription(userId) {

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending:false })
    .limit(1)
    .single();


  if(error){

    console.log("Subscription Check Error:", error);

    return null;

  }


  const today = new Date();

  const expiry = new Date(data.end_date);


  if(today > expiry){

    return {
      active:false,
      message:"Your subscription expired. Please upgrade."
    };

  }


  return {
    active:true,
    subscription:data
  };


}