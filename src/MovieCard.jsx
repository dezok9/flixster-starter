import React from 'react'
import { useState, useEffect } from 'react'
import './MovieCard.css'
import MovieModal from './MovieModal'

function MovieCard(movieData) {
    const [view, setView] = useState("hide");

    function handleModalView() {
        /***
         * Opens and closes modal.
         */
        if (view === "hide") {
            setView("show");
        }
        else {
            setView("hide");
        }
    }

    function clickOutModal(event) {
        console.log(event.target);
        // if (event.target) {

        // }
    }

    useEffect(() =>
        window.addEventListener('keydown', (event) => clickOutModal), [handleModalView]);

    return(
        <>
            <main className='movie-card' onClick={handleModalView}>
                <img id='movie-img' src={movieData.src} alt={movieData.title}/>
                <h2 id='movie-title'>{movieData.title}</h2>
                <div>
                    <i className="fa-regular fa-star star"></i>
                    <i className="fa-regular fa-star star"></i>
                    <i className="fa-regular fa-star star"></i>
                    <i className="fa-regular fa-star star"></i>
                    <i className="fa-regular fa-star star"></i>
                </div>
                <p>{movieData.rating}</p>
            </main>

            <MovieModal
                title = {movieData.title}
                key = {movieData.id}
                releaseDate = {movieData.releaseDate}
                src = {movieData.src}
                rating = {movieData.vote_average}
                view = {view}
                closeFunc = {handleModalView}
            />
        </>
    );
}

export default MovieCard
