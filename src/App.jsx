import React, { useSyncExternalStore } from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'
import MovieModal from './MovieModal'

const App = () => {
  // Defining variables and the functions that will be used to update them.
  const [movieData, setMovieData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchTabState, setSearchTabState] = useState("inactive");
  const [nowPlayingTabState, setNowPlayingTabState] = useState("active");
  const [displaySearch, setDisplaySearch] = useState("hide");

  const apiKey = import.meta.env.VITE_API_KEY;
  const fetchURL = 'https://api.themoviedb.org/3/movie/now_playing?page=' + pageNumber + '&api_key=' + String(apiKey);


  const fetchData = async (url, action) => {
    /***
     * Generally handles fetching data using the parameters to determine if you want to append to the movieData variable or replace it (i.e. load move vs. search).
     * The url variable is the url we are fetching from.
     * The action varialbe is the action, either load more or search, we are performing (i.e. concat or replace).
     */
    try {
      if (action === "load") {
        // Attempts to fetch movie data from TMBD using their API and adds it to the content to be displayed on page.
        const res = await fetch(url);
        const resData = await res.json();
        setMovieData(movieData.concat(resData.results));
      }
      else if (action === "search") {
        // Attempts to query for an input string given by the user. Clears movieData before performing search to clear movie cards.
        setMovieData([]);
        const res = await fetch(url);
        const resData = await res.json();
        setMovieData(resData.results);
      }
      else if (action == "reload default") {
        // Attempts to reload the now playing movieData. Clears movieData before performing search to clear movie cards.
        // Distinct from load in that it clears any previous movieData before retrieving new data. Also, resets pageNumber to 1.
        setMovieData([]);
        setPageNumber(1);

        const res = await fetch(url);
        const resData = await res.json();
        setMovieData(resData.results);
      }
    }
    catch(err) {
      console.error('Error: ' + err)
    }
  }


  async function search(){
    /***
    * Attempts to search TMDB for movie data using the user input.
    * Re-renders when search occurs, which occurs when the submit button is clicked.
    * Returns to default if searchQuery is empty.
    */
    if (searchQuery.replace(" ", "") != ""){
      const searchURL = 'https://api.themoviedb.org/3/search/movie?language=en-US&query=' + searchQuery + '&api_key=' + String(apiKey);
      fetchData(searchURL, "search");
    }
    else {
      fetchData(fetchURL, "reload default");
    }
  }


  function loadMore() {
    setPageNumber(pageNumber + 1);
  }


  function handleSearchChange(event) {
    setSearchQuery((event.target.value.toLowerCase()).replace(" ", "%20"));
  }


  function toggleTabs(event) {
    /***
     * Toggles between tabs by changing the className for each tab (active vs. inactive) before re-rendering.
     */
    if (event.target.id === "now-playing-tab") {
      setNowPlayingTabState("active");
      setSearchTabState("inactive");
      setDisplaySearch("hide");

      fetchData(fetchURL, "reload default");
    }
    else {
      setNowPlayingTabState("inactive");
      setSearchTabState("active");
      setDisplaySearch("show");

      search();
    }
  }

  // Re-render when pageNumber is changed, which occurs when we load more.
  useEffect(() => {
    fetchData(fetchURL, "load")
  }, [pageNumber]);


  return (
    <main className="App">
      <header>
        <h1>Movies</h1>
        <section className='nav-bar'>
          <button id='now-playing-tab' className={nowPlayingTabState} onClick={toggleTabs}>Now Playing</button>
          <button id='search-tab' className={searchTabState} onClick={toggleTabs}>Search</button>
        </section>

        <MovieModal
          data = {movieData}
        />

        <section id='search-section' className={displaySearch}>
           {/* Search is connected using useState variable that performs the handleSearchChange function on a change of input. */}
          <input className='search-bar' onChange={handleSearchChange} placeholder='Discover your next movie...'></input>
          <button onClick={search}>Search</button>
        </section>
      </header>

      <MovieList
        data = {movieData}
      />

      <button id='load-more' onClick={loadMore}>Load More</button>
    </main>
  );
}

export default App;
