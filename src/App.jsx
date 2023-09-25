import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApiKeyPage from './components/apiKeyPage';
import CountrySelectionPage from './components/CountrySelectionPage';
import { PrivateRoute } from "./components/PrivateRoute";
import { Provider } from 'react-redux';
import { store } from "./components/redux/store"
import CitySelectionPage from './components/CitySelectionPage';
import CityWeatherInfo from './components/CityWeatherInfo';
import WeatherChart from './components/WeatherChart';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ApiKeyPage />} />
          <Route path="/ülkeSeçimSayfası" element={
            // bu kısım PrivateRoute ile sadece izinli kişilerce görüntülenebilmesi için yapıldı
            <PrivateRoute>
              <CountrySelectionPage />
            </PrivateRoute>
          } />

          <Route path="/sehirSecimSayfası/:countryISO3" element={
            // bu kısım PrivateRoute ile sadece izinli kişilerce görüntülenebilmesi için yapıldı
            <PrivateRoute>
              <CitySelectionPage />
            </PrivateRoute>
          } />

          <Route path="/sehirBilgisi/:cityName" element={
            // bu kısım PrivateRoute ile sadece izinli kişilerce görüntülenebilmesi için yapıldı
            <PrivateRoute>
              <CityWeatherInfo />
            </PrivateRoute>
          } />
          <Route path='/deneme' element={<WeatherChart />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
