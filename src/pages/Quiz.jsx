import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import FormShorts from './Form/FormShorts';
import Loader from '../common/Loader';
import TableQuiz from '../components/TableQuiz';
import FormQuiz from './Form/FormQuiz';
import QuizServices from '../Services/QuizServices';

const Quiz = () => {
    return (
        <>
        <Routes>
            <Route path='/' element={
                <Index/>
            }/>
            <Route path='/add' element={
                <FormQuiz/>
            }/>
        </Routes>
        </>
    );
}

const Services = new QuizServices()

const Index = () => {
    const [data, setData] = useState([])

    Services.handleSuccess = () => {
        setData(Services.responseBody.data)
    }

    useEffect(() => {
        Services.getAll()
    }, [])

    if (!data) return <Loader/>

    return (
        <>
        <Link
        to="add"
        className="mb-8 inline-flex items-center justify-center rounded-md bg-meta-3 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90"
        >
        Tambah Quiz
        </Link>
        <div className="flex flex-col gap-10">
        <TableQuiz cols={['Judul','Durasi','Total Pertanyaan']} rows={data} />
        </div>
        </>
    )
}

export default Quiz