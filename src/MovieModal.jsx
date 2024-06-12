import './MovieModal.css'

function MovieModal(movieData) {
    return (
        <section id='movie-modal'>
            <h1>{movieData.title}</h1>
        </section>
    )
}

export default MovieModal;
