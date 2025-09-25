import '@/styles/globals.css';

import { useEffect } from 'react';
import { Roboto } from 'next/font/google';
import ThemeContext from '@/contexts/ThemeContext';
import useTheme from '@/hooks/useTheme';
import useToast from '@/hooks/useToast';
import ToastContext from '@/contexts/ToastContext';
import Toast from '@/components/Toast';
import LoadingContext from '@/contexts/LoadingContext';
import useLoading from '@/hooks/useLoading';
import Loading from '@/components/Loading';
import useUser from '@/hooks/useUser';
import UserContext from '@/contexts/UserContext';

const inter = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] });

// export function reportWebVitals(metric) {
//   console.log(metric);
// }

function MyApp({ Component, pageProps }) {
  const themeManager = useTheme();
  const loading = useLoading();
  const { user } = useUser();
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
          <UserContext.Provider value={user}>
            <Component {...pageProps} />
            <Toast />
            <Loading />
          </UserContext.Provider>
        </LoadingContext.Provider>
      </ThemeContext.Provider>
    </ToastContext.Provider>
  )
}

export default MyApp