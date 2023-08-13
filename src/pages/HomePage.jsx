// import { NavLink } from "";
import MovieCard from "../components/Moviecard";
import { useItems } from "../context/ItemContext";
import Container from "@mui/material/Container";
import "./Home.css";
import TransitionsModal from "../components/NewModal";
import StarIcon from "@mui/icons-material/Star";

export default function HomePage() {
  const { movieState, movieDispatch } = useItems();

  const allGenres = movieState?.movieData?.map(({ genre }) => genre).flat();
  // const allRating = movieState?.movieData?.map(({ rating }) => rating);
  const allYear = movieState?.movieData
    ?.map(({ year }) => year)
    .sort((a, b) => a - b);

  const ratingFilter =
    movieState?.ratingFilter && movieState?.ratingFilter !== "all"
      ? movieState?.movieData?.filter(
          ({ rating }) => rating >= +movieState?.ratingFilter
        )
      : movieState?.movieData;

  const yearFilter =
    movieState?.yearFilter && movieState?.yearFilter !== "all"
      ? ratingFilter.filter(({ year }) => year <= +movieState?.yearFilter)
      : ratingFilter;

  const genreFilter =
    movieState?.genreFilter && movieState?.genreFilter !== "all"
      ? yearFilter?.filter(({ genre }) =>
          genre?.find((gen) => gen === movieState?.genreFilter)
        )
      : yearFilter;

  const searchFilter = movieState?.searchWords
    ? genreFilter?.filter(
        ({ title, cast, director }) =>
          title
            ?.toLowerCase()
            .includes(movieState?.searchWords?.toLowerCase()) ||
          director
            ?.toLowerCase()
            .includes(movieState?.searchWords?.toLowerCase()) ||
          cast?.find(
            (item) =>
              item?.toLowerCase()?.includes(movieState?.searchWords?.toLowerCase())
          )
      )
    : genreFilter;

  return (
    <Container className="home-sec" maxWidth="xl">
      <div className="filter-panel">
        <h1>Movies</h1>
        <select
          onChange={(e) =>
            movieDispatch({ type: "GENRE_FILTER", payload: e.target.value })
          }
        >
          <option value="all">Select Genre</option>
          {allGenres
            .reduce(
              (acc, genre) =>
                acc?.find((gen) => gen === genre) ? [...acc] : [...acc, genre],
              []
            )
            .map((genre) => (
              <option value={genre}>{genre}</option>
            ))}
        </select>
        <select
          onChange={(e) =>
            movieDispatch({ type: "YEAR_FILTER", payload: e.target.value })
          }
        >
          <option value="all">Release Year</option>
          {allYear
            .reduce(
              (acc, genre) =>
                acc?.find((gen) => gen === genre) ? [...acc] : [...acc, genre],
              []
            )
            .map((genre) => (
              <option value={genre}>{genre}</option>
            ))}
        </select>
        <select
          onChange={(e) =>
            movieDispatch({ type: "RATING_FILTER", payload: e.target.value })
          }
        >
          <option value="all">Rating</option>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <option value={rating}>
              <StarIcon sx={{ color: "yellow" }} />
              {rating}
            </option>
          ))}
        </select>
        <button onClick={() => movieDispatch({ type: "OPEN_MODAL" })}>
          Add New
        </button>
      </div>
      <div className="movie-card-sec">
        {searchFilter?.map((movie) => (
          <MovieCard props={movie} />
        ))}
      </div>
      <TransitionsModal />
    </Container>
  );
}
