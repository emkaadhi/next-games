import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import moment from 'moment'

const AudioComponent = () => {
    const [audio, setAudio] = useState([])

    const getMedia = () => {
        const dbRef = collection(db, 'media')
        getDocs(dbRef)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                setAudio(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getMedia()
    }, [])

    if (!audio) {
        return (
            <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    {
                        audio.map((e) => {
                            return (
                                <div className="col-lg-4 col-sm-6" key={e.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-start mb-3">
                                                <img src="https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=579&q=80" className='img-fluid' alt="img profile" width="60" height="60" />
                                                <div>
                                                    <div className="flex-grow-1 ml-3 text-uppercase"><b>{e.fileName}</b></div>
                                                    <div className="flex-grow-1 ml-3"><small>Artist :{e.artist} </small> </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="d-flex align-items-start mb-3">
                                                <img src={e.avatar} className='rounded-circle' alt="img profile" width="50" height="50" />
                                                <div>
                                                    <div className="flex-grow-1 ml-3">Upload By : {e.name} </div>
                                                    <div className="flex-grow-1 ml-3"><small>{moment(e?.createdAt.toDate()).fromNow()}</small></div>
                                                </div>
                                            </div>

                                            <audio controls>
                                                <source src={e.link} type="audio/mpeg" />
                                            </audio>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default AudioComponent