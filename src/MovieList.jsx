import './MovieList.css'
import MovieCard from './MovieCard'

function MovieList(movieData) {
    const movieIDs = [];

    function  deriveGenres(genreIDs) {
        /***
         * Gets the genre names from the provided genre IDs and returns all genres in one string.
         */
        let genres = ""
        for (let count = 1; count < genreIDs.length; count++) {
            if (count != 1 && count - 1 != genreIDs.length) {
                genres += ", "
            }
            if (genreIDs[count] == 28) {
                genres += "Action";
              }
              else if (genreIDs[count] == 12) {
                genres += "Adventure";
              }
              else if (genreIDs[count] == 16) {
                genres += "Animation";
              }
              else if (genreIDs[count] == 35) {
                genres += "Comedy";
              }
              else if (genreIDs[count] == 80) {
                genres += "Crime";
              }
              else if (genreIDs[count] === 99) {
                genres += "Documentary";
              }
              else if (genreIDs[count] == 18) {
                genres += "Drama";
              }
              else if (genreIDs[count] == 10751) {
                genres += "Family";
              }
              else if (genreIDs[count] == 14) {
                genres += "Fantasy";
              }
              else if (genreIDs[count] == 36) {
                genres += "History";
              }
              else if (genreIDs[count] === 27) {
                genres += "Horror";
              }
              else if (genreIDs[count] === 27) {
                genres += "Music";
              }
              else if (genreIDs[count] == 9648) {
                genres += "Mystery";
              }
              else if (genreIDs[count] == 10749) {
                genres += "Romance";
              }
              else if (genreIDs[count] == 878) {
                genres += "Science Fiction";
              }
              else if (genreIDs[count] == 10770) {
                genres += "TV Movvie";
              }
              else if (genreIDs[count] == 53) {
                genres += "Thriller";
              }
              else if (genreIDs[count] == 10752) {
                genres += "War";
              }
              else if (genreIDs[count] == 37) {
                genres += "Western";
              }
            count += 1;
        }
        return genres;
    }

    function createMovieCards(cardData) {
        if (!movieIDs.includes(cardData.id) && cardData.vote_average != 0) {
            movieIDs.push(cardData.id);

            return(
                <MovieCard
                    title = {cardData.title}
                    getRatingStar = {movieData.getRatingStar}
                    favoriteMoviesData = {movieData.favoriteMoviesData}
                    setFavoriteMoviesData = {movieData.setFavoriteMoviesData}
                    setWatchedMoviesData = {movieData.setWatchedMoviesData}
                    watchedMoviesData = {movieData.watchedMoviesData}
                    key = {cardData.id}
                    movieID = {cardData.id}
                    releaseDate = {cardData.release_date}
                    src = {"https://image.tmdb.org/t/p/w500" + cardData.poster_path}
                    rating = {cardData.vote_average}
                    backdropSrc = {"https://image.tmdb.org/t/p/original" + cardData.backdrop_path}
                    genres = {deriveGenres(cardData.genre_ids)}
                    overview = {cardData.overview}
                    modalInfo = {movieData.modalInfo}
                    setModalInfo = {movieData.setModalInfo}
                    view = {movieData.view}
                    setView = {movieData.setView}
                />
            )
        }
    }

    return(
        <main>
            <div className='movie-cards'>
                {movieData.data.map(createMovieCards)}
            </div>
        </main>
    );
}

export default MovieList;
