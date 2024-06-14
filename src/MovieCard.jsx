import React from 'react'
import { useState, useEffect } from 'react'
import './MovieCard.css'
import MovieModal from './MovieModal'

function MovieCard(movieData) {
    const [view, setView] = useState("hide");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const backgroundImgSrc = "url(\"" + movieData.src + "\")";

    function handleModalView() {
        /***
         * Opens and closes modal.
         */
        if (view === "hide") {
            setView("show");
            setModalIsOpen(true);
        }
        else {
            setView("hide");
            setModalIsOpen(false);
        }
    }

    // function clickOutModal(event) {
    //     console.log(event);

    //     // if (event.target.id != "modal") {

    //     // }
    // }

    // This is what I'm having issues with:
    // useEffect(() =>
    //     document.addEventListener('click', clickOutModal()),
    //     []);

    return(
        <>
            <main className='movie-card' style={{backgroundImage: backgroundImgSrc}} onClick={handleModalView}>
                <section id="movie-card-text">
                        <h2 id='movie-title'>{movieData.title}</h2>
                        <div className="filters">
                            <div style={{display: "flex", gap: "10%"}}>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <i className="fa-solid fa-crown" style={{paddingRight: "7px"}}></i><p>Favorite</p>
                                </div>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <i className="fa-solid fa-check" style={{paddingRight: "7px"}}></i><p>Watched</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <i className="fa-solid fa-star star"></i>
                            <i className="fa-solid fa-star star"></i>
                            <i className="fa-regular fa-star star"></i>
                            <i className="fa-regular fa-star star"></i>
                            <i className="fa-regular fa-star star"></i>
                        </div>
                        <p>{movieData.rating}</p>


                 </section>
            </main>

            {modalIsOpen &&
            // <div id = "modal" >
                <MovieModal
                    title = {movieData.title}
                    key = {movieData.movieID}
                    movieID = {movieData.movieID}
                    releaseDate = {movieData.releaseDate}
                    backdropSrc = {movieData.backdropSrc}
                    rating = {movieData.vote_average}
                    view = {view}
                    closeFunc = {handleModalView}
                />
            // </div>
            }
        </>
    );
}

export default MovieCard;
