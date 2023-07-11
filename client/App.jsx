import * as React from 'react';
// import {
//   // BrowserRouter as Router,
//   createBrowserRouter,
//   RouterProvider,
//   // Routes,
//   // Route,
//   // Link,
// } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Feed from './src/pages/Feed';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffd900',
    },
    secondary: {
      main: '#134e00',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/feed',
    element: <Feed />,
  },

]);


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;