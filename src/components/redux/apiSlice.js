import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const apiKey = "2f980645a1183143ee775518061de1e1";

export const fetchWeatherData = createAsyncThunk(  //bir apiden veri çekeceğimiz için bu fonksiyonu kullanıyoruz
    "weather/fetchWeatheData", //ilk olarak slice adını alıyor ikinici olarak action type veriliyor 
    async (city) => { //buraya kullanıcın tıkladığı şehir isim bilgisi geliyor 
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`); //şehir isteği atıcağız apiye hava durumu bilgisi için şehir bilgisini kullanıcın tıkladığı şehirin adını alıcak ve apiden o şehrin hava durumu bilgisini getiricek
        console.log("API Response:", response.data); 
        return response.data //aixos ile dönen veriyi data olarak alıyoruz ve return ediyoruz
        
    }
);

const apiSlice = createSlice({
    name: "weather",
    initialState: {
        data: null, //veriyi bu state içine atıcağız
        status: "idle", //verinin durumunu burada saklıyoruz yükleniyor , başarılı bir şekilde geldi , hata var gibi idle henüz istek başlatılmadı anlamına geliyor
        error: null, //hatayı bu state içine atıcağız ve kullanıcıya bu state gösterilecek
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => { //addCase iki parametre alıyor birincisi state diğeri action ilk olarak state girilir ikinci olarak action
                state.status = "succeeded"
                state.data = action.payload //çektiğimiz veriyi burada ekliyoruz state içine 
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message;
            })
    }
});

export default apiSlice