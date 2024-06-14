import './MovieModal.css'
import { useState, useEffect } from 'react';

function MovieModal(modalInfo) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const backgroundImg = "url(\"" + modalInfo.backdropSrc + "\")";
    const [movieTrailerURL, setMovieTrailerURL] = useState("https://www.youtube.com/embed/")

    const fetchTrailer = async () => {
        try {
            const movieVideoInfo = "https://api.themoviedb.org/3/movie/" + modalInfo.movieID + "/videos?language=en-US&api_key=" + String(apiKey);
            const res = await fetch(movieVideoInfo);
            const resData = await res.json();

            const trailerData = await resData.results.find(val => val.site === "YouTube" && val.type === "Trailer")

            if (trailerData != {}) {

                setMovieTrailerURL(movieTrailerURL.concat(trailerData.key));
                setMovieTrailerURL(movieTrailerURL.concat("?autoplay=1&mute=1"));
            }
            else {
                setMovieTrailerURL("");
            }
            // console.log(movieTrailerURL)
            return (movieTrailerURL);
        }
        catch (err) {
            console.error("Error: " + err)
        }
    }

    // fetchTrailer();


    function getReleaseDate() {
        /***
         * Formats and returns the release date.
         */
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const splitDate = modalInfo.releaseDate.split('-')
        const year = splitDate[0];
        const month = months[Number(splitDate[1]) - 1];
        const day = String(Number(splitDate[2]));

        return month + " " + day + ", " + year;
    }



    return (
        <section id='movie-modal' className={modalInfo.view} style={{ backgroundImage: backgroundImg }}>
            <span id="close-span"><i id="close-button" className="fa-regular fa-circle-xmark fa-xl" onClick={modalInfo.closeFunc}></i></span>
            <div id="modal-info">
                <iframe className= "video" src = {movieTrailerURL}></iframe>
                <source src={modalInfo.backdropSrc} />
                <section>
                    <h1 id="modal-title">{modalInfo.title}</h1>
                    <p><strong>Release Date:</strong> {getReleaseDate()}</p>
                    <p><strong>Genre:</strong> {getReleaseDate()}</p>
                    <div>
                        <i className="fa-regular fa-star star"></i>
                        <i className="fa-regular fa-star star"></i>
                        <i className="fa-regular fa-star star"></i>
                        <i className="fa-regular fa-star star"></i>
                        <i className="fa-regular fa-star star"></i>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default MovieModal;
