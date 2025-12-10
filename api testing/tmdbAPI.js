const apiKey = "4b3cf5d163b21a803a304391cab5a629"

const apiUrl = `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`;
const moviesContainer = document.getElementById("movies"); // CONTAINER CLASS

async function fetchMovies(){
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        data.results.forEach(media => {
            const movieCard = createMovieCard(media);
            moviesContainer.appendChild(movieCard);
        });
    } catch (error){
        console.error("Error fetching data:", error);
    }
}

function createMovieCard(media) {
    const { title, name, backdrop_path } = media;

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie_item")

    movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" class="movie_img_rounded">
        <div class = "title">${title || name}</div>
    `;
    return movieCard;  
}

fetchMovies();
