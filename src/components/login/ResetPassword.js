import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';

const FormItem = Form.Item;

@inject('authStore','appState')
@withRouter
@observer 
class ResetPasswordForm extends Component {
    codeSent = false;
    verified = false;
    enterCode = false;
    code = '';

    sendCode = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.codeSent = true;
                this.code = this.makeidNumbers([], 5);
                var data = {
                    "code": this.code,
                    "email": values.email
                }
                this.props.authStore.requsetReset(data)
                    .then(
                        this.enterCode = true,
                    )
                    .catch(err => {
                        this.openNotificationWithIcon('error', 'Error occured while sending code');
                    });
            }
        });
    }

    verifyCode = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.code == values.code) {
                    this.verified = true;
                }else{
                    this.openNotificationWithIcon('error', 'Code does not match');
                }
            }
        });
    }

    resetPassword = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.password == values.confirmpassword) {
                    this.verified = true;
                    var data = {
                        "userid": this.props.appState.getUserId(),
                        "password": values.password
                    }
                    this.props.authStore.resetPassword(data)
                        .then(
                            this.openNotificationWithIcon('success', 'Sucess', 'Password reset successfully'),
                            this.props.history.push('/login')
                        )
                        .catch(err => {
                            this.openNotificationWithIcon('error', err.data.error.message);
                        });
                }else{
                    this.openNotificationWithIcon('error', 'Password not match');
                }
            }
        });
    }

    makeidNumbers(unique_strings, limit) {
        var text = "";
        var possible = "0123456789";

        for (var i = 0; i < limit; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        unique_strings.forEach(element => {
            if (element.unique_string == text) {
                text = this.makeid(unique_strings, limit);
            }
        });
        return text;
    }

    openNotificationWithIcon = (type, title, msg) => {
        notification[type]({
            placement: 'topRight',
            message: title,
            description: msg,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-parent">
                <Form className="login-form">
                    {(!this.codeSent && !this.verified) && !this.enterCode && <div>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email' }],
                            })(
                                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" className="login-form-button" onClick={this.sendCode}>Send code</Button>
                        </FormItem>
                    </div>}

                    {(this.codeSent && !this.verified) && this.enterCode && <div>
                        <FormItem>
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: 'Please input your code' }],
                            })(
                                <Input prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="code" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" className="login-form-button" onClick={this.verifyCode}>Next</Button>
                        </FormItem>
                    </div>}

                    {(this.codeSent && this.verified) && this.enterCode && <div>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password' }],
                            })(
                                <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="New password" type="password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('confirmpassword', {
                                rules: [{ required: true, message: 'Please input your password' }],
                            })(
                                <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Confirm password" type="password" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" className="login-form-button" onClick={this.resetPassword}>Reset password</Button>
                        </FormItem>
                    </div>}
                </Form>
            </div>
        );
    }
}

const ResetPassword = Form.create()(ResetPasswordForm);

export default ResetPassword;