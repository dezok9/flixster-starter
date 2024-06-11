import React, { useSyncExternalStore } from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'

const App = () => {
  // Defining variables and the functions that will be used to update them.
  const [movieData, setMovieData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchURL = 'https://api.themoviedb.org/3/movie/now_playing?page=' + pageNumber + '&api_key=bc111babbb441e937e5a162632a76ac2';

  const fetchData = async () => {
    /***
     * Attempts to fetch movie data from TMBD using their API and adds it to the content to be displayed on page.
     */
    try {
      const res = await fetch(fetchURL);
      const resData = await res.json();
      setMovieData(movieData.concat(resData.results));
    }
    catch(err) {
      console.error('error:' + err)
    }
  }

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  function loadMore() {
    setPageNumber(pageNumber + 1);
  }

  return (
    <main className="App">
      <MovieList
        data = {movieData}
      />
      <button id='load-more' onClick={loadMore}>Load More</button>
    </main>
  );
}

export default App;
