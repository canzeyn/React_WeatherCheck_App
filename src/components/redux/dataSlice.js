import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import Papa from 'papaparse';
import axios from 'axios';

export const fetchCountriesData = createAsyncThunk(
  'data/fetchCountries', //burada isim veriyoruz bu yapıya  action type bu type ile extraReducer içinde işlmerl yapıcağız
  async (_, thunkAPI) => {  //burada ilk parametre payload kısmıdır burada bir payload olmadığı için _ kullanılmış
    const response = await axios.get('/countries.csv', { responseType: 'text' }); //burada public klasöründe olan csv dosyasını axios ile içerisindeki veriyi getiriyoruz 
    //responseType: 'text'  ile gelen veriyi text olarak alıyoruz genelde axios gelen veriyi json formatından javascript formatına dönüştürüyor burada csv dosyasını aldığımız için text olarak yaptırıyoruz 
    const csvText = response.data; //burada dönen veriyi data ile alıyoruz ve değişkene atıyoruz 

    return new Promise((resolve) => { //burada bir promise yapısı kullanıyoruz normalde promise ile hata yönetimi yapılır ama hata alma ihtimali olmadığı için yalnızca olumlu olarak yapıyoruz işlemleri 
      Papa.parse(csvText, { //burada papaparse kütüphanesi ile dataseti jabvascript nesnesine fönüştüyürouz bu sayede kullanabileceğiz 
        header: true, //burası datset içinde ilk satırın başlık olup olmadığını ayarlıyoruz varsa true yoksa false
        complete: (results) => { //burada papaparse işlemi bitirince ne yapması gerektiği için kullanılır complete 
          resolve(results.data); //burada dönen veriler resolve içinde tutuluyor 
        }
      });
    });
  }
);

export const fetchCitiesData = createAsyncThunk(
  'data/fetchCities',
  async (iso2, thunkAPI) => { //burada kullanıcının tıkladıpı ülkenin iso2 kodu ile o ülkeye ait şehirleri buluyoruz
    const response = await axios.get('/cities.csv', { responseType: 'text' }); //burada sadece o ülkeye ait olan verileri çekmek için istek atıyoruz
    const csvText = response.data;

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const filteredCities = results.data.filter(city => city.country_code === iso2) //burada filter methodu ile tıklanan ülkenin iso2 kodunu alıyoruz ve tüm şehirlerden eşleşen şehirleri alıyoruz
          resolve(filteredCities);
        }
      });
    });
  }
);

  

  const dataSlice = createSlice({
    name: "data",
    initialState: {
        countries: [],
        cities: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {  // createAsyncThunk ile oluşturulan action'ları işlemek için extraReducers kullanılır.
        builder
        //ülkeri çekerken 
            .addCase(fetchCountriesData.pending, (state) => { //burada ilk olarak action type ile hangi verilere işlem yapıcağmızı seçiyoruz pending ile veri çekilmeye başladığı zaman ne yapacağını ayarlıyoruz
                state.isLoading = true; //veriler çekilmeye başladığı için isLoading adlı state ture oluyor bu sayede kullanıcıya yüklendiği bilgisi verebiliyoruz
                state.error = null; //hata statei boş
            })
            .addCase(fetchCountriesData.fulfilled, (state, action) => { //fullfield ile veri çekme işlemi bitince yapılacak işlemri burada giriyoruz 
                state.countries = action.payload; //burada ülke isimleri çektiğimiz datasetteki verileri state içine ekliyoruz 
                state.isLoading = false; //yükleme işlemi bitince yükleme bittiğ-ni kişye gösteriyoruz
            })
            .addCase(fetchCountriesData.rejected, (state, action) => { //hata olmasın halinde burada yani rejected iile gösteriyorz
                state.isLoading = false; // yükleme işlemi ile işimiz olmadığı için false değeri
                state.error = action.error.message; //hatayı error adlı state içine ekliyoruz ve kullanıcıya bu state i gösteriyoruz 
            })
            // Şehirleri çekerken
            .addCase(fetchCitiesData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCitiesData.fulfilled, (state, action) => {
                state.cities = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCitiesData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export default dataSlice;
