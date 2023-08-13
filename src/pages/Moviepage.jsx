import { Container } from "@mui/material";
import { useItems } from "../context/ItemContext";
import { useEffect } from "react";
import { useParams } from "react-router";
import InfoCart from "../components/InfoCard";

export default function MoviePage() {
  const { movieState, movieDispatch } = useItems();
  const { id } = useParams();

  useEffect(() => {
    movieDispatch({ type: "SET_DISPLAY_MOVIE", payload: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Container maxWidth="xl" className="movie-sec">
      <InfoCart props={movieState?.displayMovie} />
    </Container>
  );
}
