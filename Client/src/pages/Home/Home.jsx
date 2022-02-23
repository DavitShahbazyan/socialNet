import React, { useState, useEffect } from 'react';
import './Home.css'

import { Layout, Menu } from 'antd';
import Post from './../../components/Post/Post';
import authService from './../../api/auth.service';
import Box from '@mui/material/Box';
import { LinearProgress, CircularProgress } from '@mui/material';

const { Content, Sider } = Layout;

const Home = () => {
    const [posts, setPosts] = useState(null);
    const [loadingPost, setLoadingPost] = useState(true);

    useEffect(async () => {
        setLoadingPost(true);
        const res = await authService.getPosts();
        if (res.data) {
            setPosts(res.data)
        }
        setLoadingPost(false);
    }, [])


    return (
        <>
            <div className='dashboardWrapper' >
                <Layout style={{ height: '100vh', paddingTop: '64px' }}>
                    <Sider width={300} style={{ background: '#fff' }}>
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
                    <Sider width={350} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            style={{ height: '100%', }}
                        >

                        </Menu>
                    </Sider>
                </Layout>
            </div >
        </>
    );
}

export default Home;