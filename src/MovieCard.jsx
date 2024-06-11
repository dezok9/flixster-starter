import React from 'react'
import './MovieCard.css'

function MovieCard(movieData) {
    return(
        <div className='movie-card'>
            <img id='movie-img' src={movieData.src}/>
            <h2>{movieData.title}</h2>
            <div>
                <i className="fa-regular fa-star star"></i>
                <i className="fa-regular fa-star star"></i>
                <i className="fa-regular fa-star star"></i>
                <i className="fa-regular fa-star star"></i>
                <i className="fa-regular fa-star star"></i>
            </div>
            <p>{movieData.rating}</p>
        </div>
    );
}

export default MovieCard
