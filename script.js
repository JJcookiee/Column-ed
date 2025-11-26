// script.js
// Dark/Light mode toggle
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
});

// Carousel functionality
const slides = document.querySelector('.slides');
let currentIndex = 0;

window.nextSlide = function() {
    const totalSlides = slides.children.length;
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
};

window.prevSlide = function() {
    const totalSlides = slides.children.length;
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
};

// Expand review comments
window.openComments = function() {
    const overlay = document.getElementById('commentOverlay');
    overlay.classList.remove('hidden');
};

window.closeComments = function() {
    const overlay = document.getElementById('commentOverlay');
    overlay.classList.add('hidden');
};


// Auto-play carousel
let autoPlay = setInterval(window.nextSlide, 5000);

slides.addEventListener('mouseenter', () => clearInterval(autoPlay));
slides.addEventListener('mouseleave', () => autoPlay = setInterval(window.nextSlide, 5000));

// Dynamic Trending + Followed Lists (placeholder data)
const trendingList = document.getElementById('trendingList');
const followedList = document.getElementById('followedList');

const trendingData = [
    { title: "Cyberpunk Edgerunners", reason: "Massive spike in reviews", link: "#" },
    { title: "Avatar: The Last Airbender", reason: "New season hype", link: "#" },
    { title: "Dune Part II", reason: "Top-rated reviews this week", link: "#" }
];

const followedData = [
    { pfp: "https://i.pravatar.cc/40?img=1", name: "Alex" },
    { pfp: "https://i.pravatar.cc/40?img=2", name: "Mia" },
    { pfp: "https://i.pravatar.cc/40?img=3", name: "Jordan" }
];

function loadTrending() {
    trendingList.innerHTML = trendingData.map(item => `
        <div class="trend-item">
            <h4>${item.title}</h4>
            <p>${item.reason}</p>
            <button onclick="location.href='${item.link}'">View</button>
        </div>
    `).join('');
}

function loadFollowed() {
    followedList.innerHTML = followedData.map(user => `
        <div class="follow-item">
            <img src="${user.pfp}" alt="pfp" />
            <span>${user.name}</span>
        </div>
    `).join('');
}

loadTrending();
loadFollowed();

// Infinite scroll for reviews (placeholder)
const reviewArea = document.querySelector('.review-list');
let loading = false;

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && !loading) {
        loading = true;
        loadMoreReviews();
    }
});

function loadMoreReviews() {
    const newReview = document.createElement('div');
    newReview.classList.add('review-box');
    newReview.innerHTML = `
        <h2>New Loaded Review</h2>
        <p>This is an automatically loaded review.</p>
    `;

    setTimeout(() => {
        reviewArea.appendChild(newReview);
        loading = false;
    }, 1000);
}

// LED Strip Animation
const nav = document.querySelector('nav');
nav.addEventListener('mousemove', (e) => {
    const rect = nav.getBoundingClientRect();
    const x = e.clientX - rect.left;
    nav.style.setProperty('--led-x', `${x}px`);
});