import React, { Component } from 'react';
import {
    Form, Select, Radio, Button, Input, Divider, Checkbox, Row, Col, Modal, notification, DatePicker, Breadcrumb,
    Typography, Card, Steps, Popover, Icon, Table
} from 'antd';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import AddServiceRecord from './AddServiceRecord';

const { Title } = Typography;
const { Step } = Steps;

const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

const customDot = (dot, { status, index }) => (
    <span>
        {dot}
    </span>
);

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('appStore')
@observer
class AddOfficerForm extends Component {

    constructor(props) {
        super(props);

        this.state = { visible: false, confirmLoading: false, current: 0 }
    }

    columns = [
        {
            title: 'Institute',
            dataIndex: 'institute_name',
            key: 'institute_name',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            width: '15%'
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
            width: '15%'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (text, record) => (
                <span>{record.status == 1 ? 'Current' : 'Past'}</span>
            ),
        }
    ];

    handleCancel = () => {
        this.setState({ visible: false });
    }

    showModal = () => {
        this.setState({ visible: true });
    }

    prev = () => {
        if (this.state.current == 0) {

            var values = this.props.form.getFieldsValue();

            this.props.appStore.officerData.name = values.name;
            this.props.appStore.officerData.nic = values.nic ? values.nic : null;
            this.props.appStore.officerData.dob = values.dob ? values.dob : null;
            this.props.appStore.officerData.gender = values.gender;
            this.props.appStore.officerData.address = values.address ? values.address : null;
            this.props.appStore.officerData.mobile = values.mobile ? values.mobile : null;
            this.props.appStore.officerData.email = values.email ? values.email : null;

            const current = this.state.current - 1;
            this.setState({ current });
        }

        if (this.state.current == 1) {

            var values = this.props.form.getFieldsValue();

            this.props.appStore.officerData.appointment_date = values.appointment_date ? moment(values.appointment_date).format('MM-DD-YYYY HH:mm:ss') : null;
            this.props.appStore.officerData.service_confirmed = values.service_confirmed.length != 0 ? values.service_confirmed : null;
            this.props.appStore.officerData.grade_iii_entry = values.grade_iii_entry ? moment(values.grade_iii_entry).format('MM-DD-YYYY HH:mm:ss') : null;
            this.props.appStore.officerData.grade_ii_promoted = values.grade_ii_promoted ? moment(values.grade_ii_promoted).format('MM-DD-YYYY HH:mm:ss') : null;
            this.props.appStore.officerData.grade_i_promoted = values.grade_i_promoted ? moment(values.grade_i_promoted).format('MM-DD-YYYY HH:mm:ss') : null;
            this.props.appStore.officerData.special_grade_promoted = values.special_grade_promoted ? moment(values.special_grade_promoted).format('MM-DD-YYYY HH:mm:ss') : null;

            const current = this.state.current - 1;
            this.setState({ current });
        }

        if (this.state.current == 2) {

            var values = this.props.form.getFieldsValue();

            this.props.appStore.officerData.al_stream = values.al_stream.length != 0 ? values.al_stream : null;
            this.props.appStore.officerData.basic_degree = values.basic_degree ? values.basic_degree : null;
            this.props.appStore.officerData.master_degree = values.master_degree ? values.master_degree : null;

            const current = this.state.current - 1;
            this.setState({ current });

        }
    }

