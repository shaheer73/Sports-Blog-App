import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../utils/constants';

const Discover = () => {
    const router = useRouter();
    const { topic } = router.query;

    const activeTopicStyle = "hover:bg-primary xl:border-[coral] px-3 py-2 rounded xl:rounded flex items-center gap-2 justify-left cursor-pointer text-[coral]"

    const topicStyle = "hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded flex items-center gap-2 justify-left cursor-pointer text-black hover:text-[coral]"

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
        <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Categories</p>
        <div className='flex gap-3 flex-col'>
            {topics.map((item) => (
                <Link href={`/?topic=${item.name}`} key={item.name}>
                    <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                        <span className='font-bold text-2xl xl:text-md'>
                            {item.icon}
                        </span>
                        <span className='font-medium text-md hidden xl:block'>
                            {item.name}
                        </span>
                    </div>
                </Link>
            ))}

        </div>
    </div>
  )
}

export default Discover