import React, { useEffect, useState } from 'react'
import { selectUser } from '../../store/users'
import { useDispatch, useSelector } from 'react-redux'
import { get_profile_data, update_profile_data, get_current_profile } from '../../store/profile'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../../config/firebase'
import { doc, updateDoc } from 'firebase/firestore'

const UpdatePage = () => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')

  const user = useSelector(selectUser);
  const id = user?.uid

  const router = useRouter()

  const profileData = useSelector((state) => state.profile.currentPlayer)
  console.log(profileData);
  const dispatch = useDispatch()

  useEffect(() => {
    if (profileData) {
      dispatch(get_current_profile(user?.uid))
      setName(profileData.name)
      setAddress(profileData.address)
      setPhone(profileData.phone)
    }
  }, [])

  const handleSubmit = (e) => {
    try {
      e.preventDefault()
      const profileCollectionRef = doc(db, 'gamepoint', id)
      if (avatar == null) return;
      const imageRef = ref(storage, `images/${avatar.name}`);
      uploadBytes(imageRef, avatar).then((snapshot) => {
        let avatar = ''
        getDownloadURL(snapshot.ref).then((url) => {
          avatar = url
          dispatch(update_profile_data({ id, name, address, phone, avatar }))
          updateDoc(profileCollectionRef, { name: name, avatar: avatar })
        });
      });
      router.push('/home')
      toast.success('Update successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (!profileData) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-3">
            <div className="card">
              <div className="card-header bg-primary text-center">
                <h5 className='text-uppercase text-white'>Update Profile</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="input-group input-group-dynamic mb-4">
                    <input type="text"
                      className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..." />
                  </div>
                  <div className="input-group input-group-dynamic mb-4">
                    <input type="text"
                      className="form-control" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address..." required/>
                  </div>
                  <div className="input-group input-group-dynamic mb-4">
                    <input type="text"
                      className="form-control" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone..." required/>
                  </div>
                  <div className="input-group input-group-dynamic">
                    <input type="file" className="form-control" onChange={(e) => {
                      setAvatar(e.target.files[0]);
                    }} required/>
                  </div>
                  <button type="submit" className='btn btn-primary btn-block mt-4'>Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePage