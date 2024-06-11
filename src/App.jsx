import React, { useSyncExternalStore } from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'

const App = () => {
  const [movieData, setMovieData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchURL = 'https://api.themoviedb.org/3/movie/now_playing?page=' + pageNumber + '&api_key=bc111babbb441e937e5a162632a76ac2';

  useEffect(() => {
    fetch(fetchURL)
    .then(res => res.json())
    .then(res => setMovieData(movieData.concat(res.results)))
    .catch(err => console.error('error:' + err));}, [pageNumber]);

  return (
    <div className="App">
      <MovieList
        data = {movieData}
      />
    </div>
  );
}

export default App;
