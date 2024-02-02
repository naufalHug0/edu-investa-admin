import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Modal as ModalService } from '../Services/Modal'

export default function Modal() {
    let [isOpen, setIsOpen] = useState(true)
    const { showModal, message } = useSelector(state => state.modal)
    const navigateTo = useNavigate()

    function closeModal() {
        ModalService.hide()
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const redirectOnClick = (url) => {
        navigateTo(url)
        ModalService.hide()
    }

    return (
        showModal && <>
        <Transition appear show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        {
                            message.title
                        }
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        {
                            message.body
                        }
                        </p>
                    </div>

                    <div className="mt-4 flex gap-2 items-center">
                        {
                            message.options.map((option,i) => {
                                return <Button key={i} type={option.type} title={option.title} onClick={
                                    option?.url ? () => redirectOnClick(option.url) : (
                                        option?.action ? option.action() : closeModal
                                    )
                                } />
                            })
                        }
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        </>
    )
}

const Button = ({title, type, ...rest}) => {
    return (
        <button
        type="button"
        className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${type == 'danger' ? 'bg-red-100 hover:bg-red-200 text-danger':''}
        ${type == 'secondary' ? 'bg-slate-300 hover:bg-slate-400 text-slate-500':''}
        `}
        {...rest}
        >
        {title}
        </button>
    )
}
