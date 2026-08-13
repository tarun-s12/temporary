"use client";

import { FormEvent, useMemo, useState } from "react";

type Movie = {
  title: string;
  year: string;
  runtime: string;
  genre: string;
  score: string;
  poster: string;
  accent: string;
  description: string;
  director: string;
};

const movies: Movie[] = [
  {
    title: "Past Lives",
    year: "2023",
    runtime: "1h 46m",
    genre: "Drama · Romance",
    score: "4.7",
    poster: "past-lives",
    accent: "#b9c6d4",
    description: "Two childhood friends are separated after one family emigrates from South Korea. Decades later, they reunite in New York for one fateful week.",
    director: "Celine Song",
  },
  {
    title: "The Holdovers",
    year: "2023",
    runtime: "2h 13m",
    genre: "Comedy · Drama",
    score: "4.5",
    poster: "holdovers",
    accent: "#c49b67",
    description: "A cranky history teacher is forced to remain on campus over the holidays with a troubled student and the school's head cook.",
    director: "Alexander Payne",
  },
  {
    title: "Anatomy of a Fall",
    year: "2023",
    runtime: "2h 31m",
    genre: "Mystery · Drama",
    score: "4.6",
    poster: "anatomy",
    accent: "#9fa5a3",
    description: "A woman is suspected of her husband's murder, and their blind son faces a moral dilemma as the sole witness.",
    director: "Justine Triet",
  },
  {
    title: "Perfect Days",
    year: "2023",
    runtime: "2h 4m",
    genre: "Drama",
    score: "4.4",
    poster: "perfect-days",
    accent: "#c8a995",
    description: "A Tokyo toilet cleaner finds contentment in a simple routine, until a series of unexpected encounters shake his quiet life.",
    director: "Wim Wenders",
  },
  {
    title: "The Zone of Interest",
    year: "2023",
    runtime: "1h 45m",
    genre: "History · Drama",
    score: "4.3",
    poster: "zone",
    accent: "#8f9c7d",
    description: "The commandant of Auschwitz strives to build a dream life for his family in a house and garden beside the camp.",
    director: "Jonathan Glazer",
  },
  {
    title: "All of Us Strangers",
    year: "2023",
    runtime: "1h 45m",
    genre: "Fantasy · Drama",
    score: "4.5",
    poster: "strangers",
    accent: "#8ea0b9",
    description: "A screenwriter drawn back to his childhood home finds his parents, who died when he was young, appearing just as they were.",
    director: "Andrew Haigh",
  },
];

const diary = [
  { title: "The Worst Person in the World", date: "Jan 14", rating: "★★★★★", poster: "worst-person" },
  { title: "The Handmaiden", date: "Jan 11", rating: "★★★★★", poster: "handmaiden" },
  { title: "Aftersun", date: "Jan 06", rating: "★★★★½", poster: "aftersun" },
];

const reviews = [
  { name: "Maya Chen", handle: "@mayafilm", time: "2h", text: "A tender, devastating film about the versions of ourselves that only exist in someone else’s memory.", likes: 24, avatar: "MC" },
  { name: "Jon Bell", handle: "@jonwatches", time: "1d", text: "The restraint here is everything. Every pause says more than a page of dialogue could.", likes: 12, avatar: "JB" },
];

function StarRating({ value = "4.7", interactive = false, onChange }: { value?: string; interactive?: boolean; onChange?: (rating: number) => void }) {
  const numeric = Number(value);
  return (
    <div className="stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={interactive ? "star-button" : "star-button is-static"}
          aria-label={`Rate ${star} out of 5`}
          onClick={() => interactive && onChange?.(star)}
        >
          {star <= Math.round(numeric) ? "★" : "☆"}
        </button>
      ))}
      {!interactive && <span className="rating-number">{value}</span>}
    </div>
  );
}

