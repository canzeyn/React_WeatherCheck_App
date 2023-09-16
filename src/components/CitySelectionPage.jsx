import React from 'react'
import { useSelector } from 'react-redux';

const CitySelectionPage = () => {

    const cities = useSelector(state => state.data.cities);


  return (
   
<div className="flex flex-col justify-center items-center min-h-screen"  style={{ backgroundImage: 'url("/images/genisEkranArkaPlan.png")'  }}> 

  <div>
    <h3 className="text-center font-bold text-3xl  text-cream pb-5">Şehir Seçiniz</h3>
  </div>

  <div className="grid grid-cols-5 gap-3 m-1" >
  {cities && cities.map((city) => (
    <div key={city.id} className="flex flex-row items-center justify-center rounded-md space-x-2 px-3 py-1 cursor-pointer" style={{backgroundColor:'rgba(255,217,90,0.5)'}}>
      <p className="text-cream text-lg ">{city.state_code}</p>
       <p className="text-cream text-xl truncate" key={city.id}>{city.state_name}</p>
    </div>
   
  ))}
  </div>
</div>
  )
}

export default CitySelectionPage