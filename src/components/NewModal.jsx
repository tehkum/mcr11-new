import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
import { useItems } from "../context/ItemContext";
import { TextField } from "@mui/material";
import "./Moviecard.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const { movieState, movieDispatch } = useItems();
  const [arrData, setArr] = React.useState();
  const [newMovie, setNew] = React.useState({
    id: +movieState?.movieData[movieState?.movieData?.length]?.id + 1,
    title: "",
    summary: "",
    cast: [],
    genre: [],
    year: "",
    rating: "",
    writer: "",
    director: "",
    imageURL: "",
  });
  const [error, setErr] = React.useState();
  //   const handleOpen = () => movieDispatch({ type: "OPEN_MODAL" });
  const handleClose = () => movieDispatch({ type: "CLOSE_MODAL" });

  const handleChange = (e) => {
    setErr(false);
    const { name, value } = e.target;
    setNew((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(newMovie);
  };

  const handleItem = (e) => {
    setErr(false);
    const { name, value } = e.target;
    setArr({ ...arrData, [name]: value });
  };

  const pushItem = (nameOf) => {
    setNew((prevData) => ({
      ...prevData,
      [nameOf]: [...prevData[nameOf], arrData[nameOf]],
    }));
  };

  const handleSubmit = () => {
    if (
      !newMovie?.title &&
      !newMovie?.cast?.length &&
      !newMovie?.summary &&
      !newMovie?.imageURL &&
      !newMovie?.genre?.length &&
      !newMovie?.director &&
      !newMovie?.rating &&
      !newMovie?.writer &&
      !newMovie?.year
    ) {
      setErr(true);
    } else {
      setErr(false);
      movieDispatch({ type: "SET_NEW_ITEM", payload: newMovie });
      setNew({
        title: "",
        summary: "",
        cast: [],
        genre: [],
        year: "",
        rating: "",
        writer: "",
        director: "",
        imageURL: "",
      });
      handleClose();
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={movieState?.openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={movieState?.openModal}>
          <Box sx={style}>
            <h1>Add New Movie</h1>
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              label="Title"
              name="title"
              id="fullWidth"
              onChange={handleChange}
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              onChange={handleChange}
              label="Summary"
              name="summary"
              id="fullWidth"
            />
            <TextField
              fullWidth
              sx={{ marginBottom: "10px" }}
              label="Year"
              name="year"
              id="fullWidth"
              type="number"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Cast"
              name="cast"
              onChange={handleItem}
              id="fullWidth"
              sx={{ marginBottom: "10px" }}
            />
            <button onClick={() => pushItem("cast")}>Add Cast</button>
            <div>
              {newMovie?.cast?.map((cast) => (
                <p>{cast}</p>
              ))}
            </div>
            <TextField
              fullWidth
              label="Genre"
              onChange={handleItem}
              name="genre"
              id="fullWidth"
              sx={{ marginBottom: "10px" }}
            />
            <button onClick={() => pushItem("genre")}>Add Genre</button>
            <div>
              {newMovie?.genre?.map((genre) => (
                <p>{genre}</p>
              ))}
            </div>
            <TextField
              fullWidth
              label="Rating"
              sx={{ marginBottom: "10px" }}
              type="number"
              name="rating"
              min="0"
              max="10"
              id="fullWidth"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Director"
              name="director"
              sx={{ marginBottom: "10px" }}
              onChange={handleChange}
              id="fullWidth"
            />
            <TextField
              fullWidth
              label="Writer"
              name="writer"
              sx={{ marginBottom: "10px" }}
              id="fullWidth"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Image URL"
              name="imageURL"
              sx={{ marginBottom: "10px" }}
              id="fullWidth"
              onChange={handleChange}
            />
            {error && <p style={{ color: "red" }}>*All Firlds Are Required</p>}
            <button className="add-btn" onClick={handleSubmit}>
              Add Movie
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
