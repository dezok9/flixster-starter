import React from "react";
import { useState, useEffect } from "react";
import WatchedCard from "./WatchedCard"
import "./WatchedMovies.css"

function WatchedMovies(watchedMoviesData) {
    function createWatchedCard(cardData) {
        return(
            <WatchedCard
                title = {cardData.title}
                key = {cardData.movieID}
                movieID = {cardData.moviedID}
                backdropSrc = {cardData.backdropSrc}
                rating = {cardData.rating}
            />
        )
    }

    return (
        <section id = "watched-container">
            <div id = "title">
                <h2><i className="fa-solid fa-check" style={{color: "rgb(78, 161, 83)"}}></i>  Watched</h2>
            </div>
            {watchedMoviesData.watchedMoviesData.map(createWatchedCard)}
        </section>
    )

}

export default WatchedMovies;
