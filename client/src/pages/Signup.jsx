//import material UI  
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//import dependencies
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { set, get } from 'idb-keyval';

import AES from 'crypto-js/aes';

// import utilities
import useAppStore from '../store/appStore';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Travel Bug
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signup() {

  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [signupErrorText, setSignupErrorText] = useState(null);


//KT's code for signing up a new user in IndexDB
  // function submitHandler() {
  //   /* check to see if the username is available by searching IndexedDB
  //   if available, add username as key to IndexedDB and populate value with an encrypted
  //   JSON object using the password as the AES secret
  //   */
  //   const initialUserData = { decryption: 'isValid', dbs: [] };
  //   const ciphertext = AES.encrypt(
  //     JSON.stringify(initialUserData),
  //     secretInput
  //   ).toString();

  //   get(usernameInput)
  //     .then((data) => {
  //       if (data === undefined) {
  //         set(usernameInput, ciphertext)
  //           .then(() => {
  //             navigate('/');
  //             console.log(data)
  //           })
  //           .catch((err) => {
  //             console.log('IndexedDB: set failed', err);
  //           });
  //       } else {
  //         setSignupErrorText('incorrect username or password');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('IndexedDB: get failed', err);
  //     });

  //   setUsernameInput('');
  //   setSecretInput('');
  //   setSignupErrorText(null);
  // }

  function submitHandler() {
    const userData = {
      username: usernameInput,
      password: secretInput,
    };
  
    fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          // The POST request was successful
          return response.json();
        } else {
          // The POST request failed
          throw new Error('Failed to create a new user');
        }
      })
      .then((data) => {
        // Handle the response data
        console.log(data);
        navigate('/');
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        setSignupErrorText('Incorrect username and password');
      });
  
    setUsernameInput('');
    setSecretInput('');
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username: "
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                
                  name="username"
                  error={signupErrorText !== null}
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password: "
                  type="password"
                  value={secretInput}
                  onChange={(e) => setSecretInput(e.target.value)}
                  id="password"
                  autoComplete="new-password"
                  error={signupErrorText !== null}
                  helperText={signupErrorText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Avatar"
                  label="Avatar"
                  name="Avatar"
                  autoComplete="Avatar"
                />
              </Grid>
              <Grid item xs={12}>

              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

              onClick={submitHandler}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2"
                onClick={() => navigate('/')}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}