import React, { useState, useEffect} from 'react'
import { Post } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
    post: Post;
}

const PostCard: NextPage<IProps> = ({ post }) => {
  return (
    <div className='bg-[#edede9] shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
        <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
            <Link href={`/detail/${post._id}`}>
                <img
                src={post.image.asset.url}
                alt={post.caption}
                className='object-top absolute h-80 w-full shadow-lg ronded-t-lg lg:rounded-lg cursor-pointer'
                />
            </Link>
        </div>
        <div className='flex justify-between'>

            <div>
                <h1 className='transition duration-700 text-center mb-8 pt-5 cursor-pointer hover:text-[coral] text-3xl font-semibold'>
                    <Link href={`/detail/${post._id}`}>
                        {post.caption}
                    </Link>
                </h1>
            </div>
        
            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                <div>
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <div className='flex items-center gap-2'>
                            <p className='flex gap-2 items-center pt-5 md:text-md font-light text-black-500 capitalize transition duration-400 hover:text-[coral]'>{post.postedBy.userName}</p>
                        </div>
                    </Link>
                </div>
                <div className='md:w-16 md:h-16 w-10 h-10'>
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <div>
                            <>
                                <Image 
                                    width={62}
                                    height={62}
                                    className='rounded-full'
                                    src={post.postedBy.image}
                                    alt="Profile Picture"
                                    layout='responsive'
                                />
                            </>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
        

    </div>
  )
}

export default PostCard