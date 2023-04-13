import React from "react";

interface Props {
    content: string
}

const SubmitButton: React.FC<Props> = ({content}) => {
    return (
        <button className='rounded-lg block bg-blue-600 hover:bg-blue-400 duration-500 ease-in-out border-0 py-1 w-fit text-white px-4' type="submit"> {content} </button>
    )
}

export default SubmitButton;
