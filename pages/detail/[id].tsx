import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Post } from '../../types';
import useAuthStore  from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

interface IProps {
    postDetails: Post,
}

const Detail = ({ postDetails }: IProps) => {
    const [post, setPost] = useState(postDetails);
    const router = useRouter();
    const { userProfile }: any = useAuthStore();
    const [comment, setComment] = useState<string>('');
    const [isPostingComment, setIsPostingComment] = useState(false);

    const handleLike = async (like: boolean) => {
        if(userProfile) {
            const { data } = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            })

            setPost({ ...post, likes: data.likes});
        }
    }

    const addComment = async (e: {preventDefault: () => void}) => {
        e.preventDefault();

        if(userProfile && comment) {
            setIsPostingComment(true);

            const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
                userId: userProfile._id,
                comment,
            });

            setPost({ ...post, comments: data.comments});
            setComment('');
            setIsPostingComment(false);
        }
    }


    if(!post) return null;
    
    return (
        <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
            <div className='relative overflow-hidden shadow-md mb-6'>
                <img
                src={post.image.asset.url}
                alt={post.caption}
                className='object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
                />
            </div>
            <div className='px-4 lg:px-0'>
                <div className='flex items-center mb-4 w-full justify-between'>
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <div className='hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center cursor-pointer'>
                            <Image
                                width={45}
                                height={45}
                                alt={post.postedBy.userName}
                                className='align-middle rounded-full'
                                src={post.postedBy.image}
                            />
                            <p className='inline align-middle text-gray-700 ml-2 font-light text-md capitalize transition duration-400 hover:text-[coral]'>{post.postedBy.userName}</p>
                        </div>
                    </Link>
                    <div className='hidden md:flex items-center justify-center lg:mb-0 lg:w-auto ml-8 items-center cursor-pointer'>
                        {userProfile && (
                            <LikeButton
                                likes={post.likes}
                                handleLike={() => handleLike(true)}
                                handleDislike={() => handleLike(false)}
                            />
                        )}
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <h1 className='mb-4 text-4xl font-semibold items-center align-middle inline capitalize'>{post.caption}</h1>
                </div>
                <div className='flex items-center justify-center'>
                    <p className='text-md'>{post.bodyText}</p>
                </div>
            </div>
            <div>
                <Comments
                    comment={comment}
                    setComment={setComment}
                    addComment={addComment}
                    comments={post.comments}
                    isPostingComment={isPostingComment}
                />
            </div>
        </div>
    )
}

export const getServerSideProps = async ({
    params: { id }
} : {
    params: {id: string}
}) => {
    const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

    return {
        props : { postDetails : data}
    }
}

export default Detail