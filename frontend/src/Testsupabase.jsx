import { supabase } from "./lib/supabase";

function TestSupabase() {

  const test = async () => {
    const { data, error } = await supabase
      .from("hotels")
      .select("*");

    console.log(data);
    console.log(error);
  };

  return (
    <button onClick={test}>
      Test Supabase
    </button>
  );
}

export default TestSupabase;