function Poster({ movie, size = "card" }: { movie: Pick<Movie, "title" | "poster" | "accent"> | { title: string; poster: string }; size?: string }) {
  return (
    <div className={`poster poster-${movie.poster} poster-${size}`}>
      <span className="poster-kicker">A film by</span>
      <span className="poster-title">{movie.title}</span>
      <span className="poster-mark">{size === "hero" ? "CINEMA / 23" : "THE FILM CLUB"}</span>
    </div>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Discover");
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All films");
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [diaryTitles, setDiaryTitles] = useState(diary.map((item) => item.title));
  const [myRating, setMyRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submittedComment, setSubmittedComment] = useState("");

  const filteredMovies = useMemo(() => movies.filter((movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase()) || movie.director.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = genre === "All films" || movie.genre.includes(genre);
    return matchesQuery && matchesGenre;
  }), [genre, query]);

  function toggleDiary(title: string) {
    setDiaryTitles((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
  }

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (comment.trim()) {
      setSubmittedComment(comment.trim());
      setComment("");
    }
  }

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Main navigation">
        <button className="wordmark" onClick={() => setActiveNav("Discover")} aria-label="Cineclub home"><span className="wordmark-dot" />cineclub</button>
        <div className="nav-links">
          {["Discover", "Diary", "Lists"].map((item) => <button key={item} className={activeNav === item ? "nav-link is-active" : "nav-link"} onClick={() => setActiveNav(item)}>{item}</button>)}
        </div>
        <div className="nav-actions">
          <label className="search-box"><span className="search-icon">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a film..." aria-label="Search films" /></label>
          <button className="profile-button" aria-label="Open profile">JM</button>
        </div>
      </nav>

      <section className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> FEATURED THIS WEEK</div>
          <h1>Make time<br /><em>for the</em> movies.</h1>
          <p className="hero-description">A quiet place to discover, share, and remember the films that stay with you.</p>
          <div className="hero-actions"><button className="button button-dark" onClick={() => setSelectedMovie(movies[0])}>Explore film <span>↗</span></button><button className="text-button" onClick={() => toggleDiary(selectedMovie.title)}>{diaryTitles.includes(selectedMovie.title) ? "In your diary" : "+ Add to diary"}</button></div>
          <div className="hero-note"><span className="note-mark">✳</span><span><strong>1,248 people</strong> watched this film this week</span></div>
        </div>
        <div className="hero-poster-wrap"><Poster movie={selectedMovie} size="hero" /><div className="poster-caption"><span>01 / 06</span><span>Scroll to explore ↓</span></div></div>
      </section>

      <section className="section-block discovery-section">
        <div className="section-heading"><div><span className="eyebrow">CURATED FOR YOU</span><h2>Films worth your time</h2></div><div className="section-controls"><div className="filter-tabs">{["All films", "Drama", "Comedy"].map((item) => <button key={item} className={genre === item ? "filter-tab is-active" : "filter-tab"} onClick={() => setGenre(item)}>{item}</button>)}</div><button className="round-arrow" aria-label="View all films">→</button></div></div>
        <div className="movie-grid">{filteredMovies.slice(0, 4).map((movie) => <article className="movie-card" key={movie.title} onClick={() => setSelectedMovie(movie)}><div className="card-poster-wrap"><Poster movie={movie} /><button className={diaryTitles.includes(movie.title) ? "diary-toggle is-added" : "diary-toggle"} onClick={(event) => { event.stopPropagation(); toggleDiary(movie.title); }} aria-label={`Add ${movie.title} to diary`}>{diaryTitles.includes(movie.title) ? "✓" : "+"}</button></div><div className="movie-meta"><div><h3>{movie.title}</h3><p>{movie.year} · {movie.genre}</p></div><span className="mini-rating">★ {movie.score}</span></div></article>)}</div>
        {filteredMovies.length === 0 && <div className="empty-state">No films found. Try another title or genre.</div>}
      </section>

      <section className="lower-grid section-block">
        <div className="diary-section"><div className="section-heading compact"><div><span className="eyebrow">YOUR ACTIVITY</span><h2>Recent diary</h2></div><button className="inline-link" onClick={() => setActiveNav("Diary")}>View all <span>↗</span></button></div><div className="diary-list">{diary.map((item) => <div className="diary-row" key={item.title}><Poster movie={item} size="small" /><div className="diary-info"><h3>{item.title}</h3><p>Watched {item.date}, 2024</p></div><span className="diary-rating">{item.rating}</span><button className="more-button" aria-label={`More options for ${item.title}`}>•••</button></div>)}</div><button className="add-diary-row" onClick={() => setActiveNav("Diary")}><span>+</span> Log a film to your diary</button></div>
        <div className="review-section"><div className="section-heading compact"><div><span className="eyebrow">FROM THE COMMUNITY</span><h2>Latest reviews</h2></div><button className="inline-link">See all <span>↗</span></button></div><div className="review-list">{reviews.map((review) => <article className="review" key={review.handle}><div className="avatar">{review.avatar}</div><div className="review-body"><div className="review-byline"><strong>{review.name}</strong><span>{review.handle} · {review.time}</span></div><p>{review.text}</p><div className="review-footer"><button>♡ {review.likes}</button><button>↗ Share</button></div></div></article>)}</div></div>
      </section>

      <section className="movie-detail section-block" aria-label="Selected movie details"><div className="detail-poster"><Poster movie={selectedMovie} size="detail" /></div><div className="detail-copy"><div className="eyebrow">NOW PLAYING IN YOUR HEAD</div><h2>{selectedMovie.title}</h2><div className="detail-subline"><span>{selectedMovie.year}</span><span>·</span><span>{selectedMovie.runtime}</span><span>·</span><span>{selectedMovie.genre}</span></div><p>{selectedMovie.description}</p><div className="character-row"><div className="character"><span className="character-avatar">{selectedMovie.director.slice(0, 2).toUpperCase()}</span><span><small>DIRECTED BY</small><strong>{selectedMovie.director}</strong></span></div><div className="detail-score"><StarRating value={selectedMovie.score} /><small>Community rating</small></div></div><div className="detail-actions"><button className="button button-dark" onClick={() => toggleDiary(selectedMovie.title)}>{diaryTitles.includes(selectedMovie.title) ? "✓ In your diary" : "+ Add to diary"}</button><div className="rate-control"><span>Rate this film</span><StarRating value={String(myRating)} interactive onChange={setMyRating} /></div></div></div></section>

      <section className="comment-section section-block"><div className="comment-heading"><span className="eyebrow">LEAVE A NOTE</span><h2>What did it make<br /><em>you</em> feel?</h2></div><form className="comment-form" onSubmit={submitComment}><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write a review or share a thought..." aria-label="Write a review" /><div className="comment-form-footer"><span>{submittedComment ? "Your note is now part of the conversation." : "Be kind. Be curious. Keep it about the film."}</span><button className="button button-dark" type="submit">Post note <span>↗</span></button></div></form></section>

      <footer className="footer"><span className="wordmark"><span className="wordmark-dot" />cineclub</span><span>A social home for film lovers.</span><span>© 2024 Cineclub</span></footer>
    </main>
  );
}
