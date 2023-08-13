// import { NavLink } from "";
import MovieCard from "../components/Moviecard";
import { useItems } from "../context/ItemContext";
import Container from "@mui/material/Container";
import "./Home.css";
import TransitionsModal from "../components/NewModal";
// import StarIcon from "@mui/icons-material/Star";

export default function LikedPage() {
  const { movieState } = useItems();

  return (
    <Container className="home-sec" maxWidth="xl">
      <div className="filter-panel">
        <h1>Movies</h1>
      </div>
      <div className="movie-card-sec">
        {movieState?.likedMovies?.length ? (
          movieState?.likedMovies.map((movie) => <MovieCard props={movie} />)
        ) : (
          <p>No Liked Movied</p>
        )}
      </div>
      <TransitionsModal />
    </Container>
  );
}
