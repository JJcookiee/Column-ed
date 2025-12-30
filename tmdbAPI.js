const apiKey = "4b3cf5d163b21a803a304391cab5a629"
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const BASE_URL = 'https://api.themoviedb.org/3'

const apiTrending = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
const moviesContainer = document.getElementById("rectangles"); // CONTAINER CLASS
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const type = params.get("type") || "movie";
const autoComplete = document.querySelector('.autoComplete')

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



// searchbar function

const searchInput = document.querySelector(".search-input");
const resultsList = document.getElementById("search-results");
const searchForm = document.querySelector(".searchbar form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});


let debounceTimer = null;


searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();


  clearTimeout(debounceTimer);

  if (query.length < 2) {
    resultsList.innerHTML = "";
    return;
  }

  debounceTimer = setTimeout(() => {
    searchTMDB(query);
  }, 300);
});

async function searchTMDB(query){
  try {
    const res = await fetch(
      `${BASE_URL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    );

    const data = await res.json();
    showResults(data.results);
  } catch (err){
    console.error("Search error:", err)
  }
}

function showResults(results){
  resultsList.innerHTML = "";

  results
    .filter(item => item.media_type === "movie" || item.media_type === "tv")
    .slice(0, 8)
    .forEach(item => {
      const li = document.createElement("li");
      const button = document.createElement("button");

      const title = item.title || item.name;
      const year = (item.release_date || item.first_air_date || "")
        .split("-")[0];
      
      button.textContent = year ? `${title} (${year})` : title;

      button.addEventListener("click", () => {
        window.location.href = `/content page/content.html?id=${item.id}&type=${item.media_type}`;
      });

      li.appendChild(button);
      resultsList.appendChild(li);
    })

}

fetchMovies();
