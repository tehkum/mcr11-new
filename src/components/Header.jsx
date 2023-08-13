import { useItems } from "../context/ItemContext";
import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  const { movieState, movieDispatch } = useItems();

  return (
    <nav>
      <NavLink to="/" className="nav-logo">
        IMdB
      </NavLink>

      <input
        type="search"
        onChange={(e) =>
          movieDispatch({ type: "SEARCH", payload: e.target.value })
        }
        value={movieState?.searchWords}
        placeholder="Search.."
      />
      <div>
        <NavLink to="/liked" className="nav-item">
          Liked Movies
        </NavLink>
      </div>
    </nav>
  );
}
