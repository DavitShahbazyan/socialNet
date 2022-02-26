import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    CardHeader,
    Typography,
    Container,
    Grid,
    TextField,
    Input
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../../api/auth.service';
import { successAction, getAllUserSuccessAction } from '../../actions';

const getBase64 = (file) => new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject('Error: ', error);
})

const Account = () => {
    const dispatch = useDispatch();
    const [img, setImg] = useState('');
    const { user } = useSelector(state => state.authentication);
    const [values, setValues] = useState(user);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };


    const uploadImageFn = (e) => {
        let file = e.target.files[0];
        getBase64(file).then(res => {
            setImg(res);
        })
    }

    const onSubmit = () => {
        authService.uploadProfilePicture({
            avatar: img,
            userId: user.id
        }).then(res => {
            dispatch(successAction(res.data.currentUser));
            dispatch(getAllUserSuccessAction(res.data.allUsers.users));
        })
    }
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    height: '100vh'
                }}
            >
                <Container maxWidth="lg" style={{ paddingTop: 40 }}>
                    <Grid container spacing={3}  >
                        <Grid item lg={4} md={6} xs={12}   >
                            <Card>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Avatar
                                            src={!!img ? img : user.avatar}
                                            sx={{ height: 64, mb: 2, width: 64 }}
                                        />
                                        <Typography
                                            color="textPrimary"
                                            gutterBottom
                                            variant="h5"
                                        >
                                            {user.firstName + ' ' + user.lastName}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            {(user.city ? user.city : '') + ' ' + (user.country ? user.country : '')}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Divider />
                                <CardActions>
                                    <label htmlFor="contained-button-file">
                                        <Input accept="image/*" id="contained-button-file" multiple type="file" hidden onChange={uploadImageFn} />
                                        <Button variant="contained" component="span">
                                            Upload
                                        </Button>
                                    </label>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <form
                                autoComplete="off"
                                noValidate
                            >
                                <Card>
                                    <CardHeader
                                        subheader="The information can be edited"
                                        title="Profile"
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    helperText="Please specify the first name"
                                                    label="First name"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    required
                                                    value={values.firstName}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Last name"
                                                    name="lastName"
                                                    onChange={handleChange}
                                                    required
                                                    value={values.lastName}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Email Address"
                                                    name="email"
                                                    onChange={handleChange}
                                                    required
                                                    value={values.email}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Phone Number"
                                                    name="phone"
                                                    onChange={handleChange}
                                                    type="number"
                                                    value={values.phone}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="City"
                                                    name="city"
                                                    onChange={handleChange}
                                                    required
                                                    value={values.city}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Country"
                                                    name="country"
                                                    onChange={handleChange}
                                                    required
                                                    value={values.country}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 2
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={onSubmit}
                                        >
                                            Save details
                                        </Button>
                                    </Box>
                                </Card>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
};


export default Account;
