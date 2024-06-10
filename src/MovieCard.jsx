import React from 'react'
import './MovieCard.css'

function MovieCard() {
    return(
        <div className='movie-card'>
            <h2>Movie Title</h2>
            <img src=""></img>
            <div>
                <i class="fa-regular fa-star star"></i>
                <i class="fa-regular fa-star star"></i>
                <i class="fa-regular fa-star star"></i>
                <i class="fa-regular fa-star star"></i>
                <i class="fa-regular fa-star star"></i>
            </div>
            <p>Rating</p>
        </div>
    );
}

export default MovieCard
