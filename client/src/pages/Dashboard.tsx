import React, { useEffect, useState } from "react";
import SubmitButton from "../components/SubmitButton";
import hostConfig from '../hostConfig.json'
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { NavLink } from "react-router-dom";
import DeleteUpdateButtons from "../components/DeleteUpdateButtons";

const Dashboard: React.FC = () => {
    const { id } = useParams();
    const [blogs, setBlogs] = useState<any>();
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await axios.get(`${hostConfig.API_URL}/api/posts/search?q=${query}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        setBlogs(res.data)
        setLoading(false)
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try{
                const res = await axios.get(`${hostConfig.API_URL}/api/posts?page=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setBlogs(res.data)
                setLoading(false)
            }catch(err){
                setLoading(false)
            }
        }
        getData()
    }, [id])
    return (
        <>
        {loading ? <Loading /> :
            <div className="mx-auto max-w-6xl min-h-screen px-4">
                <form onSubmit={handleSubmit} className="flex justify-between h-8 mt-2 gap-1" action="">
                    <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full h-8 outline-none shadow-sm px-2 rounded-md" placeholder="Search..." type="text" />
                    <SubmitButton content="Search" />
                </form>
                {blogs?.data?.length === 0 && <h2 className="text-red-600 mx-auto mt-2 text-center"> No Posts Found</h2> }
                <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2">
                    {blogs && blogs.data.map((el: any) => (
                        <div key={el.id} className="border w-auto border-gray-100 rounded-sm mt-2 flex flex-col items-center p-4">
                            <div className="">
                                <img src={`${hostConfig.API_URL}/storage/${el.image}`} className="rounded-sm object-cover w-64 h-44" alt="" />
                                <h2>By {el.user.name}</h2>
                                <h2 className="text-gray-900 mt-2"> {el.title} </h2>
                                <p className="text-ellipsis text-gray-900">{el.body.slice(0, 34)}</p>
                                <div className="flex mt-1 justify-between">
                                    <NavLink className="rounded-lg block bg-blue-600
                                    hover:bg-blue-400 duration-500 ease-in-out border-0
                                        py-1 text-white px-4 w-fit" to={`/dashboard/blog/${el.slug}`}>
                                        Details
                                    </NavLink>
                                    {<DeleteUpdateButtons setBlogs={setBlogs} creatorId={el.user.id} slug={el.slug}/>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination blogs={blogs} />
            </div>
        }
        </>
    )
}

export default Dashboard;