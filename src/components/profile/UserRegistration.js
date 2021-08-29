import React, { Component, useEffect } from 'react';
import {
    Form, Select, Radio, Button, Input, InputNumber, Checkbox, Row, Col, Modal, notification, DatePicker,
    Breadcrumb, Typography, Card, Steps, Popover, Icon, Table, Result
} from 'antd';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

const { TextArea } = Input;
const { Title } = Typography;
const { Step } = Steps;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

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

@inject('appStore')
@observer
class DataForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            confirmLoading: false,
            sucess: false,
            agree: false,
            userCategory: ''
        }

        this.props.appStore.getInstitutes();
        this.props.appStore.getDesignations();
    }

    doAgree = (agree) => {
        this.setState({ agree: !agree });
    }

    changeUserCategory = (value) => {
        if (value) {
            this.setState({ userCategory: value });
        } else {
            this.setState({ userCategory: '' });
        }
    }

    createUserAccount = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.confirm_mobile != values.mobile) {
                    openNotificationWithIcon('error', 'Oops', 'Mobile number doesnot match!');
                    return;
                }

                if (values.confirm_password != values.password) {
                    openNotificationWithIcon('error', 'Oops', 'Password doesnot match!');
                    return;
                }

                if (!values.remember) {
                    openNotificationWithIcon('error', 'Oops', 'Please confirm the declaration!');
                    return;
                }

                this.setState({ confirmLoading: true });

                if (values.user_category == 'slas_officer') {
                    values.user_roles_id = 5;
                } else if (values.user_category == 'institute_user') {
                    values.user_roles_id = 4;
                } else if (values.user_category == 'psc_user') {
                    values.user_roles_id = 3;
                } else if (values.user_category == 'pubad_user') {
                    values.user_roles_id = 2;
                }

                values.confirm_password = undefined;
                values.confirm_mobile = undefined;
                values.remember = undefined;

                this.props.appStore.createUserAccount(values)
                    .then(sucess => {
                        this.props.form.resetFields();

                        this.setState({ confirmLoading: false, sucess: true });
                        openNotificationWithIcon('success', 'Success', 'Data added successfully!');
                        this.props.history.push('/login')
                    })
                    .catch(err => {
                        this.setState({ confirmLoading: false });
                        openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
                    });
            }

        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading, sucess, agree, userCategory } = this.state;
        const { institutes, designations } = this.props.appStore;

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

        let instituteValues = [];
        let desigValues = [];

        if (institutes) {
            institutes.forEach((element, index) => {
                instituteValues.push(<Option key={index} value={element.id}>{element.name}</Option>);
            });
        }

        if (designations) {
            designations.forEach((element, index) => {
                desigValues.push(<Option key={index} value={element.id}>{element.designation}</Option>);
            });
        }

        return (
            <div>
                <Card bordered={false} style={{ textAlign: 'center' }}>
                    <Title level={4}>Create Profile</Title>
                </Card>

                <Card bordered={false}>
                    <Form>
                        <FormItem
                            label="Full Name"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('full_name', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Input style={{ width: 450 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="NIC"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('nic', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Input style={{ width: 450 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="User Category"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_category', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 450 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    onChange={this.changeUserCategory}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="slas_officer">SLAS Officer</Option>
                                    <Option value="institute_user">Institute User</Option>
                                    <Option value="psc_user">PSC User</Option>
                                    <Option value="pubad_user">PubAd User</Option>
                                </Select>
                            )}
                        </FormItem>

                        {(userCategory == 'institute_user' || userCategory == 'slas_officer' || userCategory == '') && <FormItem
                            label="Institute"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('institutes_id', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Select
                                    showSearch
                                    placeholder="Select institute"
                                    optionFilterProp="children"
                                    style={{ width: 450 }}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteValues}
                                </Select>
                            )}
                        </FormItem>}

                        <FormItem
                            label="Designation"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('designation', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 450 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {desigValues}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="User Name"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_name', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Input style={{ width: 450 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Password"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Input.Password style={{ width: 450 }} type="password" placeholder="Password" />
                            )}
                        </FormItem>

                        <FormItem
                            label="Confirm Password"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('confirm_password', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Input.Password style={{ width: 450 }} type="password" placeholder="Confirm Password" />
                            )}
                        </FormItem>

                        <FormItem
                            label="Email"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Input style={{ width: 450 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Mobile"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('mobile', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <InputNumber style={{ width: 450 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Confirm Mobile"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('confirm_mobile', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <InputNumber style={{ width: 450 }} />
                            )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout} style={{ marginTop: 12 }}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: agree,
                            })(
                                <Checkbox onClick={() => this.doAgree(agree)}><span>I hereby agree to use my account responsibly and declare that <br></br>
                                    I have authorization from my head of institution to create this login.</span></Checkbox>
                            )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout} style={{ marginTop: 12 }}>
                            <p>Note: The official request letter issued by the Secretary/Head of the <br></br>
                                Department should be faxed to 011 2683651 for user activation. The letter <br></br>
                                should clearly indicate the user’s Full Name and the NIC number.</p>
                        </FormItem>

                        <FormItem {...tailFormItemLayout} style={{ marginTop: 25 }}>
                            <div className="steps-action">
                                <Button type="primary" loading={confirmLoading} onClick={() => this.createUserAccount()}>
                                    Submit
                                </Button>
                            </div>
                        </FormItem>

                    </Form>
                </Card>
            </div>
        )
    }

}
const UserRegistration = Form.create()(DataForm);

export default UserRegistration;