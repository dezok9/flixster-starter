import React from 'react'
import { useState, useEffect } from 'react'
import './MovieCard.css'
import MovieModal from './MovieModal'

function MovieCard(movieData) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

    const backgroundImgSrc = "url(\"" + movieData.src + "\")";

    function updateModalView() {
        /***
         * Opens and closes modal.
         */
        if (!modalIsOpen) {
            setModalIsOpen(true);
            movieData.setView("show");
            movieData.setModalInfo({
                "title": movieData.title,
                "key": movieData.movieID,
                "movieID": movieData.movieID,
                "releaseDate": movieData.releaseDate,
                "backdropSrc": movieData.backdropSrc,
                "rating": movieData.vote_average,
                "setModalInfo": movieData.setModalInfo,
                "getRatingStar": movieData.getRatingStar,
                "overview": movieData.overview,
                "updateModalView": updateModalView,
                "setModalIsOpen": setModalIsOpen
            });

        }
        else {
            setModalIsOpen(false);
            movieData.setModalInfo({});
            movieData.setView("hide");
        }
    }

    function handleFavoriting(event) {
        /***
         * Toggles favorite button.
         */
        event.stopPropagation();
        // console.log(movieData.favoriteMoviesData)
        // console.log(movieData.title)
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
        console.log(movieData.watchedMoviesData)
        if (isWatched == false) {
            movieData.setWatchedMoviesData(movieData.watchedMoviesData.concat([
                {"title": movieData.title,
                "backdropSrc": movieData.backdropSrc,
                "rating": movieData.rating,
                "movieID": movieData.movieID}
            ]));
            setIsWatched(true);
        }
        else {
            setIsWatched(false);
                      // Remove all movie dictionaries that have the title of the card data clicked.
                      movieData.setWatchedMoviesData(movieData.watchedMoviesData.filter(card => card.title != movieData.title));
        }
    }

    useEffect(() => {}, [isFavorited]);

    useEffect(() => {}, [isWatched]);

    return(
        <>
            <main className='movie-card' style={{backgroundImage: backgroundImgSrc}} onClick={updateModalView}>
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

            {/* Renders modal if modal is open.
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
            } */}
        </>
    );
}

export default MovieCard;
