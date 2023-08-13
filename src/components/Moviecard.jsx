import { useNavigate } from "react-router";
import "./Moviecard.css";

export default function MovieCard({ props }) {
  const navigate = useNavigate();

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${props?.title}`)}
    >
      <img src={props?.imageURL} alt={props?.title} />
      <p>{props?.title}</p>
    </div>
  );
}
