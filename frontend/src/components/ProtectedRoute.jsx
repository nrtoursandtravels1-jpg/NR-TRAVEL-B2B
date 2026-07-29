import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabase";


function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);



  useEffect(() => {

    checkSubscription();

  }, []);



  const checkSubscription = async () => {


    const {
      data:userData
    } = await supabase.auth.getUser();



    if(!userData.user){

      setAllowed(false);

      setLoading(false);

      return;

    }



    const {
      data,
      error
    } = await supabase
      .from("subscriptions")
      .select("*")
      .eq(
        "user_id",
        userData.user.id
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      )
      .limit(1)
      .single();



    if(error){

      console.log(error);

      setAllowed(false);

      setLoading(false);

      return;

    }



    const today = new Date();

    const expiry = new Date(
      data.end_date
    );



    if(today <= expiry){

      setAllowed(true);

    }
    else{

      setAllowed(false);

    }



    setLoading(false);


  };




  if(loading){

    return (

      <h2
        style={{
          padding:"40px"
        }}
      >
        Checking Subscription...
      </h2>

    );

  }



  if(!allowed){

    return (
      <Navigate 
        to="/upgrade-plan"
      />
    );

  }



  return children;


}


export default ProtectedRoute;