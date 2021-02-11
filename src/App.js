import React, { useState } from 'react'

import './App.scss'

import Header from './components/layout/Header'
import Movie from './components/Movie'
import Tutorial from './components/Tutorial'
import useMovieData from './hooks/useMovieData'

function App() {
  const [firstMovie, setFirstMovie] = useState({})
  const [secondMovie, setSecondMovie] = useState({})

  const { firstMovieData, secondMovieData } = useMovieData(
    firstMovie,
    secondMovie
  )

  return (
    <>
      <Header />
      <div className='container'>
        <div className='columns'>
          <Movie setMovieData={setFirstMovie} movieData={firstMovieData} />
          <Movie setMovieData={setSecondMovie} movieData={secondMovieData} />
        </div>
        {Object.keys(firstMovie).length || Object.keys(secondMovie).length ? (
          ''
        ) : (
          <Tutorial />
        )}
      </div>
    </>
  )
}

export default App
