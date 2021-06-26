import React, { Component } from 'react';
import {
    Form, Select, Radio, Button, Input, Divider, Checkbox, Row, Col, Modal, notification
} from 'antd';
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('userStore')
@observer
class CreateUserForm extends Component {

    constructor(props) {
        super(props);
    }

    showConfirm = (props) => {
        confirm({
            title: 'Are you sure create user?',
            // content: 'Some descriptions',
            okText: 'Yes',
            onOk() {
                props.form.validateFields((err, values) => {
                    if (!err) {
                        props.userStore.register(values)
                            .then(sucess => {
                                props.form.resetFields();
                                openNotificationWithIcon('success', 'Sucess', 'User created successfully')
                            })
                            .catch(err => {
                                openNotificationWithIcon('error', 'Oops', 'Something went wrong');
                            });
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form
                className="ant-advanced-search-form">

                {/* <Divider orientation="left">Basic</Divider> */}

                <FormItem
                    label="First Name"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('first_name', {
                        rules: [{ required: true, message: 'Please input first name' }],
                    })(
                        <Input style={{ width: 300 }} allowClear />
                    )}
                </FormItem>

                <FormItem
                    label="Last Name"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('last_name', {
                        rules: [{ required: true, message: 'Please input last name' }],
                    })(
                        <Input style={{ width: 300 }} allowClear />
                    )}
                </FormItem>

                <FormItem
                    label="Email"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input email' }],
                    })(
                        <Input style={{ width: 300 }} allowClear />
                    )}
                </FormItem>

                <FormItem
                    label="Phone"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input phone' }],
                    })(
                        <Input style={{ width: 300 }} allowClear />
                    )}
                </FormItem>

                <FormItem
                    label="Designation"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('designation', {
                        rules: [{ required: true, message: 'Please input designation' }],
                    })(
                        <Input style={{ width: 300 }} allowClear />
                    )}
                </FormItem>

                <Form.Item
                    label="Gender"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('gender', {
                        initialValue: "male",
                    })(
                        <RadioGroup>
                            <Radio.Button value="male">Male</Radio.Button>
                            <Radio.Button value="female">Female</Radio.Button>
                        </RadioGroup>
                    )}
                </Form.Item>

                <FormItem
                    label="Role"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('role', {
                        rules: [{ required: true, message: 'Please input role' }],
                    })(
                        <Select
                            style={{ width: 145 }}
                            placeholder="Select role"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="4">Admin</Option>
                            <Option value="7">Manager</Option>
                            <Option value="8">Sales</Option>
                            <Option value="9">Finance</Option>
                        </Select>
                    )}
                </FormItem>

                {/* <Divider orientation="left">Permissions</Divider>

                <Form.Item
                    label="Delas"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator("permissions")(
                        <Checkbox.Group style={{ width: "100%" }}>
                            <Row>
                                <Col span={12}><Checkbox value="view_deal_list">View Deal List</Checkbox></Col>
                                <Col span={12}><Checkbox value="view_deal_details">View Deal Details</Checkbox></Col>
                                <Col span={12}><Checkbox value="view_purchases">View Purchases</Checkbox></Col>
                                <Col span={12}><Checkbox value="archive_deals">Archive Deals</Checkbox></Col>
                                <Col span={12}><Checkbox value="pause_deals">Pause Deals</Checkbox></Col>
                                <Col span={12}><Checkbox value="republish_deals">Republish Deals</Checkbox></Col>
                            </Row>
                        </Checkbox.Group>
                    )}
                </Form.Item>

                <Form.Item
                    label="Claims"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator("permissions")(
                        <Checkbox.Group style={{ width: "100%" }}>
                            <Row>
                                <Col span={12}><Checkbox value="add_claims">Add Claims</Checkbox></Col>
                                <Col span={12}><Checkbox value="view_requests">View Requests</Checkbox></Col>
                                <Col span={12}><Checkbox value="approve/reject_claim">Approve/Reject Claim</Checkbox></Col>
                                <Col span={12}><Checkbox value="view_claim_list">View Claim List</Checkbox></Col>
                            </Row>
                        </Checkbox.Group>
                    )}
                </Form.Item>

                <Form.Item
                    label="Settings"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator("permissions")(
                        <Checkbox.Group style={{ width: "100%" }}>
                            <Row>
                                <Col span={12}><Checkbox value="create_user">Create User</Checkbox></Col>
                                <Col span={12}><Checkbox value="view_users">View Users</Checkbox></Col>
                                <Col span={12}><Checkbox value="edit_user_details">Edit User Details</Checkbox></Col>
                                <Col span={12}><Checkbox value="enable/disable_user">Enable/Disable User</Checkbox></Col>
                            </Row>
                        </Checkbox.Group>
                    )}
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" className="btn-align" onClick={() => this.showConfirm(this.props)}>Add New</Button>
                </Form.Item>

            </Form>
        )
    }

}
const CreateUser = Form.create()(CreateUserForm);

export default CreateUser;