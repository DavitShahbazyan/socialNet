import React, { useState, useEffect } from 'react';
import './Home.css'

import { Layout, Menu } from 'antd';
import Post from './../../components/Post/Post';
import authService from './../../api/auth.service';

const { Content, Sider } = Layout;

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(async () => {
        const res = await authService.getPosts();
        if (res.data) {
            setPosts(res.data)
        }
    }, [])


    return (
        <>
            <div className='dashboardWrapper' >
                <Layout style={{ height: '100%', paddingTop: '64px' }}>
                    <Sider width={300} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            style={{ height: '100%', }}
                        >

                        </Menu>
                    </Sider>
                    <Layout>
                        <Content
                            className='postsBlock'
                            style={{
                                padding: 24,
                                margin: 0,
                                overflow: 'auto',

                            }}
                        >
                            {posts.map(post => (
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