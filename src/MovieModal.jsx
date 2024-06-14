import './MovieModal.css'
import { useState, useEffect } from 'react';

function MovieModal(modalInfo) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const backgroundImg = "url(\"" + modalInfo.modalInfo.backdropSrc + "\")";
    const [movieTrailerURL, setMovieTrailerURL] = useState("https://www.youtube.com/embed/")

    const fetchTrailer = async () => {
        try {
            const movieVideoInfo = "https://api.themoviedb.org/3/movie/" + modalInfo.modalInfo.movieID + "/videos?api_key=" + String(apiKey);
            const res = await fetch(movieVideoInfo);
            const resData = await res.json();

            const trailerData = await resData.results.find(val => val.site === "YouTube" && val.type === "Trailer");

            if (trailerData != {}) {
                const addedStr = trailerData.key + "?autoplay=1&mute=1"
                setMovieTrailerURL(movieTrailerURL.concat(addedStr));
            }
            else {
                setMovieTrailerURL("");
            }
            return (movieTrailerURL);
        }
        catch (err) {
            console.error("Error: " + err)
        }
    }

    function closeFunc() {
        modalInfo.modalInfo.updateModalView();
        modalInfo.setView("hide");
        modalInfo.modalInfo.setModalInfo({});
        movieData.modalIsOpen("false");
    }

    function getReleaseDate() {
        /***
         * Formats and returns the release date.
         */
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const splitDate = modalInfo.modalInfo.releaseDate.split('-')
        const year = splitDate[0];
        const month = months[Number(splitDate[1]) - 1];
        const day = String(Number(splitDate[2]));

        return month + " " + day + ", " + year;
    }

    useEffect(() => fetchTrailer, [movieTrailerURL]);
    useEffect(() => getReleaseDate, [movieTrailerURL]);

    if (modalInfo.modalInfo != {})
    {    return (
            <section id='movie-modal' className= {modalInfo.view} style={{ backgroundImage: backgroundImg }}>
                <span id="close-span"><i id="close-button" className="fa-regular fa-circle-xmark fa-xl" onClick={closeFunc}></i></span>
                <div id="modal-info">
                    <iframe className = "video" src = {movieTrailerURL}></iframe>
                    <section className = "modal-content">
                        <h1 id="modal-title">{modalInfo.modalInfo.title}</h1>
                        {/* <p><strong>Release Date:</strong> {getReleaseDate()}</p> */}
                        <p><strong>Genre:</strong> -</p>
                        <div>
                            {modalInfo.getRatingStar(2.0)}
                            {modalInfo.getRatingStar(4.0)}
                            {modalInfo.getRatingStar(6.0)}
                            {modalInfo.getRatingStar(8.0)}
                            {modalInfo.getRatingStar(10.0)}
                            </div>
                        <p>{modalInfo.modalInfo.overview}</p>
                    </section>
                </div>
            </section>
        )}
    else {
        return (
            <>
            </>
        )
    }
}

export default MovieModal;
