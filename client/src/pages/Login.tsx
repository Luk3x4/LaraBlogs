import React, { useState } from 'react';
import axios from 'axios';
import hostConfig from '../hostConfig.json'
import Loading from '../components/Loading';
import { useAuthContext } from '../hooks/useAuthContext';
import SubmitButton from '../components/SubmitButton';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: ''})
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({__html:""});
    const { dispatch } = useAuthContext()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try{
            const res = await axios.post(`${hostConfig.API_URL}/api/login`, formData);
            const { user, token } = res.data;
            localStorage.setItem('access_token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({type: 'Login', payload: {
                user, token
            }});
            setLoading(false)
        }catch(err: any){
            if(err.response.data.msg){
                setErrors({__html: err.response.data.msg});
            }else if(err.response){
                const errors: any = Object.values(err.response.data.errors).reduce((a: any, b: any) => {
                    return [...a, ...b]
                }, []);
                setErrors({__html: errors.join('<br>')})
            }
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    return (
        <>
            {loading && <Loading />}
            <div className="max-w-xl mx-auto mt-52 border shadow-sm flex flex-col min-h-44 gap-2 p-4">
                <form onSubmit={handleSubmit} className='w-full px-10 space-y-6'>
                    <h2 className='text-gray-900 text-xl'>Login</h2>
                    { errors.__html && (
                        <div className="bg-red-700 duration-500 rounded-md text-white py-1 px-2 w-full capitalize"
                            dangerouslySetInnerHTML={errors}>
                        </div>
                    ) }
                    <div className='mt-1'>
                        <label htmlFor="email" className='text-gray-900'> Email </label>
                        <input className='block w-full outline-none border-b border-gray-400 focus:border-b-blue-400 duration-500 px-2 h-8 placeholder:font-extralight' type="email" value={formData.email} onChange={handleChange} placeholder='Email...' name="email" id="email"/>
                    </div>
                    <div className='mt-1'>
                        <label htmlFor="password" className='text-gray-900'> Password </label>
                        <input className='block w-full outline-none border-b border-gray-400 px-2 focus:border-b-blue-400 duration-500 h-8 placeholder:font-extralight' type="password" value={formData.password} onChange={handleChange} placeholder='Password...' name="password" id='password' />
                    </div>
                    <SubmitButton content="Submit" />
                </form>
            </div>
        </>
    )
}

export default Login;