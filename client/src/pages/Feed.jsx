//import material UI
import React from 'react';
import { Container, Grid } from '@mui/material'

//import dependencies 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import utilities
import useAppStore from '../store/appStore';
import Post from '../components/post';
import Header from '../components/header';

//import post creation design
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/*
toggleDashboardAuth default = true, use for production
toggleDashboardAuth = false, deactivates dashboard page authorization 
  allowing navigation to the page without having to be logged in
*/
const toggleFeedAuth = true;

 const Feed = () => {

  const navigate = useNavigate();
// hooks
const [imgURL, setImgURL] = useState('');
const [location, setLocation] = useState('');
const [review, setReview] = useState('');
const [rating, setRating] = useState(0);
const [posts, setPosts] = useState([]);
  //check if user has logged in

  const state = useAppStore(state);
  const {username, id, avatar, isLoggedIn} = state;
  
  useEffect(() => {
    console.log('This is username, id, avatar', username, id, avatar)
  }, [state]);
  // const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  // const username = useAppStore((state) => state.username);
  // const avatar = useAppStore((state) => state.username);
  
    // check user authorization and render posts if logged in
    useEffect(() => {
      if (!isLoggedIn && toggleFeedAuth) navigate('/');
      fetch('/api/feed')
      .then((data) => data.json())
      .then((res) => {
        setPosts(res);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handlePost = () => {
      const postData = {
        author_id: id,
        continent_id: 1,
        image: imgURL,
        title: "we dont have titles rip",
        rating,
        content: review
      }
      fetch('/api/feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
      .then((data) => data.json())
      .then((res) => {
        // TODO: 
          // create post passing in data from fetch
          // unshift posts array passing post to put users new post on top of feed
        console.log("this is RES", res)
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
      
    };

    
    return (
      <Grid container justifyContent={"center"}>
        <div>
          <Header />
          <Grid container justifyContent={"center"}>
          <div>
            <Button sx={{m: 2}} variant="contained" onClick={handleClickOpen}>
              New Post
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Create Post</DialogTitle>
              <DialogContent>
                <DialogContentText>Tell us about your trip!</DialogContentText>
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
                  label="Location"
                  type="email"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Rating 1-5"
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
          {posts.map((post) => {
            return (
              <Post 
              title={post.title}
              continent={post.continent}
              date={post.date}
              likes={post.likes}
              image={post.image}
              rating={post.rating}
              content={post.content}
              />
            )
          })}
        </div>
      </Grid>
      
    )
}

export default Feed;