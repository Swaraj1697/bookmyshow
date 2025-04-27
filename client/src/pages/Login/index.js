import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../api/users'

function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Success:', values);
        const response = await LoginUser(values);
        try {
            if (response.success) {
                message.success(response.message);
                console.log(response.message);
                localStorage.setItem("token", response.data); // Store the token in local storage
                console.log("Signing JWT with secret:", process.env.JWT_SECRET);
                navigate("/"); // Redirect to home page after successful login

            } else {
                message.error(response.message);
                console.log(response.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <main className="App-header">
                <h1>Login to BookMyShow</h1>
                <section className="mw-500 text-center px-3"></section>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" htmlFor="email" name="email" className='d-block' rules={[{ required: true, message: 'Please input your email!' }, { type: "email", message: "Please enter a valid email" }]}>
                        <Input id="email" type="text" placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item label="Password" htmlFor="password" name="password" className='d-block' rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input id="password" type="password" placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            style={{ fontSize: "1rem", fontWeight: "600" }}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div>
                    <p>
                        New User ? <Link to="/register" >Register Here</Link>
                    </p>
                </div>

            </main>
        </>
    )
}

export default Login
