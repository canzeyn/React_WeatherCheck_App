import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountriesData } from './redux/dataSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCitiesData } from './redux/dataSlice';

const CountrySelectionPage = () => {

  const [countryISO2, setCountryISO2] = useState("");
  const [searchTermCountry, setSearchTermCountry] = useState("");

  const dispatch = useDispatch(); //burada dispatch tanımlandı
  const navigate = useNavigate();
  const countries = useSelector(state => state.data.countries); //burada redux içinden ülke isimlerinin olduğu state getiriyoruz


  useEffect(() => {
    if (!countries.length) { //burada eğer redux içinden gelen countries adlı state boş ise redux içindeki bir action tetiklenir ve çalışır 
      dispatch(fetchCountriesData()); //ülke isimlerini dataset içinden çeken action tetikleniyor ve çalışıyor  
    }
  }, []); 

  useEffect(() => {
    console.log(countries);
  }, [countries]);

  const filteredCountry = countries ? countries.filter(country => country && country.name &&  country.name.toLowerCase().includes(searchTermCountry.toLowerCase())) : [];
//burada birkaç defa çekeceğimiz verilerin kontrolünü yapıyoruz çünkü büyük datasetler ile çalışıyoruz ve eğer bir değerde dahi istedğimiz veriyi çekemezsek sistem hata verir 
//bunun içinilk olarak redux içinden çektiğimiz countries adlı state içinde bir verinin var olup olmadığına bakıyoruz ikinci olarak gelen verilerden name verisinin var olup olmadığına bakıyoruz hepsi tamamsa fonksiyon çalışır ve istediğimiz ülke ismini aratabiliriz


  const getCountryISO2 = (iso2, event) => {
    event.preventDefault(); //sayfa yenilenmesini engelliyor 
    setCountryISO2(iso2); //buradan tıklanan ülkenin iso2 kodu state içine atlıyor 
    navigate(`/sehirSecimSayfası/${iso2}`) //yönlendirilen sayfaya parametre olarak bu kod geçiliyor bu sayede o koda sahip olan şehirler getirilecek dataset içinden 

    dispatch(fetchCitiesData(iso2));

  }



  return (
    <div className="flex flex-col items-center min-h-screen " style={{ backgroundImage: 'url("images/genisEkranArkaPlan.png")', backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <p className="text-center font-bold text-3xl m-3 text-cream">Ülke Seçiniz</p>

      <div className=" flex flex-row justify-center items-center w-full pt-2 pb-10">
        <input value={searchTermCountry} onChange={e => setSearchTermCountry(e.target.value)} placeholder="ülke ismi giriniz..." className="bg-cream opacity-60 focus:opacity-100 text-earthyBrown rounded-md h-12 w-1/2 lg:w-2/5  xl:w-1/3 outline-none xl:text-xl pl-3"></input>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 2md:grid-cols-3 2lg:grid-cols-4 2xl:grid-cols-5 gap-4 m-2 ">
        {filteredCountry && filteredCountry.map((data) => (

          <div onClick={(event) => getCountryISO2(data.iso2, event)} key={data.id} className=" flex flex-row justify-center items-center space-x-2 rounded-md px-3 py-1 cursor-pointer " style={{ backgroundColor: 'rgba(255,217,90,0.5)' }}>
            <p className="text-2xl">{data.emoji}</p>
            <p className="truncate text-cream text-md">{data.name}</p>
          </div>

        ))}
      </div>


    </div>
  )
}

export default CountrySelectionPage