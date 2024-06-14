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
            if (count != 1 && count != genreIDs.length) {
                genres += " ,"
            }
            // genres += (movieData.genres).filter((genre => genre.id == genreIDs[count - 1]));
            count += 1;
        }
        return genres;
    }

    function createMovieCards(cardData) {
        if (!movieIDs.includes(cardData.id) && cardData.vote_average != 0) {
            movieIDs.push(cardData.id);

            console.log(movieData.favoriteMoviesData);

            return(
                <MovieCard
                    title = {cardData.title}
                    getRatingStar = {movieData.getRatingStar}
                    favoriteMoviesData = {movieData.favoriteMoviesData}
                    setFavoriteMoviesData = {movieData.setFavoriteMoviesData}
                    key = {cardData.id}
                    movieID = {cardData.id}
                    releaseDate = {cardData.release_date}
                    src = {"https://image.tmdb.org/t/p/w500" + cardData.poster_path}
                    rating = {cardData.vote_average}
                    backdropSrc = {"https://image.tmdb.org/t/p/original" + cardData.backdrop_path}
                    genresIDs = {deriveGenres(cardData.genre_ids)}
                    overview = {cardData.overview}
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
