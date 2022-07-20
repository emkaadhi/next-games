import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import moment from 'moment'

const ImageComponent = () => {

    const [image, setImage] = useState([])

    const getImages = () => {
        const dbRef = collection(db, 'images')
        getDocs(dbRef)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                setImage(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getImages()
    }, [])

    if (!image) {
        return (
            <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    {
                        image && image.map((e) => {
                            return (

                                <div className="col-md-4 mb-4">
                                    <div className="card overflow-hidden shadow"> <img className="card-img-top" src={e.url} alt="Rome, Italty" />
                                        <div className="card-body py-4 px-3">
                                            <div className="d-flex align-items-start mb-3">
                                                <img src={e.avatar} className='rounded-circle' alt="img profile" width="50" height="50" />
                                                <div>
                                                    <div className="flex-grow-1 ml-5">Upload By : {e.name}</div>
                                                    <div className="flex-grow-1 ml-5"><small>{moment(e?.createdAt.toDate()).fromNow()}</small></div>
                                                </div>
                                            </div>
                                            <p><small>{e.post}</small></p>
                                            <div className="float-right">
                                                <i className="fas fa-thumbs-up ml-3"></i>
                                                <i className="fas fa-comment-alt ml-3"></i>
                                                <i className="fas fa-share-alt ml-3"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ImageComponent