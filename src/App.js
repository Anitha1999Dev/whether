import { useState } from "react";

export default function Whether() {

  const apikey = "49e568fe25efaeb4e55b3bac433b9f61";
  const [city,setCity]=useState("");
  const [whetherdata,whethersetData]=useState(null)
   
  const fetchWhether= async ()=>{

    try{
           const data= await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`).
           then(res=>res.json());
           whethersetData(data)
    }
    catch(err){
        console.log(err)

    }
  
  }

  return (

    <>
    <input onChange={(e)=>setCity(e.target.value)}/>
    <button onClick={fetchWhether}>Search</button>
    {whetherdata && whetherdata.main ?
      <div>
          <h2>{whetherdata.name}</h2>
          <p>Temperature: {whetherdata.main.temp}°C</p>
          <p>Condition: {whetherdata.weather[0].description}</p>
          <p>Humidity: {whetherdata.main.humidity}%</p>
          <p>Wind Speed: {whetherdata.wind.speed} m/s</p>
        </div>
   :
   <p>no data</p>
    
    }
   
    </>


  )

}