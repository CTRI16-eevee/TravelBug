//import material UI
import React from 'react';


//import dependencies 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import utilities
import useAppStore from '../store/appStore';


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

    return (

        <div>
        <h1>Feed</h1>

      </div>
        
    )
}

export default Feed;