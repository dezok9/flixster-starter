import React, { useSyncExternalStore } from "react"
import { useState, useEffect } from "react"
import "./App.css"
import MovieList from "./MovieList"
import FavoriteMovies from "./FavoriteMovies"
import WatchedMovies from "./WatchedMovies"
import MovieModal from './MovieModal'

const App = () => {
  // Defining variables and the functions that will be used to update them.
  const [movieData, setMovieData] = useState([]);
  const [view, setView] = useState("hide");
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // const [currentURL, setCurrentURL] = useState("");

  const [searchTabState, setSearchTabState] = useState("inactive");
  const [nowPlayingTabState, setNowPlayingTabState] = useState("active");
  const [displaySearch, setDisplaySearch] = useState("hide");

  const [genreFilter, setGenreFilter] = useState("All");
  const [sortMovies, setSortMovies] = useState("Popular");

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const [modalInfo, setModalInfo] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;
  const fetchURL = "https://api.themoviedb.org/3/movie/now_playing?page=" + pageNumber + "&api_key=" + String(apiKey);

  // const backgroundImgSrc = "url(\"" + movieData.src + "\")";

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
        // setFeaturtedMovieData();
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
      console.error("Error: " + err);
    }
  }

  async function getGenres() {
    /***
     * Getting the list of official genres through a fetch call.
     */
      const genresURL = "https://api.themoviedb.org/3/genre/movie/list" + "?api_key=" + String(apiKey);
      const res = await fetch(genresURL);
      const resData = await res.json();
      return(resData);
  }

  async function search(){
    /***
    * Attempts to search TMDB for movie data using the user input.
    * Re-renders when search occurs, which occurs when the submit button is clicked.
    * Returns to default if searchQuery is empty.
    */
    if (searchQuery.replace(" ", "") != ""){
      const searchURL = "https://api.themoviedb.org/3/search/movie?language=en-US&query=" + searchQuery + "&api_key=" + String(apiKey);
      fetchData(searchURL, "search");
    }
    else {
      fetchData(fetchURL, "reload default");
    }
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

  function getRatingStar(percent) {
    /***
     * Gets a star for rating display.
     * Passed down to other components.
     */
    if (movieData.rating >= percent) {
        return (
            <i className="fa-solid fa-star star"></i>
        )
    }
    else {
        return (
            <i className="fa-regular fa-star star"></i>
        )
    }
  }


  function filterMovieGenre(event) {
     setGenreFilter(event.target.value);
  }

  function loadMore() {
    setPageNumber(pageNumber + 1);
  }

  function handleSearchChange(event) {
    setSearchQuery((event.target.value.toLowerCase()).replace(" ", "%20"));
  }

  function filterMovieGenre(event) {
    setGenreFilter(event.target.value);
  }

  function sortMovieCards(event) {
    setSortMovies(event.target.value);
  }

  function runModal() {
    if (view == "show") {
      return (
        <MovieModal
          modalInfo = {modalInfo}
          getRatingStar = {getRatingStar}
          view = {view}
          setView = {setView}
          key = {4}
        />)
  }}
//  getGenres();

  // Re-render when pageNumber is changed, which occurs when we load more.
  useEffect(() => {
    fetchData(fetchURL, "load");
  }, [pageNumber]);


  // Generate URL for filtering
  useEffect(() => {
    let filterURL = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1"

    if (genreFilter != "All") {
      filterURL += "&with_genres="

      if (genreFilter === "Action") {
        filterURL+= "28";
      }
      else if (genreFilter === "Adventure") {
        filterURL+= "12";
      }
      else if (genreFilter === "Animation") {
        filterURL+= "16";
      }
      else if (genreFilter === "Comedy") {
        filterURL+= "35";
      }
      else if (genreFilter === "Crime") {
        filterURL+= "80";
      }
      else if (genreFilter === "Documentary") {
        filterURL+= "99";
      }
      else if (genreFilter === "Drama") {
        filterURL+= "18";
      }
      else if (genreFilter === "Fantasy") {
        filterURL+= "14";
      }
      else if (genreFilter === "History") {
        filterURL+= "36";
      }
      else if (genreFilter === "Horror") {
        filterURL+= "27";
      }
      else if (genreFilter === "Mystery") {
        filterURL+= "9648";
      }
      else if (genreFilter === "Romance") {
        filterURL+= "10749";
      }
      else if (genreFilter === "Thriller") {
        filterURL+= "53";
      }
    }

    if (sortMovies != "Popular") {
      filterURL += "&sort_by=";

      if (sortMovies === "Revenue") {
        filterURL += "revenue.desc";
      }
      else if (sortMovies === "Ascending") {
        filterURL += "revenue.asc";
      }
      else if (sortMovies === "Title (A-Z)") {
        filterURL += "title.asc";
      }
      else if (sortMovies === "Highly Rated") {
        filterURL += "vote_average.desc"
      }
    }

    filterURL += "&api_key=" + String(apiKey);
    fetchData(filterURL, "search");
  }, [genreFilter, sortMovies]);

  useEffect(() => {}, [favoriteMovies]);

  useEffect(() => {}, [watchedMovies]);

  useEffect(() => {}, [modalInfo]);

  useEffect(() => {}, [view]);



  return (
    <main className="App">
        <section className="nav-bar">
          <button id="now-playing-tab" className={nowPlayingTabState}  onClick={toggleTabs}>Now Playing</button>
          <button id="search-tab" className={searchTabState} onClick={toggleTabs}>Search</button>

          <section style={{overflowY: "auto", maxHeight: "60vh", padding: "0% 20% 0% 0%", width: "100%", display: "flex", alignContent: "right", flexDirection: "column"}}>
            <div className="dropdowns">
              <h3>Genre</h3>
              <select name = "genre" className = "dropdown" onChange={filterMovieGenre}>
                <option value = "All">All</option>
                <option value = "Action">Action</option>
                <option value = "Adventure">Adventure</option>
                <option value = "Animation">Animation</option>
                <option value = "Comedy">Comedy</option>
                <option value = "Crime">Crime</option>
                <option value = "Documentary">Documentary</option>
                <option value = "Fantasy">Fantasy</option>
                <option value = "History">History</option>
                <option value = "Horror">Horror</option>
                <option value = "Mystery">Mystery</option>
                <option value = "Romance">Romance</option>
              </select>

              <h3>Sort By</h3>
              <select name = "revenue" className = "dropdown" onChange={sortMovieCards}>
                <option value = "Popular">Popular</option>
                <option value = "Revenue">Revenue</option>
                <option value = "Title (A-Z)">Title (A-Z)</option>
                <option value = "Highly Rated">Highly Rated</option>
              </select>
            </div>

            <FavoriteMovies
                setFavoriteMoviesData = {setFavoriteMovies}
                favoriteMoviesData = {favoriteMovies}
                getRatingStar = {getRatingStar}
                key = {1}
            />
            <WatchedMovies
                watchedMoviesData = {watchedMovies}
                setWatchedMoviesData = {setWatchedMovies}
                getRatingStar = {getRatingStar}
                key = {2}
            />
          </section>

        </section>

        <div id="movie-info">
          <header className="title"><i className="fa-solid fa-crown"></i> Flixster</header>

          <section id="search-section" className={displaySearch}>
           {/* Search is connected using useState variable that performs the handleSearchChange function on a change of input. */}
          <input className="search-bar" onChange={handleSearchChange} placeholder="Discover your next movie..."></input>
          <button onClick={search}>SEARCH</button>
          </section>

          <MovieList
            data = {movieData}
            getRatingStar = {getRatingStar}
            setFavoriteMoviesData = {setFavoriteMovies}
            favoriteMoviesData = {favoriteMovies}
            setWatchedMoviesData = {setWatchedMovies}
            watchedMoviesData = {watchedMovies}
            genres = {getGenres()}
            modalInfo = {modalInfo}
            view = {view}
            setView = {setView}
            setModalInfo = {setModalInfo}
            key = {3}
          />

        {runModal()}

        <button id="load-more" onClick={loadMore}>LOAD MORE</button>
        <footer id = "footer">
          <p>Made by Destiny Okonkwo! <i className="fa-solid fa-poo"></i></p>
          <p>Flixter 2024. All Rights Reserved. (Not Really)</p>
        </footer>
        </div>

    </main>
  );
}

export default App;
