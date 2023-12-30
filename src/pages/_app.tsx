import '@/styles/globals.css';
import UserSessionContext from '@/contexts/UserSessionContext';
import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import ThemeContext from '@/contexts/ThemeContext';
import useTheme from '@/hooks/useTheme';
import useUserSession from '@/hooks/useUserSession';
import useToast from '@/hooks/useToast';
import ToastContext from '@/contexts/ToastContext';
import Toast from '@/components/Toast';
import LoadingContext from '@/contexts/LoadingContext';
import useLoading from '@/hooks/useLoading';
import Loading from '@/components/Loading';

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

// export function reportWebVitals(metric) {
//   console.log(metric);
// }

function MyApp({ Component, pageProps }) {
  const themeManager = useTheme();
  const loading = useLoading();
  const { userSession } = useUserSession();
  const toastManager = useToast();

  useEffect(() => {
    // Inject font
    if (document) {
      document.body.classList.add(inter.className);
    }
  }, []);

  return (
    <ToastContext.Provider value={toastManager}>
      <ThemeContext.Provider value={themeManager}>
        <LoadingContext.Provider value={loading}>
          <UserSessionContext.Provider value={userSession}>
            <Component {...pageProps} />
            <Toast />
            <Loading />
          </UserSessionContext.Provider>
        </LoadingContext.Provider>
      </ThemeContext.Provider>
    </ToastContext.Provider>
  )
}

export default MyApp