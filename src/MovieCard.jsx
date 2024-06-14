import React from 'react'
import { useState, useEffect } from 'react'
import './MovieCard.css'
import MovieModal from './MovieModal'

function MovieCard(movieData) {
    const [view, setView] = useState("hide");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

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

    function handleFavoriting(event) {
        /***
         * Toggles favorite button.
         */
        event.stopPropagation();
        if (isFavorited == false) {
            movieData.setFavoriteMoviesData(movieData.favoriteMoviesData.concat([
                {"title": movieData.title,
                "backdropSrc": movieData.backdropSrc,
                "rating": movieData.rating,
                "movieID": movieData.movieID}
            ]));
            setIsFavorited(true);
        }
        else {
            setIsFavorited(false);
            // Remove all movie dictionaries that have the title of the card data clicked.
            movieData.setFavoriteMoviesData(movieData.favoriteMoviesData.filter(card => card.title != movieData.title));
        }
    }

    function handleWatched(event) {
        /***
         * Toggles watched button.
         */
        event.stopPropagation();
        if (isWatched == false) {
            setIsWatched(true);
        }
        else {
            setIsWatched(false);
        }
    }

    useEffect(() => {}, [isFavorited]);

    useEffect(() => {}, [isWatched]);


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
                                <button id = {isFavorited ? "favorited" : ""} className = "card-buttons " style={{display: "flex", flexDirection: "row", alignItems: "center"}} onClick = {event => handleFavoriting(event)}>
                                    <i className="fa-solid fa-crown" style={{paddingRight: "7px"}}></i><p>Favorite</p>
                                </button>
                                <button id = {isWatched ? "watched" : ""} className = "card-buttons" style={{display: "flex", flexDirection: "row", alignItems: "center"}} onClick = {event => handleWatched(event)}>
                                    <i className="fa-solid fa-check" style={{paddingRight: "7px"}}></i><p>Watched</p>
                                </button>
                            </div>
                        </div>

                        <div>
                            {movieData.getRatingStar(2.0)}
                            {movieData.getRatingStar(4.0)}
                            {movieData.getRatingStar(6.0)}
                            {movieData.getRatingStar(8.0)}
                            {movieData.getRatingStar(10.0)}
                        </div>
                        <p>{movieData.rating}</p>


                 </section>
            </main>

            {/* Renders modal if modal is open. */}
            {modalIsOpen &&
                <MovieModal
                    title = {movieData.title}
                    key = {movieData.movieID}
                    movieID = {movieData.movieID}
                    releaseDate = {movieData.releaseDate}
                    backdropSrc = {movieData.backdropSrc}
                    rating = {movieData.vote_average}
                    view = {view}
                    getRatingStar = {movieData.getRatingStar}
                    closeFunc = {handleModalView}
                    overview = {movieData.overview}
                />
            }
        </>
    );
}

export default MovieCard;
