import React from 'react';
import './Home.css'

import { Layout, Menu } from 'antd';
import Post from './../../components/Post/Post';


const { Content, Sider } = Layout;

const Home = () => {

    return (
        <>

            <div div className='dashboardWrapper' >
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
                            <Post />
                            <Post />
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
                {/* <Post />
            <Post /> */}
            </div >
        </>
    );
}

export default Home;