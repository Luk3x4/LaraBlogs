import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import hostConfig from '../hostConfig.json'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  slug: number;
  creatorId: number;
  setBlogs: React.Dispatch<React.SetStateAction<any>>;
}

const DeleteUpdateButtons: React.FC<Props> = ({slug, creatorId, setBlogs}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate()

  const deleteBlog = async () => {
    setBlogs((prev: any[]) => {
      return { ...prev, data: (prev as any).data.filter((el: any) => el.slug != slug)}
    })
    const res = await axios.delete(`${hostConfig.API_URL}/api/posts/${slug}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })

  }

  if(user.id != creatorId){
    return null;
  }

  return (
    <div className='flex'>
      <button className="bg-red-500 border-0 px-1 rounded-lg flex items-center cursor-pointer" onClick={deleteBlog}>
        <span className="material-symbols-outlined text-white">delete</span>
      </button>
      <NavLink className="bg-blue-500 px-1 border-0 mx-1 rounded-lg flex items-center" to={`/update/${slug}`}>
        <span className="material-symbols-outlined text-white">edit</span>
      </NavLink>
    </div>
  )
}

export default DeleteUpdateButtons