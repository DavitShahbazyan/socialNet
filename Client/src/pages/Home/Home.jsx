import React, { useState, useEffect } from 'react';
import './Home.css'
import { LinearProgress, Box } from '@mui/material';
import { Layout, Menu } from 'antd';
import Post from './../../components/Post/Post';
import authService from './../../api/auth.service';
import UserBlock from './../../components/UserBlock/UserBlock';

const { Content, Sider } = Layout;

const Home = () => {
    const [posts, setPosts] = useState(null);
    const [loadingPost, setLoadingPost] = useState(true);
    const [users, setUsers] = useState(null);

    useEffect(async () => {
        setLoadingPost(true);
        const res = await authService.getPosts();
        if (res.data) {
            setPosts(res.data)
        }
        const users = await authService.getUsers();
        setUsers(users.data);
        setLoadingPost(false);
    }, [])


    const gotoUser = (user) => {

    }

    return (
        <>
            <div className='dashboardWrapper' >
                <Layout style={{ height: '100vh', paddingTop: '64px' }}>
                    <Sider style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            style={{ height: '100%', }}
                        >

                        </Menu>
                    </Sider>
                    <Layout>
                        {loadingPost && (
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
                            {posts?.map(post => (
                                <Post key={post.id} data={post} />
                            ))}
                        </Content>
                    </Layout>
                    <Sider style={{
                        background: '#fff',
                        padding: 10,
                        height: 'calc(100vh - 64px)',
                        overflow: 'auto'
                    }}>
                        {users && users.map((user) => {
                            return <UserBlock key={user.id} user={user} onClick={() => gotoUser(user)} />
                        })
                        }
                    </Sider>
                </Layout>
            </div >
        </>
    );
}

export default Home;