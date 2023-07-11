import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Star from '@mui/icons-material/Star'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
const Stars = (rating) => {
  const ratingArr = [];
  for (let i = 0; i < rating; i++) {
    ratingArr.push(<Star key={i}/>)
  }
  return ratingArr;
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return ( 
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          /* pull profile url from props */
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Location"
        subheader="September 14, 2016"
        
      />
      {/* pass ratings prop (integer 1-5) into Stars funtion */}
      <Typography ml={2} variant='h5'>{Stars(4)}</Typography>
      
      <CardMedia
        component="img"
        height="194"
        // image url from props will go here
        image="https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR1qIrvvnZAf97oi8ywnd93WZd4utSPnwGrXoSufKbexeNooMGlTRJL-H-HuvLhf4mS"
        alt="Paella dish"
      />
      <CardContent>
        {/* discription from props will go here (location review)*/}
        <Typography variant="body2" color="text.secondary">
          This is my review of the location that I visited. I had a great Paella at the local restaurant
        </Typography>
      </CardContent>
      <CardActions>
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
      </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          {/* where comments will go when we have them */}
        
          hi hi hi hi hi hi hi hi hi ho ho ho ho ho ho ho ho ho ho ho ho ho hi hi hi hi hi hi hi hi

          hihi

          hihi
        
      </Collapse>
      </CardActions>
      <CardContent >
        <TextField id="outlined-basic" multiline label="Comment" InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* input users pfp from props here */}
              <img className="comment-pfp" src="https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR1qIrvvnZAf97oi8ywnd93WZd4utSPnwGrXoSufKbexeNooMGlTRJL-H-HuvLhf4mS" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Button>Say it!</Button>
            </InputAdornment>
          ),  
        }} variant="outlined"></TextField>  
      </CardContent>
      
      

      <CardActions >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
        
      </CardActions>
    
    </Card>
  );
}

// import React from "react";
// import { Card } from "@mui/material";
// // Location, Rating
// // image
// // comment section
// // comment input, more button
// const Post = () => {
//   return (
//     <Card>
//       <div>
        
//       </div>
      
//     </Card>
//   );
// }
// export default Post;