import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
} from 'antd';
import { registration } from '../../api/auth';

const { Option } = Select;
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


const RegistrationPage = () => {
    const [loadings, setLoadings] = useState(false);


    const onFinish = (values) => {
        registration(values).then(e => {
            console.log(e);
        });
    };



    return (
        <Form
            {...formItemLayout}
            name="register"
            onFinish={onFinish}
        >
            <Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Item>

            <Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Item>
{/* 
            <Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Item>

            <Item
                name="nickname"
                label="Nickname"
                tooltip="What do you want others to call you?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Item>

            <Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    addonBefore={
                        <Item name="prefix" noStyle>
                            <Select
                                style={{
                                    width: 100,
                                }}
                            >
                                <Option value="86">+7</Option>
                                <Option value="87">+374</Option>
                            </Select>
                        </Item>}
                    style={{
                        width: '100%',
                    }}
                />
            </Item>

            <Item
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true,
                        message: 'Please select gender!',
                    },
                ]}
            >
                <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                </Select>
            </Item>

            <Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Item>*/}
            <Item {...tailFormItemLayout}> 
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ display: 'block', width: '100%' }}
                    loading={loadings}
                >
                    Register
                </Button>
            </Item>
        </Form>
    );
};

export default RegistrationPage;