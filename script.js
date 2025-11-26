// Basic safe query helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const themeToggle = $('#themeToggle');
  const body = document.body;
  const slides = $$('.slide');
  const sliderContainer = $('#slider');
  const prevBtn = $('#prevBtn') || $('#prev');
  const nextBtn = $('#nextBtn') || $('#next');
  const overlay = $('#overlay');
  const commentsList = $('#commentsList');
  const closeCommentsBtn = $('#closeComments');
  const commentsButtons = $$('.comments-btn');
  const trendingList = $('#trendingList');
  const followedList = $('#followedList');
  const reviewsList = $('#reviewsList');
  const loadMoreAnchor = $('#loadMoreAnchor');

  /* ---------------- THEME TOGGLE ---------------- */
  let dark = true;
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      dark = !dark;
      if (dark) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.textContent = 'Dark';
      } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.textContent = 'Light';
      }
    });
  }

  /* ---------------- SLIDER ---------------- */
  let currentIndex = 0;
  function showSlide(i) {
    slides.forEach((s, idx) => {
      s.style.display = (idx === i) ? 'flex' : 'none';
    });
  }
  showSlide(0);

  if (prevBtn) prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // autoplay with pause on hover
  let autoplay = setInterval(() => { currentIndex = (currentIndex + 1) % slides.length; showSlide(currentIndex); }, 5000);
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoplay));
    sliderContainer.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => { currentIndex = (currentIndex + 1) % slides.length; showSlide(currentIndex); }, 5000);
    });
  }

  /* ---------------- COMMENTS MODAL ---------------- */
  function openComments(forId) {
    if (!commentsList) return;
    commentsList.innerHTML = ''; // clear previous
    // simulate many comments
    for (let i = 1; i <= 30; i++) {
      const c = document.createElement('div');
      c.className = 'comment';
      c.textContent = `User${i}: Sample comment for review ${forId}.`;
      commentsList.appendChild(c);
    }
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeComments() {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  commentsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const review = e.target.closest('.review');
      const id = review ? review.dataset.id : 'unknown';
      openComments(id);
    });
  });
  if (closeCommentsBtn) closeCommentsBtn.addEventListener('click', closeComments);
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeComments(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeComments(); });

  /* ---------------- TRENDING & FOLLOWED (placeholder) ---------------- */
  const trendingData = [
    { title: "Dark Moon", reason: "Amazing visuals — fans love the soundtrack", link: "#" },
    { title: "Pixel Rush", reason: "Viral challenge scene", link: "#" },
    { title: "Skyline", reason: "Must-watch for sci-fi lovers", link: "#" }
  ];
  const followedData = [
    { pfp: "https://i.pravatar.cc/40?img=5", name: "FilmFanatic" },
    { pfp: "https://i.pravatar.cc/40?img=9", name: "SeriesSage" },
    { pfp: "https://i.pravatar.cc/40?img=12", name: "IndieSpot" }
  ];
  if (trendingList) {
    trendingList.innerHTML = trendingData.map(it => `
      <div class="item"><strong>${it.title}</strong><p class="muted">${it.reason}</p><button class="small-btn" onclick="location.href='${it.link}'">View</button></div>
    `).join('');
  }
  if (followedList) {
    followedList.innerHTML = followedData.map(u => `<div style="display:flex;align-items:center;gap:10px"><div class="pfp-mini"><img src="${u.pfp}" alt=""></div><div class="muted">${u.name}</div></div>`).join('');
  }

  /* ---------------- INFINITE LOADING (simulated) ---------------- */
  if (loadMoreAnchor && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) loadMoreReviews();
      });
    }, { rootMargin: '300px' });
    io.observe(loadMoreAnchor);
  }

  let loading = false;
  function loadMoreReviews() {
    if (loading) return;
    loading = true;
    // simulate fetch delay
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        const el = document.createElement('article');
        el.className = 'review';
        el.dataset.id = 'auto-' + Date.now() + '-' + i;
        el.innerHTML = `
          <div class="left"><img src="https://i.pravatar.cc/64?img=${10 + Math.floor(Math.random()*80)}" alt="profile"></div>
          <div class="content">
            <div class="head">
              <div>
                <h4>AutoLoad — <span class="muted">auto</span></h4>
                <div class="meta"><div class="poster-mini"><img src="https://picsum.photos/120/160?random=${Math.floor(Math.random()*100)}" /></div>
                <div style="margin-left:10px"><strong>Title</strong><p class="muted">Short autogenerated review</p></div></div>
              </div>
              <div class="meta">
                <button class="small-btn comments-btn" data-action="comments">Comments</button>
                <button class="small-btn open-btn">Open</button>
              </div>
            </div>
            <p>Autogenerated content — Likes: <strong>${Math.floor(Math.random()*100)}</strong></p>
            <div class="action-row"><button class="small-btn">Like</button><button class="small-btn">Dislike</button><button class="small-btn">Share</button></div>
          </div>
        `;
        const reviewsList = $('#reviewsList');
        if (reviewsList) reviewsList.appendChild(el);
      }
      // re-bind any new comment buttons
      $$('.comments-btn').forEach(btn => {
        if (!btn._bound) {
          btn._bound = true;
          btn.addEventListener('click', (e) => {
            const review = e.target.closest('.review');
            openComments(review ? review.dataset.id : 'unknown');
          });
        }
      });
      loading = false;
    }, 900);
  }

  // initial bind for comment buttons on page load
  $$('.comments-btn').forEach(btn => {
    btn._bound = true;
    btn.addEventListener('click', (e) => {
      const review = e.target.closest('.review');
      openComments(review ? review.dataset.id : 'unknown');
    });
  });

  /* ---------------- NAV LED effect (subtle) ---------------- */
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.addEventListener('mousemove', (e) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      nav.style.setProperty('--led-x', `${x}px`);
    });
  }
});
