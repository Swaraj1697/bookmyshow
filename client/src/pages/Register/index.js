import React from 'react'
import { Button, Form, Input, message, Radio } from 'antd'
import { Link } from 'react-router-dom'
import { RegisterUser } from '../../api/users'

function Register() {

    const onFinish = async (values) => {
        console.log('Success:', values);
        const response = await RegisterUser(values);
        try {
            if (response.success) {
                message.success(response.message);
                console.log("success", response);

            } else {
                message.error(response.message);
                alert(response.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <main className="App-header">
                <h1>Register to BookMyShow</h1>
                <section className="mw-500 text-center px-6"></section>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Name" htmlFor="name" name="name" className='d-block' rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input id="name" type="text" placeholder="Enter your name" />
                    </Form.Item>
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
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item
                        label="Register as a Partner"
                        htmlFor="role"
                        name="role"
                        className="d-block text-center"
                        initialValue={false}
                        rules={[{ required: true, message: "Please select an option!" }]}
                    >
                        <div className="d-flex justify-content-start">
                            <Radio.Group name="radiogroup" className="flex-start">
                                <Radio value={"partner"}>Yes</Radio>
                                <Radio value={"user"}>No</Radio>
                            </Radio.Group>
                        </div>
                    </Form.Item>
                </Form>
                <div>
                    <p>
                        Already a User ? <Link to="/login" >Login here</Link>
                    </p>
                </div>

            </main>
        </>
    )
}

export default Register
