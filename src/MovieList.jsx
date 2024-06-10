import './MovieList.css'
import MovieCard from './MovieCard'

function MovieList() {
    return(
        <>
            <h1>Movies</h1>
            <div className='movie-cards'>
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
            </div>
        </>
    );
}

export default MovieList;
