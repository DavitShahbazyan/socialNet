import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css'
import {
    LinearProgress,
    CircularProgress,
    Box,
    Avatar,
    Typography,
    ListItemIcon,
    ListItemText,
    List,
    ListItemButton
} from '@mui/material';
import { Layout } from 'antd';
import Post from './../../components/Post/Post';
import authService from './../../api/auth.service';
import UserBlock from './../../components/UserBlock/UserBlock';
import {
    getAllPostsRequestAction,
    getAllPostsSuccessAction,
    getAllUserRequestAction,
    getAllUserSuccessAction,
    getAllPostsFailureAction
} from '../../actions';
import PersonIcon from '@mui/icons-material/Person';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import AddPosts from '../../components/AddPosts/AddPosts';
import { useTranslation } from 'react-i18next';

const { Content, Sider } = Layout;

const Home = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const postsState = useSelector(state => state.posts);
    const usersState = useSelector(state => state.users);
    const { user, loading } = useSelector(state => state.authentication);


    useEffect(() => {
        i18n.changeLanguage('en')
        const fetchData = async () => {
            if (!postsState.posts) {
                dispatch(getAllPostsRequestAction());
                const res = await authService.getPosts();
                if (res.data) {
                    dispatch(getAllPostsSuccessAction(res.data))
                } else {
                    getAllPostsFailureAction(res.data)
                }
            }
            if (!usersState.users) {
                dispatch(getAllUserRequestAction());
                const users = await authService.getUsers();
                if (users.data) {
                    dispatch(getAllUserSuccessAction(users.data));
                }
            }
        }
        fetchData();
    }, [])

    return (
        <div className='dashboardWrapper' >
            <div style={{
                display: 'flex',
                height: '100vh',
                paddingTop: '64px',
                position: 'relative',
                transition: 'all 0.2s'
            }}>
                <Sider style={{
                    background: '#fff',
                }}>

                    {loading ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <aside className='homeLeftAside'>
                            <Box sx={{
                                padding: '5px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '20px',
                            }}>
                                <Avatar
                                    alt={`${user.firstName} ${user.lastName}`}
                                    src={user.avatar}
                                    sx={{ width: 80, height: 80, marginBottom: 2 }}
                                />

                                <Typography variant='body1'>
                                    <b> {`${user.firstName} ${user.lastName}`}</b>
                                </Typography>
                            </Box>

                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={t("profile")} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PhotoSizeSelectActualIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={t("photo")} />
                                </ListItemButton>
                            </List>

                        </aside>
                    )}
                </Sider>
                <Layout>
                    {postsState.loading && (
                        <Box sx={{ width: '100%', position: 'fixed' }}>
                            <LinearProgress />
                        </Box>
                    )}
                    <Content
                        className='postsBlock'
                        style={{
                            padding: 24,
                            margin: 0,
                            overflow: 'auto',

                        }}
                    >

                        <AddPosts />

                        {postsState.posts?.map(post => (
                            <Post key={post.id} data={post} />
                        ))}
                    </Content>
                </Layout>

                <Sider style={{
                    background: '#fff',
                    height: 'calc(100vh - 64px)',
                    overflow: 'auto'
                }}>
                    {usersState.loading ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}>
                            <CircularProgress />
                        </Box>
                    ) : (usersState.users?.map((u) => {
                        if (u.id === user.id) {
                            return
                        }
                        return <UserBlock key={u.id} user={u} />
                    }))}
                </Sider>
            </div>
        </div >
    )
}

export default Home;