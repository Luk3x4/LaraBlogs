import React, { useEffect, useState } from 'react'
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';
import hostConfig from '../hostConfig.json';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';


const CreatePost: React.FC = () => {
  const [formData, setFormData] = useState({ title: '', body: '', image: '' as any});
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({__html:""});
  const { id } = useParams();
  const navigate = useNavigate()

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => {
        return {...prev, [e.target.name]: e.target.value}
    });
  }

  useEffect(() => {
    const getData = async () => {
        setLoading(true)
        const res = await axios.get(`${hostConfig.API_URL}/api/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
        });

        const { title, body, image } = res.data;
        setFormData(prev => { 
            return {...prev, title, body}
        });
        setImagePreview(`${hostConfig.API_URL}/storage/${image}`)
        setLoading(false);
    }
    getData();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const slugified = formData.title.split(' ')
                      .map(el => el.toLowerCase())
                      .join('-');
    try{
        const res = await axios.put(`${hostConfig.API_URL}/api/posts/${id}`, Object.assign(
            formData, {slug: slugified}
            ), {
            headers: {
                'Content-Type': `multipart/form-data`,
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
        });
        navigate('/dashboard/1');
    }catch(err: any){
        delete err.response.data.errors.slug;
        const errors: any = Object.values(err.response.data.errors).reduce((a: any, b: any) => {
              return [...a, ...b]
            }, []);
        setErrors({__html: errors.join('<br>')})
    }
    setLoading(false);
  } 

  return (
    <>
    {loading ? <Loading /> : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-36 flex flex-col min-h-44 gap-2 p-4 space-y-2">
            <h2 className="text-gray-900 text-xl" > Update Post </h2>
            {imagePreview && (
                <img src={imagePreview} className='w-48 h-32 object-cover' alt="" />
            )}
            { errors.__html && (
                <div className="bg-red-700 duration-500 rounded-md text-white py-1 px-2 w-full capitalize"
                dangerouslySetInnerHTML={errors}>
                </div>
            ) }
            <input type="text" value={formData.title} onChange={handleChange} placeholder="title" className='block w-full outline-none border-b border-gray-400 focus:border-b-blue-400 duration-500 px-2 h-8 placeholder:font-extralight' name="title" id="" />
            <input type="text" value={formData.body} onChange={handleChange} placeholder='body...' className='block w-full outline-none border-b border-gray-400 focus:border-b-blue-400 duration-500 px-2 h-8 placeholder:font-extralight' name="body" id="" />
            <input type="file" onChange={(e) => {
                const reader = new FileReader();
                if(!e.target.files) return;
                const file = e.target.files[0];

                reader.addEventListener('load', (e) => {
                    setImagePreview(e.target?.result as string)
                })
                
                reader.readAsDataURL(file);
                setFormData(prev => {
                    return {...prev, image: file}
                });
            }} name="image" className="image-uploader" id="" />
            <SubmitButton content='Submit' />
        </form>
    )}
    </>
  )
}

export default CreatePost