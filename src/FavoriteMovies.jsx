import React from "react";
import { useState, useEffect } from "react";
import FavoritesCard from "./FavoritesCard"
import "./FavoriteMovies.css"

function FavoriteMovies(favoriteMoviesData) {
    function createFavoritesCard(cardData) {
        return(
            <FavoritesCard
                title = {cardData.title}
                // favoriteMoviesData = {cardData.favoriteMoviesData}
                // setFavoriteMoviesData = {cardData.setFavoriteMoviesData}
                key = {cardData.movieID}
                movieID = {cardData.moviedID}
                // releaseDate = {cardData.release_date}
                backdropSrc = {cardData.backdropSrc}
                rating = {cardData.rating}
            />
        )
    }

    console.log(favoriteMoviesData.favoriteMoviesData)

    return (
        <section id = "favorites-container">
            <div id = "title">
                <h2>Favorites</h2>
            </div>
            {favoriteMoviesData.favoriteMoviesData.map(createFavoritesCard)}
        </section>
    )

}

export default FavoriteMovies;
