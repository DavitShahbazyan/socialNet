import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';

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
        <>
        <Form
            {...formItemLayout}
            name="login"
            initialValues={{
                remember: false,
            }}
            onFinish={onFinish}
        >
            <Item name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Item>
            <Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Item>
            <Item>
                <Row justify="space-between">
                    <Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Item>
                </Row>

            </Item>

            <Item>
                <Row justify="space-between">
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ display: 'block', width: '100%' }}
                        loading={loadings}
                    >
                        Log in
                    </Button>
                </Row>
            </Item>
        </Form>
        <Chat />
        </>
    );
}
