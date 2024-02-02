import React, { useState } from 'react'
import InputText from './InputText'
import usePreviewMedia from '../../hooks/usePreviewMedia'
import VideoPreview from '../../components/VideoPreview'
import ShortsServices from '../../Services/ShortsServices'
import {Modal} from '../../Services/Modal';
import ModalMessage from '../../data/ModalMessage';
import ImagePreview from '../../components/ImagePreview'

const Services = new ShortsServices()

const FormShorts = () => {
    const [title, setTitle] = useState(null)
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    const [previewImage, setPreviewImage] = usePreviewMedia(image)
    const [previewVideo, setPreviewVideo] = usePreviewMedia(video)
    const [showPreviewVideo, setShowPreviewVideo] = useState(false)
    const [showPreviewImage, setShowPreviewImage] = useState(false)

    const onSubmit = () => {
        const data = new FormData()

        data.append('title', title)
        data.append('image', image)
        data.append('video', video)
        
        Services.handleSuccess = () => {
            Modal.show({
                ...ModalMessage.form.create.success,
                options: [
                    { title: 'Lanjut', type: 'primary', url: '/shorts' }
                ]
            })
        }

        Services.create(data)
    }

    const allFieldsAreFilled = () => {
        return [title, image, video].filter(i => !i).length == 0
    }
    return (
        <>
        {
            showPreviewVideo && <VideoPreview src={previewVideo} show={setShowPreviewVideo}/>
        }
        {
            showPreviewImage && <ImagePreview src={previewImage} show={setShowPreviewImage}/>
        }
        <div className="flex flex-col gap-10">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                Tambah Shorts
            </h2>
            <InputText placeholder='Judul' onChange={e => setTitle(e.target.value)}/>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Thumbnail
                </label>
                <div className={`${previewImage ? '':'px-8 py-14 border border-dashed'} flex justify-center items-center text-[rgba(30,30,30,.2)] border-[rgba(0,0,0,.3)] dark:text-[rgba(200,200,200,.3)] dark:border-[rgba(255,255,255,.3)] rounded-lg w-max mb-4 overflow-hidden`}>
                    {
                        previewImage ? <img width={100} className='cursor-pointer' src={previewImage} onClick={() => {
                            if (previewImage) setShowPreviewImage(true)
                        }}/> : <svg xmlns="http://www.w3.org/2000/svg" width="50" fill="currentColor" className="bi bi-file-image" viewBox="0 0 16 16">
                        <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12z"/>
                        </svg>
                    }
                </div>
                <input
                    type="file"
                    accept='image/*'
                    onChange={e => {
                        setImage(e.target.files[0])
                        setPreviewImage(e.target.files[0])
                    }}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Video
                </label>
                <div className={`relative ${previewVideo ? 'cursor-pointer':'px-14 py-20 border border-dashed'} overflow-hidden flex justify-center items-center text-[rgba(30,30,30,.2)] border-[rgba(0,0,0,.3)] dark:text-[rgba(200,200,200,.5)] dark:border-[rgba(255,255,255,.3)] rounded-lg w-max mb-4`} onClick={() => {
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
                    onChange={e => setVideo(e.target.files[0])}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
                </div>
                <button
                onClick={onSubmit}
                disabled={!allFieldsAreFilled()}
                className="rounded-md inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
                Upload
            </button>
        </div>
        </>
    )
}

export default FormShorts