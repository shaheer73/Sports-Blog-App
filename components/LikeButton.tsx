import React, { useState, useEffect } from 'react';
import { AiFillLike } from 'react-icons/ai';
import useAuthStore from '../store/authStore';

interface IProps {
    handleLike: () => void;
    handleDislike: () => void;
    likes: any[];
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const { userProfile }: any = useAuthStore();
    const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

    useEffect(() => {
        if(filterLikes?.length > 0) {
            setAlreadyLiked(true);
        } else {
            setAlreadyLiked(false);
        }

    }, [filterLikes, likes])

  return (
    <div className='gap-6'>
        <div className='flex flex-row justify-center items-center cursor-pointer'>
            {alreadyLiked ? (
                <div className='text-[coral]' onClick={handleDislike}>
                    <AiFillLike className='text-lg md:text-2xl'/>
                </div>
            ) : (
                <div onClick={handleLike}>
                    <AiFillLike className='text-lg md:text-2xl'/>
                </div>
            )}
            <p className='ml-3 text-md font-semibold'>{likes?.length || 0}</p>
        </div>
    </div>
  )
}

export default LikeButton