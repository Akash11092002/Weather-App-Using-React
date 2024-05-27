import React, { useState } from 'react'
import './weather.css'
import {FaSearch,FaWind} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import {WiHumidity } from 'react-icons/wi'
const Weather = () => {
 const[city,setcity]= useState('');
 const [weather,setweather]=useState();
 const [err,seterr]=useState('') 
 
 
 const API_Key='21b6a6b6aca13745bf69896a300e41c2'
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`

function handleonChange(e){
 setcity   (e.target.value);

}

async function fetchData(){
    try{
let response =await fetch(url);
   let output=await response.json();
   if(response.ok){
   setweather(output);
   seterr('');
   console.log(output);
    }
    else{
        setweather('')
        seterr('NO data found.enter valid name of city')
    }

}
    catch(err){

    }
}

  return (
    <div className='container'>

    <div className='city'>
  <input type='text' value={city} onChange={handleonChange} placeholder='enter your city name' />
    <button onClick={()=> fetchData()}>
        <FaSearch></FaSearch>
    </button>
    
    
    
    
    
    
    
    </div>
      {


        err && <p className='err-msg'>{err}</p>
      }
      {
         weather && weather.weather &&
         <div className='content'>
         <div className='weather-image'>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' />
           <h3 className='desc'> {weather.weather[0].description}</h3>
            
        
        
         </div>
         <div className='weather-temp'>
         <h2>{weather.main.temp}<span>&deg;C</span></h2>

         </div>
         <div className='weather-city'>
         <div className='location'>
              <MdLocationOn></MdLocationOn>

         </div>
         <p> {weather.name},<span>{weather.sys.country}</span></p>
         </div>

<div className='weather-stats'>
<div className='wind'>
<div className='wind-icon'>
<FaWind></FaWind>

</div>
    <h3 className='wind-speed'>{weather.wind.speed}<span>Km/hr</span> </h3>
<h3 className='wind-heading'> Wind-Speed</h3>
</div>
<div className='humidity'>
<div className='humidity-icon'>
    <WiHumidity></WiHumidity>
</div>
<h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
<h3 className='humidity-heading'>Humidity</h3>
</div>


</div>


         </div>



      }


    </div>
  )
}

export default Weather