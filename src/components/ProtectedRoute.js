import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { toast } from 'react-toastify'
import { auth } from '../config/firebase';
import { login, selectUser } from '../store/users'



const ProtectedRoute = ({ children }) => {
  const router = useRouter()
  
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth/signin')
      }
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
          })
        );
      } 
      return children
    });
  }, [dispatch]);

  if (!user) {
    return
  }
  return children
}

export default ProtectedRoute