import React, { useEffect, useState } from 'react'
import hostConfig from '../hostConfig.json'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Loading from '../components/Loading'

const PostInner = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
        const res = await axios.get(`${hostConfig.API_URL}/api/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })


        setBlog(res.data)
        setLoading(false)
    }
    getData()
  }, [])

  return (
    <>
        {loading ? <Loading />:
            <div key={blog.id} className="border w-auto border-gray-100 rounded-sm mt-2 p-4 mx-auto max-w-6xl">
                <NavLink className="my-2 block" to="/dashboard/1"> {'<'} Back </NavLink>
                <div className="space-y-2">
                    <img src={`${hostConfig.API_URL}/storage/${blog.image}`} className="rounded-sm object-cover w-64 h-44" alt="" />
                    <h2 className='capitalize'>By {blog.user.name}</h2>
                    <h2 className="text-gray-900 text-2xl capitalize"> {blog.title} </h2>
                    <p className="text-ellipsis text-gray-900">{blog.body}</p>
                </div>
            </div>
        }
    </>
  )
}

export default PostInner