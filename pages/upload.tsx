import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsCloudUploadFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../utils/constants';
import { BASE_URL } from '../utils';

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageAsset, setImageAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false);
    const [caption, setCaption] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [category, setCategory] = useState(topics[0].name);
    const [savingPost, setSavingPost] = useState(false);
    const { userProfile }: { userProfile: any} = useAuthStore();
    const router = useRouter();

    const uploadImage = async (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['image/jpg', 'image/png', 'image/jpeg'];

        if(fileTypes.includes(selectedFile.type)){
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            })
            .then((data) => {
                setImageAsset(data);
                setIsLoading(false);
            })

        } else {
            setIsLoading(false);
            setWrongFileType(true);
        }
    }

    const handlePost = async () => {
        if (caption && bodyText && imageAsset?._id && category){
            setSavingPost(true);

            const document = {
                _type: 'post',
                caption,
                bodyText,
                image: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            }

            await axios.post(`${BASE_URL}/api/post`, document);

            router.push('/');
        }
    }

    return (
        <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
            <div className='bg-white rounded-lg xl:h-[80vh] w-[55%] flex gap-6 flex-wrap justify-between items-center p-8 pt-6'>
                <div>
                    <div>
                        <p className='text-2xl font-bold'>Upload Post</p>
                        <p className='text-md text-gray-400 mt-1'>Create a blog post and post it to your account.</p>
                    </div>
                    <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-orange-300 hover:bg-gray-100'>
                        {isLoading ? (
                            <p>Uploading...</p>
                        ) : (
                            <div>
                                {imageAsset ? (
                                    <div>
                                        <img
                                            src={imageAsset.url}
                                            className="rounded-xl h-[450px] mt-16 bg-black"
                                        > 
                                        </img>
                                    </div>
                                ) : (
                                    <label className='cursor-pointer'>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <p className='font-bold text-xl'><BsCloudUploadFill className='text-gray-300 text-6xl'/></p>
                                                <p className='text-md font-light'>Upload Image</p>
                                            </div>
                                            <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                                jpg, png, jpeg only<br />
                                                720x1280 or higher <br />
                                                Less than 2GB
                                            </p>
                                            <p className='bg-[coral] text-center mt-10 rounded text-white text-md font-light p-2 w-52 outline-none'>
                                                Select File
                                            </p>
                                        </div>
                                        <input 
                                            type="file"
                                            name="upload-image"
                                            onChange={uploadImage}
                                            className='w-0 h-0'

                                        />
                                    </label>
                                )}

                            </div>
                        )}
                        {wrongFileType && (
                            <p className='text-center text-xl text-[coral] font-md mt-4 w-[250px]'>Please select an image file</p>
                        )}
                    </div>
                </div>
                    <div className='flex flex-col gap-3 pb-10'>
                            <label className='text-md font-medium'>Title</label>
                            <input
                                type="text"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                className='rounded outline-none text-md border-2 border-gray-200 p-2'
                            />
                            <label className='text-md font-medium'>Excerpt</label>
                            <textarea 
                                name="text"
                                className='rounded outline-none text-md border-2 border-gray-200 p-2 w-[400px] h-[150px]' 
                                value={bodyText}
                                onChange={(e) => setBodyText(e.target.value)}>
                            </textarea>
                            {/* <input
                                type="text"
                                value={bodyText}
                                onChange={(e) => setBodyText(e.target.value)}
                                className='rounded outline-none text-md border-2 border-gray-200 p-2 w-[400px] h-[150px]'
                            /> */}
                            <label className='text-md font-medium'>Category</label>
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                            >
                                {topics.map((topic) => (
                                    <option key={topic.name} className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300' value={topic.name}>
                                        {topic.name}
                                    </option>
                                ))}
                            </select>
                            <div className='flex gap-6 mt-10'>
                                    <button
                                        onClick={() => {}}
                                        type="button"
                                        className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                                    >
                                        Discard
                                    </button>
                                    <button
                                        onClick={handlePost}
                                        type="button"
                                        className='bg-[coral] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                                    >
                                        Post
                                    </button>
                            </div>

                            
                    </div>
            </div>
        </div>
    )
    }

    export default Upload