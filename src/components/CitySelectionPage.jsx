import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {AiOutlineArrowLeft} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchWeatherData } from './redux/apiSlice';

const CitySelectionPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTermCities , setSearchTermCities] = useState("");

    const cities = useSelector(state => state.data.cities);

    const handleClickCity = async (selectedCity) => {
     await dispatch(fetchWeatherData(selectedCity))
     console.log(selectedCity)
    }

    

    const filteredCities = cities.filter(city => city.state_name.toLowerCase().includes(searchTermCities.toLowerCase()))

    const goToCountryPage = () => {
           navigate(-1)
    }


  return (
   
<div className="flex flex-col  items-center min-h-screen"  style={{ backgroundImage: 'url("/images/genisEkranArkaPlan.png")' , backgroundRepeat:"no-repeat", backgroundSize:"cover"  }}> 

  <div className="flex flex-row justify-between  items-center w-full ">
    <div>
      <AiOutlineArrowLeft onClick={goToCountryPage} className="w-12 h-8 fill-cream stroke-2 cursor-pointer" />
    </div>
    <div className="w-full">
      <h3 className="text-center font-bold text-3xl  text-cream pb-5 mt-2">Şehir Seçiniz</h3>
    </div>

    <div className="w-12"></div>
    
  </div>

  <div className=" flex flex-row justify-center items-center w-full pt-2 pb-10">
    <input value={searchTermCities} onChange={e => setSearchTermCities(e.target.value)} placeholder="şehir ismi giriniz..." className="bg-cream opacity-60 focus:opacity-100 text-earthyBrown rounded-md h-12 w-1/2 lg:w-2/5  xl:w-1/3 outline-none xl:text-xl pl-3"></input>
  </div>

  <div className="grid grid-cols-1 2sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5" >
  {filteredCities && filteredCities.map((city) => (
    <div key={city.id} onClick={() => handleClickCity(city.state_name) } className="flex flex-row items-center justify-center rounded-md space-x-2 px-3 py-1 cursor-pointer" style={{backgroundColor:'rgba(255,217,90,0.5)'}}>
      <p className="text-cream text-lg ">{city.state_code}</p>
       <p className="text-cream text-xl truncate">{city.state_name}</p>
    </div>
   
  ))}
  </div>
</div>
  )
}

export default CitySelectionPage