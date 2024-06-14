import './MovieList.css'
import MovieCard from './MovieCard'

function MovieList(movieData) {
    const movieIDs = [];

    function createMovieCards(cardData) {
        if (!movieIDs.includes(cardData.id) && cardData.vote_average != 0) {
            movieIDs.push(cardData.id);

            return(
                <MovieCard
                    title = {cardData.title}
                    key = {cardData.id}
                    movieID = {cardData.id}
                    releaseDate = {cardData.release_date}
                    src = {"https://image.tmdb.org/t/p/w500" + cardData.poster_path}
                    rating = {cardData.vote_average}
                    backdropSrc = {"https://image.tmdb.org/t/p/original" + cardData.backdrop_path}
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
