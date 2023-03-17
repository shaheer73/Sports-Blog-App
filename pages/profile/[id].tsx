import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import PostCard from "../../components/PostCard";
import NoResults from "../../components/NoResults";
import { IUser, Post } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
    data: {
        user: IUser,
        userPosts: Post[],
        userLikedPosts: Post[]
    }
}

const Profile = ({ data }: IProps) => {
    const [showUserPosts, setShowUserPosts] = useState(true);
    const [postsList, setPostsList] = useState<Post[]>([]);
    const { user, userPosts, userLikedPosts } = data;
    const posts = showUserPosts ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserPosts ? 'border-b-2 border-black' : 'text-gray-400';

    useEffect(() => {
        if(showUserPosts) {
            setPostsList(userPosts);
        } else {
            setPostsList(userLikedPosts);
        }
    }, [showUserPosts, userLikedPosts, userPosts]);

    return (
        <div className="w-full">
            <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
                <div className='w-16 h-16 md:w-32 md:h-32'>
                    <Image 
                    src={user.image}
                    width={120}
                    height={120}
                    className='rounded-full'
                    alt='Profile Picture'
                    layout='responsive'
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <p className='md:text-2xl tracking-wider justify-center flex gap-1 items-center text-md font-semibold text-primary lowercase'>{user.userName.replaceAll(' ','')}</p>
                    <p className='text-gray-400 capitalize text-xs md:text-xl'>{user.userName}</p>
                </div>
            </div>

            <div>
                <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${posts}`} onClick={() => setShowUserPosts(true)}>Posts</p>
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setShowUserPosts(false)}>Liked</p>
                </div>
                <div className="flex gap-6 flex-col md:justify-start">
                    {postsList.length > 0 ? (
                        postsList.map((post: Post, idx: number) => (
                            <PostCard post={post} key={idx}/>
                        ))
                    ) : <NoResults text={`No ${showUserPosts ? '' : 'Liked'} Posts Yet`}/>}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ 
    params: { id }
}: { 
    params: { id: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return {
        props: {data: res.data } 
    }
}

export default Profile;