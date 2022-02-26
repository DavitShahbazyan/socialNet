import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CssBaseline, TextField, Grid, CircularProgress, Avatar, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import authService from './../../api/auth.service';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction, registerSuccessAction } from '../../actions';
import { useTranslation } from 'react-i18next';

const theme = createTheme();

function Register() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.authentication);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (loading) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [loading])

    useEffect(() => {
        if (email && password && firstName && lastName) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [email, password, firstName, lastName])



    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginRequestAction());

        authService.register(firstName, lastName, email, password).then(res => {
            if (res.data.access_token) {
                dispatch(registerSuccessAction());

                enqueueSnackbar('You are successfully registered', { variant: 'success' });
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                enqueueSnackbar(res.data.message, { variant: 'error' });
            }
        });
    };

    return (
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label={t("first_name")}
                                    autoFocus
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label={t("last_name")}
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label={t("email_address")}
                                    name="email"
                                    autoComplete="email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label={t("password")}
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!isDisabled}
                        >
                            {loading && (<CircularProgress size={25} />)}
                            {!loading && 'Sign Up'}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to={'/login'} variant="body2">
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Register;