import React, { useEffect, useState } from 'react'
const structureData = (data) => {
  if (Object.keys(data).length === 0) {
    return data
  }
  const {
    Poster,
    Title,
    Genre,
    Plot,
    Awards,
    BoxOffice,
    Metascore,
    imdbRating,
    imdbVotes,
  } = data

  const boxOfficeNumber = parseInt(
    BoxOffice.replace(/\$/g, '').replace(/,/g, '')
  )
  const metascoreNumber = parseInt(Metascore)
  const imdbRatingNumber = parseFloat(imdbRating)
  const imdbVotesNumber = parseInt(imdbVotes.replace(/,/g, ''))

  const sumOfAwards = Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word)
    if (isNaN(value)) {
      return prev
    } else {
      return prev + value
    }
  }, 0)

  return {
    Poster,
    Title,
    Genre,
    Plot,
    Achievements: [
      {
        title: 'Awards',
        content: Awards,
        isLoser: false,
        stat: sumOfAwards,
      },
      {
        title: 'Box Office',
        content: BoxOffice,
        isLoser: false,
        stat: boxOfficeNumber,
      },
      {
        title: 'Metascore',
        content: Metascore,
        isLoser: false,
        stat: metascoreNumber,
      },
      {
        title: 'IMDB Rating',
        content: imdbRating,
        isLoser: false,
        stat: imdbRatingNumber,
      },
      {
        title: 'IMDB Votes',
        content: imdbVotes,
        isLoser: false,
        stat: imdbVotesNumber,
      },
    ],
  }
}

const useMovieData = (firstMovie, secondMovie) => {
  const [firstMovieData, setFirstMovieData] = useState({})
  const [secondMovieData, setSecondMovieData] = useState({})

  useEffect(() => {
    setSecondMovieData(structureData(secondMovie))
    setFirstMovieData(structureData(firstMovie))
  }, [firstMovie, secondMovie])

  useEffect(() => {
    if (
      Object.keys(firstMovieData).length &&
      Object.keys(secondMovieData).length
    ) {
      console.log('llegamos aca')
      firstMovieData.Achievements.forEach((item, index) => {
        const secondMovieStat = secondMovieData.Achievements[index].stat

        if (item.stat > secondMovieStat) {
          setSecondMovieData({
            ...secondMovieData,
            Achievements: secondMovieData.Achievements.map((achievement, i) => {
              if (i === index) {
                achievement.isLoser = true
              }
              return achievement
            }),
          })
        } else if (item.stat < secondMovieStat) {
          setFirstMovieData({
            ...firstMovieData,
            Achievements: firstMovieData.Achievements.map((achievement, i) => {
              if (i === index) {
                achievement.isLoser = true
              }
              return achievement
            }),
          })
        }
      })
    }
  }, [firstMovie, secondMovie])

  return { firstMovieData, secondMovieData }
}

export default useMovieData
