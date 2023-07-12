
// import material UI 
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import createPost from './createPost';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';

//import utilities 
import useAppStore from '../store/appStore';
import { useNavigate } from 'react-router-dom';


import img from "../Assets/buggy.png";

export default function Header() {
  // //checking if user is still logged in
  // const isLoggedIn = useAppStore(state => state.isLoggedIn);
  const username = useAppStore(state => state.username);
  const navigate = useNavigate();
  
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickOpen = () => {
    console.log('click')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar style={{ justifyContent: 'flex-end' }}>
          <div style={{ marginRight: 'auto' }}>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'
            >
              <div className='logo-container' s>
                <img className='logo' src={img}></img>
              </div>
              <div>
                <Typography variant='h5' component='div' sx={{ flexGrow: 3 }}>
                  TravelBug
                </Typography>
              </div>
            </Grid>
            <Button variant='outlined' onClick={handleClickOpen}>
              Open form dialog
            </Button>
          </div>

          {auth &&  (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant='h6'
                component='div'
                sx={{
                  opacity: '80%',
                  fontSize: '1.3rem',
                  marginRight: '0.5rem',
                  marginTop: '0.6rem',
                  verticalAlign: 'middle',
                }}
              >
                {username}
              </Typography>
              {/* <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{ verticalAlign: 'middle' }}
          >

            <AccountCircle />
          </IconButton> */}
              <Avatar
                onClick={handleMenu}
                alt='travel bug icon'
                src='/client/assets/TravelBugIcon.png'
                sx={{ width: 30, height: 30, verticalAlign: 'middle' }}
              />
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/')}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
