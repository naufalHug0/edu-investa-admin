import React, { useRef, useState } from 'react'
import TextArea from '../../components/TextArea'
import InputText from './InputText'
import { Video } from '../../classes'
import useGenerateId from '../../hooks/useGenerateId'
import CourseInput from '../../components/CourseInput'
import CourseServices from '../../Services/CourseServices'

const Services = new CourseServices()

const FormCourse = () => {
    const [title,setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [videos, setVideos] = useState([])
    const generateVideoId = useGenerateId(0)

    const addVideo = () => {
        setVideos([...videos, new Video(generateVideoId())])
    }

    const deleteVideo = (id) => {
        setVideos(videos.filter(v => v.id !== id))
    }

    const appendDataToForm = (data, formData) => {
        data.forEach((video, index) => {
            Object.entries(video).forEach(([videoKey, videoValue]) => {
                formData.append(`videos[${index}][${videoKey}]`, (typeof videoValue === 'number') ? parseInt(videoValue) : videoValue)
            })
        })
    }

    const onSubmit = () => {
        const formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)
        appendDataToForm(videos.map(v => v.getDataForAPI()), formData)

        Services.handleServerError = () => {
            console.log(Services.errors)
        }


        Services.handleSuccess = () => {
            console.log(Services.responseBody)
            Modal.show({
                ...ModalMessage.form.create.success,
                options: [
                    { title: 'Lanjut', type: 'primary', url: '/' }
                ]
            })
        }
        Services.create(formData)
    }

    const allFieldsAreFilled = () => {
        return [title, description, videos.length > 0].filter(i => !i).length == 0
    }

    return (
        <>
        <div className="flex flex-col gap-10">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                Tambah Course
            </h2>
            <InputText placeholder='Judul' onChange={e => setTitle(e.target.value)}/>
            <TextArea placeholder='Deskripsi' onChange={e => setDescription(e.target.value)} />

            {
                videos.length > 0 && <p className='text-gray-500 italic -mb-4'>Total Video : {videos.length}</p>
            }

            {
                videos.map((video, i) => {
                    return <CourseInput
                    Video={video}
                    key={i}
                    handleDeleteClick={deleteVideo}
                    />
                })
            }

            <button
            onClick={addVideo}
            className="w-max rounded-md inline-flex items-center justify-center bg-meta-3 py-4 px-7 text-center font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed gap-2"
            >
                <svg 
                xmlns="http://www.w3.org/2000/svg" width="16"
                fill="currentColor" className="bi bi-plus-circle-fill" 
                viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                </svg>
                Tambah Video
            </button>
                
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

export default FormCourse