import React from "react";
import "./FavoritesCard.css";

function FavoritesCard(cardData) {
    const backgroundImg = "url(\"" + cardData.backdropSrc + "\")";

    // title = {cardData.title}
    //             // favoriteMoviesData = {cardData.favoriteMoviesData}
    //             // setFavoriteMoviesData = {cardData.setFavoriteMoviesData}
    //             key = {cardData.movieID}
    //             movieID = {cardData.moviedID}
    //             // releaseDate = {cardData.release_date}
    //             backdropSrc = {cardData.backdropSrc}
    //             rating = {cardData.rating}

    console.log(cardData)
    return (
        <div id = "favorites-card" style={{backgroundImage: backgroundImg}}>
            <h4>{cardData.title}</h4>
            <p id = "rating"><i className="fa-solid fa-star"></i>{cardData.rating}</p>
        </div>
    )
}

export default FavoritesCard;
