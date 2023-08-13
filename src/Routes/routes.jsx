import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import MoviePage from "../pages/Moviepage";
import LikedPage from "../pages/LikedMovies";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/liked" element={<LikedPage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  );
}
