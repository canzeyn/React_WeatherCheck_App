import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai"
import { BiSolidSun } from "react-icons/bi"
import { WiDegrees } from "react-icons/wi"
import { AiOutlineCalendar } from "react-icons/ai"
import { useState, useEffect } from 'react'
import WeatherChart from './WeatherChart'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from './redux/apiSlice'
import { useNavigate } from 'react-router-dom'

const CityWeatherInfo = () => {
   
    const navigate = useNavigate();
    const { cityName } = useParams(); //url kısmından parameter olarak geçilen şehir ismini burada alıyoruz
    const dispatch = useDispatch();
    const weatherData = useSelector(state => state.weather.data); //redux içinden şehirin hava durmunu bilgisini içeren state buraya getiriliyor


    useEffect( () => {
        function fetchDatas() {
            if (cityName) { //burada gelen şehir ismi var ise bu kod çalışır 
            dispatch(fetchWeatherData(cityName)); //redux içine oluşturduğumuz api isteği yapan yapı çalışır ve parametre olarak tıklanan şehir ismini alır 
        }

        }

        fetchDatas();
        
    }, [cityName, dispatch]); //bu useEffect in bağımlılıkları  cityName dir yani eğer şehir isminde bir değişiklik olursa bu useEffect tekrardan çalışır ve yeni gelen şehir ismi için apiye o şehir için istek atar

    useEffect(() => {
        console.log("Güncellenen weatherData:", weatherData);
    }, [weatherData]);

    const kelvinToCelsius = (kelvin) => {
        return kelvin - 273.15;
    }

    const feelslikeKelvinToCelius = (feels) => {
            return feels - 273.15
    }

    const goToPreviousPage = () => {
             navigate(-1);
    }


    
  


    return (
        <div style={{ backgroundImage: 'url("/images/havaDurumuResim.png")' }}>
            <div className="w-full h-screen flex flex-nowrap">
                <div className="flex flex-col items-center basis-1/5 border-r border-earthyBrown space-y-10">
                    <div className="flex flex-row items-center w-full space-x-3">
                        <AiOutlineArrowLeft onClick={goToPreviousPage} className="w-12 h-8 fill-earthyBrown stroke-2 cursor-pointer" />
                        <div>
                            <p className=" text-earthyBrown truncate uppercase text-4xl font-semibold"> {weatherData && weatherData.name ? weatherData.name : "Bilgi yükleniyor..."}</p>
                        </div>
                    </div>

                    {/* hava durumu güneşli karlı */}
                    <div>
                        <div className="flex flex-row items-center bg-cream w-full  px-4 py-2 rounded-md" style={{ backgroundColor: "rgb(255,247,212,0.3)" }}>
                            <p className="text-4xl text-earthyBrown font-bold"> {weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main ? weatherData.weather[0].main : "Bilgi yükleniyor..."}</p>
                            <BiSolidSun className="fill-sunshineYellow  w-14 h-10" />
                        </div>
                    </div>

                    {/* hava durumu derecesi */}
                    <div>
                        <div className="pb-2">
                            <h3 className=" text-earthyBrown text-2xl">Sıcaklık (santigrad):</h3>
                        </div>
                        <div className="bg-cream w-full  rounded-md px-8 py-5" style={{ backgroundColor: "rgb(255,247,212,0.3)" }}>
                            <div className=" flex  flex-row items-center border-2 border-earthyBrown rounded-full px-8 py-10">
                                <h3 className=" text-earthyBrown text-6xl font-semibold">{weatherData && weatherData.main ? kelvinToCelsius(weatherData.main.temp).toFixed(0) : "Bilgi Yükleniyor... "}</h3>
                            </div>
                        </div>
                    </div>

                    {/* gün bilgisi */}
                    <div>
                        <div className="bg-cream  w-full px-2 py-2 rounded-md" style={{ backgroundColor: "rgb(255,247,212,0.3)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                            <p className="flex flex-row items-center text-earthyBrown uppercase truncate text-3xl font-bold ">çarşamba <AiOutlineCalendar className="pl-1" /> </p>

                        </div>
                    </div>
                </div>


                <div className=" flex basis-4/5 w-full flex-col h-screen space-y-10 ">

                    {/* uv , rüzgar hızı , nem oranı bölümü */}
                    <div className="flex flex-row justify-evenly items-center mt-5">

                        {/* rüzgar hızı */}
                        <div className="flex flex-col justify-center items-center px-9 py-5 space-y-5" style={{ backgroundColor: "rgb(255,247,212,0.3)" }}>
                            <h3 className=" text-earthyBrown text-2xl font-semibold"> {weatherData && weatherData.wind ? weatherData.wind.speed + " km/sa" : "Bilgi yükleniyor..."}</h3>
                            <p className=" text-cream text-lg">20 km/sa</p>
                            <p></p>
                        </div>

                        {/* nem oranı */}
                        <div className="flex flex-col justify-center items-center px-10 py-5 space-y-5" style={{ backgroundColor: "rgb(255,247,212,0.3)" }}>
                            <h3 className="text-earthyBrown text-2xl font-semibold">Nem Oranı</h3>
                            <p className=" text-cream text-lg">{weatherData && weatherData.main ? weatherData.main.humidity + "%" : "Bilgi Yükleniyor"}</p>
                            <p></p>
                        </div>

                        {/* uv indeksi */}
                        <div className="flex flex-col justify-center items-center px-10 py-5 space-y-5" style={{ backgroundColor: "rgb(255,247,212,0.3)" }}>
                            <h3 className=" text-earthyBrown text-2xl font-semibold">Hissedilen Sıcaklık</h3>
                            <p className=" text-cream text-lg">{weatherData && weatherData.main ? feelslikeKelvinToCelius(weatherData.main.feels_like).toFixed(0) + "°C" : "Bilgi Yükleniyor"}</p>
                            <p></p>
                        </div>
                    </div>


                     {/* derece grafiği */}
                    <div className="mt-auto w-full h-full">
                        <div className="p-5 mt-5 w-full h-full rounded-md">
                            <WeatherChart />
                        </div>


                    </div>


                </div>
            </div>

        </div>
    )
}

export default CityWeatherInfo