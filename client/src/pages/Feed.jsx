//import material UI
import React from "react";
import { Container, Grid } from "@mui/material";

//import dependencies
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import utilities
import useAppStore from "../store/appStore";
import Post from "../components/post";
import Header from "../components/header";

//import post creation design
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";

/*
toggleDashboardAuth default = true, use for production
toggleDashboardAuth = false, deactivates dashboard page authorization 
  allowing navigation to the page without having to be logged in
*/
const toggleFeedAuth = true;

const Feed = () => {
  const navigate = useNavigate();
  // hooks
  const [imgURL, setImgURL] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("")
  //check if user has logged in
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const userData = useAppStore((state) => state.userData);

  // check user authorization
  useEffect(() => {
    if (!isLoggedIn && toggleFeedAuth) navigate("/");
  }, []);

  //
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = () => {
    const postData = {
      author_id: 24,
      continent_id: continents.indexOf(location) + 1,
      image: imgURL,
      title: title,
      rating,
      content: review,
    };
    fetch("/api/feed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((data) => data.json())
      .then((res) => {
        // TODO:
        // create post passing in data from fetch
        // unshift posts array passing post to put users new post on top of feed
        console.log("this is RES", res);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  };

  const continents = [
    "Africa",
    "Asia",
    "Europe",
    "Oceania",
    "North America",
    "South America",
    "Antarctica",
  ];

  return (
    <Grid container justifyContent={"center"}>
      <div>
        <Header />
        <Grid container justifyContent={"center"}>
          <div>
            <Button sx={{ m: 2 }} variant="contained" onClick={handleClickOpen}>
              New Post
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Tell us about your trip!</DialogTitle>
              <DialogContent>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={continents}
                  sx={{ width: 300 }}
                  value={location}
                  onChange={(e, value) => setLocation(value)}
                  renderInput={(params) =>
                    <TextField {...params} label="Location" />
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Title"
                  type="email"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Image URL"
                  type="email"
                  value={imgURL}
                  onChange={(e) => setImgURL(e.target.value)}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Review"
                  type="email"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  sx={{mt: 2}}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Rating 0-5"
                  type="email"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handlePost}>Post</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
        <Post />
      </div>
    </Grid>
  );
};

export default Feed;
