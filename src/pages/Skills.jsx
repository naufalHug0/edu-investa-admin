import React, { useEffect, useState } from 'react'
import FormSkills from './Form/FormSkills'
import { Link, Route, Routes } from 'react-router-dom'
import Loader from '../common/Loader'
import TableSkills from '../components/TableSkills'
import SkillsServices from '../Services/SkillsServices'

const Services = new SkillsServices()

const Skills = () => {
    return (
        <>
        <Routes>
            <Route path='/' element={
            <Index/>
            }/>
            <Route path='/add' element={
            <FormSkills/>
            }/>
        </Routes>
        </>
    )
}

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
            Tambah Skill
        </Link>
        <div className="flex flex-col gap-10">
            <TableSkills cols={['Nama','Harga XP']} rows={data} />
        </div>
        </>
    )
}

export default Skills