import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { fetchCountriesData } from './redux/dataSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCitiesData } from './redux/dataSlice';

const CountrySelectionPage = () => {

  const [countryISO2 , setCountryISO2] = useState("");

  const dispatch = useDispatch(); //burada dispatch tanımlandı
  const navigate = useNavigate();
  const countries = useSelector(state => state.data.countries); //burada redux içinden ülke isimlerinin olduğu state getiriyoruz

  useEffect(() => {
    dispatch(fetchCountriesData()); //burada dispatch ile redux içinden ülke isimlerini çekme işlemini tetikliyoruz yani çalıştırıyoruz thunk işlemini
  }, []); //burada dispatch bağlamıyla ilk olarak component mount olduğunda çalışıyor ve duruyor ardından state güncellenirse countries adlı state tekarar çalışıyor ama bizim verilerimiz statik olduğu için state değişmeyecek 


   const getCountryISO2 = (iso2 , event) => {
    event.preventDefault();
         setCountryISO2(iso2); 
         navigate(`/sehirSecimSayfası/${iso2}`)

         dispatch(fetchCitiesData(iso2));
         
   }

   useEffect(() => {
     console.log(countries)
   },[countries])
  
   
  return (
    <div className="flex flex-col justify-center items-center " style={{ backgroundImage: 'url("images/genisEkranArkaPlan.png")'  }}>
      <p className="text-center font-bold text-3xl m-3 text-cream">Ülke Seçiniz</p>

 <div className="grid grid-cols-1  sm:grid-cols-2 2md:grid-cols-3 2lg:grid-cols-4 2xl:grid-cols-5 gap-3 m-2 ">
      {countries && countries.map((data) => (
       
       <div onClick={(event) => getCountryISO2(data.iso2 , event)} key={data.id} className=" flex flex-row justify-center items-center space-x-2  rounded-md cursor-pointer " style={{backgroundColor:'rgba(255,217,90,0.5)'}}>
         <p className="text-2xl">{data.emoji}</p>
         <p className="truncate text-cream text-md">{data.name}</p>
       </div>
          
      ))}
</div>


    </div>
  )
}

export default CountrySelectionPage