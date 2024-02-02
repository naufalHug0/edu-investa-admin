import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import FormShorts from './Form/FormShorts';
import Loader from '../common/Loader';
import QuizServices from '../Services/QuizServices';
import TableCourse from '../components/TableCourse';
import FormCourse from './Form/FormCourse';

const Course = () => {
    return (
        <>
        <Routes>
            <Route path='/' element={
                <Index/>
            }/>
            <Route path='/add' element={
                <FormCourse/>
            }/>
        </Routes>
        </>
    );
}

// const Services = new QuizServices()

const Index = () => {
    const [data, setData] = useState([1])

    // Services.handleSuccess = () => {
    //     setData(Services.responseBody.data)
    // }

    // useEffect(() => {
    //     Services.getAll()
    // }, [])

    // if (!data) return <Loader/>

    return (
        <>
        <Link
        to="add"
        className="mb-8 inline-flex items-center justify-center rounded-md bg-meta-3 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90"
        >
        Tambah Course
        </Link>
        <div className="flex flex-col gap-10">
        <TableCourse cols={['Judul','Durasi','Total Pertanyaan']} rows={data} />
        </div>
        </>
    )
}

export default Course