import React from 'react';
import Post from '../components/post';
import { Container, Grid } from '@mui/material'
import Header from '../components/header';
 const Feed = () => {


    return (
      <Grid container justifyContent={"center"}>
        <div>
          <Header />
        {/* Your signup form and content */}
          <Post />
        </div>
      </Grid>
      
    )
}

export default Feed;