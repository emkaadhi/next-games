import '../../styles/material-kit.min.css'
import '../../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css';
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import { store } from '../store'
import { Provider} from 'react-redux'
import Navbar from '../components/Navbar'
import MyToast from '../components/MyToast';
import Footer from '../components/main-components/Footer';

const noAuth = ['/', '/auth/signin', '/auth/signup','/posts']



function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <Provider store={store}>
        <MyToast />
        {
          noAuth.includes(router.pathname) ? (
            <>
            <Component {...pageProps} />
            <Footer/>
            </>
          ) : (
            <ProtectedRoute>
              <Navbar />
              <Component {...pageProps} />
              <Footer/>
            </ProtectedRoute>
          )
        }
      </Provider>
    </>
  )

}

export default MyApp

