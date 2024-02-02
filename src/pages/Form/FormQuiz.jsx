import React, { useEffect, useState } from 'react'
import InputText from './InputText'
import {Modal} from '../../Services/Modal';
import ModalMessage from '../../data/ModalMessage';
import TextArea from '../../components/TextArea';
import QuestionInput from '../../components/QuestionInput';
import QuizServices from '../../Services/QuizServices';
import {Question} from '../../classes';
import useGenerateId from '../../hooks/useGenerateId';

const Services = new QuizServices()

const FormQuiz = () => {
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [duration, setDuration] = useState(null)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [questions, setQuestion] = useState([])
    const [levels, setLevels] = useState([])
    const generateQuestionId = useGenerateId(0)

    Services.handleSuccess = () => {
        setLevels(Services.responseBody.data)
    }

    useEffect(() => {
        Services.getQuestionLevels()
    }, [])

    const addQuestion = () => {
        setQuestion([...questions, new Question(generateQuestionId(), questions.length + 1)])
    }

    const deleteQuestion = (id, questionNumber) => {
        setQuestion(questions.filter(q => q.id !== id).map(q => {
            if (q.questionNumber > questionNumber) {
                q.questionNumber -= 1
            }
            return q
        }))
    }

    const onSubmit = () => {
        const data = {
            title,
            description,
            duration,
            questions: questions.map(q => q.getDataForAPI())
        }

        Services.handleSuccess = () => {
            Modal.show({
                ...ModalMessage.form.create.success,
                options: [
                    { title: 'Lanjut', type: 'primary', url: '/' }
                ]
            })
        }

        Services.create(data)
    }

    const allFieldsAreFilled = () => {
        return [title, description, duration, questions.length > 0].filter(i => !i).length == 0
    }

    const handleMinuteInput = e => {
        e.target.value = e.target.value.replace(/^0+/, "")
        
        let value = e.target.value == '' ? 0 : Math.max(1, parseInt(e.target.value))

        setMinute(value)
        setDuration(parseInt(e.target.value)*60 + second)
    }

    const handleSecondInput = e => {
        e.target.value = e.target.value.replace(/^0+/, "")

        let value = e.target.value == '' ? 0 : Math.max(0, Math.min(59, parseInt(e.target.value)))

        setSecond(value)
        setDuration((minute*60) + parseInt(e.target.value))
    }

    return (
        <>
        <div className="flex flex-col gap-10">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                Tambah Quiz
            </h2>
            <InputText placeholder='Judul' onChange={e => setTitle(e.target.value)}/>
            <TextArea placeholder='Deskripsi' onChange={e => setDescription(e.target.value)} />
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Durasi
                </label>
                <div className="flex gap-5 [&>*]:flex-1">
                    <div>
                        <label className="text-xs mb-2 block text-black dark:text-white">
                            Menit
                        </label>
                        <input
                            type="number"
                            min={1}
                            placeholder="Menit"
                            value={minute}
                            onChange={handleMinuteInput}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="text-xs mb-2 block text-black dark:text-white">
                            Detik
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={59}
                            placeholder="Detik"
                            value={second}
                            onChange={handleSecondInput}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </div>
            </div>

            {
                questions.length > 0 && <p className='text-gray-500 italic -mb-4'>Total Pertanyaan : {questions.length}</p>
            }

            {
                questions.map((question, i) => {
                    return <QuestionInput
                    Question={question}
                    key={i}
                    levels={levels}
                    handleDeleteClick={deleteQuestion}
                    />
                })
            }

            <button
            onClick={addQuestion}
            className="w-max rounded-md inline-flex items-center justify-center bg-meta-3 py-4 px-7 text-center font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed gap-2"
            >
                <svg 
                xmlns="http://www.w3.org/2000/svg" width="16"
                fill="currentColor" className="bi bi-plus-circle-fill" 
                viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                </svg>
                Tambah Pertanyaan
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

export default FormQuiz