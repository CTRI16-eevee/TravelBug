import React from 'react'
import { Card, Typography, InputAdornment, CardActions, IconButton, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Comment = (props) => {
  const {content, username, profile_picture, date, likes, i} = props;
  return (
    <Card key={i + 'a'} sx={{ margin: 1}}>
      <Grid container direction="row" alignItems="center">
        <img className="comment-pfp" src={profile_picture} alt="User profile" />
        <Typography sx={{ mr: 1, ml: .5 }}>
          {username}
        </Typography>
        <Typography style={{wordWrap: 'break-word'}} >
          {content}
        </Typography>
      </Grid>
      <CardActions>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <Typography>
          {likes}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Comment;