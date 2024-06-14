import React from "react";
import { useState, useEffect } from "react";
import FavoritesCard from "./FavoritesCard"
import "./FavoriteMovies.css"

function FavoriteMovies(favoriteMoviesData) {
    function createFavoritesCard(cardData) {
        return(
            <FavoritesCard
                title = {cardData.title}
                favoriteMoviesData = {cardData.favoriteMoviesData}
                setFavoriteMoviesData = {cardData.setFavoriteMoviesData}
                key = {cardData.id}
                movieID = {cardData.id}
                releaseDate = {cardData.release_date}
                src = {"https://image.tmdb.org/t/p/w500" + cardData.poster_path}
                rating = {cardData.vote_average}
            />
        )
    }

    return (
        <section id = "favorites-container">
            {favoriteMoviesData.favoriteMoviesData.map(createFavoritesCard)}
        </section>
    )

}

export default FavoriteMovies;
