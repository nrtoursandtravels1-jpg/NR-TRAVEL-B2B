import destinations from "../data/destinations";

function Destinations() {
  return (
    <div style={{ padding: "40px" }}>

      <h1>
        Explore Destinations
      </h1>

      <p>
        Discover India and international travel destinations with NR Travel.
      </p>


      {/* India Destinations */}

      <h2 style={{ marginTop: "40px" }}>
        🇮🇳 India Destinations
      </h2>


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px"
        }}
      >

        {destinations.india.map((item, index) => (

          <div
            key={index}
            style={{
              padding:"20px",
              border:"1px solid #ddd",
              borderRadius:"10px"
            }}
          >

            <h3>
              {item.state}
            </h3>


            {item.places.map((place, i)=>(
              <p key={i}>
                📍 {place}
              </p>
            ))}


          </div>

        ))}

      </div>




      {/* International */}

      <h2 style={{ marginTop:"40px" }}>
        🌍 International Destinations
      </h2>


      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:"20px"
        }}
      >

        {destinations.international.map((item,index)=>(

          <div
            key={index}
            style={{
              padding:"20px",
              border:"1px solid #ddd",
              borderRadius:"10px"
            }}
          >

            <h3>
              {item.country}
            </h3>


            {item.places.map((place,i)=>(
              <p key={i}>
                ✈️ {place}
              </p>
            ))}


          </div>

        ))}


      </div>


    </div>
  );
}


export default Destinations;