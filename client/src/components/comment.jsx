import React from 'react'
import { Card, Typography, InputAdornment, CardActions, IconButton, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Comment = ({ comment, i }) => {
  return (
    <Card key={i + 'a'} sx={{ minWidth: 345, margin: 1}}>
      <Grid container direction="row" alignItems="center">
        <img className="comment-pfp" src={comment.pfp} alt="User profile" />
        <Typography sx={{ mr: 1, ml: .5 }}>
          {comment.username}
        </Typography>
        <Typography>
          {comment.comment}
        </Typography>
      </Grid>
      <CardActions>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Comment;