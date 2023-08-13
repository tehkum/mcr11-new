import { createContext, useContext, useEffect, useReducer } from "react";
import { movies } from "../Data/Data";

export const manageItem = createContext();

export function ItemContext({ children }) {
  const [movieState, movieDispatch] = useReducer(movieReducer, {
    movieData: [...movies],
    displayMovie: {},
    likedMovies: JSON.parse(localStorage.getItem("likedMovies")) ?? [],
    likeSetted: false,
    openModal: false,
    movieSetted: false,
    genreFilter: "",
    yearFilter: "",
    ratingFilter: "",
    searchWords: "",
  });

  function movieReducer(state, action) {
    switch (action.type) {
      case "SET_DISPLAY_MOVIE":
        return {
          ...state,
          displayMovie: state?.movieData?.find(
            (movie) => movie?.title === action?.payload
          ),
        };

      case "LIKE_MOVIE":
        localStorage.setItem(
          "likedMovies",
          JSON.stringify([
            ...(JSON.parse(localStorage.getItem("likedMovies")) ?? []),
            action.payload,
          ])
        );
        return {
          ...state,
          likeSetted: !state?.likeSetted,
        };

      case "DISLIKE_MOVIE":
        localStorage.setItem(
          "likedMovies",
          JSON.stringify(
            JSON.parse(localStorage.getItem("likedMovies")).filter(
              (movie) => movie?.title !== action?.payload
            ) ?? []
          )
        );
        return {
          ...state,
          likeSetted: !state?.likeSetted,
        };

      case "OPEN_MODAL":
        return { ...state, openModal: true };

      case "CLOSE_MODAL":
        return { ...state, openModal: false };

      case "SET_ITEM":
        return {
          ...state,
          movieData: [
            ...movies,
            ...(JSON.parse(localStorage.getItem("moreMovies")) ?? []),
          ],
        };
      case "SET_LIKE_ITEM":
        return {
          ...state,
          likedMovies: [
            ...(JSON.parse(localStorage.getItem("likedMovies")) ?? []),
          ],
        };

      case "SET_NEW_ITEM":
        localStorage.setItem(
          "moreMovies",
          JSON.stringify([
            ...(JSON.parse(localStorage.getItem("moreMovies")) ?? []),
            action.payload,
          ])
        );
        return { ...state, movieSetted: !state?.movieSetted };

      case "GENRE_FILTER":
        return { ...state, genreFilter: action.payload };

      case "YEAR_FILTER":
        return { ...state, yearFilter: action.payload };

      case "RATING_FILTER":
        return { ...state, ratingFilter: action.payload };

      case "SEARCH":
        return { ...state, searchWords: action.payload };

      default:
        return { ...state };
    }
  }

  useEffect(() => {
    movieDispatch({ type: "SET_ITEM" });
  }, [movieState?.movieSetted]);

  useEffect(() => {
    movieDispatch({ type: "SET_LIKE_ITEM" });
  }, [movieState?.likeSetted]);

  return (
    <manageItem.Provider value={{ movieState, movieDispatch }}>
      {children}
    </manageItem.Provider>
  );
}

export const useItems = () => useContext(manageItem);
