import './MovieList.css'
import MovieCard from './MovieCard'

function MovieList(movieData) {
    function createMovieCards(movieData) {
        return(
            <MovieCard
                title={movieData.title}
                src = {"https://image.tmdb.org/t/p/w500" + movieData.poster_path}
                rating = {movieData.vote_average}
            />
        )
    }


    return(
        <>
            <h1>Movies</h1>
            <div className='movie-cards'>
                {movieData.data.map(createMovieCards)}
            </div>
        </>
    );
}

export default MovieList;
