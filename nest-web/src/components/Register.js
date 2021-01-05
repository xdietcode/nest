import React from 'react';
import { Form, Button, Input, message } from 'antd';
import axios from 'axios';
import { BASE_URL } from "../constants";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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

function Register(props) {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const { username, password } = values;

        const opt = {
            method: "POST",
            url: `${BASE_URL}/signup`,
            data: {
                username: username,
                password: password
            },
            headers: {"content-type": "application/json"}
        }

        axios(opt)
            .then( res => {
                if (res.status === 200) {
                    message.success(`Successfully Registered!`)
                    // redirect to login
                    props.history.push("/login")

                }

            })
            .catch( e => {
                message.error(`Registration failed: ${e.message}`);
            })
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            className="register"
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
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
            </Form.Item>

            <Form.Item
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
                            return Promise.reject('Passwords not match!');
                        }
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary"
                        htmlType="submit"
                        className="register-btn">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Register;