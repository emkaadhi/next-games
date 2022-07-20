import axios from 'axios'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { db, storage } from '../../config/firebase'
import { get_current_profile } from '../../store/profile'
import { selectUser } from '../../store/users'


const Upload = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const user = useSelector(selectUser);
    const id = user?.uid

    const profileData = useSelector((state) => state.profile.currentPlayer)

    const [fileName, setFileName] = useState('')
    const [artist, setArtist] = useState('')
    const [fileupload, setFileUpload] = useState('')
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [imageUpload, setImageUpload] = useState('')
    const [post, setPost] = useState('')

    useEffect(() => {
        if (id) {
            dispatch(get_current_profile(id))
            setName(profileData.name)
            setAvatar(profileData.avatar)
        }
    }, [dispatch,id,profileData.name,profileData.avatar])


    if (!profileData) {
        return (
            <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }



    const AVSubmit = (e) => {
        e.preventDefault()
        if (fileupload == null) return;
        const mediaDB = collection(db, 'media')
        const mediaRef = ref(storage, `media/${fileupload.name}`);
        uploadBytes(mediaRef, fileupload).then((snapshot) => {
            let inputMedia = ''
            getDownloadURL(snapshot.ref).then((url) => {
                inputMedia = url
                addDoc(mediaDB, ({ name, avatar, fileName, artist, link: inputMedia, createdAt: serverTimestamp() }))
            });
        });
        router.push('/home')
        toast.success("File Upload Success !")
    }

    const imageSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('file', imageUpload)
        formdata.append('upload_preset', 'lznoc89x')
        const imageDB = collection(db, 'images')

        const data = await axios.post('https://api.cloudinary.com/v1_1/binar-cloud/image/upload', formdata)
            .then((res) => {
                addDoc(imageDB, ({ name, avatar, post, url: res.data.secure_url, createdAt: serverTimestamp() }))
                router.push('/home')
                toast.success("Image Upload Success !")
            })
            .catch(err => console.log(err))
    }



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mt-5">
                            <div className="card-header bg-primary text-center">
                                <h5 className='text-uppercase text-white'>Upload Audio/Video File</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={AVSubmit}>
                                    <div className="input-group input-group-dynamic mb-4">
                                        <input type="text"
                                            className="form-control" name="filename" onChange={(e) => setFileName(e.target.value)} placeholder="Song Title..." />
                                    </div>
                                    <div className="input-group input-group-dynamic mb-4">
                                        <input type="text"
                                            className="form-control" name="artist" onChange={(e) => setArtist(e.target.value)} placeholder="Artist..." />
                                    </div>
                                    <div className="input-group input-group-dynamic">
                                        <input type="file" className="form-control" onChange={(e) => {
                                            setFileUpload(e.target.files[0]);
                                        }} />
                                    </div>
                                    <button type="submit" className='btn btn-primary btn-block mt-4'>Upload</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mt-5">
                            <div className="card-header bg-primary text-center">
                                <h5 className='text-uppercase text-white'>Upload Image File</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={imageSubmit}>
                                    <div className="input-group input-group-dynamic mb-4">
                                        <input type="text"
                                            className="form-control" name="post" placeholder="post a comment..." onChange={(e) => setPost(e.target.value)} />
                                    </div>
                                    <div className="input-group input-group-dynamic">
                                        <input type="file" className="form-control" onChange={(e) => {
                                            setImageUpload(e.target.files[0]);
                                        }} />
                                    </div>
                                    <button type="submit" className='btn btn-primary btn-block mt-4'>Upload</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Upload