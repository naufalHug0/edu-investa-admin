import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import TableShorts from '../components/TableShorts';
import FormShorts from './Form/FormShorts';
import { useEffect, useState } from 'react';
import ShortsServices from '../Services/ShortsServices';
import Loader from '../common/Loader';

const Services = new ShortsServices()

const Shorts = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <Index/>
        }/>
        <Route path='/add' element={
          <FormShorts/>
        }/>
      </Routes>
    </>
  );
};

const Index = () => {
  const [data, setData] = useState(null)

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
      Tambah Shorts
    </Link>
    <div className="flex flex-col gap-10">
      <TableShorts cols={['Judul','Tanggal Upload']} rows={data} />
    </div>
    </>
  )
}

export default Shorts;
