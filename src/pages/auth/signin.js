import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth} from '../../config/firebase'
import { login} from '../../store/users'
import {toast} from 'react-toastify'


const Signin = () => {

  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const dispatch = useDispatch();

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch(
          login({
            email: user.user?.email,
            uid: user.user?.uid,
          })
        );
        router.push('/home')
        toast.success("you're successfully login")
      })
      .catch((err) => {
        toast.error("Check your authentication account !")
      });
  }

  return (
    <>
       <div className="page-header align-items-start min-vh-100" style={{backgroundImage: 'url("https://wallpapercave.com/dwp2x/wp7069499.jpg")'}}>
        <span className="mask bg-gradient-dark opacity-6" />
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-dynamic mb-4">
                      <input type="email" name='email' className="form-control" onChange={(e)=>setEmail(e.target.value)} placeholder='your email...'  required/>
                    </div>
                    <div className="input-group input-group-dynamic mb-4">
                      <input type="password" name='password' className="form-control" onChange={(e)=>setPassword(e.target.value)} placeholder='password' required/>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button>
                    </div>
                    
                    <p className="mt-4 text-sm text-center">
                      <Link href={`/auth/signup`}>
                        <a>Don&lsquo;t have an account?</a>
                      </Link>
                    </p>
                    <p className="mt-1 text-sm text-center">
                      <Link href={`/`}>
                        <a>back to home</a>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin