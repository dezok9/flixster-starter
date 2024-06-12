import './MovieModal.css'

function MovieModal(modalInfo) {
    function getReleaseDate() {
        /***
         * Formats and returns the release date.
         */
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const splitDate = modalInfo.releaseDate.split('-')
        const year = splitDate[0];
        const month = months[Number(splitDate[1]) - 1];
        const day = String(Number(splitDate[2]));

        return month + " " + day + ", " + year;
    }

    return (
        <section id='movie-modal' className={modalInfo.view}>
            <span></span>
            <h1>{modalInfo.title}</h1>
            <img id='modal-img' src={modalInfo.src}/>
            <p>{getReleaseDate()}</p>
        </section>
    )
}

export default MovieModal;
