import React from "react";
import "./FavoritesCard.css";

function FavoritesCard(cardData) {
    const backgroundImg = "url(\"" + cardData.backdropSrc + "\")";

    console.log(cardData)
    return (
        <div id = "favorites-card" style={{backgroundImage: backgroundImg}}>
            <h4>{cardData.title}</h4>
            <p id = "rating"><i className="fa-solid fa-star"></i> {cardData.rating}</p>
        </div>
    )
}

export default FavoritesCard;
