
//import material UI 
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//import dependencies
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { get } from 'idb-keyval';

// import utilities
import useAppStore from '../store/appStore';
import { useState } from 'react';

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

export default function Login() {

  const navigate = useNavigate();

  const logInUser = useAppStore((state) => state.logInUser);

  const [usernameInput, setUsernameInput] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [loginErrorText, setLoginErrorText] = useState(null);

//KT's code for login in a user within indexDB 
//   function submitHandler() {
//     /* authenticate by checking for a username key within IndexedDB
//     if there is a user, use the password as the AES encryption secret, 
//     and look for a verifiable property on the value object
//     */
//   get(usernameInput)
//   .then((data) => {
//     const bytes = AES.decrypt(data, secretInput);
//     const decryptResponse = bytes.toString(CryptoJS.enc.Utf8);
//     const originalText = JSON.parse(decryptResponse);
//     if (originalText.decryption === 'isValid') {
//       // populate global state store with decrypted IDB value, which holds user data
//       logInUser(usernameInput, secretInput, originalText);
//       setUsernameInput('');
//       setSecretInput('');
//       setLoginErrorText(null);
//       navigate('/feed');
//       console.log(data)
//     } else {
//       setLoginErrorText('incorrect username or password');
//     }
//   })
//   .catch(() => {
//     setLoginErrorText('incorrect username or password');
//   });
// }

//KT's code to login a user in the PostgreSQL database

function submitHandler() {
  const userData = {
    username: usernameInput,
    password: secretInput,
  };

  fetch('http://localhost:3000/user/login', {
    method: 'POST',
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
        throw new Error('Failed to log in');
      }
    })
    .then((data) => {
      // Handle the response data
      console.log(data);
      // navigate('/feed');
      logInUser(usernameInput, secretInput);
      setUsernameInput('');
      setSecretInput('');
      navigate('/feed')
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
      setLoginErrorText('Incorrect username and password');
    });


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
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username: "
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                name="username"
                autoComplete="username"
                autoFocus
                error={loginErrorText !== null}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password: "
                type="password"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                id="password"
                autoComplete="current-password"
                error={loginErrorText !== null}
                helperText={loginErrorText}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}

                onClick={submitHandler}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2"  
                  onClick={() => navigate('/signup')}
                  >
                    {"Register for an account!"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}