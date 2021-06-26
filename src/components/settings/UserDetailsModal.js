import React, { Component } from 'react';
import {
    Modal, Button, Form, Select, Input, Radio,
    Divider, Checkbox, Row, Col, Switch
} from 'antd';
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@inject('userStore')
@observer
class UserDetails extends Component {

    constructor(props) {
        super(props);
    }

    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.userid = this.props.userStore.request.userid;
                this.props.userStore.updateUser(values)
                    .then(sucess => {
                        this.setState({
                            visible: false,
                        });
                    })
                    .catch(err => {

                    });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { request } = this.props.userStore;

        if (!request) {
            return (<Button type="primary" onClick={this.showModal}>Edit</Button>);
        } else {
            return (
                <div>
                    <Button type="primary" onClick={this.showModal}>Edit</Button>
                    <Modal
                        title="Edit User Details"
                        okText="Update"
                        cancelText="Cancel"
                        visible={this.state.visible}
                        onOk={this.handleSubmit}
                        onCancel={this.handleCancel}
                        width={650}
                    >
                        <div>
                            <Form>

                                {/* <FormItem
                                    label="Status"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('status', {
                                        rules: [{ required: false, message: 'Please input first name' }],
                                    })(
                                        <Switch defaultChecked onChange={this.onChange} />
                                    )}
                                </FormItem> */}

                                <FormItem
                                    label="First Name"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('first_name', {
                                        rules: [{ required: true, message: 'Please input first name' }],
                                        initialValue: request['first_name']
                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Last Name"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('last_name', {
                                        rules: [{ required: true, message: 'Please input last name' }],
                                        initialValue: request['last_name']
                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Email"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Please input email' }],
                                        initialValue: request['email']
                                    })(
                                        <Input disabled={true} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Phone"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: 'Please input phone' }],
                                        initialValue: request['phone']
                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Designation"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('designation', {
                                        rules: [{ required: true, message: 'Please input designation' }],
                                        initialValue: request['designation']
                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <Form.Item
                                    label="Gender"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('gender', {
                                        initialValue: request['gender'],
                                    })(
                                        <RadioGroup onChange={this.onChange}>
                                            <Radio.Button value="male">Male</Radio.Button>
                                            <Radio.Button value="female">Female</Radio.Button>
                                        </RadioGroup>
                                    )}
                                </Form.Item>

                                {/* <FormItem
                                    label="Role"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('role', {
                                        rules: [{ required: false, message: 'Please input role' }],
                                    })(
                                        <Select
                                            showSearch
                                            style={{ width: 145 }}
                                            placeholder="Select role"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="admin">Admin</Option>
                                            <Option value="manager">Manager</Option>
                                            <Option value="sales">Sales</Option>
                                            <Option value="finance">Finance</Option>
                                        </Select>
                                    )}
                                </FormItem> */}
                            </Form>
                        </div>
                    </Modal>
                </div>
            );
        }
    }
}

const UserDetailsModal = Form.create()(UserDetails);

export default UserDetailsModal;
