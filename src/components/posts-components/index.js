import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Posts = () => {
    const [posts, setPost] = useState([])

    const fetchPosts = async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=5`)
        console.log(res.data);
        setPost(res.data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <>
        <div className="container">
            <div className="row">
            {
                posts.map((e) => {
                    return (
                        <>
                            <div className="col-md-4" key={e.id}>
                                <div className="card mt-2">
                                    <div className="card-header">
                                        <h5>{e.title}</h5>
                                    </div>
                                    <hr />
                                    <div className="card-body text-cente">
                                        <p className="mb-0">
                                            {e.body}
                                        </p>
                                        <Link href={`/`}>
                                            <button type="button" className="btn bg-gradient-primary btn-sm mb-0 mt-3">Read More</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
            </div>
        </div>
        </>
    )
}

export default Posts