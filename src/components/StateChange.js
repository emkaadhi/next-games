import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { auth } from '../config/firebase';
import { login, logout, selectUser } from '../store/users';

const StateChange = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // user is logged in
            dispatch(
              login({
                email: user.email,
                uid: user.uid,
              })
            );
          } else {
            dispatch(logout());
          }
        });
        console.log('page loaded');
      }, [dispatch]);
//   return (
//     <></>
//   )
}

export default StateChange