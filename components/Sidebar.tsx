import React, { useState } from 'react'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiHome } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import GoogleLogin from 'react-google-login';


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const userProfile = false;

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-left xl:justify-start cursor-pointer font-semibold rounded hover:text-[coral]';

  return (
    <div>
      <div
        className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        onClick={() => setShowSidebar((prev) => !(prev))}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href="/">
              <div className={normalLink}>
                <p className='text-2xl'> <FiHome/> </p>
                <span className='text-xl hidden xl:block'>
                  Home
                </span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts />
        </div>
      )}
    </div>
  )
}

export default Sidebar