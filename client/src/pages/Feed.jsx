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

  //check if user has logged in
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const userData = useAppStore((state) => state.userData);

    // check user authorization
    useEffect(() => {
      if (!isLoggedIn && toggleFeedAuth) navigate('/');
    }, []);


    //
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
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
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Location"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Review"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Rating 1-5"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Post</Button>
              </DialogActions>
            </Dialog>
          </div>
          </Grid>
          <Post />
        </div>
      </Grid>
      
    )
}

export default Feed;