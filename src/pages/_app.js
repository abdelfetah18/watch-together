import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

export function reportWebVitals(metric) {
  console.log(metric);
}

function MyApp({ Component, pageProps }) {
  var [user,setUser] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies(['access_token']);

  useEffect(() => {
    if(pageProps.user){
      setUser(state => ({ ...state, ...pageProps.user, access_token: cookies.access_token }));
    }else{
      setUser(state => ({ ...state, access_token: cookies.access_token }));
    }
  },[]);

  return <Component {...pageProps} user={user} setUser={setUser} />
}

export default MyApp