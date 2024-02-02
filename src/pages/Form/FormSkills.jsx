import React, { useState } from 'react'
import ImagePreview from '../../components/ImagePreview'
import usePreviewMedia from '../../hooks/usePreviewMedia'
import InputText from './InputText'
import TextArea from '../../components/TextArea'
import SkillsServices from '../../Services/SkillsServices'
import InputNumber from '../../components/InputNumber'
import { Modal } from '../../Services/Modal'
import ModalMessage from '../../data/ModalMessage'
import Select from '../../components/Select'

const Services = new SkillsServices()

const FormSkills = () => {
    const [name, setName] = useState('')
    const [logo, setLogo] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState(null)
    const [cooldownTime, setCooldownTime] = useState(0)
    const [disposable, setDisposable] = useState(true)
    const [activeTime, setActiveTime] = useState(0)
    const [previewImage, setPreviewImage] = usePreviewMedia(logo)
    const [showPreviewImage, setShowPreviewImage] = useState(false)

    const onSubmit = () => {
        const data = new FormData()

        data.append('name', name)
        data.append('description', description)
        data.append('logo', logo)
        data.append('price', price)
        data.append('disposable', disposable)
        data.append('cooldown_time', cooldownTime)
        data.append('active_time', activeTime)

        Services.handleBadRequestError = () => {
            console.log(Services.errors)
        }

        Services.handleSuccess = () => {
            Modal.show({
                ...ModalMessage.form.create.success,
                options: [
                    { title: 'Lanjut', type: 'primary', url: '/skills' }
                ]
            })
        }

        Services.create(data)
    }

    const allFieldsAreFilled = () => {
        return [name, description, logo, price > 0, activeTime > 0, (cooldownTime > 0 || disposable)].filter(i => !i).length == 0
    }

    return (
        <>
        {
            showPreviewImage && <ImagePreview src={previewImage} show={setShowPreviewImage}/>
        }
        <div className="flex flex-col gap-10">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                Tambah Skill
            </h2>
            <InputText placeholder='Nama Skill' onChange={e => setName(e.target.value)}/>
            <TextArea placeholder='Deskripsi' onChange={e => setDescription(e.target.value)} />
            <div>
                <label className="mb-2 block text-black dark:text-white">
                    Harga (XP)
                </label>
                <InputNumber
                placeholder="Harga"
                onChange={(_, value) => setPrice(value)}
                value={price}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div>
                <label className="mb-1 block text-black dark:text-white">
                    Durasi Aktif (Detik)
                </label>
                <p className="text-xs italic font-light text-slate-400 mb-4">* Berapa detik efek skill ini bekerja</p>
                <InputNumber
                placeholder="Durasi Aktif"
                onChange={(_, value) => setActiveTime(value)}
                value={activeTime}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div>
                <label className="mb-1 block text-black dark:text-white">
                    Sifat Skill (Dalam satu permainan quiz)
                </label>
                <p className="text-xs italic font-light text-slate-400 mb-4">* {
                    disposable ? 'Setelah digunakan langsung hilang':'Setelah dipakai, skill akan cooldown lalu dapat digunakan lagi'
                }</p>
                <Select
                options={[
                    'Sekali pakai',
                    'Dapat digunakan berulang kali'
                ]}
                values={[
                    true,
                    false
                ]}
                onChange={e => setDisposable(e.target.value == 'true')}
                />
            </div>
            {
                !disposable && <div>
                <label className="mb-1 block text-black dark:text-white">
                    Durasi Cooldown (Detik)
                </label>
                <p className="text-xs italic font-light text-slate-400 mb-4">* Durasi loading untuk kembali aktif setelah digunakan</p>
                <InputNumber
                placeholder="Durasi Cooldown"
                onChange={(_, value) => setCooldownTime(value)}
                value={cooldownTime}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            }
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Logo Skill
                </label>
                <div className={`${previewImage ? '':'p-8 border border-dashed'} flex justify-center items-center text-[rgba(30,30,30,.2)] border-[rgba(0,0,0,.3)] dark:text-[rgba(200,200,200,.3)] dark:border-[rgba(255,255,255,.3)] rounded-lg w-max mb-4 overflow-hidden`}>
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
                        setLogo(e.target.files[0])
                        setPreviewImage(e.target.files[0])
                    }}
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

export default FormSkills