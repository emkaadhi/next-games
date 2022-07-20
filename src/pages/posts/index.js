import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Posts = () => {
    const [posts,setPost] = useState([])

    const fetchPosts = async ()=>{
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=5`)
        console.log(res.data);
        setPost(res.data)
    }

    useEffect(()=>{
        fetchPosts()
    },[])

  return (
    <>

    </>
  )
}

export default Posts