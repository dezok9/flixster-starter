import React from "react";
import "./WatchedCard.css";

function WatchedCard(cardData) {
    const backgroundImg = "url(\"" + cardData.backdropSrc + "\")";

    console.log(cardData)
    return (
        <div id = "watched-card" style={{backgroundImage: backgroundImg}}>
            <h4>{cardData.title}</h4>
            <p id = "rating"><i className="fa-solid fa-star"></i> {cardData.rating}</p>
        </div>
    )
}

export default WatchedCard;
