import './MovieList.css'
import MovieCard from './MovieCard'

function MovieList(movieData) {
    const movieIDs = [];

    function createMovieCards(cardData) {
        if (!movieIDs.includes(cardData.id)) {
            movieIDs.push(cardData.id);

            return(
                <MovieCard
                    title = {cardData.title}
                    key = {cardData.id}
                    releaseDate = {cardData.release_date}
                    src = {"https://image.tmdb.org/t/p/w500" + cardData.poster_path}
                    rating = {cardData.vote_average}
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
