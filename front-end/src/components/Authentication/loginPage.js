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
import { Link as LinkRouter, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
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

export default function SignIn() {

    const navigate = useNavigate();
    const { loading, isAuthenticated, user , error} = useSelector(function (state) {
        return state.user;
    })
    const [loginState, setLoginState] = React.useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch();
    function handleChange(event) {
        setLoginState({
            email: event.target.name == "email" ? event.target.value : loginState.email,
            password: event.target.name == "password" ? event.target.value : loginState.password
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        dispatch(loginUser(loginState));
    }

    React.useEffect(() => {
        if(loading === false){
            if (isAuthenticated === true) {
                navigate("/account");
            }
        }     
        if(error){
            toast.warn(error);
        }
    }, [dispatch, isAuthenticated, error]);

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
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <Button
                                className='custom-auth'
                                type="submit"
                                fullWidth
                                variant="contained"

                                sx={{ mt: 3, mb: 2, bgcolor: 'black', ":hover": { bgcolor: 'black', textDecoration: 'underline' } }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <LinkRouter to="/forgotPassword" >
                                        <Link to="/forgot" variant="body2" sx={{ color: 'black', ":hover": { color: 'black' } }}>
                                            Forgot password?
                                        </Link>
                                    </LinkRouter>
                                </Grid>
                                <Grid item>
                                    <LinkRouter to="/register" className='link-auth'>
                                        <Link to="/register" variant="body2" sx={{ color: 'black', ":hover": { color: 'black' } }}>
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </LinkRouter>

                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}