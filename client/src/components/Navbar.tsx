import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import axios from "axios"

const Navbar: React.FC = () => {
    const { user, dispatch } = useAuthContext();
    const [active, setActive] = useState(false);

    useEffect(() => {
        const getMe = async () => {
            const res = await axios.get("http://127.0.0.1:8000/api/me", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            console.log(res);
            dispatch({type: 'Login', payload: {
                user: res.data
            }})
        }

        getMe();
    }, [])

    const logout = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/logout', null, {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`
                }
            });
            dispatch({type: 'logout'});
            localStorage.clear();
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <nav className="h-12 shadow-sm flex justify-between px-4 items-center w-full">
            <NavLink to="/" className="text-xl hover:text-gray-400 duration-500 ease-in-out text-gray-900">LaraBlogs</NavLink>
            <div className={`${active? 'right-0': 'max-[900px]:right-[-150px]'} bg-white h-full duration-500 max-[900px]:absolute max-[900px]:top-12 max-[900px]:block max-[900px]:shadow-sm max-[900px]:px-4 lg:space-x-4 flex items-center`}>
                {!user ? (
                    <>
                        <NavLink className="text-xl hover:text-gray-400 duration-500 ease-in-out text-gray-900 max-[900px]:block" to="/login">Login</NavLink>
                        <NavLink className="text-xl hover:text-gray-400 duration-500 ease-in-out text-gray-900 max-[900px]:block" to="/register">Register</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink className="text-xl hover:text-gray-400 duration-500 ease-in-out text-gray-900 max-[900px]:block" to="/create">Create</NavLink>
                        <a onClick={logout} className="cursor-pointer text-xl hover:text-gray-400 duration-500 ease-in-out text-gray-900 max-[900px]:block">Logout</a>
                    </>
                )}
            </div>
            {<span onClick={() => setActive(prev => !prev)} className={`mt-1 hidden max-[900px]:block cursor-pointer material-symbols-outlined`}>menu</span>}
        </nav>
    )
}

export default Navbar