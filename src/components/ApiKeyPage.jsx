import React, { useEffect } from 'react'
import { useState } from 'react'
import { app } from '../../firebaseconfig';
import { AiFillExclamationCircle } from "react-icons/ai"
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';



const ApiKeyPage = () => {

  const db = getDatabase(app);
  const navigate = useNavigate();


  const [apiKey, setApiKey] = useState("");
  const [keyErrorMessage, setKeyErrorMessage] = useState(false);
  const [keyErrorMessage2, setKeyErrorMessage2] = useState(false);


  const checkApiKeyInDatabase = (e) => {
    e.preventDefault();

    if (!apiKey.trim()) { //trim fonksiyonu ile input içindeki yazılar dışında kalan tü boşlujklar silinir ve bu sayede boş input gönderilemez
      setKeyErrorMessage2(true);
      return; // apiKey boşsa fonksiyonu burada sonlandırır
    }

    //  const db = app.database(); //firebase içinde real time database içine erişim yapıyoruz
    const apiKeysRef = ref(db, "apiKeys"); //bu kısımda real time database içinde kullanıcağımız kısıma erişiyoruz api keylerin olduğu kısıma erişiyoruz burada 

    get(apiKeysRef).then(snapshot => {
      if (snapshot.hasChild(apiKey)) {
        sessionStorage.setItem("isAuthenticated", "true")
        console.log("api key doğru !!");
        navigate('/ülkeSeçimSayfası');
      } else {
        setKeyErrorMessage(true);
      }
    })

  }

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setKeyErrorMessage(false)
    }, 2000)

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [keyErrorMessage])

  useEffect(() => {
    let timer2; //zamanlayıcıyı bu değişken içine tanımlıyacağız

    if (keyErrorMessage2) {
      timer2 = setTimeout(() => {
        setKeyErrorMessage2(false)
      }, 2000);
    }

    return () => {
      if (timer2) {
        clearTimeout(timer2); //component unmount olmadan önce zamanlayıcıyı temizliyoruz çünkü zamanlama bitmeden component unmount olabilr ve hata alabiliriz hata almamak için cleanup yapıyoruz
      }
    };
  }, [keyErrorMessage2]);


  console.log(apiKey);
  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url("images/genisEkranArkaPlan.png")' }} >
      <form className="flex flex-col justify-center items-center h-screen w-full space-y-3 ">

        {/* baslik */}
        <div className="">
          <h3 className='text-cream text-2xl  2sm:text-3xl 2md:text-5xl xl:text-xxxl font-semibold'>SİSTEME GİRİŞ İÇİN KEY GİRİNİZ</h3>
        </div>

        {/* key input */}

        <div className=" w-full flex flex-row justify-center items-center">
          <input
            type='text'
            placeholder='APİ KEY GİRİNİZ...'
            onChange={e => setApiKey(e.target.value)}
            className="bg-cream opacity-60 focus:opacity-100 text-earthyBrown text-lg md:text-xl rounded-md outline-none pl-5  w-10/12 sm:w-3/4 md:w-3/5 lg:w-2/3 xl:w-1/3   h-10 md:h-12 lg:h-14"
          />
        </div>

        {/* Giriş Button */}

        <div className="w-full flex flex-row justify-center items-center">
          <button onClick={checkApiKeyInDatabase} className="text-earthyBrown bg-opacity-60 active:opacity-100 w-1/3  2md:w-1/4  2lg:w-1/5 2xl:w-1/6  bg-cream rounded-sm px-2 py-1">Gönder</button>
        </div>

        {/* error message  */}

        {keyErrorMessage ? <div className="  flex flex-row justify-start items-center space-x-3 px-5 py-3 bg-rose-500 rounded-md">
          <AiFillExclamationCircle className="fill-cream w-10 h-10" /> <p className="text-cream text-xl font-semibold">Api Key Hatalı</p>
        </div> : ""}

        {

          keyErrorMessage2 ? <div className="  flex flex-row justify-start items-center space-x-3 px-5 py-3 bg-rose-500 rounded-md">
            <AiFillExclamationCircle className="fill-cream w-10 h-10" /> <p className="text-cream text-xl font-semibold">Api Key Alanı Boş Bırakılamaz!!</p>
          </div> : ""}

      </form>
    </div>
  )
}

export default ApiKeyPage