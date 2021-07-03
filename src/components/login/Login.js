import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Form, Icon, Input, Button, Alert, notification, Typography } from 'antd';

const FormItem = Form.Item;
const { Title } = Typography;

@inject('authStore', 'appState')
@withRouter
@observer
class NormalLoginForm extends Component {

    state = {
        loading: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                var data = {
                    "email": values.username,
                    "password": values.password,
                    // "email": "admin@gmail.com",
                    // "password": "abc123456"
                }
                this.props.authStore.login(data)
                    .then(
                        () => this.props.history.push('/dashboard')
                    )
                    .catch(err => {
                        this.setState({ loading: false });
                        this.openNotificationWithIcon('error', err);
                    });
            }
        });
    }

    openNotificationWithIcon = (err, msg) => {
        notification[err]({
            placement: 'topRight',
            message: 'Login Error',
            description: msg,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-parent">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        <img className="image-class-login" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Emblem_of_Sri_Lanka.svg/2000px-Emblem_of_Sri_Lanka.svg.png" />
                        <Title level={4}>Ministry of Public Administration</Title>
                    </FormItem>
                    <FormItem style={{ marginTop: 5 }}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username' }],
                        })(
                            <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem style={{ marginTop: 5 }}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password' }],
                        })(
                            <Input.Password size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem style={{ marginTop: 10 }}>
                        {/* {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )} */}
                        {/* <Link className="login-form-forgot" to={'/resetpassword'}>Forgot password</Link> */}
                        {/* <Button type="primary" htmlType="submit" className="login-form-button">Log in </Button> */}
                        <Button size="large" type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>Log in </Button>
                    </FormItem>
                    <FormItem style={{ marginTop: 10, textAlign: 'center' }}>
                        <Link size="large" to={'/register-user'}>Register User</Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);

export default Login;