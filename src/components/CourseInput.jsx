import React, { useState } from 'react'
import usePreviewMedia from '../hooks/usePreviewMedia'
import InputText from '../pages/Form/InputText'
import TextArea from './TextArea'
import VideoPreview from './VideoPreview'
import ImagePreview from './ImagePreview'
import Select from './Select'

const CourseInput = ({
    Video,
    handleDeleteClick
}) => {
    const [title, setTitle] = useState(null)
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    const [isPremium, setIsPremium] = useState(true)
    const [previewImage, setPreviewImage] = usePreviewMedia(image)
    const [previewVideo, setPreviewVideo] = usePreviewMedia(video)
    const [showPreviewVideo, setShowPreviewVideo] = useState(false)
    const [showPreviewImage, setShowPreviewImage] = useState(false)

    return (
        <>
        {
            showPreviewVideo && <VideoPreview src={previewVideo} show={setShowPreviewVideo}/>
        }
        {
            showPreviewImage && <ImagePreview src={previewImage} show={setShowPreviewImage}/>
        }
        <div className='px-6 py-7 bg-white duration-300 ease-linear dark:bg-boxdark rounded-lg' >
            <div className="flex items-center justify-between mb-4">
                <label className="text-black dark:text-white">
                {
                    title ? `Video : ${title}` : 'Video #'
                }
                </label>
                <button onClick={() => handleDeleteClick(Video.id)} className="hover:text-primary">
                            <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                            />
                            <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                            />
                            <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                            />
                            <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                            />
                            </svg>
                </button>
            </div>

            <div className="mb-8">
                <InputText
                placeholder='Judul Video'
                onChange={e => {
                    Video.setTitle(e.target.value)
                    setTitle(e.target.value)
                }}
                className="mb-4 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>

            <div className="mb-8">
                <TextArea
                placeholder='Deskripsi Video'
                onChange={e => Video.setDescription(e.target.value)}
                className="mb-4 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>

            <div className='mb-8'>
            <label className="mb-3 block text-black dark:text-white">
                Tipe Video
            </label>
            <Select options={['Premium','Regular']} values={['premium','regular']}
            onChange={e => {
                Video.setIsPremium(e.target.value == 'premium')
                setIsPremium(e.target.value == 'premium')
            }}
            />
            </div>

            <div className="mb-8">
                <label className="mb-3 block text-black dark:text-white">
                    Thumbnail
                </label>
                <div className={`${previewImage ? '':'px-14 py-8 border border-dashed'} flex justify-center items-center text-[rgba(30,30,30,.2)] border-[rgba(0,0,0,.3)] dark:text-[rgba(200,200,200,.3)] dark:border-[rgba(255,255,255,.3)] rounded-lg w-max mb-4 overflow-hidden`}>
                    {
                        previewImage ? <img width={100} className='cursor-pointer' src={previewImage} onClick={() => {
                            if (previewImage) setShowPreviewImage(true)
                        }}/> : <svg xmlns="http://www.w3.org/2000/svg" width="50" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                        </svg>
                    }
                </div>
                <input
                    type="file"
                    accept='image/*'
                    onChange={e => {
                        setImage(e.target.files[0])
                        setPreviewImage(e.target.files[0])
                        Video.setThumbnailFile(e.target.files[0])
                    }}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
            </div>

            <label className="mb-3 block text-black dark:text-white">
                Video
            </label>
            <div className={`relative ${previewVideo ? 'cursor-pointer':'py-14 px-20 border border-dashed'} overflow-hidden flex justify-center items-center text-[rgba(30,30,30,.2)] border-[rgba(0,0,0,.3)] dark:text-[rgba(200,200,200,.5)] dark:border-[rgba(255,255,255,.3)] rounded-lg w-max mb-4`} onClick={() => {
                if (previewVideo) setShowPreviewVideo(true)
            }}> 
                <svg xmlns="http://www.w3.org/2000/svg" width="50" fill="currentColor" className="bi bi-play-circle absolute" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
                </svg>
                {
                    previewVideo && <video width={100} src={previewVideo}/>
                }
            </div>
            <input
                type="file"
                accept='video/*'
                onChange={e => {
                    setVideo(e.target.files[0])
                    Video.setVideo(e.target.files[0])
                }}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />

            
        </div>
        </>
    )
}

export default CourseInput