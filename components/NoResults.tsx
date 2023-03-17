import React from 'react'
import { MdCommentsDisabled } from 'react-icons/md';
import { TbNewsOff } from 'react-icons/tb';

interface IProps{
    text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        {text === 'No comments yet' ? <MdCommentsDisabled /> : <TbNewsOff />}
      </p>
      <p className='text-xl text-center'>{text}</p>
    </div>
  )
}

export default NoResults