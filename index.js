const movies = [
  { title: 'The Quiet Girl', meta: '2022 · Drama', score: '91', genre: 'drama', cover: 'cover-1' },
  { title: 'Dope', meta: '2015 · Comedy', score: '88', genre: 'comedy', cover: 'cover-2' },
  { title: 'Aftersun', meta: '2022 · Drama', score: '95', genre: 'drama', cover: 'cover-3' },
  { title: 'Decision to Leave', meta: '2022 · Thriller', score: '93', genre: 'thriller', cover: 'cover-4' },
];

const grid = document.querySelector('#movie-grid');
const filter = document.querySelector('#genre-filter');
const toast = document.querySelector('#toast');

function renderMovies(genre = 'all') {
  const visibleMovies = genre === 'all' ? movies : movies.filter((movie) => movie.genre === genre);
  grid.innerHTML = visibleMovies.map((movie) => `
    <article class="movie-card">
      <button class="movie-cover ${movie.cover}" type="button" data-title="${movie.title}" aria-label="Add ${movie.title} to your watchlist">
        <h3>${movie.title}</h3>
      </button>
      <div class="movie-info">
        <p>${movie.meta}</p>
        <span class="movie-score">${movie.score}</span>
      </div>
    </article>
  `).join('') || '<p>No films found in this genre yet.</p>';
}

function showToast(title) {
  toast.textContent = `${title} added to your watchlist`;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 2400);
}

filter.addEventListener('change', (event) => renderMovies(event.target.value));
grid.addEventListener('click', (event) => {
  const movie = event.target.closest('[data-title]');
  if (movie) showToast(movie.dataset.title);
});

renderMovies();
