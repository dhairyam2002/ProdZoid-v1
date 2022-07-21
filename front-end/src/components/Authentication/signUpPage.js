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
import { useSelector, useDispatch } from 'react-redux';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { registerUser } from '../../actions/userAction';
import { useSlider } from '@mui/base';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Prodzoid
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, user } = useSelector(state => {
    return state.user
  })
  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    password: ""
  })

  React.useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/")
    }
    if (error) {
      if(error.includes("duplicate")){
        toast.warn("User already exists!");
      }
      else{
        toast.warn(error);
      }
    }
  }, [dispatch, isAuthenticated, error])
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(userDetails));
  };

  function handleChange(event) {
    setUserDetails({
      name: event.target.name == "name" ? event.target.value : userDetails.name,
      email: event.target.name == "email" ? event.target.value : userDetails.email,
      password: event.target.name == "password" ? event.target.value : userDetails.password
    })
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5001}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        theme='dark'
        rtl={false}
        pauseOnFocusLoss
        draggable
        type="error"
        pauseOnHover
      />
      <ThemeProvider theme={theme}>
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
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'black', ":hover": { bgcolor: 'black', textDecoration: 'underline' } }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <LinkRouter to='/account'>
                    <Link to="/account" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </LinkRouter>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}