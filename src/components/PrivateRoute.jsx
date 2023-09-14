import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true"; //burada sessionStorage içinden eğer isAuthenticated true değer ise yönlendirme sağlanmasına izin veriliyor 

  if (!isAuthenticated) { //eğer true değer değilse kişiyi anasayfaya yönlendiriyor ve uygulama içine göndermeyi engelliyor
    return <Navigate to="/" replace />;
  }

  return children;
}
