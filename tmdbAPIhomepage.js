const apiKey = "4b3cf5d163b21a803a304391cab5a629";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";


const trendingList = document.getElementById("trendingList");
const movieBtn = document.getElementById("movieBtn");
const tvBtn = document.getElementById("tvBtn");
const trendingTitle = document.getElementById("trendingTitle");


// Fetch trending based on type
async function fetchTrending(type) {
  trendingList.innerHTML = "";

  const url = `https://api.themoviedb.org/3/trending/${type}/day?api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    data.results.forEach(item => {
      const card = createPoster(item, type);
      trendingList.appendChild(card);
    });
  } catch (err) {
    console.error("TMDB error:", err);
  }
}

// Create poster
function createPoster(media, type) {
  const id = media.id;
  const poster = media.poster_path;
  const title = media.title || media.name;

  const link = document.createElement("a");
  link.href = `/content page/content.html?id=${id}&type=${type}`;
  link.className = "posterContainer";

  link.innerHTML = `
    <img src="${IMG_PATH + poster}" alt="${title}">
  `;

  return link;
}

// Toggle buttons
movieBtn.addEventListener("click", () => {
  currentType = "movie";
  trendingTitle.textContent = "Trending Movies Today";
  movieBtn.classList.add("accent1");
  tvBtn.classList.remove("accent1");
  fetchTrending("movie");
});

tvBtn.addEventListener("click", () => {
  currentType = "tv";
  trendingTitle.textContent = "Trending TV Shows Today";
  tvBtn.classList.add("accent1");
  movieBtn.classList.remove("accent1");
  fetchTrending("tv");
});

// Initial load
fetchTrending("movie");
