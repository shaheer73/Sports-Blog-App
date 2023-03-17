import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import PostCard from "../../components/PostCard";
import NoResults from "../../components/NoResults";
import { IUser, Post } from "../../types";
import { BASE_URL } from "../../utils";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const Search = ({ posts }: {posts: Post[] }) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const router = useRouter();
    const { searchTerm }: any = router.query;
    const { allUsers } = useAuthStore();

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isPosts= !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full">
         <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>Accounts</p>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${isPosts}`} onClick={() => setIsAccounts(false)}>Posts</p>
        </div>
        {isAccounts ? (
            <div className="md:mt-16">
                {searchedAccounts.length > 0 ? (
                    searchedAccounts.map((user: IUser, idx: number) => (
                        <Link href={`/profile/${user._id}`} key={idx}>
                            <div className='flex gap-3 cursor-pointer p-2 font-semibold rounded border-b-2 border-gray-200'>
                                <div>
                                    <Image 
                                    src={user.image}
                                    width={50}
                                    height={50}
                                    className='rounded-full'
                                    alt='Profile Picture'
                                    />
                                </div>
                                <div className='hidden xl:block'>
                                    <p className='flex gap-1 items-center text-md font-semibold text-primary lowercase'>{user.userName.replaceAll(' ','')}</p>
                                    <p className='text-gray-400 capitalize text-xs'>{user.userName}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : <NoResults text={`No account results for ${searchTerm}`}/>}
            </div>
        ) : 
            <div className="md:mt-16 flex flex-col gap-6 md:justify-start">
                {posts.length ? (
                    posts.map((post: Post, idx) => (
                        <PostCard post={post} key={idx}/>
                    ))
                ) : <NoResults text={`No post results for ${searchTerm}`}/>}
            </div>
        }
    </div>
  )
}

export const getServerSideProps = async ({ 
    params: { searchTerm }
}: { 
    params: { searchTerm: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
        props: {posts: res.data } 
    }
}

export default Search