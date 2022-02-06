import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import './Login.css';

const { Item } = Form;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function LoginPage() {
    const [loadings, setLoadings] = useState(false);
    const navigate = useNavigate();

    const onFinish = (data) => {
        setLoadings(true);
        login(data).then(e => {
            console.log(e);

        }).finally(() => {
            setLoadings(false);
            navigate('/dashboard');


        })
    }

    return (
        <div className='wrapper'>
            <div className='loginBlock'>
                <Form
                    {...formItemLayout}
                    name="login"
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onFinish}
                >
                    <Item
                        name="email"
                        className='formItem'
                        label="E-mail"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} />
                    </Item>
                    <Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                        className="formItem"
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            className='formItem'
                        />
                    </Item>
                    <Item className='formItem'  {...tailFormItemLayout}>
                        <Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Item>

                    </Item>

                    <Item  {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ display: 'block', width: '100%' }}
                            loading={loadings}
                        >
                            Log in
                        </Button>
                    </Item>
                </Form>
            </div>
        </div>
    );
}
