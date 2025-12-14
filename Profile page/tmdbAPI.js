const apiKey = "4b3cf5d163b21a803a304391cab5a629"

const apiTrending = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
const moviesContainer = document.getElementById("rectangles"); // CONTAINER CLASS

async function fetchMovies(){
    try {
        const response = await fetch(apiTrending);
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
    const { id, poster_path } = media;

    const movieCard = document.createElement("div");
    movieCard.classList.add("rectangle");

    movieCard.innerHTML = `
        <a href="/content page/content.html?id=${id}">
            <img 
              src="https://image.tmdb.org/t/p/w500/${poster_path}" 
              class="movie_img_rounded"
              alt="Movie poster"
            >
        </a>
    `;
    return movieCard;  
}

fetchMovies();
