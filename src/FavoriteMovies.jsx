import React from "react";
import { useState, useEffect } from "react";
import FavoritesCard from "./FavoritesCard";
import "./FavoriteMovies.css";

function FavoriteMovies(favoriteMoviesData) {
    function createFavoritesCard(cardData) {
        return(
            <FavoritesCard
                title = {cardData.title}
                key = {cardData.movieID}
                movieID = {cardData.moviedID}
                backdropSrc = {cardData.backdropSrc}
                rating = {cardData.rating}
            />
        )
    }

    return (
        <section id = "favorites-container">
            <div id = "title">
                <h2><i className="fa-solid fa-crown" style={{color: "#ebc445"}}></i> Favorites</h2>
            </div>
            {favoriteMoviesData.favoriteMoviesData.map(createFavoritesCard)}
        </section>
    )
}

export default FavoriteMovies;