    next = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {

                if (this.state.current == 0) {

                    this.props.appStore.officerData.name = values.name;
                    this.props.appStore.officerData.nic = values.nic ? values.nic : null;
                    this.props.appStore.officerData.dob = values.dob ? values.dob : null;
                    this.props.appStore.officerData.gender = values.gender;
                    this.props.appStore.officerData.address = values.address ? values.address : null;
                    this.props.appStore.officerData.mobile = values.mobile ? values.mobile : null;
                    this.props.appStore.officerData.email = values.email ? values.email : null;

                    const current = this.state.current + 1;
                    this.setState({ current });
                }

                if (this.state.current == 1) {

                    this.props.appStore.officerData.appointment_date = values.appointment_date ? moment(values.appointment_date).format('MM-DD-YYYY HH:mm:ss') : null;
                    this.props.appStore.officerData.service_confirmed = values.service_confirmed.length != 0 ? values.service_confirmed : null;
                    this.props.appStore.officerData.grade_iii_entry = values.grade_iii_entry ? moment(values.grade_iii_entry).format('MM-DD-YYYY HH:mm:ss') : null;
                    this.props.appStore.officerData.grade_ii_promoted = values.grade_ii_promoted ? moment(values.grade_ii_promoted).format('MM-DD-YYYY HH:mm:ss') : null;
                    this.props.appStore.officerData.grade_i_promoted = values.grade_i_promoted ? moment(values.grade_i_promoted).format('MM-DD-YYYY HH:mm:ss') : null;
                    this.props.appStore.officerData.special_grade_promoted = values.special_grade_promoted ? moment(values.special_grade_promoted).format('MM-DD-YYYY HH:mm:ss') : null;

                    const current = this.state.current + 1;
                    this.setState({ current });
                }
            }

        });
    }

    addOfficer = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {

                this.props.appStore.officerData.al_stream = values.al_stream.length != 0 ? values.al_stream : null;
                this.props.appStore.officerData.basic_degree = values.basic_degree ? values.basic_degree : null;
                this.props.appStore.officerData.master_degree = values.master_degree ? values.master_degree : null;

                this.setState({ confirmLoading: true });

                this.props.appStore.addOfficer(this.props.appStore.officerData)
                    .then(sucess => {

                        this.props.form.resetFields();
                        this.props.appStore.resetOfficerData();
                        this.setState({ current: 0, confirmLoading: false });
                        openNotificationWithIcon('success', 'Success', 'Officer added successfully!');
                    })
                    .catch(err => {
                        this.setState({ confirmLoading: false });
                        openNotificationWithIcon('error', 'Oops', 'Something went wrong in officer adding!');
                    });
            }

        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading, current } = this.state;
        const { officerData } = this.props.appStore;

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

        if (officerData) {
            officerData.service_history.forEach((element, index) => { });
        }

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Officers
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Add Officer
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Add Officer</Title>
                </Card>

                <Card style={{ margin: 25 }}>
                    <Steps current={current} progressDot={customDot}>
                        <Step title="Personal Information" />
                        <Step title="Service  Information" />
                        <Step title="Education Information" />
                    </Steps>

                    <div className="steps-content">
                        <Form>
                            {current == 0 && <div style={{ marginTop: 60 }}>
                                <FormItem
                                    label="Name"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please input name' }],
                                        initialValue: officerData.name
                                    })(
                                        <Input style={{ width: '100% !important' }} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="NIC"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('nic', {
                                        rules: [{ required: !true, message: 'Please input nic' }],
                                        initialValue: officerData.nic
                                    })(
                                        <Input style={{ width: 250 }} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Gender"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('gender', {
                                        rules: [{ required: true, message: 'Please input gender' }],
                                        initialValue: officerData.gender != null ? officerData.gender : []
                                    })(
                                        <Select
                                            style={{ width: 250 }}
                                            placeholder="Select gender"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Date of Birth"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('dob', {
                                        rules: [{ required: !true, message: 'Please input birth date' }],
                                        initialValue: officerData.dob != null ? moment(officerData.dob) : null
                                    })(
                                        <DatePicker style={{ width: 250 }} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Address"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('address', {
                                        rules: [{ required: !true, message: 'Please input address' }],
                                        initialValue: officerData.address
                                    })(
                                        <Input style={{ width: '100% !important' }} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Mobile"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('mobile', {
                                        rules: [{ required: !true, message: 'Please input mobile' }],
                                        initialValue: officerData.mobile
                                    })(
                                        <Input style={{ width: 250 }} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Email"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('email', {
                                        rules: [{ required: !true, message: 'Please input email' }],
                                        initialValue: officerData.email
                                    })(
                                        <Input style={{ width: '100% !important' }} />
                                    )}
                                </FormItem>
                            </div>}

                            {current == 1 && <div style={{ marginTop: 60 }}>
                                <FormItem
                                    label="Appointment Date"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('appointment_date', {
                                        rules: [{ required: !true, message: 'Please input appointment date' }],
                                        initialValue: officerData.appointment_date != null ? moment(officerData.appointment_date) : null
                                    })(
                                        <DatePicker style={{ width: 250 }} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Service Confirmed"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('service_confirmed', {
                                        rules: [{ required: !true, message: 'Please input service confirmed' }],
                                        initialValue: officerData.service_confirmed != null ? officerData.service_confirmed : []
                                    })(
                                        <Select
                                            style={{ width: 250 }}
                                            placeholder="Select service confirmed"
                                            optionFilterProp="children"
                                            onChange={this.paymentChange}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value={1}>Yes</Option>
                                            <Option value={2}>No</Option>
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Grade III Entry"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('grade_iii_entry', {
                                        rules: [{ required: !true, message: 'Please input grade iii entry date' }],
                                        initialValue: officerData.grade_iii_entry != null ? moment(officerData.grade_iii_entry) : null
                                    })(
                                        <DatePicker style={{ width: 250 }} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Grade II Promoted"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('grade_ii_promoted', {
                                        rules: [{ required: !true, message: 'Please input grade ii promoted date' }],
                                        initialValue: officerData.grade_ii_promoted != null ? moment(officerData.grade_ii_promoted) : null
                                    })(
                                        <DatePicker style={{ width: 250 }} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Grade I Promoted"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('grade_i_promoted', {
                                        rules: [{ required: !true, message: 'Please input grade i promoted date' }],
                                        initialValue: officerData.grade_i_promoted != null ? moment(officerData.grade_i_promoted) : null
                                    })(
                                        <DatePicker style={{ width: 250 }} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Special Grade Promoted"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('special_grade_promoted', {
                                        rules: [{ required: !true, message: 'Please input special grade promoted date' }],
                                        initialValue: officerData.special_grade_promoted != null ? moment(officerData.special_grade_promoted) : null
                                    })(
                                        <DatePicker style={{ width: 250 }} />
                                    )}
                                </FormItem>


                                <FormItem
                                    label="Service History"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    <div>
                                        <AddServiceRecord />
                                        <Table
                                            size={"small"}
                                            rowKey={record => record.uid}
                                            columns={this.columns}
                                            dataSource={officerData.service_history} />
                                    </div>
                                </FormItem>


                            </div>}

                            {current == 2 && <div style={{ marginTop: 60 }}>
                                <FormItem
                                    label="AL Stream"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('al_stream', {
                                        rules: [{ required: !true, message: 'Please input AL stream' }],
                                        initialValue: officerData.al_stream != null ? officerData.al_stream : []
                                    })(
                                        <Select
                                            style={{ width: 250 }}
                                            placeholder="Select gender"
                                            optionFilterProp="children"
                                            onChange={this.paymentChange}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="maths">Maths</Option>
                                            <Option value="bio">Biology</Option>
                                            <Option value="arts">Arts</Option>
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Basic Degree"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('basic_degree', {
                                        rules: [{ required: !true, message: 'Please input basic degree' }],
                                        initialValue: officerData.basic_degree
                                    })(
                                        <Input style={{ width: '100% !important' }} />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Master Degree"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('master_degree', {
                                        rules: [{ required: !true, message: 'Please input master degree' }],
                                        initialValue: officerData.master_degree
                                    })(
                                        <Input style={{ width: '100% !important' }} />
                                    )}
                                </FormItem>

                            </div>}

                            <FormItem {...tailFormItemLayout} style={{ marginTop: 25 }}>
                                <div className="steps-action">
                                    {current > 0 && (
                                        <Button onClick={() => this.prev()}>
                                            Previous
                                        </Button>
                                    )}
                                    {current < 3 - 1 && (
                                        <Button type="primary" onClick={() => this.next()}>
                                            Next
                                        </Button>
                                    )}
                                    {current == 2 && (
                                        <Button type="primary" loading={confirmLoading} onClick={() => this.addOfficer()}>
                                            Submit
                                        </Button>
                                    )}
                                </div>
                            </FormItem>

                        </Form>
                    </div>
                </Card>
            </div>
        )
    }

}
const AddOfficer = Form.create()(AddOfficerForm);

export default AddOfficer;