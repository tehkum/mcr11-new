import "./Moviecard.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useItems } from "../context/ItemContext";

export default function InfoCart({ props }) {
  const { movieState, movieDispatch } = useItems();

  return (
    <div className="info-card">
      <img src={props?.imageURL} alt={props?.title} />
      <div>
        <div className="title-icon">
          <h1>{props?.title}</h1>
          {movieState?.likedMovies?.find(
            (movie) => +movie?.id === +props?.id
          ) ? (
            <span
              onClick={() =>
                movieDispatch({ type: "DISLIKE_MOVIE", payload: props?.title })
              }
            >
              <FavoriteIcon />
            </span>
          ) : (
            <span
              onClick={() =>
                movieDispatch({ type: "LIKE_MOVIE", payload: props })
              }
            >
              <FavoriteBorderIcon />
            </span>
          )}
        </div>
        <p>{props?.summary}</p>
        <p>
          <b>Year: </b>
          {props?.year}
        </p>
        <p>
          <b>Genre: </b>
          {props?.genre?.map((gen) => `${gen}, `)}
        </p>
        <p>
          <b>Rating: </b>
          {props?.rating}
        </p>
        <p>
          <b>Director: </b>
          {props?.director}
        </p>
        <p>
          <b>Writer: </b>
          {props?.writer}
        </p>
        <p>
          <b>Cast: </b>
          {props?.cast?.map((cas) => `${cas}, `)}
        </p>
      </div>
    </div>
  );
}
