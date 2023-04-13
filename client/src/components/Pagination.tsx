import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

interface Props {
  blogs: any
}

const Pagination: React.FC<Props> = ({blogs}) => {
  const { id } = useParams() as {id: string};
  return (
    <div className="flex justify-between mt-2">
        <NavLink className={`border border-gray-400 rounded-md px-2 py-2 ${parseInt(id) == 1 && 'pointer-events-none'}`} to={`/dashboard/${parseInt(id!)-1}`}>Previous</NavLink>
        <NavLink
            className={`border border-gray-400 rounded-md px-2 py-2 ${parseInt(id) > blogs?.last_page && 'pointer-events-none'}`}
            to={`/dashboard/${parseInt(id!)+1}`}
            >Next</NavLink>
    </div>
  )
}

export default Pagination