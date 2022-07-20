import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth, db, storage } from '../../config/firebase'
import { login, register } from '../../store/users'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
// import {register } from '../../features/UserSlice'


const Signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')

  const dispatch = useDispatch();

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
      if (avatar == null) return;
        const imageRef = ref(storage, `images/${avatar.name}`);
        uploadBytes(imageRef, avatar).then((snapshot) => {
            let inputImage = ''
            getDownloadURL(snapshot.ref).then((url) => {
                inputImage = url
                setDoc(doc(db, 'users', user.uid), {
                  name,
                  address: '',
                  phone: '',
                  avatar: inputImage,
                  bio: '',
                  playerId: user.uid,
                  createdAt: serverTimestamp()
                })
                setDoc(doc(db, 'gamepoint', user.uid), {
                  totalpoint: 0,
                  name,
                  avatar: inputImage,
                  playerId: user.uid,
                  updatetAt: serverTimestamp()
                })
            });
        });
      router.push('/auth/signin')
      toast.success("Sign Up successfully , please Sign in now !")
    } catch (err) {
      toast.error("Account already in use or check your filed again !")
    }
  }

  return (
    <>
      <div className="page-header align-items-start min-vh-100" style={{ backgroundImage: 'url("https://wallpapercave.com/dwp2x/wp7069499.jpg")', Height: '120vh' }}>
        <span className="mask bg-gradient-dark opacity-6" />
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto mt-2">
              <div className="card z-index-0 fadeIn3 fadeInBottom mt-3">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign Up</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-dynamic my-3">
                      <input type="text" name='name' className="form-control" onChange={(e) => setName(e.target.value)} placeholder='your name...'  required/>
                    </div>
                    <div className="input-group input-group-dynamic my-3">
                      <input type="email" name='email' className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder='your email...'  required/>
                    </div>
                    <div className="input-group input-group-dynamic mb-3">
                      <input type="password" name='password' className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder='password'  required/>
                    </div>
                    <label htmlFor="avatar">Choose your avatar :</label>
                    <div className="input-group input-group-dynamic mb-3">
                      <input type="file" className="form-control" onChange={(e) => {
                        setAvatar(e.target.files[0]);
                      }} required/>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn bg-gradient-primary w-100 my-2 mb-2">Sign Up</button>
                    </div>

                    <p className="mt-3 text-sm text-center">
                      <Link href={`/auth/signin`}>
                        <a>Already membership ?</a>
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

export default Signup