import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApiKeyPage from './components/apiKeyPage';
import CountrySelectionPage from './components/CountrySelectionPage';
import { PrivateRoute } from "./components/PrivateRoute";
import { Provider } from 'react-redux';
import {store} from "./components/redux/store"

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
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
