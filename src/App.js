import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainContainer from './components/MainContainer'
import CreateContainer from './components/CreateContainer'
import Header from './components/Header'
import { HomeContainer } from './components'

const App = () => {
  return (

    <AnimatePresence mode="wait">
      <div className='w-screen h-auto flex flex-col'>
        <Header />
        <main className='mt-24 md:mt-24 px-10 w-full'>
          <Routes>
            <Route path='/*' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateContainer />} />
            <Route path='/home' element={<HomeContainer/>} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App
